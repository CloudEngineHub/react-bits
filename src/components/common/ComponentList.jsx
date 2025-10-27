import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  createListCollection
} from '@chakra-ui/react';
import { Grid as RVGrid, AutoSizer, WindowScroller } from 'react-virtualized';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiSearch, FiTrash2, FiX } from 'react-icons/fi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { toast } from 'sonner';
import { componentMetadata } from '../../constants/Information';
import { fuzzyMatch } from '../../utils/fuzzy';
import {
  getSavedComponents,
  isComponentSaved,
  removeSavedComponent,
  toggleSavedComponent
} from '../../utils/favorites';

const CARD_RADIUS = 30;
const CARD_PADDING = 6;
const INNER_RADIUS = `${CARD_RADIUS - CARD_PADDING}px`;

const slug = str => (str || '').replace(/\s+/g, '-').toLowerCase();
const fromPascal = str =>
  (str || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim();

const supportsType = type => {
  try {
    const v = document.createElement('video');
    if (!('canPlayType' in v)) return false;
    const res = v.canPlayType(type);
    return res === 'probably' || res === 'maybe';
  } catch (e) {
    return false;
  }
};

const prefersWebM = () => supportsType('video/webm; codecs="vp9,vorbis"') || supportsType('video/webm');

const pickBestSource = url => {
  if (!url) return '';
  if (url.endsWith('.webm')) {
    if (prefersWebM()) return url;
    const mp4 = url.replace(/\.webm$/, '.mp4');
    return mp4;
  }
  if (url.endsWith('.mp4')) {
    return url;
  }
  return url;
};

const shouldPreload = () => {
  try {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (c?.saveData) return false;
    const slowTypes = new Set(['slow-2g', '2g']);
    if (c?.effectiveType && slowTypes.has(c.effectiveType)) return false;
  } catch (e) {
    // noop
  }
  return true;
};

const useIsInViewport = (rootMargin = '150px 0px', threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const obs = new IntersectionObserver(
      entries => {
        if (cancelled) return;
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { root: null, rootMargin, threshold }
    );
    obs.observe(ref.current);
    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, [rootMargin, threshold]);

  return [ref, isInView];
};

const ComponentList = ({ list, hasDeleteButton = false, hasFavoriteButton = false, sorting = 'none', title }) => {
  const scrollRef = useRef(null);
  const GAP_PX = 16;
  const preloadedSrcsRef = useRef(new Set());
  const [hoveredKey, setHoveredKey] = useState(null);
  const clearSlotRef = useRef(null);
  const clearBtnRef = useRef(null);
  const CLEAR_APPEAR_DEBOUNCE_MS = 300;

  const setHoverToItemAtPoint = useCallback((x, y) => {
    try {
      const el = document.elementFromPoint(x, y);
      let node = el;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.itemKey) {
          setHoveredKey(node.dataset.itemKey);
          return;
        }
        node = node.parentElement;
      }
      setHoveredKey(null);
    } catch (e) {
      // noop
    }
  }, []);

  const items = useMemo(() => {
    if (!list) return [];
    const entries = Array.isArray(list) ? list : Object.entries(list).map(([key, meta]) => ({ key, ...meta }));

    const mapToItem = entry => {
      const key = entry.key ?? entry?.id ?? null;
      const meta = entry.key ? entry : (componentMetadata?.[entry] ?? {});
      const fullKey = key || entry;
      const [cat, comp] = (fullKey || '').split('/');
      return {
        key: fullKey,
        categoryKey: cat,
        componentKey: comp,
        categoryLabel: fromPascal(meta?.category ?? cat),
        title: fromPascal(meta?.name ?? comp),
        description: meta?.description ?? '',
        videoUrl: meta?.videoUrl ?? '',
        tags: Array.isArray(meta?.tags) ? meta.tags : [],
        docsUrl: meta?.docsUrl
      };
    };

    let arr = entries
      .filter(e => {
        const key = (e.key ?? e)?.toString?.() ?? '';
        return key.includes('/') && (e.key ? true : !!componentMetadata[key]);
      })
      .map(mapToItem);

    if (sorting === 'alphabetical') {
      arr = arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [list, sorting]);

  const categoriesList = useMemo(() => {
    const set = new Set();
    items.forEach(i => i.categoryLabel && set.add(i.categoryLabel));
    return ['All Components', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);
  const categories = useMemo(() => createListCollection({ items: categoriesList }), [categoriesList]);

  const [selectedCategory, setSelectedCategory] = useState(categories.items[0]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSelectedCategory(prev => (categories.items.includes(prev) ? prev : categories.items[0]));
  }, [categories.items]);

  const [savedSet, setSavedSet] = useState(() => new Set(getSavedComponents()));
  useEffect(() => {
    const update = () => setSavedSet(new Set(getSavedComponents()));
    const onStorage = e => {
      if (!e || e.key === 'savedComponents') update();
    };
    window.addEventListener('favorites:updated', update);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('favorites:updated', update);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim();
    const all = selectedCategory === 'All Components';
    return items.filter(({ title, categoryLabel }) => {
      const categoryOk = all || categoryLabel === selectedCategory;
      if (!term) return categoryOk;
      return categoryOk && fuzzyMatch(title, term);
    });
  }, [items, selectedCategory, search]);
  const controlsDisabled = items.length === 0;
  const hasCategoryFilter = selectedCategory !== categories.items[0];

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), CLEAR_APPEAR_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [search]);

  const showClear = !controlsDisabled && (hasCategoryFilter || (debouncedSearch?.trim()?.length ?? 0) > 0);

  useGSAP(() => {
    const slot = clearSlotRef.current;
    const btn = clearBtnRef.current;
    if (!slot || !btn) return;
    gsap.killTweensOf([slot, btn]);

    if (showClear) {
      const tl = gsap.timeline();
      tl.to(slot, { width: 40, duration: 0.3, ease: 'power2.out' }).fromTo(
        btn,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out', force3D: true },
        '<0.05'
      );
    } else {
      const tl = gsap.timeline();
      tl.to(btn, { scale: 0, opacity: 0, duration: 0.15, ease: 'power2.in' }).to(
        slot,
        { width: 0, duration: 0.25, ease: 'power2.inOut' },
        '+=0'
      );
    }
  }, [showClear]);

  const getColumnsForWidth = useCallback(w => (w >= 1024 ? 3 : w >= 768 ? 2 : 1), []);

  const preloadRange = useCallback(
    (startIdx, endIdx) => {
      if (!shouldPreload()) return;
      const urls = [];
      for (let i = startIdx; i <= Math.min(endIdx, filtered.length - 1); i++) {
        const url = filtered[i]?.videoUrl;
        if (!url) continue;
        const chosen = pickBestSource(url);
        if (chosen && !preloadedSrcsRef.current.has(chosen)) {
          urls.push(chosen);
        }
      }
      if (urls.length === 0) return;
      urls.forEach(src => {
        try {
          const v = document.createElement('video');
          v.preload = 'metadata';
          v.src = src;
          const mark = () => {
            preloadedSrcsRef.current.add(src);
          };
          v.addEventListener('loadedmetadata', mark, { once: true });
          v.addEventListener('loadeddata', mark, { once: true });
          v.addEventListener('canplaythrough', mark, { once: true });
          v.load();
          setTimeout(() => {
            v.src = '';
          }, 8000);
        } catch (e) {
          // no-op
        }
      });
    },
    [filtered]
  );

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(categories.items[0]);
  };

  return (
    <Box className="category-page" ref={scrollRef}>
      <Flex
        className="page-transition-fade"
        mb={12}
        alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        {title ? (
          <h2 className="sub-category" style={{ margin: 0 }}>
            {title}
          </h2>
        ) : null}

        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={2}
          alignItems="center"
          w={{ base: '100%', md: 'auto' }}
          opacity={controlsDisabled ? 0.6 : 1}
        >
          <InputGroup
            startElement={<Icon as={FiSearch} color={controlsDisabled ? '#392e4e' : '#B19EEF'} fontSize="16px" />}
            w={{ base: '100%', md: '180px' }}
          >
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              h={10}
              borderRadius="full"
              bg="#060010"
              border="1px solid #271E37"
              color="#fff"
              disabled={controlsDisabled}
              isDisabled={controlsDisabled}
              tabIndex={controlsDisabled ? -1 : 0}
              onFocus={e => {
                if (controlsDisabled) {
                  try {
                    e.target.blur();
                  } catch {
                    /* noop */
                  }
                }
              }}
              pointerEvents={controlsDisabled ? 'none' : 'auto'}
              _focus={{ bg: '#060010', borderColor: 'transparent', boxShadow: 'none', outline: 'none' }}
              _focusVisible={{ boxShadow: 'none', outline: 'none', borderColor: '#392e4e' }}
              _hover={{ bg: '#060010' }}
              _placeholder={{ color: '#392e4e', fontWeight: 500 }}
            />
          </InputGroup>

          <Select.Root
            collection={categories}
            value={[selectedCategory]}
            onValueChange={({ value }) => setSelectedCategory(value[0])}
            size="sm"
            width={{ base: '100%', md: '180px' }}
            disabled={controlsDisabled}
          >
            <Select.HiddenSelect name="component-list-category-filter" />
            <Select.Control>
              <Select.Trigger
                fontSize="14px"
                bg="#060010"
                border="1px solid #271E37"
                rounded="full"
                h={10}
                fontWeight={600}
                cursor={controlsDisabled ? 'default' : 'pointer'}
                transition="background 0.3s"
                _hover={controlsDisabled ? undefined : { background: '#170D27' }}
                w="full"
              >
                <Select.ValueText color={controlsDisabled ? '#392e4e' : '#fff'} pl={2}>
                  {selectedCategory}
                </Select.ValueText>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content
                  bg="#060010"
                  border="1px solid #271E37"
                  borderRadius="15px"
                  w={{ base: '100%', md: '180px' }}
                  px={2}
                  py={2}
                >
                  {categories.items.map(cat => (
                    <Select.Item
                      key={cat}
                      item={cat}
                      borderRadius="8px"
                      px={3}
                      py={2}
                      cursor="pointer"
                      _highlighted={{ bg: '#271E37' }}
                    >
                      {cat}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Box
            ref={clearSlotRef}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            justifyContent="center"
            style={{ width: 0, overflow: 'hidden' }}
          >
            <IconButton
              ref={clearBtnRef}
              aria-label="Clear filters"
              rounded="full"
              size="sm"
              variant="ghost"
              color="#B19EEF"
              onClick={clearFilters}
              h={10}
              w={10}
              bg="#060010"
              border="1px solid #271E37"
              opacity={0}
              style={{ transformOrigin: '50% 50%' }}
              pointerEvents={showClear ? 'auto' : 'none'}
              tabIndex={showClear ? 0 : -1}
              _hover={{ bg: '#170D27' }}
              _focus={{ boxShadow: 'none', outline: 'none' }}
              _focusVisible={{ boxShadow: 'none', outline: 'none', borderColor: '#392e4e' }}
            >
              <Icon as={FiX} />
            </IconButton>
          </Box>
        </Flex>
      </Flex>

      <Box mt={4}>
        {filtered.length === 0 ? (
          <Box role="status" p={6} mt={'6em'} textAlign="center" position="relative">
            <Box position="relative">
              <Text color="#fff" fontWeight={500} fontSize="24px" mb={1}>
                {items.length > 0 ? 'No results...' : 'Nothing here yet...'}
              </Text>
              <Text color="#a6a6a6" fontSize="16px" mb={8}>
                {items.length > 0 ? 'Try adjusting your filters' : 'Tap the heart on any component to save it'}
              </Text>

              <Flex gap={2} justify="center" wrap="wrap">
                {items.length > 0 ? (
                  <Box
                    as="button"
                    onClick={clearFilters}
                    px={4}
                    h={10}
                    borderRadius="full"
                    cursor="pointer"
                    border="1px solid #271E37"
                    transition="background 0.3s"
                    color="#fff"
                    fontWeight={500}
                    bg="#060010"
                    _hover={{ background: '#170D27' }}
                  >
                    Clear Filters
                  </Box>
                ) : (
                  <Box
                    as={RouterLink}
                    to="/get-started/index"
                    px={6}
                    h={10}
                    borderRadius="full"
                    cursor="pointer"
                    border="1px solid #271E37"
                    transition="background 0.3s"
                    color="#fff"
                    lineHeight={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight={500}
                    bg="#060010"
                    _hover={{ background: '#170D27' }}
                  >
                    Browse Components
                  </Box>
                )}
              </Flex>
            </Box>
          </Box>
        ) : (
          <>
            <WindowScroller scrollElement={typeof window !== 'undefined' ? window : undefined}>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <Box>
                  <AutoSizer disableHeight>
                    {({ width }) => {
                      const columnCount = getColumnsForWidth(width);
                      const columnWidth = Math.floor(width / columnCount);
                      const cardHeight = 284;
                      const rowHeight = cardHeight + GAP_PX;
                      const rowCount = Math.ceil(filtered.length / columnCount);

                      const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
                        const index = rowIndex * columnCount + columnIndex;
                        if (index >= filtered.length) {
                          return <div key={key} style={style} />;
                        }
                        const item = filtered[index];
                        const to = `/${slug(fromPascal(item.categoryKey))}/${slug(fromPascal(item.componentKey))}`;
                        const isSaved = savedSet.has(item.key) || isComponentSaved(item.key);
                        const isLastCol = columnIndex === columnCount - 1;
                        const cellStyle = {
                          ...style,
                          width: columnWidth,
                          paddingRight: isLastCol ? 0 : GAP_PX,
                          paddingBottom: GAP_PX
                        };
                        return (
                          <div key={key} style={cellStyle}>
                            <Box
                              key={item.key}
                              as={RouterLink}
                              to={to}
                              data-item-key={item.key}
                              display="block"
                              role="group"
                              bg="#170D27"
                              border="1px solid #271E37"
                              borderRadius={`${CARD_RADIUS}px`}
                              p={`${CARD_PADDING}px`}
                              textDecoration="none"
                              transition="filter 0.25s ease"
                              _hover={{ textDecoration: 'none', filter: 'saturate(150%)' }}
                              onMouseEnter={() => setHoveredKey(item.key)}
                              onMouseLeave={() => setHoveredKey(prev => (prev === item.key ? null : prev))}
                            >
                              <Box px={4} pt={3} pb={3} position="relative">
                                <Text color="#fff" fontSize="16px" fontWeight={500} lineHeight="1.4">
                                  {item.title}
                                </Text>
                                <Text color="#B19EEF" fontWeight={400} fontSize="12px">
                                  {item.categoryLabel}
                                </Text>

                                {hasDeleteButton ? (
                                  <IconButton
                                    aria-label="Remove from favorites"
                                    size="xs"
                                    variant="ghost"
                                    color="#B19EEF"
                                    rounded="full"
                                    position="absolute"
                                    bg="#1E1430"
                                    top={2}
                                    right={2}
                                    opacity={hoveredKey === item.key ? 1 : 0}
                                    pointerEvents={hoveredKey === item.key ? 'auto' : 'none'}
                                    transition="opacity 0.15s ease"
                                    _focus={{ opacity: 1, pointerEvents: 'auto' }}
                                    _hover={{ bg: '#271E37' }}
                                    onClick={e => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const { clientX, clientY } = e;
                                      const next = removeSavedComponent(item.key);
                                      setSavedSet(new Set(next));

                                      if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
                                        e.currentTarget.blur();
                                      }

                                      if (typeof window !== 'undefined') {
                                        const schedule = window.requestAnimationFrame
                                          ? window.requestAnimationFrame
                                          : fn => setTimeout(fn, 0);
                                        schedule(() => setHoverToItemAtPoint(clientX, clientY));
                                      }
                                    }}
                                  >
                                    <Icon as={FiTrash2} />
                                  </IconButton>
                                ) : null}

                                {!hasDeleteButton && hasFavoriteButton ? (
                                  <IconButton
                                    aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
                                    size="xs"
                                    variant="ghost"
                                    color="#B19EEF"
                                    rounded="full"
                                    position="absolute"
                                    bg="#1E1430"
                                    top={2}
                                    right={2}
                                    opacity={hoveredKey === item.key ? 1 : 0}
                                    pointerEvents={hoveredKey === item.key ? 'auto' : 'none'}
                                    transition="opacity 0.15s ease"
                                    _focus={{ opacity: 1, pointerEvents: 'auto' }}
                                    _hover={{ bg: '#271E37' }}
                                    onClick={e => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const { saved, list: next } = toggleSavedComponent(item.key);
                                      setSavedSet(new Set(next));
                                      toast?.[saved ? 'success' : 'error']?.(
                                        <>
                                          {saved ? 'Added' : 'Removed'}{' '}
                                          <span style={{ color: '#B19EEF', fontWeight: 700 }}>
                                            &lt;{item.title} /&gt;
                                          </span>{' '}
                                          {saved ? 'to favorites' : 'from favorites'}
                                        </>
                                      );
                                      if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
                                        e.currentTarget.blur();
                                      }
                                    }}
                                  >
                                    <Icon as={isSaved ? RiHeartFill : RiHeartLine} />
                                  </IconButton>
                                ) : null}
                              </Box>
                              <LazyCardMedia key={item.videoUrl || item.key} videoUrl={item.videoUrl} />
                            </Box>
                          </div>
                        );
                      };

                      const onSectionRendered = ({ rowStopIndex, columnStopIndex }) => {
                        const lastVisibleIndex = rowStopIndex * columnCount + columnStopIndex;
                        preloadRange(lastVisibleIndex + 1, lastVisibleIndex + 3);
                      };

                      return (
                        <RVGrid
                          autoHeight
                          height={height}
                          width={width}
                          rowCount={rowCount}
                          columnCount={columnCount}
                          columnWidth={columnWidth}
                          rowHeight={rowHeight}
                          cellRenderer={cellRenderer}
                          overscanRowCount={2}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          scrollTop={scrollTop}
                          onSectionRendered={onSectionRendered}
                        />
                      );
                    }}
                  </AutoSizer>
                </Box>
              )}
            </WindowScroller>
          </>
        )}
      </Box>
    </Box>
  );
};

const LazyCardMedia = ({ videoUrl }) => {
  const [containerRef, inView] = useIsInViewport('250px 0px', 0.1);
  const videoRef = useRef(null);
  const show = inView && !!videoUrl;

  const base = useMemo(() => (videoUrl ? videoUrl.replace(/\.(webm|mp4)$/i, '') : ''), [videoUrl]);
  const webm = base ? `${base}.webm` : '';
  const mp4 = base ? `${base}.mp4` : '';

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !show) return;
    let mounted = true;

    const tryPlay = () => {
      if (!mounted) return;
      try {
        const p = v.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
      } catch (e) {
        // ignore autoplay errors
      }
    };

    if (v.readyState >= 3) {
      tryPlay();
    } else {
      const onLoadedMeta = () => tryPlay();
      const onCanPlay = () => tryPlay();
      const onLoadedData = () => tryPlay();
      const onCanPlayThrough = () => tryPlay();
      v.addEventListener('loadedmetadata', onLoadedMeta);
      v.addEventListener('canplay', onCanPlay);
      v.addEventListener('loadeddata', onLoadedData);
      v.addEventListener('canplaythrough', onCanPlayThrough);
      const id = setTimeout(tryPlay, 1200);
      return () => {
        clearTimeout(id);
        v.removeEventListener('loadedmetadata', onLoadedMeta);
        v.removeEventListener('canplay', onCanPlay);
        v.removeEventListener('loadeddata', onLoadedData);
        v.removeEventListener('canplaythrough', onCanPlayThrough);
      };
    }

    return () => {
      mounted = false;
      try {
        v.pause();
      } catch (e) {
        // ignore pause errors
      }
    };
  }, [show]);

  return (
    <Box ref={containerRef} h="200px" bg="#000" borderRadius={INNER_RADIUS} overflow="hidden">
      {show ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none'
          }}
        >
          {/* Let the browser choose the best supported source */}
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      ) : null}
    </Box>
  );
};

export default ComponentList;

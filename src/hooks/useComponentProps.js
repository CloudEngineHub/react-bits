import { useQueryState, parseAsJson } from 'nuqs';
import { useCallback, useMemo } from 'react';

// Simple validator that accepts any object
const validateObject = value => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }
  return {};
};

/**
 * Hook for managing component demo props with URL state persistence.
 * Automatically syncs prop changes to URL query params for shareable links.
 *
 * @param {Object} defaultProps - Default prop values for the component
 * @param {string} key - Optional query param key (defaults to 'p')
 * @returns {Object} { props, updateProp, updateProps, resetProps, hasChanges }
 *
 * @example
 * const { props, updateProp, resetProps, hasChanges } = useComponentProps({
 *   delay: 200,
 *   direction: 'top',
 *   animateBy: 'words'
 * });
 */
export function useComponentProps(defaultProps, key = 'p') {
  const [customProps, setCustomProps] = useQueryState(key, parseAsJson(validateObject).withDefault({}));

  // Merge defaults with custom props from URL
  const props = useMemo(() => {
    return { ...defaultProps, ...customProps };
  }, [defaultProps, customProps]);

  // Check if any props differ from defaults
  const hasChanges = useMemo(() => {
    return Object.keys(customProps).length > 0;
  }, [customProps]);

  // Update a single prop
  const updateProp = useCallback(
    (name, value) => {
      setCustomProps(prev => {
        const next = { ...prev, [name]: value };

        // Remove prop if it matches default (keep URL clean)
        if (JSON.stringify(value) === JSON.stringify(defaultProps[name])) {
          delete next[name];
        }

        return Object.keys(next).length > 0 ? next : null;
      });
    },
    [defaultProps, setCustomProps]
  );

  // Update multiple props at once
  const updateProps = useCallback(
    updates => {
      setCustomProps(prev => {
        const next = { ...prev, ...updates };

        // Remove props that match defaults
        Object.keys(updates).forEach(name => {
          if (JSON.stringify(updates[name]) === JSON.stringify(defaultProps[name])) {
            delete next[name];
          }
        });

        return Object.keys(next).length > 0 ? next : null;
      });
    },
    [defaultProps, setCustomProps]
  );

  // Reset all props to defaults
  const resetProps = useCallback(() => {
    setCustomProps(null);
  }, [setCustomProps]);

  // Get a shareable URL with current props
  const getShareUrl = useCallback(() => {
    return window.location.href;
  }, []);

  return {
    props,
    updateProp,
    updateProps,
    resetProps,
    hasChanges,
    getShareUrl
  };
}

export default useComponentProps;

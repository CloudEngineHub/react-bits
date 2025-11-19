import { defineConfig, type RegistryItem } from 'jsrepo';
import { output } from '@jsrepo/shadcn';

export default defineConfig({
  registry: {
    name: '@react-bits',
    description:
      'An open source collection of animated, interactive & fully customizable React components for building stunning, memorable user interfaces.',
    homepage: 'https://reactbits.dev',
    authors: ['David Haz'],
    bugs: 'https://github.com/DavidHDev/react-bits/issues',
    repository: 'https://github.com/DavidHDev/react-bits',
    tags: [
      'react',
      'javascript',
      'components',
      'web',
      'reactjs',
      'css-animations',
      'component-library',
      'ui-components',
      '3d',
      'ui-library',
      'tailwind',
      'tailwindcss',
      'components',
      'components-library'
    ],
    excludeDeps: ['react'],
    outputs: [output({ dir: 'public/r', format: true })],
    items: [
      // Animations
      ...[
        defineComponent({
          title: 'AnimatedContent',
          category: 'Animations',
          description:
            'Wrapper that animates any children on scroll or mount with configurable direction, distance, duration and easing.'
        }),
        defineComponent({
          title: 'BlobCursor',
          category: 'Animations',
          description: 'Organic blob cursor that smoothly follows the pointer with inertia and elastic morphing.'
        }),
        defineComponent({
          title: 'ClickSpark',
          category: 'Animations',
          description: 'Creates particle spark bursts at click position.'
        }),
        defineComponent({
          title: 'Crosshair',
          category: 'Animations',
          description: 'Custom crosshair cursor with tracking, and link hover effects.'
        }),
        defineComponent({
          title: 'Cubes',
          category: 'Animations',
          description: '3D rotating cube cluster. Supports auto-rotation or hover interaction.'
        }),
        defineComponent({
          title: 'ElectricBorder',
          category: 'Animations',
          description: 'Jittery electric energy border with animated arcs, glow and adjustable intensity.'
        }),
        defineComponent({
          title: 'FadeContent',
          category: 'Animations',
          description: 'Simple directional fade / slide entrance wrapper with threshold-based activation.'
        }),
        defineComponent({
          title: 'GhostCursor',
          category: 'Animations',
          description: 'Semi-transparent ghost cursor that smoothly follows the real cursor with a trailing effect.'
        }),
        defineComponent({
          title: 'GlareHover',
          category: 'Animations',
          description: 'Adds a realistic moving glare highlight on hover over any element.'
        }),
        defineComponent({
          title: 'GradualBlur',
          category: 'Animations',
          description: 'Progressively un-blurs content based on scroll or trigger creating a cinematic reveal.'
        }),
        defineComponent({
          title: 'ImageTrail',
          category: 'Animations',
          description: 'Cursor-based image trail with several built-in variants.'
        }),
        defineComponent({
          title: 'LaserFlow',
          category: 'Animations',
          description: 'Dynamic laser light that flows onto a surface, customizable effect.'
        }),
        defineComponent({
          title: 'LogoLoop',
          category: 'Animations',
          description: 'Continuously looping marquee of brand or tech logos with seamless repeat and hover pause.'
        }),
        defineComponent({
          title: 'Magnet',
          category: 'Animations',
          description: 'Elements magnetically ease toward the cursor then settle back with spring physics.'
        }),
        defineComponent({
          title: 'MagnetLines',
          category: 'Animations',
          description: 'Animated field lines bend toward the cursor.'
        }),
        defineComponent({
          title: 'MetaBalls',
          category: 'Animations',
          description: 'Liquid metaball blobs that merge and separate with smooth implicit surface animation.'
        }),
        defineComponent({
          title: 'MetallicPaint',
          category: 'Animations',
          description: 'Liquid metallic paint shader which can be applied to SVG elements.'
        }),
        defineComponent({
          title: 'Noise',
          category: 'Animations',
          description: 'Animated film grain / noise overlay adding subtle texture and motion.'
        }),
        defineComponent({
          title: 'PixelTrail',
          category: 'Animations',
          description: 'Pixelated cursor trail emitting fading squares with retro digital feel.'
        }),
        defineComponent({
          title: 'PixelTransition',
          category: 'Animations',
          description: 'Pixel dissolve transition for content reveal on hover.'
        }),
        defineComponent({
          title: 'Ribbons',
          category: 'Animations',
          description: 'Flowing responsive ribbons/cursor trail driven by physics and pointer motion.'
        }),
        defineComponent({
          title: 'ShapeBlur',
          category: 'Animations',
          description: 'Morphing blurred geometric shape. The effect occurs on hover.'
        }),
        defineComponent({
          title: 'SplashCursor',
          category: 'Animations',
          description: 'Liquid splash burst at cursor with curling ripples and waves.'
        }),
        defineComponent({
          title: 'StarBorder',
          category: 'Animations',
          description: 'Animated star / sparkle border orbiting content with twinkle pulses.'
        }),
        defineComponent({
          title: 'StickerPeel',
          category: 'Animations',
          description: 'Sticker corner lift + peel interaction using 3D transform and shadow depth.'
        }),
        defineComponent({
          title: 'TargetCursor',
          category: 'Animations',
          description: 'A cursor follow animation with 4 corners that lock onto targets.'
        })
      ],

      // Components
      ...[
        defineComponent({
          title: 'AnimatedList',
          category: 'Components',
          description: 'List items enter with staggered motion variants for polished reveals.'
        }),
        defineComponent({
          title: 'BounceCards',
          category: 'Components',
          description: 'Cards bounce that bounce in on mount.'
        }),
        defineComponent({
          title: 'BubbleMenu',
          category: 'Components',
          description: 'Floating circular expanding menu with staggered item reveal.'
        }),
        defineComponent({
          title: 'CardNav',
          category: 'Components',
          description: 'Expandable navigation bar with card panels revealing nested links.'
        }),
        defineComponent({
          title: 'CardSwap',
          category: 'Components',
          description: 'Cards animate position swapping with smooth layout transitions.'
        }),
        defineComponent({
          title: 'Carousel',
          category: 'Components',
          description: 'Responsive carousel with touch gestures, looping and transitions.'
        }),
        defineComponent({
          title: 'ChromaGrid',
          category: 'Components',
          description: 'A responsive grid of grayscale tiles. Hovering the grid reaveals their colors.'
        }),
        defineComponent({
          title: 'CircularGallery',
          category: 'Components',
          description: 'Circular orbit gallery rotating images.'
        }),
        defineComponent({
          title: 'Counter',
          category: 'Components',
          description: 'Flexible animated counter supporting increments + easing.'
        }),
        defineComponent({
          title: 'DecayCard',
          category: 'Components',
          description: 'Hover parallax effect that disintegrates the content of a card.'
        }),
        defineComponent({
          title: 'Dock',
          category: 'Components',
          description: 'macOS style magnifying dock with proximity scaling of icons.'
        }),
        defineComponent({
          title: 'DomeGallery',
          category: 'Components',
          description: 'Immersive 3D dome gallery projecting images on a hemispheric surface.'
        }),
        defineComponent({
          title: 'ElasticSlider',
          category: 'Components',
          description: 'Slider handle stretches elastically then snaps with spring physics.'
        }),
        defineComponent({
          title: 'FlowingMenu',
          category: 'Components',
          description: 'Liquid flowing active indicator glides between menu items.'
        }),
        defineComponent({
          title: 'FluidGlass',
          category: 'Components',
          description: 'Glassmorphism container with animated liquid distortion refraction.'
        }),
        defineComponent({
          title: 'FlyingPosters',
          category: 'Components',
          description: '3D posters rotate on scroll infinitely.'
        }),
        defineComponent({
          title: 'Folder',
          category: 'Components',
          description: 'Interactive folder opens to reveal nested content smooth motion.'
        }),
        defineComponent({
          title: 'GlassIcons',
          category: 'Components',
          description: 'Icon set styled with frosted glass blur.'
        }),
        defineComponent({
          title: 'GlassSurface',
          category: 'Components',
          description: 'Advanced Apple-style glass surface with real-time distortion + lighting.'
        }),
        defineComponent({
          title: 'GooeyNav',
          category: 'Components',
          description: 'Navigation indicator morphs with gooey blob transitions between items.'
        }),
        defineComponent({
          title: 'InfiniteMenu',
          category: 'Components',
          description: 'Horizontally looping menu effect that scrolls endlessly with seamless wrap.'
        }),
        defineComponent({
          title: 'Lanyard',
          category: 'Components',
          description: 'Swinging 3D lanyard / badge card with realistic inertial motion.'
        }),
        defineComponent({
          title: 'MagicBento',
          category: 'Components',
          description: 'Interactive bento grid tiles expand + animate with various options.'
        }),
        defineComponent({
          title: 'Masonry',
          category: 'Components',
          description: 'Responsive masonry layout with animated reflow + gaps optimization.'
        }),
        defineComponent({
          title: 'ModelViewer',
          category: 'Components',
          description: 'Three.js model viewer with orbit controls and lighting presets.'
        }),
        defineComponent({
          title: 'PillNav',
          category: 'Components',
          description: 'Minimal pill nav with sliding active highlight + smooth easing.'
        }),
        defineComponent({
          title: 'PixelCard',
          category: 'Components',
          description: 'Card content revealed through pixel expansion transition.'
        }),
        defineComponent({
          title: 'ProfileCard',
          category: 'Components',
          description: 'Animated profile card glare with 3D hover effect.',
          // we don't have the TW variants yet...
          variants: ['JS-CSS', 'TS-CSS']
        }),
        defineComponent({
          title: 'ScrollStack',
          category: 'Components',
          description: 'Overlapping card stack reveals on scroll with depth layering.'
        }),
        defineComponent({
          title: 'SpotlightCard',
          category: 'Components',
          description: 'Dynamic spotlight follows cursor casting gradient illumination.'
        }),
        defineComponent({
          title: 'Stack',
          category: 'Components',
          description: 'Layered stack with swipe animations and smooth transitions.'
        }),
        defineComponent({
          title: 'StaggeredMenu',
          category: 'Components',
          description: 'Menu with staggered item animations and smooth transitions on open/close.'
        }),
        defineComponent({
          title: 'Stepper',
          category: 'Components',
          description: 'Animated multi-step progress indicator with active state transitions.'
        }),
        defineComponent({
          title: 'TiltedCard',
          category: 'Components',
          description: '3D perspective tilt card reacting to pointer.'
        })
      ],

      // TextAnimations
      ...[
        defineComponent({
          title: 'ASCIIText',
          category: 'TextAnimations',
          description: 'Renders text with an animated ASCII background for a retro feel.'
        }),
        defineComponent({
          title: 'BlurText',
          category: 'TextAnimations',
          description: 'Text starts blurred then crisply resolves for a soft-focus reveal effect.'
        }),
        defineComponent({
          title: 'CircularText',
          category: 'TextAnimations',
          description: 'Layouts characters around a circle with optional rotation animation.'
        }),
        defineComponent({
          title: 'CountUp',
          category: 'TextAnimations',
          description: 'Animated number counter supporting formatting and decimals.'
        }),
        defineComponent({
          title: 'CurvedLoop',
          category: 'TextAnimations',
          description: 'Flowing looping text path along a customizable curve with drag interaction.'
        }),
        defineComponent({
          title: 'DecryptedText',
          category: 'TextAnimations',
          description: 'Hacker-style decryption cycling random glyphs until resolving to real text.'
        }),
        defineComponent({
          title: 'FallingText',
          category: 'TextAnimations',
          description: 'Characters fall with gravity + bounce creating a playful entrance.'
        }),
        defineComponent({
          title: 'FuzzyText',
          category: 'TextAnimations',
          description: 'Vibrating fuzzy text with controllable hover intensity.'
        }),
        defineComponent({
          title: 'GlitchText',
          category: 'TextAnimations',
          description: 'RGB split and distortion glitch effect with jitter effects.'
        }),
        defineComponent({
          title: 'GradientText',
          category: 'TextAnimations',
          description: 'Animated gradient sweep across live text with speed and color control.'
        }),
        defineComponent({
          title: 'RotatingText',
          category: 'TextAnimations',
          description: 'Cycles through multiple phrases with 3D rotate / flip transitions.'
        }),
        defineComponent({
          title: 'ScrambledText',
          category: 'TextAnimations',
          description: 'Detects cursor position and applies a distortion effect to text.'
        }),
        defineComponent({
          title: 'ScrollFloat',
          category: 'TextAnimations',
          description: 'Text gently floats / parallax shifts on scroll.'
        }),
        defineComponent({
          title: 'ScrollReveal',
          category: 'TextAnimations',
          description: 'Text gently unblurs and reveals on scroll.'
        }),
        defineComponent({
          title: 'ScrollVelocity',
          category: 'TextAnimations',
          description: "Text marquee animatio - speed and distortion scale with user's scroll velocity."
        }),
        defineComponent({
          title: 'ShinyText',
          category: 'TextAnimations',
          description: 'Metallic sheen sweeps across text producing a reflective highlight.'
        }),
        defineComponent({
          title: 'Shuffle',
          category: 'TextAnimations',
          description: 'Animated text reveal where characters shuffle before settling.'
        }),
        defineComponent({
          title: 'SplitText',
          category: 'TextAnimations',
          description: 'Splits text into characters / words for staggered entrance animation.'
        }),
        defineComponent({
          title: 'TextCursor',
          category: 'TextAnimations',
          description: 'Make any text element follow your cursor, leaving a trail of copies behind it.'
        }),
        defineComponent({
          title: 'TextPressure',
          category: 'TextAnimations',
          description: 'Characters scale / warp interactively based on pointer pressure zone.'
        }),
        defineComponent({
          title: 'TextType',
          category: 'TextAnimations',
          description: 'Typewriter effect with blinking cursor and adjustable typing cadence.'
        }),
        defineComponent({
          title: 'TrueFocus',
          category: 'TextAnimations',
          description: 'Applies dynamic blur / clarity based over a series of words in order.'
        }),
        defineComponent({
          title: 'VariableProximity',
          category: 'TextAnimations',
          description: 'Letter styling changes continuously with pointer distance mapping.'
        })
      ],

      // Backgrounds
      ...[
        defineComponent({
          title: 'Aurora',
          category: 'Backgrounds',
          description: 'Flowing aurora gradient background.'
        }),
        defineComponent({
          title: 'Balatro',
          category: 'Backgrounds',
          description: 'The balatro shader, fully customizalbe and interactive.'
        }),
        defineComponent({
          title: 'Ballpit',
          category: 'Backgrounds',
          description: 'Physics ball pit simulation with bouncing colorful spheres.'
        }),
        defineComponent({
          title: 'Beams',
          category: 'Backgrounds',
          description: 'Crossing animated ribbons with customizable properties.'
        }),
        defineComponent({
          title: 'ColorBends',
          category: 'Backgrounds',
          description: 'Vibrant color bends with smooth flowing animation.'
        }),
        defineComponent({
          title: 'DarkVeil',
          category: 'Backgrounds',
          description: 'Subtle dark background with a smooth animation and postprocessing.'
        }),
        defineComponent({
          title: 'Dither',
          category: 'Backgrounds',
          description: 'Retro dithered noise shader background.'
        }),
        defineComponent({
          title: 'DotGrid',
          category: 'Backgrounds',
          description: 'Animated dot grid with cursor interactions.'
        }),
        defineComponent({
          title: 'FaultyTerminal',
          category: 'Backgrounds',
          description: 'Terminal CRT scanline squares effect with flicker + noise.'
        }),
        defineComponent({
          title: 'FloatingLines',
          category: 'Backgrounds',
          description: '3D floating lines that react to cursor movement.'
        }),
        defineComponent({
          title: 'Galaxy',
          category: 'Backgrounds',
          description: 'Parallax realistic starfield with pointer interactions.'
        }),
        defineComponent({
          title: 'GradientBlinds',
          category: 'Backgrounds',
          description: 'Layered gradient blinds with spotlight and noise distortion.'
        }),
        defineComponent({
          title: 'GridDistortion',
          category: 'Backgrounds',
          description: 'Warped grid mesh distorts smoothly reacting to cursor.'
        }),
        defineComponent({
          title: 'GridMotion',
          category: 'Backgrounds',
          description: 'Perspective moving grid lines based on cusror position.'
        }),
        defineComponent({
          title: 'GridScan',
          category: 'Backgrounds',
          description: 'Animated grid room 3D scan effect and cool interactions.'
        }),
        defineComponent({
          title: 'Hyperspeed',
          category: 'Backgrounds',
          description: 'Animated lines continuously moving to simulate hyperspace travel on click hold.'
        }),
        defineComponent({
          title: 'Iridescence',
          category: 'Backgrounds',
          description: 'Slick iridescent shader with shifting waves.'
        }),
        defineComponent({
          title: 'LetterGlitch',
          category: 'Backgrounds',
          description: 'Matrix style letter animation.'
        }),
        defineComponent({
          title: 'Lightning',
          category: 'Backgrounds',
          description: 'Procedural lightning bolts with branching and glow flicker.'
        }),
        defineComponent({
          title: 'LightRays',
          category: 'Backgrounds',
          description: 'Volumetric light rays/beams with customizable direction.'
        }),
        defineComponent({
          title: 'LiquidChrome',
          category: 'Backgrounds',
          description: 'Liquid metallic chrome shader with flowing reflective surface.'
        }),
        defineComponent({
          title: 'LiquidEther',
          category: 'Backgrounds',
          description: 'Interactive liquid shader with flowing distortion and customizable colors.'
        }),
        defineComponent({
          title: 'Orb',
          category: 'Backgrounds',
          description: 'Floating energy orb with customizable hover effect.'
        }),
        defineComponent({
          title: 'Particles',
          category: 'Backgrounds',
          description: 'Configurable particle system.'
        }),
        defineComponent({
          title: 'PixelBlast',
          category: 'Backgrounds',
          description: 'Exploding pixel particle bursts with optional liquid postprocessing.'
        }),
        defineComponent({
          title: 'Plasma',
          category: 'Backgrounds',
          description: 'Organic plasma gradients swirl + morph with smooth turbulence.'
        }),
        defineComponent({
          title: 'Prism',
          category: 'Backgrounds',
          description: 'Rotating prism with configurable intensity, size, and colors.'
        }),
        defineComponent({
          title: 'PrismaticBurst',
          category: 'Backgrounds',
          description: 'Burst of light rays with controllable color, distortion, amount.'
        }),
        defineComponent({
          title: 'RippleGrid',
          category: 'Backgrounds',
          description: 'A grid that continuously animates with a ripple effect.'
        }),
        defineComponent({
          title: 'Silk',
          category: 'Backgrounds',
          description: 'Smooth waves background with soft lighting.'
        }),
        defineComponent({
          title: 'Squares',
          category: 'Backgrounds',
          description: 'Animated squares with scaling + direction customization.'
        }),
        defineComponent({
          title: 'Threads',
          category: 'Backgrounds',
          description: 'Animated pattern of lines forming a fabric-like motion.'
        }),
        defineComponent({
          title: 'Waves',
          category: 'Backgrounds',
          description: 'Layered lines that form smooth wave patterns with animation.'
        })
      ]
    ].flat()
  }
});

type Category = 'Animations' | 'Backgrounds' | 'Components' | 'TextAnimations';

const VARIANTS = ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'] as const;
type Variant = (typeof VARIANTS)[number];

/**
 * Define a component to be exposed from the registry. Creates the 4 different variants of the component and ensures the correct files are included.
 *
 * @param title The title of the component.
 * @param description The description of the component.
 * @param category The category of the component.
 * @returns An array of RegistryItem objects.
 */
function defineComponent({
  title,
  description,
  category,
  variants = ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW']
}: {
  title: string;
  description: string;
  category: Category;
  variants?: readonly Variant[];
}): RegistryItem[] {
  const baseItem: Omit<RegistryItem, 'files' | 'name'> = {
    title,
    description,
    type: 'registry:component',
    categories: [category]
  };

  // this might warrant a bit of explanation
  // basically we check if the variant is included in the variants array and if so we return the item as part of an array
  // otherwise we return an empty array
  // we then spread that array empty or otherwise into the return array
  return [
    // JS + CSS
    ...(variants.includes('JS-CSS')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-JS-CSS`,
            files: [
              {
                path: `src/content/${category}/${title}`
              }
            ]
          }
        ]
      : []),

    // JS + Tailwind
    ...(variants.includes('JS-TW')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-JS-TW`,
            files: [
              {
                path: `src/tailwind/${category}/${title}`
              }
            ]
          }
        ]
      : []),

    // TS + CSS
    ...(variants.includes('TS-CSS')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-TS-CSS`,
            files: [
              {
                path: `src/ts-default/${category}/${title}`
              }
            ]
          }
        ]
      : []),

    // TS + Tailwind
    ...(variants.includes('TS-TW')
      ? [
          {
            ...baseItem,
            name: `${baseItem.title}-TS-TW`,
            files: [
              {
                path: `src/ts-tailwind/${category}/${title}`
              }
            ]
          }
        ]
      : [])
  ];
}

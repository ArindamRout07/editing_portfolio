import React, { useState, useEffect, useRef } from "react";
import {
  Tv,
  Film,
  Video,
  Layers,
  Sliders,
  Zap,
  Mail,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  Monitor,
  Cpu,
  Flame,
  Send,
  Camera,
  Maximize2,
  MapPin,
} from "lucide-react";

// Inject premium fonts and custom animation styles directly into the document
const injectStyles = () => {
  if (typeof document === "undefined") return;

  // Google Fonts specified for the portfolio typography system: Inter, Syne, Plus Jakarta Sans, JetBrains Mono
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@600;700;800&display=swap";
  document.head.appendChild(link);

  // Custom styling, scrollbars, cursor, and keyframes
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    h1, h2, h3, h4, h5, h6, .font-display {
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.025em;
    }
    .font-mono, .font-tech {
      font-family: 'JetBrains Mono', monospace;
    }
    .font-hero-name {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      letter-spacing: -0.02em;
    }
    .hero-name-glow {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.16), 0 0 22px rgba(210, 255, 31, 0.18);
    }
    .logo-glow {
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.25), 0 0 25px rgba(210, 255, 31, 0.4);
      transition: text-shadow 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }
    .logo-glow:hover {
      text-shadow: 0 0 16px rgba(255, 255, 255, 0.5), 0 0 35px rgba(210, 255, 31, 0.85);
    }
    .logo-dot-glow {
      text-shadow: 0 0 10px #d2ff1f, 0 0 20px rgba(210, 255, 31, 0.9);
    }
    .about-reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 780ms cubic-bezier(0.16, 1, 0.3, 1), transform 780ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .about-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .about-portrait {
      position: relative;
      overflow: hidden;
    }
    .about-portrait img {
      transform: scale(1);
      transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
      filter: grayscale(1) contrast(1.08) brightness(0.92);
    }
    .about-portrait:hover img {
      transform: scale(1.02);
      filter: grayscale(1) contrast(1.12) brightness(0.95);
    }
    .about-portrait-grain {
      position: absolute;
      inset: 0;
      opacity: 0.12;
      pointer-events: none;
      background-image: radial-gradient(rgba(255, 255, 255, 0.22) 0.5px, transparent 0.5px);
      background-size: 3px 3px;
      mix-blend-mode: soft-light;
    }
    .about-portrait-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 90px rgba(0, 0, 0, 0.42);
    }
    @media (prefers-reduced-motion: reduce) {
      .about-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
      .about-portrait img {
        transition: none;
      }
    }
    html {
      scroll-behavior: smooth;
      background-color: #0b0c0d;
      color: #fafafa;
    }
    /* Smooth Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
      background: #222;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #d2ff1f;
    }
    /* Subtle animations */
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    .animate-glow {
      animation: pulse-glow 8s infinite ease-in-out;
    }
    /* Custom Cursor styles */
    .custom-cursor {
      width: 24px;
      height: 24px;
      border: 1.5px solid rgba(210, 255, 31, 0.55);
      border-radius: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
    }
    .custom-cursor-dot {
      width: 4px;
      height: 4px;
      background-color: #d2ff1f;
      border-radius: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
    }
    .hovered-cursor {
      width: 50px;
      height: 50px;
      background-color: rgba(210, 255, 31, 0.1);
      border-color: #d2ff1f;
    }
  `;
  document.head.appendChild(style);
};

// High quality direct-link cinematic video samples from Mixkit
const projects = [
  {
    id: 1,
    title: "BURNOUT",
    subtitle: "Event/Hype Film",
    description:
      "A high-energy event edit driven by crowd energy, movement, and the intensity of the night. Utilizing fast cuts, light leaks, and dynamic transitions to create a cinematic aftermovie experience.np",
    thumbnail: "/burnoutframe.png",
    videoUrl: "/hero.mp4",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    category: "Event",
  },
  {
    id: 2,
    title: "SEEDHE मौत",
    subtitle: "Concert / Live Edit",
    description: "A high-energy concert edit capturing the raw intensity, crowd energy, and atmosphere of a live Seedhe Maut performance.",
    thumbnail: "/seedheframe.png",
    videoUrl: "/seedhemaut.mp4",
    tools: ["DaVinci Resolve", "After Effects"],
    category: "Concert",
  },
  {
    id: 3,
    title: "COASTBOUND",
    subtitle: "Travel / Cinematic Film",
    description: "A cinematic journey from temple calm to the open coast, shaped through seamless transitions, warm visuals, and the freedom of a boys' trip.",
    thumbnail: "/escapismframe.png",
    videoUrl: "/sailor.mp4",
    tools: ["DaVinci Resolve", "After Effects"],
    category: "Travel",
  },
  {
    id: 4,
    title: "PHOTOWALK",
    subtitle: "Visual Diary / Documentary",
    description: "A visual diary of PhotoFactory's photowalk, capturing the people, moments, and creative energy behind a day of photography.",
    thumbnail: "/photowalkframe.png",
    videoUrl: "/photowalk.mp4",
    tools: ["DaVinci Resolve", "After Effects"],
    category: "Documentary edit",
  },
  {
    id: 5,
    title: "WANDERLUST",
    subtitle: "Travel / Instagram Reel",
    description: "A cinematic glimpse into Koraput, blending landscapes, quiet moments, and the raw beauty of a personal escape.",
    thumbnail: "/koraputframe.png",
    videoUrl: "/koraput.mp4",
    tools: ["DaVinci Resolve", "After Effects"],
    category: "Travel",
  },
  {
    id: 6,
    title: "ELIXIR",
    subtitle: "Event / BTS Film",
    description: "A behind-the-scenes look at Elixir 2025, from the cultural celebrations to the energy of a live Kanika Kapoor concert.",
    thumbnail: "/elixirframe.png",
    videoUrl: "/magic-time.mp4",
    tools: ["DaVinci Resolve", "After Effects"],
    category: "Event/BTS film",
  },
];

const photos = [
  {
    id: 1,
    title: "NEON SYNAPSE",
    category: "Cinematic Stills",
    location: "Bhubaneswar Nightwalk",
    camera: "Sony A7IV • 35mm f/1.4",
    iso: "ISO 800 • f/1.8 • 1/160s",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
    description: "High-contrast urban night shot capturing rain reflections and neon signs. Color graded with cold teal shadows and glowing amber highlights to emphasize cinematic mood.",
  },
  {
    id: 2,
    title: "STAGE ILLUMINATION",
    category: "Concert & Event",
    location: "Live Music Fest",
    camera: "Sony A7SIII • 85mm f/1.4",
    iso: "ISO 3200 • f/2.0 • 1/500s",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
    description: "High-energy concert moment featuring performer silhouettes backlit by haze and dramatic light beams during peak performance rhythm.",
  },
  {
    id: 3,
    title: "SILENT HORIZON",
    category: "Street & Travel",
    location: "Coastline Escape",
    camera: "Fujifilm X-T4 • 23mm f/2",
    iso: "ISO 160 • f/8.0 • 1/1000s",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    description: "Minimalist coastal landscape highlighting calm waves and subtle warm sunset tones across a vast open horizon.",
  },
  {
    id: 4,
    title: "SHADOW MONOLOGUE",
    category: "Portrait",
    location: "Studio Session",
    camera: "Sony A7IV • 50mm f/1.2",
    iso: "ISO 100 • f/1.4 • 1/250s",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    description: "Dramatic low-key portrait shaping directional rembrandt lighting with deep shadows to highlight raw emotion.",
  },
  {
    id: 5,
    title: "TEMPLE CHRONICLES",
    category: "Street & Travel",
    location: "Old Town Heritage",
    camera: "Fujifilm X-T4 • 16-55mm f/2.8",
    iso: "ISO 400 • f/5.6 • 1/320s",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    description: "Atmospheric architectural capture combining ancient stone carvings with golden sunbeams breaking through morning mist.",
  },
  {
    id: 6,
    title: "KINETIC FREQUENCY",
    category: "Concert & Event",
    location: "Music & Cultural Fest",
    camera: "Sony A7SIII • 24-70mm f/2.8",
    iso: "ISO 1600 • f/2.8 • 1/400s",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85",
    description: "Crowd perspective with intentional shutter pacing, capturing light streaks and electric atmosphere.",
  },
];

const services = [
  {
    icon: <Zap className="w-6 h-6 text-[#d2ff1f]" />,
    title: "Instagram Reels & Shorts",
    desc: "Hook built on the first 1–2 seconds, beat-synced typography, and clean motion pacing for Reels/Shorts—optimized to keep viewers watching.",
  },
  {
    icon: <Film className="w-6 h-6 text-[#d2ff1f]" />,
    title: "YouTube Video Editing",
    desc: "Narrative-first structure: clean openers, intentional pacing, and sound-led transitions that keep momentum without feeling “over-edited.”",
  },
  {
    icon: <Video className="w-6 h-6 text-[#d2ff1f]" />,
    title: "Event Aftermovies",
    desc: "A highlight flow that respects the crowd: rhythm edits, light-flare accents, and ambient sound layers so the energy stays intact.",
  },
  {
    icon: <Tv className="w-6 h-6 text-[#d2ff1f]" />,
    title: "Travel Films",
    desc: "Cinematic journey editing with natural pacing—using ambience, gentle transitions, and color grading that keeps skin tones and skies natural.",
  },
  {
    icon: <Layers className="w-6 h-6 text-[#d2ff1f]" />,
    title: "Motion Graphics",
    desc: "Animated titles, logo reveals, lower-thirds, and typography systems—built to look sharp at small sizes (and still feel premium on big screens).",
  },
  {
    icon: <Sliders className="w-6 h-6 text-[#d2ff1f]" />,
    title: "Color Grading",
    desc: "Cohesive color treatment: contrast shaping, skin-tone protection, and cinematic palette matching across shots.",
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorDotPos, setCursorDotPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [photoCategory, setPhotoCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [muted, setMuted] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);
  const heroVideoRef = useRef(null);

  const filteredPhotos =
    photoCategory === "All"
      ? photos
      : photos.filter((p) => p.category === photoCategory);

  // Load styles and initialize loading/scrolling systems
  useEffect(() => {
    injectStyles();

    // Loading Screen timeout
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1800);

    // Scroll handlers
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorDotPos({ x: e.clientX, y: e.clientY });

      // Add dynamic easing to outer cursor
      setTimeout(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener("mousemove", moveCursor);

    // Track interactable items for cursor expansion
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const updateInteractables = () => {
      const interactables = document.querySelectorAll(
        'a, button, .interactive-card, [role="button"]',
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Run custom mouse-tracking initialization once loaded
    if (!loading) {
      setTimeout(updateInteractables, 100);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [loading]);

  // Keep background hero video continuously playing
  useEffect(() => {
    if (!heroVideoRef.current) return;

    const video = heroVideoRef.current;

    video.volume = 0;

    video.play().catch(() => { });

    let volume = 0;

    const fadeIn = setInterval(() => {
      volume += 0.02;

      if (volume >= 0.25) {
        volume = 0.25;
        clearInterval(fadeIn);
      }

      video.volume = volume;
    }, 100);

    return () => clearInterval(fadeIn);
  }, [loading]);

  // Mute the hero video whenever a project preview is hovered, the
  // project modal is open, or the user has scrolled past the hero section.
  // The hero video also fades out smoothly as the user scrolls down.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const onScroll = () => {
      // hero section is ~100vh tall, fade across the first 80% of it
      const heroHeight = window.innerHeight;
      const fadeEnd = heroHeight * 0.8;
      const ratio = Math.min(Math.max(window.pageYOffset / fadeEnd, 0), 1);

      // Fade out hero audio (0.25 -> 0) as user scrolls past hero
      const targetVolume = 0.25 * (1 - ratio);
      video.volume = targetVolume;
      // Respect the user's mute preference, but force-mute once past hero
      video.muted = muted || ratio >= 1;

      // Once fully past the hero, pause it to free resources and avoid
      // playing silent video in the background. Resume + fade in if the
      // user scrolls back up.
      if (ratio >= 1 && !video.paused) {
        video.pause();
      } else if (ratio < 1 && video.paused) {
        video.play().catch(() => { });
      }
    };

    onScroll(); // run once to sync initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, muted]);

  // Mute the hero video whenever a project preview is hovered or the
  // project modal is open, so the hero's audio doesn't compete with the
  // preview/modal audio. When everything is dismissed, restore the user's
  // preferred mute state and the previously faded-in volume.
  useEffect(() => {
    if (!heroVideoRef.current) return;
    const video = heroVideoRef.current;

    const shouldMute = previewActive || !!selectedProject;

    if (shouldMute) {
      video.muted = true;
    } else {
      // Restore user preference + the faded-in target volume
      video.muted = muted;
      // Only restore volume if user is still inside the hero section
      const heroHeight = window.innerHeight;
      const fadeEnd = heroHeight * 0.8;
      const ratio = Math.min(Math.max(window.pageYOffset / fadeEnd, 0), 1);
      if (ratio < 1) {
        video.volume = 0.25 * (1 - ratio);
      }
    }
  }, [previewActive, selectedProject, muted, loading]);

  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-about-reveal]");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(
              (entry.target as HTMLElement).dataset.aboutDelay ?? "0",
            );
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    revealEls.forEach((el) => {
      el.classList.add("about-reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c0d] text-[#fafafa] relative overflow-hidden selection:bg-[#d2ff1f]/20 selection:text-[#d2ff1f]">
      {/* Dynamic Background subtle ambient light glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(210,255,31,0.06),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.03),transparent_40%)] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-lime-300/8 blur-[120px] animate-glow pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-cyan-300/7 blur-[150px] animate-glow pointer-events-none z-0"></div>

      {/* Custom Cursor */}
      <div
        className={`custom-cursor hidden md:block ${isHovering ? "hovered-cursor" : ""}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        className="custom-cursor-dot hidden md:block"
        style={{ left: `${cursorDotPos.x}px`, top: `${cursorDotPos.y}px` }}
      />

      {/* Simple cinematic loading screen */}
      {loading && (
        <div className="fixed inset-0 bg-[#0b0c0d] z-9999 flex flex-col justify-center items-center gap-4 transition-all duration-700 ease-in-out">
          <div className="overflow-hidden flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-display font-bold tracking-[0.25em] text-[#fafafa] block animate-pulse">
              AR<span className="text-[#d2ff1f]">.</span>
            </span>
          </div>
          <div className="h-px w-24 bg-neutral-800 relative overflow-hidden">
            <div
              className="absolute h-full w-12 bg-[#d2ff1f] animate-[shimmer_1.5s_infinite] -left-12.5"
              style={{
                animationName: "loadingProgress",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
              }}
            >
              <style>{`
                @keyframes loadingProgress {
                  0% { left: -50%; }
                  100% { left: 100%; }
                }
              `}</style>
            </div>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-500">
            Crafting Stories Through Motion
          </p>
        </div>
      )}

      { }
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-[#d2ff1f] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header / Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
            ? "bg-[#0b0c0d]/70 backdrop-blur-xl border-b border-neutral-900/60 py-4"
            : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-extrabold text-2xl md:text-3xl tracking-[0.22em] text-white hover:text-[#d2ff1f] transition-all duration-300 logo-glow flex items-center group"
          >
            AR<span className="text-[#d2ff1f] logo-dot-glow group-hover:scale-110 inline-block transition-transform duration-300">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-widest uppercase font-medium text-neutral-400">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#photography" className="hover:text-white transition-colors">
              Photography
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
          </nav>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 hover:border-[#d2ff1f] text-xs uppercase tracking-widest font-medium transition-all text-neutral-200 hover:text-[#d2ff1f]"
          >
            Let's Talk
          </a>
        </div>
      </header>

      { }
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0c0d] via-[#0b0c0d]/40 to-[#0b0c0d]/60 z-10" />
          <video
            ref={heroVideoRef}
            src="https://res.cloudinary.com/lmlldgjs/video/upload/v1782841051/hero_i7ipff.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover opacity-35"
            // Sync the DOM `muted` attribute with the user preference on
            // every render so the click-to-mute button works even though
            // the scroll/preview effects also drive this property.
            onVolumeChange={(e) => {
              if (e.currentTarget.muted !== muted) {
                e.currentTarget.muted = muted;
              }
            }}
            key={muted ? "muted" : "unmuted"}
          />
        </div>
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-8 right-8 z-30
               bg-black/40
               backdrop-blur-md
               border border-neutral-700
               p-3 rounded-full
               hover:border-[#d2ff1f]
               transition-all"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#d2ff1f]" />
          )}
        </button>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-bold font-hero-name hero-name-glow tracking-tight text-white mb-4">
            Arindam Rout
          </h1>
          <h2 className="text-lg md:text-2xl font-light text-neutral-400 tracking-[0.48em] mb-8 uppercase font-tech">
            Video Editor • Creative Developer • Visual Storyteller
          </h2>

          <p className="max-w-xl text-neutral-300 text-sm md:text-base leading-relaxed tracking-wide mb-10 font-light">
            From travel films to event aftermovies and social content—creating
            edits that feel cinematic from the first frame.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#work"
              className="px-8 py-4 bg-[#d2ff1f] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#e6ff8a] hover:text-black transition-all rounded-md shadow-lg shadow-lime-200/10 flex items-center gap-2 group"
            >
              View My Work
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent hover:bg-neutral-900 border border-neutral-800 text-white font-semibold text-xs uppercase tracking-widest transition-all rounded-md"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Tiny production metadata for a creative-director portfolio tone */}
        <div className="hidden md:block absolute left-6 md:left-10 bottom-8 z-20 text-left font-tech uppercase leading-tight">
          <p className="text-[10px] tracking-[0.24em] text-neutral-300">
            Selected Work / 2026
          </p>
          <p className="mt-1 text-[10px] tracking-[0.18em] text-neutral-500">
            Brand · Events · Hospitality
          </p>
        </div>

        <div className="hidden md:block absolute right-24 md:right-28 bottom-8 z-20 text-right font-tech uppercase leading-tight">
          <p className="text-[10px] tracking-[0.24em] text-neutral-300">
            Bhubaneswar, India
          </p>
          <p className="mt-1 text-[10px] tracking-[0.18em] text-[#d2ff1f]">
            Available Worldwide
          </p>
        </div>
      </section>

      { }
      {/* Featured Work Grid */}
      <section
        id="work"
        className="py-24 md:py-36 relative z-10 max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d2ff1f] font-semibold block mb-2">
              Portfolio Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
              Featured Work
            </h2>
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              onPreviewChange={setPreviewActive}
            />
          ))}
        </div>
      </section>

      {/* Project Modal Component (Absolute Overlay) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      { }
      {/* About Section */}
      <section
        id="about"
        className="py-20 md:py-32 bg-neutral-950/40 relative z-10 border-y border-neutral-900/60"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <span
                data-about-reveal
                data-about-delay="0"
                className="text-[10px] tracking-[0.3em] uppercase text-[#d2ff1f] font-semibold block mb-5"
              >
                Behind The Edit
              </span>

              <h2
                data-about-reveal
                data-about-delay="80"
                className="text-4xl md:text-6xl font-semibold font-display text-white tracking-tight leading-[0.95]"
              >
                Arindam Rout
              </h2>

              <p
                data-about-reveal
                data-about-delay="140"
                className="mt-3 text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-neutral-500 font-tech"
              >
                Video Editor · Visual Storyteller
              </p>

              <p
                data-about-reveal
                data-about-delay="220"
                className="mt-8 text-3xl md:text-5xl font-display text-white leading-[1.02] max-w-3xl"
              >
                I turn raw footage into stories people want to watch.
              </p>

              <div className="mt-8 max-w-2xl space-y-4">
                <p
                  data-about-reveal
                  data-about-delay="280"
                  className="text-sm md:text-base text-neutral-300 leading-relaxed"
                >
                  I’m a visual editor drawn to music, cinema, travel and the
                  energy of real moments. I work across brand promotions, event
                  films, sports content, hospitality and short-form social
                  content.
                </p>
                <p
                  data-about-reveal
                  data-about-delay="340"
                  className="text-sm md:text-base text-neutral-400 leading-relaxed"
                >
                  My edits are built around rhythm, sound, color and movement
                  with every cut serving the story rather than just filling the
                  timeline.
                </p>
              </div>

              <p
                data-about-reveal
                data-about-delay="380"
                className="mt-6 text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-tech"
              >
                Brands · Events · Sports · Hospitality · Social
              </p>

              <div className="mt-10 pt-8 border-t border-neutral-900/70">
                <p
                  data-about-reveal
                  data-about-delay="420"
                  className="text-[10px] tracking-[0.26em] uppercase text-[#d2ff1f] font-semibold mb-4 font-tech"
                >
                  My Approach
                </p>
                <p
                  data-about-reveal
                  data-about-delay="460"
                  className="text-xl md:text-2xl text-white tracking-[0.04em] uppercase font-tech leading-relaxed"
                >
                  Cut with purpose.
                  <br />
                  Move with the music.
                  <br />
                  Leave something behind.
                </p>
                <p
                  data-about-reveal
                  data-about-delay="500"
                  className="mt-4 text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xl"
                >
                  I care about pacing, sound, color and the moments between the
                  obvious ones. Every cut should have a reason to exist.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28" data-about-reveal data-about-delay="180">
              <div className="about-portrait rounded-2xl border border-neutral-800/80 bg-neutral-950/50 shadow-[0_0_0_1px_rgba(210,255,31,0.08)]">
                <img
                  src="/profile.jpg"
                  alt="Arindam Rout profile photo"
                  className="w-full aspect-4/5 object-cover rounded-2xl"
                  loading="eager"
                />
                <div className="about-portrait-grain" />
                <div className="about-portrait-vignette" />
              </div>

              {/* Video Editor HUD Stat Cards & Spec Badges */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-900/80 hover:border-[#d2ff1f]/30 transition-all">
                  <span className="text-[10px] tracking-widest text-[#d2ff1f] font-tech uppercase block mb-1">
                    EXPERIENCE
                  </span>
                  <p className="text-2xl font-bold text-white font-display">3+ Years</p>
                  <p className="text-[10px] text-neutral-400 font-tech mt-0.5">Visual Editing & Motion</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-900/80 hover:border-[#d2ff1f]/30 transition-all">
                  <span className="text-[10px] tracking-widest text-[#d2ff1f] font-tech uppercase block mb-1">
                    DELIVERIES
                  </span>
                  <p className="text-2xl font-bold text-white font-display">35+ Edits</p>
                  <p className="text-[10px] text-neutral-400 font-tech mt-0.5">Reels, Films & Events</p>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section
        id="photography"
        className="py-24 md:py-36 relative z-10 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-900/60"
      >
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#d2ff1f] font-semibold block mb-2 font-tech flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-[#d2ff1f]" />
          STILL & CINEMATIC FRAMES
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
          Photography Gallery
        </h2>
      </div>
      <p className="text-neutral-400 text-xs md:text-sm max-w-md font-light leading-relaxed">
        Capturing tone, lighting, and story in single freeze-frames. A curated collection of cinematic stills, concert energy, and travel stories.
      </p>
    </div>

  {/* Category Filters */ }
  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 border-b border-neutral-900/80 pb-4">
    {["All", "Cinematic Stills", "Concert & Event", "Street & Travel", "Portrait"].map((cat) => (
      <button
        key={cat}
        onClick={() => setPhotoCategory(cat)}
        className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-tech transition-all cursor-pointer ${photoCategory === cat
            ? "bg-[#d2ff1f] text-black font-semibold shadow-md shadow-lime-300/10"
            : "bg-neutral-950 text-neutral-400 border border-neutral-900 hover:border-neutral-800 hover:text-white"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* Photography Grid */ }
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredPhotos.map((photo) => (
      <div
        key={photo.id}
        onClick={() => setSelectedPhoto(photo)}
        className="group relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900/80 cursor-pointer hover:border-[#d2ff1f]/40 hover:-translate-y-1 transition-all duration-500 z-10 flex flex-col"
      >
        <div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-900">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* HUD Overlay details */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-neutral-800 text-[9px] uppercase tracking-widest text-[#d2ff1f] font-tech">
            {photo.category}
          </div>

          <div className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-neutral-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#d2ff1f] hover:text-black">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-[#d2ff1f] transition-colors">
              {photo.title}
            </h3>
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-tech mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d2ff1f]" />
                {photo.location}
              </span>
              <span className="text-neutral-500">{photo.camera.split('•')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
      </section >

    {/* Services Section */ }
    < section
  id = "services"
  className = "py-24 md:py-36 relative z-10 max-w-7xl mx-auto px-6 md:px-12"
    >
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d2ff1f] font-semibold block mb-2">
            My Skillset
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-neutral-950 border border-neutral-900/80 hover:border-neutral-800 transition-all hover:-translate-y-1 duration-300 flex flex-col"
            >
              <div className="p-3 bg-neutral-900 rounded-md w-fit mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-3 font-display">
                {service.title}
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section >

    {}

  {/* Software Badges Section */}
  <section className="py-20 relative z-10 max-w-7xl mx-auto px-6 text-center">
    <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold block mb-8">
      Software Toolkit
    </span>
    <div className="flex flex-nowrap items-center justify-center gap-6 md:gap-10 overflow-x-auto pb-2">
      {/* Premiere Pro */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Pr</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">Premiere Pro</span>
      </div>
      {/* After Effects */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Ae</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">After Effects</span>
      </div>
      {/* Photoshop */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Ps</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">Photoshop</span>
      </div>
      {/* Lightroom */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Lr</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">Lightroom</span>
      </div>
      {/* CapCut */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Cc</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">CapCut</span>
      </div>
      {/* DaVinci Resolve */}
      <div className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d2ff1f] text-xl font-bold group-hover:border-[#d2ff1f]/50 group-hover:text-white transition-all duration-300">Dv</div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">DaVinci Resolve</span>
      </div>
    </div>
  </section>

  { }
  {/* Contact Section */ }
  <footer
    id="contact"
    className="py-28 md:py-36 relative z-10 border-t border-neutral-900/60 bg-[#030303]"
  >
    <div className="max-w-4xl mx-auto px-6 text-center">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#d2ff1f] font-semibold block mb-4">
        Let's Connect
      </span>
      <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tight text-white mb-6">
        Let's Create <br />
        Something Amazing.
      </h2>
      <p className="text-neutral-400 text-xs md:text-sm max-w-md mx-auto mb-12 font-light leading-relaxed">
        Tell me the vibe + the platform (Reels/YouTube), and I’ll propose an
        edit approach—hooks, pacing, and the color/sound direction.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
        <a
          href="mailto:arindamrout36@gmail.com"
          className="w-full md:w-auto px-8 py-4 bg-neutral-950 border border-neutral-900 hover:border-[#d2ff1f] text-white rounded-md text-xs font-tech font-semibold tracking-wider transition-all flex items-center justify-center gap-3"
        >
          <Mail className="w-4 h-4 text-[#d2ff1f]" />
          arindamrout36@gmail.com
        </a>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-8 text-neutral-400">
        <a
          href="https://www.instagram.com/_.arindam.07._/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#d2ff1f] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-medium"
        >
          <Instagram className="w-4 h-4" />
          Instagram
        </a>
        <span className="text-neutral-800">|</span>
        <a
          href="https://www.linkedin.com/in/arindam-rout-7a016a353"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#d2ff1f] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-medium"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </div>

      {/* Bottom attribution */}
      <div className="mt-20 pt-8 border-t border-neutral-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
        <p>
          © {new Date().getFullYear()} Arindam Rout. All rights reserved.
        </p>
        <p>Available for freelance work.</p>
        <p>Based in Bhubaneswar, India.</p>
      </div>
    </div>
  </footer>
    </div >
  );
}

// Project Card Component

function ProjectCard({ project, onClick, onPreviewChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Notify the parent so it can mute the hero background music
    onPreviewChange?.(true);
    const v = videoRef.current;
    if (!v) return;
    // If the video source was previously hidden (opacity 0), some browsers
    // need an explicit load() before play() will succeed.
    if (!isVideoReady) {
      try {
        v.load();
      } catch { }
    }
    if (isVideoReady) {
      v.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Tell the parent the preview is no longer active
    onPreviewChange?.(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // reset
    }
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-900/80 cursor-pointer hover:border-neutral-800/80 hover:-translate-y-1 transition-all duration-500 z-10 flex flex-col"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video / Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {/* Fallback Static Thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
        />

        {/* Dynamic Video Element on Hover (keep thumbnail visible until video is ready) */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && isVideoReady
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
            }`}
          onLoadedData={() => setIsVideoReady(true)}
          onError={() => {
            // If the video fails to load, thumbnail remains visible.
            setIsVideoReady(false);
          }}
        />

        {/* Preview HUD Badge overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-neutral-800 text-[9px] uppercase tracking-wider text-neutral-400">
          <Play className="w-2.5 h-2.5 text-[#d2ff1f]" />
          Preview
        </div>
      </div>

      {/* Card Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#d2ff1f]/80 font-semibold block mb-1">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight font-display mb-2 group-hover:text-[#d2ff1f] transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-xs font-light tracking-wide line-clamp-2 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hover action cues */}
        <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
          <span>View Project Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d2ff1f]" />
        </div>
      </div>
    </div>
  );
}

// Project Modal Component
function ProjectModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  // Auto play project video inside modal
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted(!muted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b0c0d]/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card content wrapper */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#090909] border border-neutral-800 overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh] z-10 animate-fade-in-up">
        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted={muted}
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />

          {/* In-Video HUD Controllers */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-black/60 backdrop-blur-md border border-neutral-800 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded hover:bg-neutral-800 text-white transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 rounded hover:bg-neutral-800 text-white transition-colors"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            </div>

            <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono px-2">
              Active Video Feed
            </span>
          </div>

          {/* Close trigger button absolute */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-[#d2ff1f] text-white hover:text-black rounded-full backdrop-blur-md border border-neutral-800 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description Specs area */}
        <div className="p-6 md:p-10 overflow-y-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#d2ff1f] font-semibold block mb-2">
            {project.category} Project Specs
          </span>

          <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
            {project.title}
          </h3>

          <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between pt-6 border-t border-neutral-900/80">
            {/* Tools list badges */}
            <div>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold block mb-2">
                Tools Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-900 text-neutral-300 rounded border border-neutral-800 text-[10px] tracking-wide uppercase"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Back action button */}
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-md"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Photo Modal Lightbox Component
function PhotoModal({ photo, onClose }: { photo: any; onClose: () => void }) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b0c0d]/92 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#090909] border border-neutral-800 overflow-hidden shadow-2xl shadow-black/80 flex flex-col md:flex-row max-h-[90vh] z-10 animate-fade-in-up">
        {/* Photo Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[75vh]"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-[#d2ff1f] text-white hover:text-black rounded-full backdrop-blur-md border border-neutral-800 transition-all z-20 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-80 p-6 md:p-8 border-t md:border-t-0 md:border-l border-neutral-900 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#d2ff1f] font-semibold font-tech">
                {photo.category}
              </span>
              <button
                onClick={onClose}
                className="hidden md:flex p-1.5 bg-neutral-900 hover:bg-[#d2ff1f] text-neutral-400 hover:text-black rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-2">
              {photo.title}
            </h3>

            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              {photo.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-900/80">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-tech block mb-1">
                  Location
                </span>
                <p className="text-xs text-neutral-200 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d2ff1f]" />
                  {photo.location}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-tech block mb-1">
                  Camera Specs
                </span>
                <p className="text-xs text-neutral-200 font-medium flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#d2ff1f]" />
                  {photo.camera}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-tech block mb-1">
                  EXIF Settings
                </span>
                <p className="text-xs text-neutral-400 font-tech bg-neutral-950 p-2.5 rounded border border-neutral-900">
                  {photo.iso}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900/80 mt-6">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-md font-tech"
            >
              Close Still
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


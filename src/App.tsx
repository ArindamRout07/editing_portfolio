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
} from "lucide-react";

// Inject premium fonts and custom animation styles directly into the document
const injectStyles = () => {
  if (typeof document === "undefined") return;

  // Google Fonts (Space Grotesk & Inter)
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);

  // Custom styling, scrollbars, cursor, and keyframes
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      font-family: 'Inter', sans-serif;
    }
    h1, h2, h3, h4, h5, h6, .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }
    html {
      scroll-behavior: smooth;
      background-color: #050505;
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
      background: #b5a46d;
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
      border: 1.5px solid rgba(212, 175, 55, 0.6);
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
      background-color: #d4af37;
      border-radius: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
    }
    .hovered-cursor {
      width: 50px;
      height: 50px;
      background-color: rgba(212, 175, 55, 0.1);
      border-color: #d4af37;
    }
  `;
  document.head.appendChild(style);
};

// High quality direct-link cinematic video samples from Mixkit
const projects = [
  {
    id: 1,
    title: "Midnight Tokyo",
    subtitle: "Cyberpunk Streetscape Edit",
    description:
      "A high-octane hyperlapse cinematic exploration of Tokyo at night. Featuring meticulous color correction, speed ramping, and neon-drenched visual design to emphasize the cyberpunk essence.",
    thumbnail: "/midnight-tokyo-first-frame.jpg",
    videoUrl: "/hero.mp4",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    category: "Commercial",
  },
  {
    id: 2,
    title: "Wild Alaska",
    subtitle: "Cinematic Travel Film",
    description:
      "A breathtaking narrative-driven journey through the deep snow forests and monumental peaks of Alaska. Edited using natural ambient design and cinematic dynamic transitions to create a slow-paced meditative experience.",
    thumbnail:
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-snow-covering-forest-trees-41551-large.mp4",
    tools: ["Premiere Pro", "Lightroom", "Audition"],
    category: "Travel",
  },
  {
    id: 3,
    title: "Neon Pulse",
    subtitle: "Music & Event Aftermovie",
    description:
      "A fast-paced music festival recap that syncs visual rhythm precisely with electronic sound design. Utilizing custom light leaks, match cuts, and frame blending to construct a mesmerizing atmosphere.",
    thumbnail:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-with-lights-and-smoke-41712-large.mp4",
    tools: ["After Effects", "Premiere Pro", "Sapphire Plugins"],
    category: "Event",
  },
  {
    id: 4,
    title: "Solitude",
    subtitle: "Minimalist Short Film",
    description:
      "An introspective cinematic sequence depicting isolation in autumn weather. Focused heavily on high dynamic range grading, subtle foley integration, and raw visual storytelling.",
    thumbnail:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-man-walking-alone-on-a-foggy-road-in-autumn-41584-large.mp4",
    tools: ["Premiere Pro", "DaVinci Resolve", "Red Giant"],
    category: "Short Film",
  },
  {
    id: 5,
    title: "Urban Flow",
    subtitle: "Dynamic Fashion Reel",
    description:
      "An ultra-modern vertical format campaign edit highlighting urban streetwear. Custom animated text overlays, match cuts, and sudden momentum shifts optimized for mobile platforms.",
    thumbnail:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-vertical-video-screen-41705-large.mp4",
    tools: ["After Effects", "Premiere Pro", "Photoshop"],
    category: "Reels / Ads",
  },
  {
    id: 6,
    title: "Chroma Shift",
    subtitle: "Abstract Motion Graphics",
    description:
      "A dark, atmospheric digital art visualizer playing with glowing lasers and dynamic chromatic dispersion. Designed entirely programmatically and synchronized to synthesizers.",
    thumbnail:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41743-large.mp4",
    tools: ["After Effects", "Cinema 4D", "Photoshop"],
    category: "Motion Design",
  },
];

const services = [
  {
    icon: <Zap className="w-6 h-6 text-[#d4af37]" />,
    title: "Instagram Reels & Shorts",
    desc: "Hook built on the first 1–2 seconds, beat-synced typography, and clean motion pacing for Reels/Shorts—optimized to keep viewers watching.",
  },
  {
    icon: <Film className="w-6 h-6 text-[#d4af37]" />,
    title: "YouTube Video Editing",
    desc: "Narrative-first structure: clean openers, intentional pacing, and sound-led transitions that keep momentum without feeling “over-edited.”",
  },
  {
    icon: <Video className="w-6 h-6 text-[#d4af37]" />,
    title: "Event Aftermovies",
    desc: "A highlight flow that respects the crowd: rhythm edits, light-flare accents, and ambient sound layers so the energy stays intact.",
  },
  {
    icon: <Tv className="w-6 h-6 text-[#d4af37]" />,
    title: "Travel Films",
    desc: "Cinematic journey editing with natural pacing—using ambience, gentle transitions, and color grading that keeps skin tones and skies natural.",
  },
  {
    icon: <Layers className="w-6 h-6 text-[#d4af37]" />,
    title: "Motion Graphics",
    desc: "Animated titles, logo reveals, lower-thirds, and typography systems—built to look sharp at small sizes (and still feel premium on big screens).",
  },
  {
    icon: <Sliders className="w-6 h-6 text-[#d4af37]" />,
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
  const [activeTab, setActiveTab] = useState("all");
  const [muted, setMuted] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);
  const heroVideoRef = useRef(null);

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

    video.play().catch(() => {});

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
        video.play().catch(() => {});
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

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] relative overflow-hidden selection:bg-[#d4af37]/20 selection:text-[#d4af37]">
      {/* Dynamic Background subtle ambient light glow */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-amber-500/5 blur-[120px] animate-glow pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-blue-500/5 blur-[150px] animate-glow pointer-events-none z-0"></div>

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
        <div className="fixed inset-0 bg-[#050505] z-9999 flex flex-col justify-center items-center gap-4 transition-all duration-700 ease-in-out">
          <div className="overflow-hidden flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-display font-bold tracking-[0.25em] text-[#fafafa] block animate-pulse">
              AR<span className="text-[#d4af37]">.</span>
            </span>
          </div>
          <div className="h-px w-24 bg-neutral-800 relative overflow-hidden">
            <div
              className="absolute h-full w-12 bg-[#d4af37] animate-[shimmer_1.5s_infinite] -left-12.5"
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

      {}
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-[#d4af37] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header / Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/70 backdrop-blur-xl border-b border-neutral-900/60 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-bold text-xl tracking-[0.2em] hover:text-[#d4af37] transition-colors"
          >
            AR<span className="text-[#d4af37]">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-widest uppercase font-medium text-neutral-400">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
          </nav>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 hover:border-[#d4af37] text-xs uppercase tracking-widest font-medium transition-all text-neutral-200 hover:text-[#d4af37]"
          >
            Let's Talk
          </a>
        </div>
      </header>

      {}
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60 z-10" />
          <video
            ref={heroVideoRef}
            src="/0630.mp4"
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
               hover:border-[#d4af37]
               transition-all"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#d4af37]" />
          )}
        </button>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight text-white mb-4">
            Arindam Rout
          </h1>
          <h2 className="text-lg md:text-2xl font-light text-neutral-400 tracking-widest mb-8 uppercase font-display">
            Video Editor • Creative Developer • Visual Storyteller
          </h2>

          <p className="max-w-xl text-neutral-300 text-sm md:text-base leading-relaxed tracking-wide mb-10 font-light">
            From travel films to event aftermovies and social content—creating
            edits that feel cinematic from the first frame.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#work"
              className="px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all rounded-md shadow-lg shadow-white/5 flex items-center gap-2 group"
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
      </section>

      {}
      {/* Featured Work Grid */}
      <section
        id="work"
        className="py-24 md:py-36 relative z-10 max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold block mb-2">
              Portfolio Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
              Featured Work
            </h2>
          </div>
          <p className="text-neutral-400 text-xs md:text-sm max-w-sm font-light">
            Hover previews + modal specs—so you can see the edit style, tools,
            and pacing choices behind each piece.
          </p>
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

      {}
      {/* About Me Section */}
      <section
        id="about"
        className="py-20 md:py-32 bg-neutral-950/40 relative z-10 border-y border-neutral-900/60"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold block mb-4">
            Behind The Screen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white tracking-tight">
            About Me
          </h2>

          {/* Profile Photo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-3xl bg-[#d4af37]/10 blur-xl pointer-events-none" />

              {/* Image card */}
              <div className="relative bg-neutral-950/50 border border-neutral-800/80 rounded-3xl overflow-hidden shadow-[0_0_0_1px_rgba(212,175,55,0.12)]">
                <img
                  src="/profile.jpg"
                  alt="Arindam Rout profile photo"
                  className="w-40 h-30 sm:w-55 sm:h-40 md:w-65 md:h-47.5 object-cover"
                  loading="eager"
                />
              </div>
            </div>

            <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-semibold">
              Video Editor • Digital Creator • Visual Storyteller
            </p>
          </div>

          <p className="text-neutral-300 text-base md:text-xl font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            I help{" "}
            <span className="text-white font-medium">creators and brands</span>{" "}
            transform raw footage into cinematic stories that capture attention
            and leave a lasting impression.
          </p>

          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-light mb-6">
            Whether it's a travel film, an event aftermovie, or short-form
            content, every project is built around storytelling, rhythm, and
            thoughtful visual design.
          </p>

          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-light">
            Inspired by music, travel, street photography, and cinema, I create
            edits that feel intentional, immersive, and memorable.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 md:py-36 relative z-10 max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold block mb-2">
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
      </section>

      {}

      {/* Software Badges Section */}
      <section className="py-20 relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold block mb-8">
          Software Toolkit
        </span>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {/* Adobe Premiere Pro */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d4af37] text-xl font-bold group-hover:border-[#d4af37]/50 group-hover:text-white transition-all duration-300">
              Pr
            </div>
            <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">
              Premiere Pro
            </span>
          </div>

          {/* After Effects */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d4af37] text-xl font-bold group-hover:border-[#d4af37]/50 group-hover:text-white transition-all duration-300">
              Ae
            </div>
            <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">
              After Effects
            </span>
          </div>

          {/* Photoshop */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d4af37] text-xl font-bold group-hover:border-[#d4af37]/50 group-hover:text-white transition-all duration-300">
              Ps
            </div>
            <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">
              Photoshop
            </span>
          </div>

          {/* Lightroom */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-[#d4af37] text-xl font-bold group-hover:border-[#d4af37]/50 group-hover:text-white transition-all duration-300">
              Lr
            </div>
            <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-light">
              Lightroom
            </span>
          </div>
        </div>
      </section>

      {}
      {/* Contact Section */}
      <footer
        id="contact"
        className="py-28 md:py-36 relative z-10 border-t border-neutral-900/60 bg-[#030303]"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold block mb-4">
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
              className="w-full md:w-auto px-8 py-4 bg-neutral-950 border border-neutral-900 hover:border-[#d4af37] text-white rounded-md text-xs font-serif font-semibold tracking-wider transition-all flex items-center justify-center gap-3"
            >
              <Mail className="w-4 h-4 text-[#d4af37]" />
              arindamrout36@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 text-neutral-400">
            <a
              href="https://www.instagram.com/_.arindam.07._/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-medium"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <span className="text-neutral-800">|</span>
            <a
              href="https://www.linkedin.com/in/arindam-rout-7a016a353"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-medium"
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
    </div>
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
      } catch {}
    }
    if (isVideoReady) {
      v.play().catch(() => {});
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
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && isVideoReady
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
          <Play className="w-2.5 h-2.5 text-[#d4af37]" />
          Preview
        </div>
      </div>

      {/* Card Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 font-semibold block mb-1">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight font-display mb-2 group-hover:text-[#d4af37] transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-xs font-light tracking-wide line-clamp-2 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Hover action cues */}
        <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
          <span>View Project Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d4af37]" />
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
        videoRef.current.play().catch(() => {});
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
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md cursor-pointer"
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
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-md border border-neutral-800 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description Specs area */}
        <div className="p-6 md:p-10 overflow-y-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
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

import * as React from "react";

export interface Photo {
  image: string;
  title: string;
  note: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  photos?: Photo[];
  accent?: string;
  style?: React.CSSProperties;
}

export const defaults: Photo[] = [
  { image: "/photos/photo-01.jpg", title: "Above everything", note: "The best view is together." },
  { image: "/photos/photo-02.jpg", title: "On your shoulders", note: "A little taller. A little braver." },
  { image: "/photos/photo-03.jpg", title: "Our little world", note: "Nowhere else I’d rather be." },
  { image: "/photos/photo-04.jpg", title: "The everyday magic", note: "The moments between the milestones." },
  { image: "/photos/photo-05.jpg", title: "Taking the long way", note: "No hurry to get anywhere." },
  { image: "/photos/photo-06.jpg", title: "Just us, and the sea", note: "Some days stay with you." },
  { image: "/photos/photo-07.jpg", title: "Where I belong", note: "Home isn’t always a place." },
  { image: "/photos/photo-08.jpg", title: "Father and son", note: "A bond that lasts forever." },
  { image: "/photos/photo-09.jpg", title: "Big smiles", note: "Pure joy in one frame." },
  { image: "/photos/photo-10.jpg", title: "Together", note: "Side by side, always." },
  { image: "/photos/photo-11.jpg", title: "Little explorer", note: "Discovering the world together." },
  { image: "/photos/photo-12.jpg", title: "Held close", note: "Safe in my arms." },
  { image: "/photos/photo-13.jpg", title: "Laughter", note: "The sound I love most." },
  { image: "/photos/photo-14.jpg", title: "Hand in hand", note: "Walking forward together." },
  { image: "/photos/photo-15.jpg", title: "Quiet moments", note: "The best kind of time." },
  { image: "/photos/photo-16.jpg", title: "Adventure", note: "Every day is new." },
  { image: "/photos/photo-17.jpg", title: "My little hero", note: "Brave and kind." },
  { image: "/photos/photo-18.jpg", title: "Growing up", note: "So fast, so precious." },
  { image: "/photos/photo-19.jpg", title: "Play time", note: "Full of energy." },
  { image: "/photos/photo-20.jpg", title: "Hugs", note: "The best medicine." },
  { image: "/photos/photo-21.jpg", title: "Smiles all around", note: "Happiness captured." },
  { image: "/photos/photo-22.jpg", title: "My sunshine", note: "Brightening every day." },
  { image: "/photos/photo-23.jpg", title: "Forever", note: "Yann & son, always." },
  { image: "/photos/photo-24.jpg", title: "Our moment", note: "Just us, always." },
];

export default function FamilyAlbum({
  title = "YSLions",
  subtitle = "A little collection of our biggest little moments.",
  photos = defaults,
  accent = "#2864FF",
  style,
}: Props) {
  const items = photos?.length ? photos : defaults;
  const rail = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef({ down: false, x: 0, left: 0, moved: false });
  const [active, setActive] = React.useState(0);
  const [expanded, setExpanded] = React.useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = React.useState<number | null>(null);
  const [about, setAbout] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [compact, setCompact] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;

    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", wheel, { passive: false });

    const ro = new ResizeObserver((v) => {
      if (root.current) setCompact(v[0].contentRect.width < 650);
    });
    if (root.current) ro.observe(root.current);

    return () => {
      el.removeEventListener("wheel", wheel);
      ro.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return;
      if (e.key === "Escape") setFullscreenIndex(null);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFullscreenIndex((i) => (i === null ? null : (i + 1) % items.length));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFullscreenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreenIndex, items.length]);

  const go = (i: number) => {
    const el = rail.current;
    const child = el?.children[Math.max(0, Math.min(items.length - 1, i))] as HTMLElement;
    if (el && child) {
      el.scrollTo({
        left: child.offsetLeft - el.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  const small: React.CSSProperties = {
    fontSize: 10,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  const btn: React.CSSProperties = {
    color: "#e7e7e9",
    background: "transparent",
    border: "1px solid #303137",
    borderRadius: 30,
    padding: "12px 18px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 11,
  };

  return (
    <div
      ref={root}
      style={{
        ...style,
        width: "100%",
        height: "100%",
        minHeight: 640,
        background: "#08090B",
        color: "#f6f6f6",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          margin: compact ? "0 22px" : "0 48px",
          padding: "27px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #242529",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 13,
              height: 13,
              background: accent,
              display: "block",
              borderRadius: 2,
              transform: "rotate(-12deg)",
            }}
          />
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.7px" }}>
            Yann/Soren Zakpa
          </span>
        </div>
        <div style={{ display: "flex", gap: compact ? 18 : 36, alignItems: "center" }}>
          <button
            onClick={() => {
              setAbout(false);
              go(0);
            }}
            style={{ ...btn, border: 0, padding: 0, color: about ? "#777" : accent }}
          >
            The album
          </button>
          <button
            onClick={() => setAbout(!about)}
            style={{ ...btn, border: 0, padding: 0 }}
          >
            Our story
          </button>
          {!compact && (
            <span style={{ ...small, color: "#72747c" }}>A personal photo journal</span>
          )}
        </div>
      </header>

      <section
        style={{
          padding: compact ? "35px 22px 24px" : "38px 48px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div>
          <div
            style={{
              ...small,
              color: "#8c8e96",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
              }}
            />
            THE DAYS, KEPT CLOSE
          </div>
          <h1
            style={{
              fontSize: compact ? 48 : 76,
              lineHeight: 1,
              letterSpacing: "-0.065em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#90929a",
              margin: "18px 0 0",
              lineHeight: 1.6,
            }}
          >
            {about
              ? "A father. A son. A thousand ordinary moments worth remembering."
              : subtitle}
          </p>
        </div>
        {!compact && (
          <div
            style={{
              textAlign: "right",
              ...small,
              color: "#777a83",
              lineHeight: 1.9,
            }}
          >
            AN ONGOING COLLECTION
            <br />
            <span style={{ color: "#dadbe0" }}>FATHERHOOD, FRAME BY FRAME</span>
          </div>
        )}
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: compact ? "0 22px 15px" : "0 48px 18px",
          ...small,
          color: "#73767f",
        }}
      >
        <span>
          <span style={{ color: accent }}>01</span> /{" "}
          {about ? "OUR STORY" : "LIFE TOGETHER"}
        </span>
        <span>
          {String(items.length).padStart(2, "0")} PHOTOGRAPHS · SAMPLE COLLECTION
        </span>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        aria-label="Photo album. Scroll, drag, or use left and right arrow keys."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(active + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(active - 1);
          }
          if (e.key === "Escape") setExpanded(null);
        }}
        onScroll={() => {
          const el = rail.current;
          if (!el) return;
          setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
          let nearest = 0;
          let dist = Infinity;
          Array.from(el.children).forEach((c, i) => {
            const x = c as HTMLElement;
            const d = Math.abs(
              x.offsetLeft - el.offsetLeft + x.clientWidth / 2 - el.scrollLeft - el.clientWidth / 2,
            );
            if (d < dist) {
              dist = d;
              nearest = i;
            }
          });
          setActive(nearest);
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "touch") return;
          drag.current = {
            down: true,
            x: e.clientX,
            left: rail.current?.scrollLeft || 0,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          if (!drag.current.down || !rail.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 5) drag.current.moved = true;
          rail.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
        }}
        onPointerLeave={() => {
          drag.current.down = false;
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: compact ? 18 : 28,
          padding: compact ? "8px 22px 22px" : "8px 48px 26px",
          ...small,
          color: "#73767f",
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          flex: 1,
          minHeight: 280,
          perspective: 1200,
          cursor: "grab",
          touchAction: "pan-x",
          position: "relative",
        }}
        className="no-scrollbar"
      >
        {items.map((p, i) => {
          const open = expanded === i;
          return (
            <button
              key={i}
              aria-label={(open ? "Collapse " : "Expand ") + p.title}
              aria-expanded={open}
              onClick={() => {
                if (drag.current.moved) return;
                setFullscreenIndex(i);
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                flex: "0 0 auto",
                width: open ? (compact ? 320 : 640) : i % 3 === 0 ? 320 : i % 3 === 1 ? 265 : 365,
                height: open ? "100%" : i % 3 === 1 ? "87%" : i % 3 === 2 ? "81%" : "96%",
                minHeight: 230,
                border: 0,
                padding: 0,
                textAlign: "left",
                background: "transparent",
                color: "white",
                fontFamily: "inherit",
                cursor: "pointer",
                position: "relative",
                transition: "width 600ms cubic-bezier(.2,.8,.2,1), height 600ms",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                outlineOffset: 5,
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  width: "100%",
                  flex: 1,
                  background: "#1b1c20",
                  position: "relative",
                }}
              >
                <img
                  draggable={false}
                  src={typeof p.image === "string" ? p.image : (p.image as any)?.src}
                  alt={p.title + " — temporary family photograph"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 700ms",
                    transform: open ? "scale(1.035)" : hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 13,
                    left: 13,
                    ...small,
                    color: "white",
                    textShadow: "0 1px 6px black",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    border: "1px solid #ffffff55",
                    background: "#11111155",
                    borderRadius: 30,
                    padding: "8px 12px",
                    fontSize: 10,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {open ? "Close" : "Explore"}
                </span>
              </div>
              <div
                style={{
                  paddingTop: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500 }}>{p.title}</span>
                <span style={{ ...small, color: "#676a74" }}>
                  MEMORY {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {open && (
                <p style={{ fontSize: 12, color: "#989ba4", margin: "9px 0 0" }}>
                  {p.note}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <footer
        style={{
          margin: compact ? "0 22px" : "0 48px",
          padding: "20px 0 25px",
          borderTop: "1px solid #242529",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 22, letterSpacing: "-1px" }}>
              {String(active + 1).padStart(2, "0")}
              <span style={{ fontSize: 12, color: "#62656e", letterSpacing: 0 }}>
                / {String(items.length).padStart(2, "0")}
              </span>
            </span>
{!compact && (
            <span style={{ ...small, color: "#72747c" }}>
              Familly Photo Album
            </span>
          )}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={"Go to photo " + (i + 1)}
                onClick={() => go(i)}
                style={{
                  width: i === active ? 28 : 6,
                  height: 6,
                  padding: 0,
                  background: i === active ? accent : "#3a3c43",
                  border: 0,
                  borderRadius: 5,
                  cursor: "pointer",
                  transition: "width 300ms",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              aria-label="Previous photo"
              onClick={() => go(active - 1)}
              style={btn}
            >
              Prev
            </button>
            <button
              aria-label="Next photo"
              onClick={() => go(active + 1)}
              style={{ ...btn, background: accent, borderColor: accent }}
            >
              Next
            </button>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: "#202228",
            marginTop: 22,
          }}
        >
          <div
            style={{
              height: 1,
              width: Math.max(3, progress * 100) + "%",
              background: accent,
              transition: "width 100ms",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15,
            ...small,
            fontSize: 9,
            color: "#5f626c",
          }}
        >
          <span>MADE OF MOMENTS. NOT THINGS.</span>
          <span>YANN & SON / A LIVING ARCHIVE</span>
        </div>
      </footer>

      {fullscreenIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "#000000ee",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            gap: 16,
            cursor: "zoom-out",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setFullscreenIndex(null);
          }}
        >
          <button
            onClick={() => setFullscreenIndex(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 32,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              width: 40,
              height: 40,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            aria-label="Close fullscreen"
          >
            ✕
          </button>
          <img
            src={typeof items[fullscreenIndex].image === "string" ? items[fullscreenIndex].image : (items[fullscreenIndex].image as any)?.src}
            alt={items[fullscreenIndex].title}
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 4,
              boxShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          />
          <div style={{ color: "#fff", textAlign: "center", maxWidth: 600 }}>
            <span
              style={{
                ...small,
                color: accent,
                display: "block",
                marginBottom: 6,
              }}
            >
              MEMORY {String(fullscreenIndex + 1).padStart(2, "0")}
            </span>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.065em",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              {items[fullscreenIndex].title}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#b7b9c0",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {items[fullscreenIndex].note}
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
              }}
              style={{
                ...btn,
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
              }}
            >
              Prev
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIndex((i) => (i === null ? null : (i + 1) % items.length));
              }}
              style={{
                ...btn,
                background: accent,
                borderColor: accent,
                color: "#fff",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

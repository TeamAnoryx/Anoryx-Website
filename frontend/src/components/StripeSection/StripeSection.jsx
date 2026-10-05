import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./StripeSection.module.css";

// Helper to create a ray with given angle
function createRay(baseAngle, fromCenter, baseLen, thickMin, thickMax) {
  return {
    baseAngle, fromCenter, baseLen,
    angDisp: 0, angVel: 0, lenDisp: 0, lenVel: 0, bendDisp: 0, bendVel: 0,
    aw1: 0.04 + Math.random() * 0.06, aw2: 0.10 + Math.random() * 0.12,
    aw3: 0.22 + Math.random() * 0.18,
    aa1: 0.012 + Math.random() * 0.016, aa2: 0.006 + Math.random() * 0.010,
    aa3: 0.002 + Math.random() * 0.005,
    ap1: Math.random() * Math.PI * 2, ap2: Math.random() * Math.PI * 2,
    ap3: Math.random() * Math.PI * 2,
    lw1: 0.03 + Math.random() * 0.05, la1: 0.04 + Math.random() * 0.06,
    lp1: Math.random() * Math.PI * 2,
    bw1: 0.05 + Math.random() * 0.07, ba1: 0.008 + Math.random() * 0.012,
    bp1: Math.random() * Math.PI * 2,
    thickness: thickMin + Math.random() * (thickMax - thickMin),
    hasTick: Math.random() > 0.35, tickPos: 0.50 + Math.random() * 0.45,
    ripple: 0, rippleVel: 0, lenRipple: 0, lenRippleVel: 0,
  };
}

// ── All rays from 0° to 180° ONLY (upward) ───────────────────────────
// Original 500 + 2000 extra = 2500 total rays
// All strictly between 0 and π — NO rays below 180°
/* Quantisation for batched drawing (alpha in 1/40 steps, width in 0.1px steps). */
const ALPHA_STEPS = 40;
const WIDTH_STEPS = 10;

function buildRays() {
  const rays = [];

  // Size groups for all rays — 75% big+medium, 25% small+tiny
  const groups = [
    { count: 250, minLen: 18,  maxLen: 55,  thick: [0.3, 0.6]  }, // tiny
    { count: 375, minLen: 56,  maxLen: 120, thick: [0.4, 0.75] }, // small
    { count: 1000, minLen: 121, maxLen: 230, thick: [0.5, 0.9]  }, // medium
    { count: 875, minLen: 231, maxLen: 370, thick: [0.6, 1.1]  }, // big
  ];

  groups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // Weighted angle distribution: denser toward center (90°)
      const u  = Math.random();
      const tc = u < 0.5
        ? 0.5 - Math.sqrt(0.5 * (0.5 - u) * 2) * 0.5
        : 0.5 + Math.sqrt(0.5 * (u - 0.5) * 2) * 0.5;
      const mix  = Math.random() * 0.45 + tc * 0.55;
      // Strictly 0→π (0° to 180°) — ONLY upward
      const baseAngle = Math.PI * 0.001 + Math.PI * 0.998 * mix;
      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);
      rays.push(createRay(baseAngle, fromCenter, baseLen, thick[0], thick[1]));
    }
  });

  // ── EXTRA LEFT-SIDE RAYS (near 180°, angles ~150°→180°) — 200 rays ──
  // 100 medium + 100 big
  const leftExtraGroups = [
    { count: 100, minLen: 121, maxLen: 230, thick: [0.5, 0.9]  }, // medium
    { count: 100, minLen: 231, maxLen: 370, thick: [0.6, 1.1]  }, // big
  ];

  leftExtraGroups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // Angles concentrated near left side: ~150° to 180° (5π/6 to π)
      const baseAngle = Math.PI * (5/6) + Math.random() * (Math.PI * (1/6));
      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);
      rays.push(createRay(baseAngle, fromCenter, baseLen, thick[0], thick[1]));
    }
  });

  // ── EXTRA RIGHT-SIDE RAYS (near 0°, angles ~0°→30°) — 200 rays ────
  // 100 medium + 100 big
  const rightExtraGroups = [
    { count: 100, minLen: 121, maxLen: 230, thick: [0.5, 0.9]  }, // medium
    { count: 100, minLen: 231, maxLen: 370, thick: [0.6, 1.1]  }, // big
  ];

  rightExtraGroups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // Angles concentrated near right side: ~0° to 30° (0 to π/6)
      const baseAngle = Math.PI * 0.001 + Math.random() * (Math.PI * (1/6));
      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);
      rays.push(createRay(baseAngle, fromCenter, baseLen, thick[0], thick[1]));
    }
  });

  // ── SCATTERED LEFT-SIDE RAYS (near 180°, more spread) — 50 rays ───
  // 35 large (bigger than medium) + 15 big
  const leftScatteredGroups = [
    { count: 35, minLen: 200, maxLen: 300, thick: [0.6, 1.0]  }, // large (between medium & big)
    { count: 15, minLen: 280, maxLen: 370, thick: [0.7, 1.1]  }, // big
  ];

  leftScatteredGroups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // More scattered: ~140° to 180° (7π/9 to π)
      const baseAngle = Math.PI * (7/9) + Math.random() * (Math.PI * (2/9));
      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);
      rays.push(createRay(baseAngle, fromCenter, baseLen, thick[0], thick[1]));
    }
  });

  // ── SCATTERED RIGHT-SIDE RAYS (near 0°, more spread) — 50 rays ────
  // 35 large (bigger than medium) + 15 big
  const rightScatteredGroups = [
    { count: 35, minLen: 200, maxLen: 300, thick: [0.6, 1.0]  }, // large
    { count: 15, minLen: 280, maxLen: 370, thick: [0.7, 1.1]  }, // big
  ];

  rightScatteredGroups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // More scattered: ~0° to 40° (0 to 2π/9)
      const baseAngle = Math.PI * 0.001 + Math.random() * (Math.PI * (2/9));
      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);
      rays.push(createRay(baseAngle, fromCenter, baseLen, thick[0], thick[1]));
    }
  });

  // Assign idx to each ray for ripple propagation
  rays.forEach((ray, i) => { ray.idx = i; });

  return rays;
}

export default function StripeSection() {
  const [isDark,   setIsDark]   = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const canvasRef = useRef(null);
  // Build once, stable reference
  const raysRef   = useRef(null);
  if (!raysRef.current) raysRef.current = buildRays();

  const animRef  = useRef(null);
  const timeRef  = useRef(0);
  const lastTRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false, vx: 0, vy: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const prev = mouseRef.current;
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    mouseRef.current = {
      x: nx, y: ny, active: true,
      vx: nx - prev.x,
      vy: ny - prev.y,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false, vx: 0, vy: 0 };
  }, []);

  // isDark ref to avoid stale closure in draw
  const isDarkRef   = useRef(isDark);
  const isPausedRef = useRef(isPaused);
  useEffect(() => { isDarkRef.current = isDark; },   [isDark]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx  = canvas.getContext("2d");
    const W    = canvas.width;
    const H    = canvas.height;
    const dark = isDarkRef.current;
    const paused = isPausedRef.current;

    const rawDt = Math.min((timestamp - lastTRef.current) / 1000, 0.05);
    lastTRef.current = timestamp;
    const dt = paused ? 0 : rawDt;
    if (!paused) timeRef.current += dt;
    const t = timeRef.current;

    const ox = W * 0.5;
    const oy = H * 1.02;  // origin just below canvas bottom
    const scale = Math.min(H / 500, 1); // 1.0 on desktop, smaller on mobile

    ctx.clearRect(0, 0, W, H);

    // ── Background ──────────────────────────────────────────────────────
    if (dark) {
      ctx.fillStyle = "#1a1f6e";
      ctx.fillRect(0, 0, W, H);
      const bgR = ctx.createRadialGradient(ox, H * 0.45, 0, ox, H * 0.45, W * 0.7);
      bgR.addColorStop(0,   "rgba(55,65,195,0.5)");
      bgR.addColorStop(0.6, "rgba(22,27,130,0.2)");
      bgR.addColorStop(1,   "rgba(8,10,70,0.0)");
      ctx.fillStyle = bgR; ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "#eef2f8";
      ctx.fillRect(0, 0, W, H);
      const bgL = ctx.createLinearGradient(0, 0, 0, H);
      bgL.addColorStop(0,   "rgba(208,224,244,0.9)");
      bgL.addColorStop(0.7, "rgba(226,237,250,0.5)");
      bgL.addColorStop(1,   "rgba(238,244,252,0.0)");
      ctx.fillStyle = bgL; ctx.fillRect(0, 0, W, H);
    }

    // ── Origin glow ──────────────────────────────────────────────────────
    if (dark) {
      const gs = W * 0.44;
      const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, gs);
      g.addColorStop(0,    "rgba(255,255,255,0.96)");
      g.addColorStop(0.06, "rgba(215,225,255,0.62)");
      g.addColorStop(0.20, "rgba(150,175,255,0.28)");
      g.addColorStop(0.50, "rgba(90,120,230,0.10)");
      g.addColorStop(1,    "rgba(50,80,200,0.00)");
      ctx.beginPath(); ctx.arc(ox, oy, gs, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();
    } else {
      const gs = W * 0.56;
      const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, gs);
      g.addColorStop(0,    "rgba(255,218,80,1.0)");
      g.addColorStop(0.05, "rgba(255,192,48,0.88)");
      g.addColorStop(0.14, "rgba(248,162,26,0.62)");
      g.addColorStop(0.28, "rgba(235,145,18,0.38)");
      g.addColorStop(0.50, "rgba(215,175,80,0.16)");
      g.addColorStop(0.72, "rgba(200,205,225,0.05)");
      g.addColorStop(1,    "rgba(190,210,230,0.00)");
      ctx.beginPath(); ctx.arc(ox, oy, gs, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();
    }

    // ── Physics + Animation ──────────────────────────────────────────────
    const mouse = mouseRef.current;
    const rays  = raysRef.current;

    // Spring physics constants
    const K_BEND  = 0.12;   // Spring stiffness for bend
    const K_BDAMP = 0.88;   // Damping for bend velocity

    // Max bend: ~30 degrees = 0.52 radians
    const MAX_BEND = 0.52;

    // Cursor interaction radius
    const CURSOR_RADIUS = 180;
    const MAX_CURSOR_PUSH = 0.45; // Max bend from cursor

    const rayBatches = new Map();
    const dotBatches = new Map();

    rays.forEach((ray) => {
      // ── Calculate ray midpoint for hover detection ──────────────────
      const midX = ox + Math.cos(ray.baseAngle) * ray.baseLen * 0.5;
      const midY = oy - Math.sin(ray.baseAngle) * ray.baseLen * 0.5;

      // ── Idle wind animation (wave-based, non-linear) ────────────────
      let targetBend = 0;
      if (!paused) {
        // 3-second cycle envelope: gradually build up, peak, then fade away
        const cycleDuration = 3.0; // seconds
        const cyclePhase = (t % cycleDuration) / cycleDuration; // 0 to 1
        // Smooth envelope using sine: 0 -> 1 -> 0 over the cycle
        const envelope = Math.sin(cyclePhase * Math.PI);
        
        // Multiple overlapping waves for organic movement
        // Use ray angle and position for spatial variation
        const spatialOffset = ray.baseAngle * 2.5 + ray.fromCenter * 3.0;
        
        // Wave 1: Slow sweeping wave
        const wave1 = Math.sin(t * ray.bw1 * 0.8 + spatialOffset + ray.bp1) * ray.ba1 * 12;
        
        // Wave 2: Medium frequency wave (perpendicular feel)
        const wave2 = Math.sin(t * ray.aw1 * 1.2 + ray.baseAngle * 1.8 + ray.ap1) * ray.aa1 * 8;
        
        // Wave 3: Fast subtle variation
        const wave3 = Math.sin(t * ray.aw2 * 0.6 + ray.fromCenter * 4.0 + ray.ap2) * ray.aa2 * 5;
        
        // Wave 4: Very slow drift for direction changes
        const wave4 = Math.sin(t * 0.15 + ray.baseAngle * 0.7 + ray.ap3) * ray.aa3 * 15;
        
        // Combine waves with position-based amplitude modulation and envelope
        const amplitudeMod = 0.6 + ray.fromCenter * 0.4; // Outer rays move more
        targetBend = (wave1 + wave2 + wave3 + wave4) * amplitudeMod * envelope;
      }

      // ── Cursor hover effect (don't-touch-me) ────────────────────────
      let cursorPush = 0;
      if (mouse.active) {
        const dx = midX - mouse.x;
        const dy = midY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CURSOR_RADIUS) {
          // Calculate push strength (stronger when closer)
          const proximity = 1 - dist / CURSOR_RADIUS;
          const pushStrength = proximity * proximity * MAX_CURSOR_PUSH;
          
          // Push direction: away from cursor
          // Determine if cursor is to the left or right of the ray
          const rayDirX = Math.cos(ray.baseAngle);
          const rayDirY = -Math.sin(ray.baseAngle);
          const cursorToMidX = dx;
          const cursorToMidY = dy;
          
          // Cross product to determine which side cursor is on
          const cross = rayDirX * cursorToMidY - rayDirY * cursorToMidX;
          
          // Bend away from cursor
          cursorPush = cross > 0 ? -pushStrength : pushStrength;
        }
      }

      // ── Spring physics update ───────────────────────────────────────
      const totalTarget = targetBend + cursorPush;
      
      // Clamp target to max bend
      const clampedTarget = Math.max(-MAX_BEND, Math.min(MAX_BEND, totalTarget));
      
      // Spring force toward target
      const springForce = (clampedTarget - ray.bendDisp) * K_BEND;
      ray.bendVel += springForce;
      ray.bendVel *= K_BDAMP; // Damping
      ray.bendDisp += ray.bendVel * (paused ? 0 : 1);
      
      // Clamp final displacement
      ray.bendDisp = Math.max(-MAX_BEND, Math.min(MAX_BEND, ray.bendDisp));

      // ── Render with bend (quadratic curve) ──────────────────────────
      const angle = ray.baseAngle;
      const len = ray.baseLen * scale;
      const bendAmt = ray.bendDisp;

      // Start point (origin)
      const sx = ox;
      const sy = oy;

      // End point (tip) - adjusted for bend
      const bendedAngle = angle + bendAmt * 0.5; // Tip bends partially
      const ex = ox + Math.cos(bendedAngle) * len;
      const ey = oy - Math.sin(bendedAngle) * len;

      // Control point at midpoint, offset perpendicular to ray
      const midLen = len * 0.5;
      const perpAngle = angle + Math.PI * 0.5; // Perpendicular direction
      const controlOffset = bendAmt * midLen * 0.8; // Bend amount affects control point
      const cx = ox + Math.cos(angle) * midLen + Math.cos(perpAngle) * controlOffset;
      const cy = oy - Math.sin(angle) * midLen - Math.sin(perpAngle) * controlOffset;

      const fromCenter = ray.fromCenter;
      const alpha = dark
        ? 0.50 - fromCenter * 0.16
        : 0.60 - fromCenter * 0.20;

      // Batch by quantised alpha + width: a few dozen strokes per frame instead of
      // one per ray (2,500), which is what made this section expensive to paint.
      const aKey = Math.round(alpha * ALPHA_STEPS);
      const wKey = Math.round(ray.thickness * scale * WIDTH_STEPS);
      const key = aKey * 1000 + wKey;
      let batch = rayBatches.get(key);
      if (!batch) { batch = new Path2D(); rayBatches.set(key, batch); }
      batch.moveTo(sx, sy);
      batch.quadraticCurveTo(cx, cy, ex, ey);

      // Tick dot — night theme at tip of all rays, day theme at middle (original)
      if (dark) {
        const r = ray.thickness * 1.8 * scale;
        let dots = dotBatches.get(aKey);
        if (!dots) { dots = new Path2D(); dotBatches.set(aKey, dots); }
        dots.moveTo(ex + r, ey);
        dots.arc(ex, ey, r, 0, Math.PI * 2);
      } else if (ray.hasTick) {
        // For curved ray, interpolate along the curve
        const tVal = ray.tickPos;
        const qx = (1-tVal)*(1-tVal)*sx + 2*(1-tVal)*tVal*cx + tVal*tVal*ex;
        const qy = (1-tVal)*(1-tVal)*sy + 2*(1-tVal)*tVal*cy + tVal*tVal*ey;
        const r = ray.thickness * 1.5 * scale;
        let dots = dotBatches.get(aKey);
        if (!dots) { dots = new Path2D(); dotBatches.set(aKey, dots); }
        dots.moveTo(qx + r, qy);
        dots.arc(qx, qy, r, 0, Math.PI * 2);
      }
    });

    ctx.lineCap = "round";
    rayBatches.forEach((path, key) => {
      const aKey = Math.floor(key / 1000);
      const wKey = key % 1000;
      ctx.strokeStyle = dark
        ? `rgba(200,215,255,${aKey / ALPHA_STEPS})`
        : `rgba(48,68,168,${aKey / ALPHA_STEPS})`;
      ctx.lineWidth = wKey / WIDTH_STEPS;
      ctx.stroke(path);
    });
    dotBatches.forEach((path, aKey) => {
      const alpha = aKey / ALPHA_STEPS;
      ctx.fillStyle = dark
        ? `rgba(220,232,255,${alpha + 0.25})`
        : `rgba(48,68,168,${alpha + 0.20})`;
      ctx.fill(path);
    });

    if (animRef.current) animRef.current = requestAnimationFrame(draw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Run the canvas animation only while it is on screen and the tab is visible.
  // A loop that never stops repaints a full-width canvas every frame and makes
  // the whole home page stutter while scrolling.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let onScreen = false;

    const start = () => {
      if (animRef.current || !onScreen || document.hidden) return;
      lastTRef.current = performance.now();
      animRef.current = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    }, { rootMargin: '100px 0px' });
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [draw]);

  return (
    <section className={`${styles.stripeSection}${isDark ? ` ${styles.dark}` : ""}`}>

      <div className={styles.statsRow}>
        {[
          { num: "4",      label: "products in the\nAnoryx EcoSystem" },
          { num: "4",      label: "patents filed\nfor AI privacy tech" },
          { num: "5+",     label: "industry sectors\nserved globally" },
          { num: "100%",   label: "privacy-first\nengineering approach" },
        ].map((s) => (
          <div key={s.num} className={styles.statItem}>
            <div className={styles.statNumber}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div
        className={styles.animationWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className={styles.canvasBg} />
        <div className={styles.controls}>
          <button
            className={styles.ctrlBtn}
            onClick={() => setIsPaused(p => !p)}
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused
              ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            }
          </button>
          <button
            className={styles.ctrlBtn}
            onClick={() => setIsDark(d => !d)}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark
              ? <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              : <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            }
          </button>
        </div>
      </div>

      <div className={styles.sectionText}>
        <p className={styles.sectionTitle}>
          <strong>Building intelligent systems for the future.</strong>{" "}
          <span className={styles.highlight}>Transform your enterprise with AI-powered automation, privacy protection, and next-generation digital platforms.</span>
        </p>
      </div>

    </section>
  );
}


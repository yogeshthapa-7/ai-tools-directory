"use client";

import { useEffect, useRef } from "react";

const PALETTE = {
  light: {
    gradientTop: "#f4f4f2",
    gradientBottom: "#dcdcd8",
    node: "#8a8a86",
    nodeCore: "#6e6e6a",
    edge: "#a8a8a4",
    signal: "#7d7d79",
    glow: "rgba(140,140,136,0.18)",
  },
  dark: {
    gradientTop: "#232323",
    gradientBottom: "#141414",
    node: "#5a5a58",
    nodeCore: "#767673",
    edge: "#3f3f3d",
    signal: "#8a8a87",
    glow: "rgba(150,150,146,0.12)",
  },
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
};

type Edge = {
  a: number;
  b: number;
  signal: number;
  signalSpeed: number;
  active: boolean;
};

function isDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function BackgroundDesign() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const target = canvas;
    const context = ctx;

    let raf = 0;
    let width = 0;
    let height = 0;
    let running = true;
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      target.width = width * dpr;
      target.height = height * dpr;
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNetwork();
    }

    function buildNetwork() {
      const area = width * height;
      const nodeCount = Math.min(90, Math.max(35, Math.floor(area / 22000)));
      nodes = [];
      edges = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1.6 + Math.random() * 2.4,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.014,
        });
      }

      const linkDist = Math.min(190, Math.max(120, Math.sqrt(area / nodeCount) * 1.9));
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            edges.push({
              a: i,
              b: j,
              signal: Math.random(),
              signalSpeed: 0.002 + Math.random() * 0.004,
              active: Math.random() > 0.55,
            });
          }
        }
      }
    }

    function draw() {
      if (!running) return;
      const p = isDark() ? PALETTE.dark : PALETTE.light;

      const grad = context.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, p.gradientTop);
      grad.addColorStop(1, p.gradientBottom);
      context.fillStyle = grad;
      context.fillRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
        n.pulse += n.pulseSpeed;
      }

      for (const e of edges) {
        if (e.active) {
          e.signal += e.signalSpeed;
          if (e.signal > 1) e.signal = 0;
        } else if (Math.random() < 0.0004) {
          e.active = true;
          e.signal = 0;
        }
      }

      context.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 0.35 - dist / 600);

        context.strokeStyle = p.edge;
        context.globalAlpha = alpha;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();

        if (e.active) {
          const sx = a.x + (b.x - a.x) * e.signal;
          const sy = a.y + (b.y - a.y) * e.signal;
          context.globalAlpha = alpha * 2.2;
          context.strokeStyle = p.signal;
          context.lineWidth = 1.4;
          context.beginPath();
          context.moveTo(a.x + (b.x - a.x) * Math.max(0, e.signal - 0.12), a.y + (b.y - a.y) * Math.max(0, e.signal - 0.12));
          context.lineTo(sx, sy);
          context.stroke();
          context.lineWidth = 1;

          context.globalAlpha = alpha * 3;
          context.fillStyle = p.signal;
          context.beginPath();
          context.arc(sx, sy, 1.8, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (const n of nodes) {
        const pulseR = n.r + Math.sin(n.pulse) * 0.7;
        const glowR = pulseR * 4.5;

        const glow = context.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        glow.addColorStop(0, p.glow);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        context.globalAlpha = 1;
        context.fillStyle = glow;
        context.beginPath();
        context.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = 0.85;
        context.fillStyle = p.node;
        context.beginPath();
        context.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = 1;
        context.fillStyle = p.nodeCore;
        context.beginPath();
        context.arc(n.x, n.y, pulseR * 0.45, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onThemeChange = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    mediaQuery.addEventListener("change", onThemeChange);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", onThemeChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

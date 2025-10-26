"use client";
import { useEffect, useRef } from "react";

type Curve = { ax:number; ay:number; bx:number; by:number; cx:number; cy:number; dx:number; dy:number };

type Props = {
  minHeightPx?: number;
  beamWidth?: number;
  spawnRate?: number;
  speed?: number;
  trail?: number;
  gridOpacity?: number;
  color?: string;
  curveCount?: number;
  directionBias?: number;
  devicePixelRatio?: number;
  respectReducedMotion?: boolean;
  debugOverlay?: boolean;
  clipPaddingPx?: number;
  glowOuterScale?: number;
};

export default function MovingLightNetworkCanvas({
  minHeightPx = 360,
  beamWidth = 2.0,
  spawnRate = 10,
  speed = 380,
  trail = 0.86,
  gridOpacity = 0.06,
  color = "#0ea5e9",
  curveCount = 16,
  directionBias = -0.2,
  devicePixelRatio,
  respectReducedMotion = true,
  debugOverlay = false,
  clipPaddingPx = 8,
  glowOuterScale = 4.0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const DPR = devicePixelRatio ?? window.devicePixelRatio ?? 1;

    // offscreen buffers
    const glow = document.createElement("canvas");
    const mask = document.createElement("canvas");
    const gctx = glow.getContext("2d", { alpha: true })!;
    const mctx = mask.getContext("2d", { alpha: true })!;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const reduceActive = prefersReduced && respectReducedMotion;

    const resize = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = Math.max(parent.clientHeight, minHeightPx);

      for (const c of [canvas, glow, mask]) {
        c.width = Math.floor(w * DPR);
        c.height = Math.floor(h * DPR);
        c.style.width = w + "px";
        c.style.height = h + "px";
      }
      // drawing with CSS pixels (apply DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      gctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      mctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const rand = (a:number,b:number)=>Math.random()*(b-a)+a;
    const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;

    const W = () => canvas.clientWidth;
    const H = () => canvas.clientHeight;

    // direction-biased edge picker
    const pickEdge = (w:number,h:number): [number,number] => {
      const t = Math.random();
      const bias = directionBias;
      const wLeft  = 0.25 + (bias < 0 ? Math.min(0.15, -bias*0.2) : 0);
      const wRight = 0.25 + (bias > 0 ? Math.min(0.15,  bias*0.2) : 0);
      const wTop   = 0.25 + (bias > 0 ? Math.min(0.15,  bias*0.2) : 0);
      const wBot   = 0.25 + (bias < 0 ? Math.min(0.15, -bias*0.2) : 0);
      const sum = wLeft+wRight+wTop+wBot;
      const r = t*sum;
      if (r < wLeft)  return [0, rand(0.15*h, 0.85*h)];
      if (r < wLeft+wRight) return [w, rand(0.15*h, 0.85*h)];
      if (r < wLeft+wRight+wTop) return [rand(0.15*w, 0.85*w), 0];
      return [rand(0.15*w, 0.85*w), h];
    };

    const makeCurve = () => {
      const w = W(), h = H();
      const [ax, ay] = pickEdge(w,h);
      const [dx, dy] = pickEdge(w,h);
      const cx = rand(0.32*w, 0.68*w);
      const cy = rand(0.28*h, 0.72*h);
      const bx = rand(0.32*w, 0.68*w);
      const by = rand(0.28*h, 0.72*h);
      return { ax, ay, bx, by, cx, cy, dx, dy };
    };

    const curves = Array.from({length: curveCount}, makeCurve);

    type Particle = { c: Curve; t: number; vt: number; life: number; };
    const particles: Particle[] = [];

    const pt = (c:Curve, t:number) => {
      const it = 1 - t;
      const it2 = it*it, t2 = t*t;
      const x = it2*it*c.ax + 3*it2*t*c.bx + 3*it*t2*c.cx + t2*t*c.dx;
      const y = it2*it*c.ay + 3*it2*t*c.by + 3*it*t2*c.cy + t2*t*c.dy;
      return {x,y};
    };

    let spawnAcc = 0;
    let last = performance.now();
    let frames = 0, lastFpsAt = last, approxFps = 60;

    const loop = (now:number) => {
      const dt = Math.min(0.05, (now - last)/1000);
      last = now;

      const w = W(), h = H();

      // background trail fade
      ctx.setTransform(DPR,0,0,DPR,0,0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(10,10,10,${1 - trail})`;
      ctx.fillRect(0,0,w,h);

      // grid
      if (gridOpacity > 0) {
        ctx.save();
        ctx.globalAlpha = gridOpacity;
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1;
        const step = 28;
        for (let x=0;x<w;x+=step){ ctx.beginPath(); ctx.moveTo(x+0.5,0); ctx.lineTo(x+0.5,h); ctx.stroke(); }
        for (let y=0;y<h;y+=step){ ctx.beginPath(); ctx.moveTo(0,y+0.5); ctx.lineTo(w,y+0.5); ctx.stroke(); }
        ctx.restore();
      }

      // tubes (guide)
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = beamWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const c of curves) {
        ctx.beginPath();
        ctx.moveTo(c.ax, c.ay);
        ctx.bezierCurveTo(c.bx, c.by, c.cx, c.cy, c.dx, c.dy);
        ctx.stroke();
      }

      // spawn
      const effectiveSpawn = (prefersReduced && respectReducedMotion) ? 0 : spawnRate;
      const effectiveSpeed = (prefersReduced && respectReducedMotion) ? speed * 0.5 : speed;

      spawnAcc += effectiveSpawn * dt;
      const spawnN = Math.floor(spawnAcc);
      spawnAcc -= spawnN;
      for (let i=0;i<spawnN;i++){
        const c = curves[Math.floor(Math.random()*curves.length)];
        const vt = (0.8 + 0.4*Math.random()) * (effectiveSpeed / 1000);
        particles.push({ c, t: 0, vt, life: 0.95 + 0.1*Math.random() });
      }

      // ---- glow buffer (with DPR transform) ----
      // clear
      gctx.setTransform(1,0,0,1,0,0);
      gctx.clearRect(0,0,glow.width, glow.height);
      gctx.setTransform(DPR,0,0,DPR,0,0);

      gctx.globalCompositeOperation = "lighter";
      const rCore = Math.max(1, beamWidth*1.5);
      const rGlow = rCore * glowOuterScale;

      for (let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        p.t += p.vt * (dt * 1000);
        if (p.t >= p.life){ particles.splice(i,1); continue; }
        const {x,y} = pt(p.c, Math.min(1, p.t / p.life));

        const grad = gctx.createRadialGradient(x,y,0, x,y, rGlow);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        gctx.fillStyle = grad;
        gctx.beginPath(); gctx.arc(x,y, rGlow, 0, Math.PI*2); gctx.fill();

        gctx.fillStyle = color;
        gctx.beginPath(); gctx.arc(x,y, rCore, 0, Math.PI*2); gctx.fill();
      }

      // ---- mask buffer (with DPR transform) ----
      mctx.setTransform(1,0,0,1,0,0);
      mctx.clearRect(0,0,mask.width, mask.height);
      mctx.setTransform(DPR,0,0,DPR,0,0);

      mctx.globalCompositeOperation = "source-over";
      mctx.strokeStyle = "white";
      mctx.lineWidth = beamWidth + clipPaddingPx*2;
      mctx.lineCap = "round";
      mctx.lineJoin = "round";
      for (const c of curves) {
        mctx.beginPath();
        mctx.moveTo(c.ax, c.ay);
        mctx.bezierCurveTo(c.bx, c.by, c.cx, c.cy, c.dx, c.dy);
        mctx.stroke();
      }

      // ---- apply mask: temporarily reset transform to identity! ----
      gctx.setTransform(1,0,0,1,0,0);
      gctx.globalCompositeOperation = "destination-in";
      gctx.drawImage(mask, 0, 0);           // pixel-to-pixel
      gctx.globalCompositeOperation = "source-over";
      gctx.setTransform(DPR,0,0,DPR,0,0);   // restore DPR

      // ---- compose to main: also draw at identity, then restore DPR ----
      ctx.setTransform(1,0,0,1,0,0);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(glow, 0, 0);
      ctx.setTransform(DPR,0,0,DPR,0,0);

      // debug overlay
      if (debugOverlay) {
        frames++;
        if (now - lastFpsAt > 500) {
          approxFps = Math.round((frames * 1000) / (now - lastFpsAt));
          lastFpsAt = now; frames = 0;
        }
        ctx.setTransform(DPR,0,0,DPR,0,0);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(w-170, h-50, 166, 42);
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(`particles: ${particles.length}`, w-160, h-30);
        ctx.fillText(`fps~: ${approxFps}`, w-160, h-14);
      }

      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [
    minHeightPx, beamWidth, spawnRate, speed, trail, gridOpacity, color,
    curveCount, directionBias, devicePixelRatio, respectReducedMotion,
    debugOverlay, clipPaddingPx, glowOuterScale
  ]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none block w-full h-[--minH]"
      style={{["--minH" as any]: `${minHeightPx}px`}}
    />
  );
}

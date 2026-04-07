import { useEffect, useRef } from "react";

const HeroVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    // Neural network layers config
    const layers = [6, 8, 10, 8, 6, 4];
    const layerColors = [
      "rgba(37, 99, 235, 0.7)",
      "rgba(59, 130, 246, 0.6)",
      "rgba(96, 165, 250, 0.5)",
      "rgba(96, 165, 250, 0.5)",
      "rgba(59, 130, 246, 0.6)",
      "rgba(37, 99, 235, 0.7)",
    ];

    const draw = () => {
      time += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // === 1. Physiological signal waves (left side input) ===
      const signalAreaW = w * 0.3;
      const signalStartX = w * 0.02;

      // ECG-like wave
      ctx.strokeStyle = "rgba(37, 99, 235, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < signalAreaW; x += 2) {
        const nx = x / signalAreaW;
        const phase = (nx * 8 + time * 2) % 8;
        let y = 0;
        if (phase > 3.0 && phase < 3.3) y = -0.8;
        else if (phase > 3.3 && phase < 3.5) y = 1.2;
        else if (phase > 3.5 && phase < 3.7) y = -0.3;
        else y = Math.sin(phase * 0.5) * 0.05;
        const py = h * 0.2 - y * h * 0.08;
        x === 0 ? ctx.moveTo(signalStartX + x, py) : ctx.lineTo(signalStartX + x, py);
      }
      ctx.stroke();

      // Respiration wave
      ctx.strokeStyle = "rgba(96, 165, 250, 0.4)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let x = 0; x < signalAreaW; x += 2) {
        const nx = x / signalAreaW;
        const breath = Math.sin(nx * 3 + time * 0.7) * 0.6;
        const py = h * 0.38 - breath * h * 0.06;
        x === 0 ? ctx.moveTo(signalStartX + x, py) : ctx.lineTo(signalStartX + x, py);
      }
      ctx.stroke();

      // BCG / heart motion wave
      ctx.strokeStyle = "rgba(147, 197, 253, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < signalAreaW; x += 2) {
        const nx = x / signalAreaW;
        const bcg =
          Math.sin(nx * 10 + time * 2.5) * 0.15 +
          Math.exp(-Math.pow(((nx * 5 + time * 1.8) % 5) - 2.5, 2) * 6) * 0.6;
        const py = h * 0.55 - bcg * h * 0.07;
        x === 0 ? ctx.moveTo(signalStartX + x, py) : ctx.lineTo(signalStartX + x, py);
      }
      ctx.stroke();

      // SpO2 / slow oscillation
      ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < signalAreaW; x += 2) {
        const nx = x / signalAreaW;
        const spo2 = Math.sin(nx * 2 + time * 0.4) * 0.4 + Math.sin(nx * 6 + time) * 0.1;
        const py = h * 0.7 - spo2 * h * 0.05;
        x === 0 ? ctx.moveTo(signalStartX + x, py) : ctx.lineTo(signalStartX + x, py);
      }
      ctx.stroke();

      // === 2. Data flow particles (signals → model) ===
      const flowStartX = signalAreaW + w * 0.02;
      const flowEndX = w * 0.38;
      for (let i = 0; i < 12; i++) {
        const progress = ((time * 0.4 + i * 0.08) % 1);
        const px = flowStartX + progress * (flowEndX - flowStartX);
        const py = h * 0.15 + (i % 4) * h * 0.18 + Math.sin(time * 2 + i) * h * 0.02;
        const alpha = Math.sin(progress * Math.PI) * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();
      }

      // === 3. Neural network (center-right, the "大模型") ===
      const nnStartX = w * 0.4;
      const nnEndX = w * 0.88;
      const nnCenterY = h * 0.5;
      const nnHeight = h * 0.7;

      // Calculate node positions
      const nodePositions: { x: number; y: number }[][] = [];
      layers.forEach((count, li) => {
        const lx = nnStartX + (li / (layers.length - 1)) * (nnEndX - nnStartX);
        const positions: { x: number; y: number }[] = [];
        for (let ni = 0; ni < count; ni++) {
          const ny = nnCenterY - nnHeight * 0.5 + ((ni + 0.5) / count) * nnHeight;
          positions.push({ x: lx, y: ny });
        }
        nodePositions.push(positions);
      });

      // Draw connections with pulsing
      for (let li = 0; li < nodePositions.length - 1; li++) {
        const curr = nodePositions[li];
        const next = nodePositions[li + 1];
        curr.forEach((n1, i) => {
          next.forEach((n2, j) => {
            const pulse = Math.sin(time * 1.5 + i * 0.3 + j * 0.2 + li) * 0.5 + 0.5;
            const alpha = 0.03 + pulse * 0.06;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          });
        });
      }

      // Draw signal propagation along connections
      for (let li = 0; li < nodePositions.length - 1; li++) {
        const curr = nodePositions[li];
        const next = nodePositions[li + 1];
        const signalProgress = ((time * 0.8 + li * 0.15) % 1);
        const si = Math.floor(signalProgress * curr.length) % curr.length;
        const di = Math.floor((signalProgress * 3 + li) % next.length);
        const n1 = curr[si];
        const n2 = next[di];
        const sx = n1.x + (n2.x - n1.x) * signalProgress;
        const sy = n1.y + (n2.y - n1.y) * signalProgress;
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
        glow.addColorStop(0, "rgba(59, 130, 246, 0.6)");
        glow.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(sx - 8, sy - 8, 16, 16);
      }

      // Draw nodes
      nodePositions.forEach((layer, li) => {
        layer.forEach((node, ni) => {
          const pulse = Math.sin(time * 2 + ni * 0.5 + li * 0.7) * 0.4 + 0.6;
          const r = 3 + pulse * 2;

          // Glow
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
          glow.addColorStop(0, `rgba(59, 130, 246, ${pulse * 0.3})`);
          glow.addColorStop(1, "rgba(59, 130, 246, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - r * 3, node.y - r * 3, r * 6, r * 6);

          // Node
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = layerColors[li] || "rgba(59, 130, 246, 0.5)";
          ctx.fill();
        });
      });

      // === 4. Output indicators (right side) ===
      const outX = w * 0.92;
      const outLabels = 3;
      for (let i = 0; i < outLabels; i++) {
        const oy = h * 0.3 + i * h * 0.2;
        const pulse = Math.sin(time * 1.5 + i * 1.2) * 0.5 + 0.5;
        
        // Connecting line from last layer
        const lastLayer = nodePositions[nodePositions.length - 1];
        const nearestNode = lastLayer[Math.min(i + 1, lastLayer.length - 1)];
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 + pulse * 0.15})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(nearestNode.x, nearestNode.y);
        ctx.lineTo(outX, oy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Output dot
        const gr = ctx.createRadialGradient(outX, oy, 0, outX, oy, 12);
        gr.addColorStop(0, `rgba(37, 99, 235, ${0.5 + pulse * 0.3})`);
        gr.addColorStop(1, "rgba(37, 99, 235, 0)");
        ctx.fillStyle = gr;
        ctx.fillRect(outX - 12, oy - 12, 24, 24);
        ctx.beginPath();
        ctx.arc(outX, oy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${0.6 + pulse * 0.3})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
};

export default HeroVisual;

import { useEffect, useRef } from "react";

const LABELS = [
  "BCG", "ECG", "EEG", "Sleep Age", "Aging Speed",
  "Disorders", "Diseases", "Heartbeat", "Breath",
];

interface Node {
  baseX: number; baseY: number; baseZ: number;
  x: number; y: number; z: number;
  label?: string;
}

const PlexusEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ currentX: 0, currentY: 0, autoY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initNodes = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const nodes: Node[] = [];

      // Labeled nodes — sphere arrangement
      LABELS.forEach((label, i) => {
        const phi = Math.acos(-1 + (2 * i) / LABELS.length);
        const theta = Math.sqrt(LABELS.length * Math.PI) * phi;
        const r = Math.min(w, h) * 0.3;
        const bx = cx + r * Math.cos(theta) * Math.sin(phi);
        const by = cy + r * Math.sin(theta) * Math.sin(phi);
        const bz = r * Math.cos(phi);
        nodes.push({ baseX: bx, baseY: by, baseZ: bz, x: bx, y: by, z: bz, label });
      });

      // Structure nodes
      for (let i = 0; i < 40; i++) {
        const phi2 = Math.random() * Math.PI * 2;
        const theta2 = Math.random() * Math.PI;
        const r2 = Math.min(w, h) * (0.15 + Math.random() * 0.25);
        const bx = cx + r2 * Math.cos(phi2) * Math.sin(theta2);
        const by = cy + r2 * Math.sin(phi2) * Math.sin(theta2);
        const bz = r2 * Math.cos(theta2);
        nodes.push({ baseX: bx, baseY: by, baseZ: bz, x: bx, y: by, z: bz });
      }

      nodesRef.current = nodes;
    };

    resize();
    initNodes();

    const onResize = () => { resize(); initNodes(); };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const project = (node: Node, rotX: number, rotY: number) => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      let x = node.x - cx;
      let y = node.y - cy;
      let z = node.z;

      // Y rotation
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // X rotation
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 500;
      const scale = fov / (fov + z2);

      return { x: cx + x1 * scale, y: cy + y1 * scale, z: z2, scale };
    };

    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse follow (sticky)
      const lerp = 0.04;
      const targetY = rotRef.current.autoY + mouseRef.current.x * 0.5;
      const targetX = mouseRef.current.y * 0.3;
      rotRef.current.currentY += (targetY - rotRef.current.currentY) * lerp;
      rotRef.current.currentX += (targetX - rotRef.current.currentX) * lerp;
      rotRef.current.autoY += 0.002;

      const rotX = rotRef.current.currentX;
      const rotY = rotRef.current.currentY;

      // Animate node positions
      nodesRef.current.forEach((node, i) => {
        if (node.label) {
          node.x = node.baseX + Math.sin(time * 0.005 + i) * 5;
          node.y = node.baseY + Math.cos(time * 0.005 + i * 0.5) * 5;
          node.z = node.baseZ + Math.sin(time * 0.005 + i * 0.7) * 5;
        } else {
          node.x = node.baseX + Math.sin(time * 0.01 + i) * 3;
          node.y = node.baseY + Math.cos(time * 0.01 + i * 0.5) * 3;
          node.z = node.baseZ + Math.sin(time * 0.01 + i * 0.7) * 3;
        }
      });

      const projected = nodesRef.current.map((node) => ({
        ...node,
        p: project(node, rotX, rotY),
      }));

      projected.sort((a, b) => a.p.z - b.p.z);

      // Connections
      ctx.lineCap = "round";
      const maxDist = 120;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].p.x - projected[j].p.x;
          const dy = projected[i].p.y - projected[j].p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15 * Math.min(projected[i].p.scale, projected[j].p.scale);
            ctx.beginPath();
            ctx.moveTo(projected[i].p.x, projected[i].p.y);
            ctx.lineTo(projected[j].p.x, projected[j].p.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes & labels
      projected.forEach((node) => {
        const { x, y, scale, z } = node.p;
        const depth = (z + 300) / 600;
        const baseOpacity = 0.3 + depth * 0.4;

        if (node.label) {
          // Glow
          const glowR = 20 * scale;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
          grad.addColorStop(0, `rgba(37, 99, 235, ${baseOpacity * 0.3})`);
          grad.addColorStop(1, "rgba(37, 99, 235, 0)");
          ctx.beginPath();
          ctx.arc(x, y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Dot
          ctx.beginPath();
          ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${baseOpacity})`;
          ctx.fill();

          // Code-feel label
          const fontSize = Math.max(10, 12 * scale);
          ctx.font = `500 ${fontSize}px "Courier New", "SF Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const displayLabel = `[${node.label}]`;
          const labelY = y - 15 * scale;
          ctx.fillStyle = `rgba(37, 99, 235, ${baseOpacity * 1.2})`;
          ctx.fillText(displayLabel, x, labelY);

          // Underline
          const tw = ctx.measureText(displayLabel).width;
          ctx.strokeStyle = `rgba(37, 99, 235, ${baseOpacity * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(x - tw / 2, labelY + fontSize * 0.5);
          ctx.lineTo(x + tw / 2, labelY + fontSize * 0.5);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, 2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${baseOpacity * 0.5})`;
          ctx.fill();
        }
      });

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default PlexusEffect;

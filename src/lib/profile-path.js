/** Small deterministic PRNG so the terrain line is identical on every render. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const toPath = (points, dy = 0) =>
  `M${points.map(([x, y]) => `${x},${(y + dy).toFixed(1)}`).join(' L')}`;

/**
 * Builds the "route profile": an elevation line that climbs from left to right,
 * with stops for the projects and a dotted, still-unexplored section at the end.
 */
export function buildProfile({ width = 1100, height = 150, step = 10, seed = 4, stops, exploredUntil = 0.873 }) {
  const random = mulberry32(seed);
  const points = [];
  for (let x = 0; x <= width; x += step) {
    const base = height - 32 - 78 * (x / width) ** 1.15;
    const y = base + 9 * Math.sin(x / 37) + 6 * Math.sin(x / 13 + 1) + (random() * 4 - 2);
    points.push([x, Number(y.toFixed(1))]);
  }

  const yAt = (x) => points[Math.min(points.length - 1, Math.max(0, Math.round(x / step)))][1];
  const cut = Math.round((width * exploredUntil) / step) * step;
  const explored = points.filter(([x]) => x <= cut);
  const ahead = points.filter(([x]) => x >= cut);

  const hatch = [];
  for (let x = 6; x < cut; x += 12) hatch.push({ x, y: yAt(x) + 4 });

  return {
    width,
    height,
    exploredPath: toPath(explored),
    aheadPath: toPath(ahead, -6),
    hatch,
    start: { x: 4, y: points[0][1] },
    peak: { x: width - 4, y: yAt(width) - 6 },
    stops: stops.map((fraction) => {
      const x = Math.round(width * fraction);
      return { x, y: yAt(x) };
    }),
  };
}

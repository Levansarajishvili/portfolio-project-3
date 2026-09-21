/**
 * Coordinates in the projected space of the base map (viewBox 0 0 1440 818.3).
 * The base map itself (sea, borders, regions, contours) is a static SVG in
 * src/assets/maps, generated from Natural Earth data. Labels and the Tbilisi
 * pin are drawn live on top of it so they can follow the language and theme.
 */
export const MAP = {
  width: 1440,
  height: 818.3,
  compactViewBox: '470 126 900 692',
};

export const TBILISI = { x: 1130.5, y: 545.8, coords: '41.72° N, 44.79° E' };

export const CITIES = [
  { id: 'zugdidi', x: 754.7, y: 407.4 },
  { id: 'kutaisi', x: 861.3, y: 449.4 },
  { id: 'poti', x: 729.0, y: 470.1 },
  { id: 'gori', x: 1042.7, y: 499.7 },
  { id: 'telavi', x: 1217.6, y: 510.1 },
  { id: 'batumi', x: 724.6, y: 558.5 },
];

export const LONGITUDE_TICKS = [
  [40, 514.3],
  [42, 771.4],
  [44, 1028.6],
  [46, 1285.7],
];

export const LATITUDE_TICKS = [
  [41, 670.3],
  [42, 496.2],
  [43, 322.1],
  [44, 148.0],
];

// Hugs the coast near Batumi, clear of the hero copy in both languages.
export const SEA_LABEL = { x: 590, y: 560 };
export const RANGE_LABEL = { x: 700, y: 186, rotate: 17 };

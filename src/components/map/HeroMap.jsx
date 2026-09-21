import dayMap from '@/assets/maps/georgia-day.svg';
import nightMap from '@/assets/maps/georgia-night.svg';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';
import { CITIES, LATITUDE_TICKS, LONGITUDE_TICKS, MAP, RANGE_LABEL, SEA_LABEL, TBILISI } from '@/lib/geo.js';

/**
 * Static base map (one cached SVG per map style) + live labels and the Tbilisi pin.
 * variant "full": desktop hero backdrop, marks the start of the page route.
 * variant "compact": cropped view for small screens.
 */
export function HeroMap({ variant = 'full', className }) {
  const { theme, copy } = usePreferences();
  const full = variant === 'full';
  // The compact map is shown ~2.3x smaller, so its marks and labels are drawn larger.
  const k = full ? 1 : 1.8;

  return (
    <svg
      viewBox={full ? `0 0 ${MAP.width} ${MAP.height}` : MAP.compactViewBox}
      preserveAspectRatio={full ? 'xMaxYMid slice' : 'xMidYMid slice'}
      role="img"
      aria-label={copy.map.label}
      className={cn(!full && 'map-compact', className)}
    >
      <image href={theme === 'night' ? nightMap : dayMap} width={MAP.width} height={MAP.height} />

      {LONGITUDE_TICKS.map(([lon, x]) => (
        <text key={`lon-${lon}`} x={x + 4} y={MAP.height - 8} className="map-tick">
          {lon}°E
        </text>
      ))}
      {LATITUDE_TICKS.map(([lat, y]) => (
        <text key={`lat-${lat}`} x={MAP.width - 8} y={y - 5} textAnchor="end" className="map-tick">
          {lat}°N
        </text>
      ))}

      {CITIES.map((city) => (
        <g key={city.id}>
          <circle cx={city.x} cy={city.y} r={2.6 * k} className="map-city" />
          <text x={city.x + 7 * k} y={city.y + 4 * k} className="map-city-label">
            {copy.map.cities[city.id]}
          </text>
        </g>
      ))}

      <g className={full ? undefined : 'hidden'}>
        {copy.map.sea.map((label, index) => (
          <text
            key={label.lang}
            lang={label.lang}
            x={SEA_LABEL.x}
            y={SEA_LABEL.y + index * 22}
            className={index === 0 ? 'map-sea-primary' : 'map-sea-secondary'}
          >
            {label.text}
          </text>
        ))}
      </g>
      <text
        x={RANGE_LABEL.x}
        y={RANGE_LABEL.y + (full ? 0 : 16)}
        transform={`rotate(${RANGE_LABEL.rotate} ${RANGE_LABEL.x} ${RANGE_LABEL.y})`}
        className="map-range-label"
      >
        {copy.map.range}
      </text>

      <circle cx={TBILISI.x} cy={TBILISI.y} r={22 * k} className="map-pin-halo" />
      <circle cx={TBILISI.x} cy={TBILISI.y} r={16 * k} className="map-pin-pulse" />
      <circle cx={TBILISI.x} cy={TBILISI.y} r={8 * k} className="map-pin map-pin-pop" />
      {/* Static, invisible anchor for the page route: the visible pin animates, this never moves. */}
      {full && <circle cx={TBILISI.x} cy={TBILISI.y} r="8" fill="none" data-route-start="" />}
      <text x={TBILISI.x + 18 * k} y={TBILISI.y + (full ? -6 : 10)} className="map-pin-title">
        {copy.map.cities.tbilisi}
      </text>
      {full && (
        <text x={TBILISI.x + 18} y={TBILISI.y + 12} className="map-pin-coords">
          {TBILISI.coords}
        </text>
      )}
    </svg>
  );
}

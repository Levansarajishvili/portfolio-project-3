/** Label + control + error/counter row. The control receives id / aria-* from the parent. */
export function FormField({ id, label, error, meta, children }) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[14.5px] font-semibold">
        {label}
      </label>
      {children}
      {(error || meta) && (
        <div className="flex items-start justify-between gap-3 text-[13px] leading-snug">
          {error ? (
            <p id={`${id}-error`} className="font-medium text-danger">
              {error}
            </p>
          ) : (
            <span />
          )}
          {meta && <span className="shrink-0 text-ink-2">{meta}</span>}
        </div>
      )}
    </div>
  );
}

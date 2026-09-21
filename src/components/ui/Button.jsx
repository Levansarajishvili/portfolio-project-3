import { buttonVariants } from '@/lib/button-variants.js';
import { cn } from '@/lib/utils.js';

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button({ variant, className, href, type = 'button', ...props }) {
  const classes = cn(buttonVariants({ variant }), className);
  if (href) return <a href={href} className={classes} {...props} />;
  return <button type={type} className={classes} {...props} />;
}

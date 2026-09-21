import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper hover:bg-ink/85',
        ghost: 'border-[1.5px] border-ink bg-land/75 text-ink hover:bg-land',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

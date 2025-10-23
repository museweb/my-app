import { Children, cloneElement, forwardRef, HTMLAttributes, isValidElement, ReactNode, ReactElement } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find((child) => isValidElement(child)) as ReactElement | undefined;

  if (!slottable) {
    return null;
  }

  const slottableProps = typeof slottable.props === 'object' && slottable.props !== null ? slottable.props : {};

  return cloneElement(slottable, {
    ...props,
    ...slottableProps,
    className: cn(props.className, (slottableProps as any)?.className),
    ref,
  } as any);
});

Slot.displayName = 'Slot';

export { Slot };

"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { cn } from "@/lib/utils";

interface ContactDrawerButtonProps extends ButtonProps {
  magneticClassName?: string;
}

/**
 * Drop-in replacement for `<Link href="/contact"><Button/></Link>` usable
 * from server-component pages: it's the only client boundary needed to open
 * the global ContactDrawer.
 */
export function ContactDrawerButton({
  magneticClassName,
  className,
  children,
  ...props
}: ContactDrawerButtonProps) {
  const { open } = useContactDrawer();

  return (
    <Magnetic className={cn(magneticClassName)}>
      <Button className={className} onClick={open} {...props}>
        {children}
      </Button>
    </Magnetic>
  );
}

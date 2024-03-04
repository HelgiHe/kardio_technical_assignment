import React from 'react';
import clsx from 'clsx';

interface TextProps<T extends React.ElementType> {
  as: T;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'caption';
  children: React.ReactNode;
  className?: string;
}

export const TextComponent = <T extends React.ElementType>({
  as: ElementType,
  variant,
  children,
  className,
  ...props
}: TextProps<T> & Omit<React.ComponentProps<T>, keyof TextProps<T>>) => {
  // Define a mapping from variant to className
  const textVariant = variant || ElementType;

  const textStyles = clsx({
    'text-3xl md:4xl': textVariant === 'h1',
    'text-2xl md:3xl': textVariant === 'h2',
    'text-xl md:2xl': textVariant === 'h3',
    'text-lg md:text-xl': textVariant === 'h4',
    'text-base md:text-lg': textVariant === 'p',
    'text-sm md:text-base': textVariant === 'caption',
  }, className, "text-sand-100");

  return <ElementType className={textStyles} {...props}>{children}</ElementType>;
}

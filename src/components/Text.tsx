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
    'text-3xl md:4xl text-sand-100': textVariant === 'h1',
    'text-2xl md:3xl text-sand-100': textVariant === 'h2',
    'text-xl md:2xl text-sand-100': textVariant === 'h3',
    'text-lg md:text-xl text-sand-100': textVariant === 'h4',
    'text-base md:text-lg text-sand-100': textVariant === 'p',
    'text-xs md:sm text-sand-100': textVariant === 'caption',
  }, className);

  return <ElementType className={textStyles} {...props}>{children}</ElementType>;
}

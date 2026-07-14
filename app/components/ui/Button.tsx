'use client'

import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'xl'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none'
    
    const variants = {
      default: 'bg-gradient-to-r from-[#7B2CFF] to-[#9D4DFF] hover:from-[#9D4DFF] hover:to-[#7B2CFF] text-white shadow-lg shadow-[#7B2CFF]/25',
      outline: 'border-2 border-white/20 hover:border-[#7B2CFF]/50 text-white hover:text-[#7B2CFF] bg-transparent backdrop-blur-sm',
      ghost: 'hover:bg-white/10 text-white',
    }

    const sizes = {
      default: 'px-6 py-3 text-base',
      sm: 'px-4 py-2 text-sm',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

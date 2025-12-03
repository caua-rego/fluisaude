import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'outline' | 'link' | 'default'
  size?: 'icon' | 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center'
  return (
    <button {...props} className={[base, className].filter(Boolean).join(' ')}>
      {children}
    </button>
  )
}

export default Button

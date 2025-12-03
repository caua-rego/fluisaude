import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return <input {...props} className={[className].filter(Boolean).join(' ')} />
}

export default Input

import React from 'react'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
  return (
    <label {...props} className={[className].filter(Boolean).join(' ')}>
      {children}
    </label>
  )
}

export default Label

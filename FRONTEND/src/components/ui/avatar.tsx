import React from 'react'

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={["inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100", className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img {...props} className={[props.className || '', 'block object-cover'].filter(Boolean).join(' ')} />
)

export const AvatarFallback: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-700">{children}</div>
)

export default Avatar

import React, { createContext, useContext } from 'react'

type SheetContextType = { open?: boolean; onOpenChange?: (v: boolean) => void }
const SheetContext = createContext<SheetContextType>({})

export const Sheet: React.FC<React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (v: boolean) => void }> = ({ children, open, onOpenChange }) => {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
}

export const SheetTrigger: React.FC<any> = ({ children }) => {
  const ctx = useContext(SheetContext)
  if (!children) return null
  // If child is button-like, clone and attach onClick to toggle
  return React.cloneElement(children, {
    onClick: (e: any) => {
      ctx.onOpenChange && ctx.onOpenChange(!ctx.open)
      children.props.onClick && children.props.onClick(e)
    },
  })
}

export const SheetContent: React.FC<any> = ({ children, className = '', ...props }) => {
  const ctx = useContext(SheetContext)
  return (
    <div {...props} className={[className].filter(Boolean).join(' ')} style={{ display: ctx.open ? undefined : 'none' }}>
      {children}
    </div>
  )
}

export const SheetTitle: React.FC<any> = ({ children, ...props }) => <h3 {...props}>{children}</h3>
export const SheetDescription: React.FC<any> = ({ children, ...props }) => <p {...props}>{children}</p>

export default Sheet

import React from 'react'
import { cn } from '@/lib/utils'

type FieldErrorProps = {
    className?: string;
    children:React.ReactNode;
}

const FieldError = ({className,children}: FieldErrorProps) => {
  return (
    <p className={cn("text-red-500", className)}>{children}</p>
  )
}

export default FieldError
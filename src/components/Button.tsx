"use client"

import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode
}

const Button = ({ className, children, ...otherProps }: ButtonProps) => {
  return (
    <button className={`${className} p-3 px-4 rounded focus-within:outline outline-1 outline-emerald-500`} {...otherProps}>
        {children}
    </button>
  )
}

export default Button
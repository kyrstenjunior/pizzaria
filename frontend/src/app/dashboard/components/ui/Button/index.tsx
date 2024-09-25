import { ReactNode, ButtonHTMLAttributes } from "react";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button
        className="bg-red-500 p-2 flex items-center justify-center text-white border-0 rounded-lg transition-all hover:brightness-110"
        disabled={loading}
        {...rest}
    >

        { loading ? (
            <FaSpinner className="animate-spin" color="#fff" size={16} />
        ) : (
            <a href="#" className="text-white">{children}</a>
        )}
        
    </button>
  )
}

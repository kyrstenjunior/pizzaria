import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{};
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{};

export function Input({...rest}: InputProps) {
    return (
        <input
            className="my-4 p-4 h-10 border-gray-500 border-2 rounded-md bg-slate-950 text-white placeholder:text-white placeholder:text-opacity-80"
            {...rest}
        />
    )
}

export function TextArea({...rest}: TextAreaProps) {
    <textarea
        className="my-4 p-4 h-10 border-gray-500 border-2 rounded-md bg-slate-950 text-white placeholder:text-white placeholder:text-opacity-80"
        {...rest}
    ></textarea>
}
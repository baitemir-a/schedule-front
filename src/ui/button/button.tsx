import { ReactNode } from 'react'
import './button.scss'
type Props = {
    children: ReactNode
    variant: 'main' | 'danger' | 'secondary'
    disabled?: boolean
    type?: "submit" | "reset" | "button"
    onClick?: () => void
}

export default function Button({ children, variant, type, disabled, onClick }: Props) {
    return (
        <button
            disabled={disabled}
            type={type}
            className={'button ' + variant}
            onClick={onClick}>
            {children}
        </button>
    )
}
import React, { forwardRef } from 'react';
import { classNames } from 'primereact/utils';
import { Button as PrimeButton } from 'primereact/button';
// import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The variant/style of the button */
    variant?: ButtonVariant;
    /** The size of the button */
    size?: ButtonSize;
    label?: string;
    /** Icon to show before the button text */
    startIcon?: string;
    /** Icon to show after the button text */
    endIcon?: string;
    /** Whether the button is in loading state */
    loading?: boolean;
    /** Text to show when loading */
    loadingText?: string;
    /** Whether the button takes full width of parent */
    fullWidth?: boolean;
    /** Whether the button is outlined */
    outlined?: boolean;
    /** Whether the button has rounded corners */
    rounded?: boolean;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Whether the button is text only (no background) */
    text?: boolean;
    /** Whether to raise the button with shadow */
    raised?: boolean;
    /** The severity of the button (matches PrimeReact severities) */
    severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'help';
    /** Children elements */
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'medium',
    label,
    startIcon,
    endIcon,
    loading = false,
    loadingText,
    fullWidth = false,
    outlined = false,
    rounded = false,
    disabled = false,
    text = false,
    raised = false,
    severity,
    className,
    children,
    ...props
}, ref) => {
    const buttonClasses = classNames(
        'custom-button',
        `button-${variant}`,
        `button-${size}`,
        {
            'button-full-width': fullWidth,
            'p-button-outlined': outlined,
            'p-button-rounded': rounded,
            'p-button-text': text,
            'p-button-raised': raised,
        },
        className
    );

    return (
        <PrimeButton
            {...props}
            ref={ref}
            label={label}
            className={buttonClasses}
            disabled={disabled || loading}
            loading={loading}
            loadingIcon="pi pi-spinner pi-spin"
            icon={startIcon}
            iconPos={endIcon ? 'right' : 'left'}
            severity={severity}
        />
    );
});

Button.displayName = 'Button';
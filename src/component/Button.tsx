import React, { forwardRef } from 'react';
import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from 'primereact/button';
import { SplitButton, SplitButtonProps } from 'primereact/splitbutton';
import { SpeedDial, SpeedDialProps } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';

// Type definitions
export type ButtonType = 'button' | 'split' | 'speeddial';
export type RadiusType = 'circle' | 'semi-circle' | 'quarter-circle';
export type SeverityType = 'warning' | 'success' | 'info' | 'secondary' | 'contrast' | 'danger' | 'help';
export type ButtonSize = 'small' | 'normal' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';

// Base props that are common to all button types
interface BaseButtonProps {
  /** Type of button to render */
  btnType?: ButtonType;
  /** Button label text */
  label?: string;
  /** Icon class name (e.g., 'pi pi-check') */
  icon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Button severity/color variant */
  severity?: SeverityType;
  /** Button size */
  size?: ButtonSize;
  /** Button variant/style */
  variant?: ButtonVariant;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Loading icon class name */
  loadingIcon?: string;
  /** Whether the button should have rounded corners */
  rounded?: boolean;
  /** Whether the button should be raised (with shadow) */
  raised?: boolean;
  /** Whether the button should have a border */
  outlined?: boolean;
  /** Whether the button should be transparent */
  text?: boolean;
  /** Whether the button should be a link style */
  link?: boolean;
  /** Whether the button should be plain (no styling) */
  plain?: boolean;
  /** Additional data attributes */
  'data-testid'?: string;
  'aria-label'?: string;
}

// Props specific to clickable buttons (regular and split)
interface ClickableButtonProps extends BaseButtonProps {
  /** Click event handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Menu items for split button or speed dial */
  model?: MenuItem[];
  /** Whether the button should submit a form */
  type?: 'button' | 'submit' | 'reset';
  /** Form element to submit */
  form?: string;
  /** Whether the button should have focus on mount */
  autoFocus?: boolean;
}

// Props specific to SpeedDial
interface SpeedDialButtonProps extends BaseButtonProps {
  speedtype?: 'quarter-circle' | 'semi-circle' | 'circle';
  /** Menu items for speed dial */
  model?: MenuItem[];
  /** Direction of the speed dial */
  direction?: SpeedDialProps['direction'];
  /** Radius of the speed dial */
  radius?: number;
  /** Icon to show when speed dial is open */
  showIcon?: string;
  /** Icon to show when speed dial is closed */
  hideIcon?: string;
  /** Whether to show a mask overlay */
  mask?: boolean;
  /** Transition delay in milliseconds */
  transitionDelay?: number;
  /** Type of radius layout */
  radiusType?: RadiusType;
  /** Whether the speed dial is visible */
  visible?: boolean;
  /** Callback when speed dial becomes visible */
  onShow?: () => void;
  /** Callback when speed dial becomes hidden */
  onHide?: () => void;
}

// Union type for all button props
type ButtonProps = ClickableButtonProps & SpeedDialButtonProps;

// Helper function to get button size class
const getSizeClass = (size?: ButtonSize): string => {
  switch (size) {
    case 'small': return 'p-button-sm';
    case 'large': return 'p-button-lg';
    default: return '';
  }
};

// Helper function to get button variant class
const getVariantClass = (variant?: ButtonVariant, outlined?: boolean, text?: boolean, link?: boolean): string => {
  if (outlined) return 'p-button-outlined';
  if (text) return 'p-button-text';
  if (link) return 'p-button-link';
  
  switch (variant) {
    case 'outlined': return 'p-button-outlined';
    case 'text': return 'p-button-text';
    case 'link': return 'p-button-link';
    default: return '';
  }
};

// Helper function to build className
const buildClassName = (baseClass: string, props: BaseButtonProps): string => {
  const classes = [baseClass];
  
  if (props.className) classes.push(props.className);
  if (props.size) classes.push(getSizeClass(props.size));
  if (props.variant || props.outlined || props.text || props.link) {
    classes.push(getVariantClass(props.variant, props.outlined, props.text, props.link));
  }
  if (props.rounded) classes.push('p-button-rounded');
  if (props.raised) classes.push('p-button-raised');
  if (props.plain) classes.push('p-button-plain');
  
  return classes.filter(Boolean).join(' ');
};

const Button = forwardRef<any, ButtonProps>(({
  btnType = 'button',
  label,
  icon,
  onClick,
  model = [],
  direction = 'up',
  radius,
  showIcon = 'pi pi-bars',
  hideIcon = 'pi pi-times',
  tooltip,
  className,
  style,
  mask,
  transitionDelay,
  radiusType,
  size,
  variant,
  disabled = false,
  loading = false,
  loadingIcon = 'pi pi-spinner pi-spin',
  rounded,
  raised,
  outlined,
  text,
  link,
  plain,
  type = 'button',
  form,
  autoFocus,
  visible,
  speedtype,
  onShow,
  onHide,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  ...rest
}, ref) => {
  // Common props for all button types
  const commonProps = {
    className: buildClassName('', { className, size, variant, rounded, raised, outlined, text, link, plain }),
    style,
    disabled: disabled || loading,
    'data-testid': dataTestId,
    'aria-label': ariaLabel,
  };

  // Render SplitButton
  if (btnType === 'split') {
    return (
      <SplitButton
        label={label}
        icon={loading ? loadingIcon : icon}
        onClick={onClick}
        model={model}
        tooltip={tooltip}
        autoFocus={autoFocus}
        {...commonProps}
        {...rest}
      />
    );
  }

  // Render SpeedDial
  if (btnType === 'speeddial') {
    return (

        <SpeedDial
          model={model}
          direction={direction}
          radius={radius}
          showIcon={showIcon}
          hideIcon={hideIcon}
          visible={visible}
          onShow={onShow}
          onHide={onHide}
          className={commonProps.className}
          type={speedtype}
          style={style}
          mask={mask}
          transitionDelay={transitionDelay}
          {...rest}
        />
    );
  }

  // Render regular Button
  return (
    <PrimeButton
      ref={ref}
      label={label}
      icon={loading ? loadingIcon : icon}
      onClick={onClick}
      tooltip={tooltip}
      type={type}
      form={form}
      autoFocus={autoFocus}
      {...commonProps}
      {...rest}
    />
  );
});

Button.displayName = 'Button';

export default Button;
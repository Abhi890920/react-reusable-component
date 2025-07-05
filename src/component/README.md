# Enhanced Button Component

A comprehensive, reusable Button component built on top of PrimeReact that supports multiple button types, variants, sizes, and states.

## Features

### 🎯 **Multiple Button Types**
- **Regular Button**: Standard clickable button
- **Split Button**: Button with dropdown menu
- **Speed Dial**: Floating action button with circular menu

### 🎨 **Visual Variants**
- **Severity Colors**: `warning`, `success`, `info`, `secondary`, `contrast`, `danger`, `help`
- **Sizes**: `small`, `normal`, `large`
- **Variants**: `filled`, `outlined`, `text`, `link`
- **Styles**: `rounded`, `raised`, `plain`

### ⚡ **Interactive States**
- **Loading State**: Shows spinner and disables button
- **Disabled State**: Prevents interaction
- **Custom Loading Icon**: Configurable loading indicator

### ♿ **Accessibility**
- **ARIA Labels**: Screen reader support
- **Data Test IDs**: Testing support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Auto-focus support

### 📝 **Form Integration**
- **Form Types**: `submit`, `reset`, `button`
- **Form Association**: Links to specific forms
- **Auto Focus**: Automatic focus on mount

## Usage

### Basic Button
```tsx
import Button from './Button';

<Button label="Click Me" onClick={() => console.log('clicked')} />
```

### Button with Severity
```tsx
<Button label="Success" severity="success" />
<Button label="Danger" severity="danger" />
<Button label="Warning" severity="warning" />
```

### Button Sizes
```tsx
<Button label="Small" size="small" />
<Button label="Normal" size="normal" />
<Button label="Large" size="large" />
```

### Button Variants
```tsx
<Button label="Filled" variant="filled" />
<Button label="Outlined" variant="outlined" />
<Button label="Text" variant="text" />
<Button label="Link" variant="link" />
```

### Loading State
```tsx
const [loading, setLoading] = useState(false);

<Button 
  label="Save" 
  loading={loading}
  onClick={() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  }}
/>
```

### Split Button
```tsx
const menuItems = [
  { label: 'Save', icon: 'pi pi-save', command: () => console.log('Save') },
  { label: 'Delete', icon: 'pi pi-trash', command: () => console.log('Delete') }
];

<Button
  btnType="split"
  label="Actions"
  icon="pi pi-cog"
  model={menuItems}
  severity="primary"
/>
```

### Speed Dial
```tsx
const menuItems = [
  { label: 'Add', icon: 'pi pi-plus', command: () => console.log('Add') },
  { label: 'Edit', icon: 'pi pi-pencil', command: () => console.log('Edit') }
];

<Button
  btnType="speeddial"
  model={menuItems}
  direction="up"
  radius={80}
  showIcon="pi pi-plus"
  hideIcon="pi pi-times"
  mask
/>
```

### Form Buttons
```tsx
<form>
  <Button label="Submit" type="submit" severity="success" />
  <Button label="Reset" type="reset" severity="secondary" />
  <Button label="Cancel" type="button" severity="info" />
</form>
```

### Accessibility
```tsx
<Button 
  icon="pi pi-heart" 
  aria-label="Like this content"
  data-testid="like-button"
  severity="danger"
/>
```

## Props Reference

### Base Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `btnType` | `'button' \| 'split' \| 'speeddial'` | `'button'` | Type of button to render |
| `label` | `string` | - | Button label text |
| `icon` | `string` | - | Icon class name |
| `tooltip` | `string` | - | Tooltip text |
| `severity` | `SeverityType` | - | Button color variant |
| `size` | `'small' \| 'normal' \| 'large'` | - | Button size |
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'link'` | - | Button style variant |
| `className` | `string` | - | Custom CSS class |
| `style` | `React.CSSProperties` | - | Custom inline styles |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Whether button is in loading state |
| `loadingIcon` | `string` | `'pi pi-spinner pi-spin'` | Loading icon class |
| `rounded` | `boolean` | - | Whether button has rounded corners |
| `raised` | `boolean` | - | Whether button has shadow |
| `outlined` | `boolean` | - | Whether button has border |
| `text` | `boolean` | - | Whether button is transparent |
| `link` | `boolean` | - | Whether button is link style |
| `plain` | `boolean` | - | Whether button has no styling |

### Clickable Button Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - | Click event handler |
| `model` | `MenuItem[]` | - | Menu items for split/speed dial |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `form` | `string` | - | Form element to submit |
| `autoFocus` | `boolean` | - | Whether button has focus on mount |

### Speed Dial Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `SpeedDialProps['direction']` | `'up'` | Speed dial direction |
| `radius` | `number` | - | Speed dial radius |
| `showIcon` | `string` | `'pi pi-bars'` | Icon when open |
| `hideIcon` | `string` | `'pi pi-times'` | Icon when closed |
| `mask` | `boolean` | - | Whether to show mask overlay |
| `transitionDelay` | `number` | - | Transition delay in ms |
| `radiusType` | `RadiusType` | - | Radius layout type |
| `visible` | `boolean` | - | Whether speed dial is visible |
| `onShow` | `() => void` | - | Show callback |
| `onHide` | `() => void` | - | Hide callback |

### Accessibility Props
| Prop | Type | Description |
|------|------|-------------|
| `data-testid` | `string` | Test identifier |
| `aria-label` | `string` | Screen reader label |

## Type Definitions

```tsx
export type ButtonType = 'button' | 'split' | 'speeddial';
export type RadiusType = 'circle' | 'semi-circle' | 'quarter-circle';
export type SeverityType = 'warning' | 'success' | 'info' | 'secondary' | 'contrast' | 'danger' | 'help';
export type ButtonSize = 'small' | 'normal' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';
```

## Best Practices

### 1. **Use Semantic Severity Colors**
```tsx
// ✅ Good
<Button label="Save" severity="success" />
<Button label="Delete" severity="danger" />
<Button label="Info" severity="info" />

// ❌ Avoid
<Button label="Save" severity="danger" />
```

### 2. **Provide Accessible Labels**
```tsx
// ✅ Good
<Button icon="pi pi-heart" aria-label="Like this post" />

// ❌ Avoid
<Button icon="pi pi-heart" />
```

### 3. **Handle Loading States**
```tsx
// ✅ Good
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitData();
  } finally {
    setLoading(false);
  }
};

<Button label="Submit" loading={loading} onClick={handleSubmit} />
```

### 4. **Use Appropriate Button Types**
```tsx
// ✅ Good
<form>
  <Button label="Submit" type="submit" />
  <Button label="Cancel" type="button" />
</form>
```

## Examples

See `ButtonExamples.tsx` for comprehensive usage examples including:
- All button variants and sizes
- Interactive states
- Split buttons and speed dials
- Form integration
- Accessibility features
- Complex combinations

## Dependencies

- React 18+
- PrimeReact
- TypeScript 4.5+

## License

MIT 
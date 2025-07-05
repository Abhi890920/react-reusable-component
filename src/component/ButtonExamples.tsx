import React, { useState } from 'react';
import Button from './Button';
import { MenuItem } from 'primereact/menuitem';

const ButtonExamples: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [speedDialVisible, setSpeedDialVisible] = useState(false);

  // Sample menu items for split button and speed dial
  const menuItems: MenuItem[] = [
    {
      label: 'Save',
      icon: 'pi pi-save',
      command: () => console.log('Save clicked')
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => console.log('Delete clicked')
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => console.log('Edit clicked')
    }
  ];

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Button Component Examples</h1>
      
      {/* Basic Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button label="Primary Button" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Success" severity="success" />
          <Button label="Warning" severity="warning" />
          <Button label="Danger" severity="danger" />
          <Button label="Info" severity="info" />
          <Button label="Help" severity="help" />
          <Button label="Contrast" severity="contrast" />
        </div>
      </section>

      {/* Button Sizes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button label="Small" size="small" />
          <Button label="Normal" size="normal" />
          <Button label="Large" size="large" />
        </div>
      </section>

      {/* Button Variants */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Button label="Filled" variant="filled" />
          <Button label="Outlined" variant="outlined" />
          <Button label="Text" variant="text" />
          <Button label="Link" variant="link" />
        </div>
      </section>

      {/* Button Styles */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Button Styles</h2>
        <div className="flex flex-wrap gap-2">
          <Button label="Rounded" rounded />
          <Button label="Raised" raised />
          <Button label="Plain" plain />
          <Button label="With Icon" icon="pi pi-check" />
        </div>
      </section>

      {/* Interactive Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Interactive Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            label="Loading Button" 
            loading={loading}
            onClick={handleLoadingClick}
            severity="success"
          />
          <Button 
            label="Disabled Button" 
            disabled 
            severity="danger"
          />
          <Button 
            label="With Tooltip" 
            tooltip="This is a helpful tooltip"
            icon="pi pi-info-circle"
          />
        </div>
      </section>

      {/* Split Button */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Split Button</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            btnType="split"
            label="Actions"
            icon="pi pi-cog"
            model={menuItems}
            severity="primary"
          />
        </div>
      </section>

      {/* Speed Dial */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Speed Dial</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            btnType="speeddial"
            model={menuItems}
            direction="up"
            radius={80}
            showIcon="pi pi-plus"
            hideIcon="pi pi-times"
            mask
            className="p-button-raised"
          />
        </div>
      </section>

      {/* Form Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Form Buttons</h2>
        <form className="flex flex-wrap gap-2">
          <Button 
            label="Submit" 
            type="submit" 
            severity="success"
            icon="pi pi-check"
          />
          <Button 
            label="Reset" 
            type="reset" 
            severity="secondary"
            icon="pi pi-refresh"
          />
          <Button 
            label="Button" 
            type="button" 
            severity="info"
            icon="pi pi-info"
          />
        </form>
      </section>

      {/* Accessibility */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            icon="pi pi-heart" 
            aria-label="Like this content"
            data-testid="like-button"
            severity="danger"
          />
          <Button 
            icon="pi pi-share" 
            aria-label="Share this content"
            data-testid="share-button"
            severity="info"
          />
        </div>
      </section>

      {/* Complex Examples */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Complex Examples</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            label="Save & Continue"
            icon="pi pi-save"
            severity="success"
            size="large"
            raised
            rounded
            tooltip="Save your progress and continue"
            onClick={() => console.log('Save & Continue clicked')}
          />
          <Button
            label="Delete Item"
            icon="pi pi-trash"
            severity="danger"
            variant="outlined"
            size="small"
            tooltip="This action cannot be undone"
            onClick={() => console.log('Delete clicked')}
          />
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples; 
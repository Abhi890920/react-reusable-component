import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

// List of all available PrimeReact themes (update as new themes are released)
const themes = [
  {
    label: "Saga",
    code: "saga",
    items: [
      { label: "Saga Blue", value: "saga-blue", color: "#2574A9" },
      { label: "Saga Green", value: "saga-green", color: "#2ECC71" },
      { label: "Saga Orange", value: "saga-orange", color: "#F39C12" },
      { label: "Saga Purple", value: "saga-purple", color: "#8E44AD" }
    ]
  },
  {
    label: "Vela",
    code: "vela",
    items: [
      { label: "Vela Blue", value: "vela-blue", color: "#2980B9" },
      { label: "Vela Green", value: "vela-green", color: "#27AE60" },
      { label: "Vela Orange", value: "vela-orange", color: "#E67E22" },
      { label: "Vela Purple", value: "vela-purple", color: "#9B59B6" }
    ]
  },
  {
    label: "Arya",
    code: "arya",
    items: [
      { label: "Arya Blue", value: "arya-blue", color: "#34495E" },
      { label: "Arya Green", value: "arya-green", color: "#16A085" },
      { label: "Arya Orange", value: "arya-orange", color: "#E67E22" },
      { label: "Arya Purple", value: "arya-purple", color: "#8E44AD" }
    ]
  },
  {
    label: "Nova",
    code: "nova",
    items: [
      { label: "Nova", value: "nova", color: "#5D6D7E" },
      { label: "Nova Alt", value: "nova-alt", color: "#566573" },
      { label: "Nova Accent", value: "nova-accent", color: "#48C9B0" },
      { label: "Nova Colored", value: "nova-colored", color: "#F5B041" }
    ]
  },
  {
    label: "Luna",
    code: "luna",
    items: [
      { label: "Luna Amber", value: "luna-amber", color: "#FFC107" },
      { label: "Luna Blue", value: "luna-blue", color: "#2196F3" },
      { label: "Luna Green", value: "luna-green", color: "#4CAF50" },
      { label: "Luna Pink", value: "luna-pink", color: "#E91E63" }
    ]
  },
  {
    label: "Soho",
    code: "soho",
    items: [
      { label: "Soho Light", value: "soho-light", color: "#F7F7F7" },
      { label: "Soho Dark", value: "soho-dark", color: "#2C3E50" }
    ]
  },
  {
    label: "Viva",
    code: "viva",
    items: [
      { label: "Viva Light", value: "viva-light", color: "#F1C40F" },
      { label: "Viva Dark", value: "viva-dark", color: "#273746" }
    ]
  },
  {
    label: "Mira",
    code: "mira",
    items: [
      { label: "Mira", value: "mira", color: "#A569BD" }
    ]
  },
  {
    label: "Fluent",
    code: "fluent",
    items: [
      { label: "Fluent Light", value: "fluent-light", color: "#0078D4" }
    ]
  },
  {
    label: "Bootstrap4",
    code: "bootstrap4",
    items: [
      { label: "Bootstrap4 Light Blue", value: "bootstrap4-light-blue", color: "#0275D8" },
      { label: "Bootstrap4 Light Purple", value: "bootstrap4-light-purple", color: "#613D7C" },
      { label: "Bootstrap4 Dark Blue", value: "bootstrap4-dark-blue", color: "#1B2631" },
      { label: "Bootstrap4 Dark Purple", value: "bootstrap4-dark-purple", color: "#512E5F" }
    ]
  },
  {
    label: "Material",
    code: "material",
    items: [
      { label: "Material Light Blue", value: "material-light-blue", color: "#42A5F5" },
      { label: "Material Light Green", value: "material-light-green", color: "#66BB6A" },
      { label: "Material Dark Blue", value: "material-dark-blue", color: "#1565C0" },
      { label: "Material Dark Green", value: "material-dark-green", color: "#2E7D32" }
    ]
  },
  {
    label: "Tailwind",
    code: "tailwind",
    items: [
      { label: "Tailwind Light", value: "tailwind-light", color: "#38BDF8" }
    ]
  }
];

// Custom template for dropdown options with color swatch
const optionTemplate = (option) => {
  if (!option || typeof option !== "object" || !option.value) {
    // fallback for group labels or empty selection
    return <span>{option?.label || ""}</span>;
  }
  const color = option.color || "#E0E0E0";
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          background: color,
          marginRight: 8,
        }}
      />
      <span>{option.label}</span>
    </div>
  );
};

const findGroupLabel = (groupedThemes, selectedValue) =>{
  for (const group of groupedThemes) {
    if (group.items.some(item => item.value === selectedValue)) {
      return group.code;
    }
  }
  return null;
}



const ThemeSwitcher = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].items[0].value);

  const handleThemeChange = (e) => { 
    setSelectedTheme(e.value);
  }

  useEffect(() => {
    if (!selectedTheme) return;
    // Remove existing theme link
    const prevLink = document.getElementById("primereact-theme-link");
    if (prevLink) prevLink.remove();

    // Add new theme
    const link = document.createElement("link");
    link.id = "primereact-theme-link";
    link.rel = "stylesheet";
    // link.href = `https://unpkg.com/primereact/resources/themes/${selectedTheme}/theme.css`;
    link.href = `src/assets/themes/${findGroupLabel(themes, selectedTheme)}/${selectedTheme}/theme.scss`;
    document.head.appendChild(link);

  }, [selectedTheme]);

  return (
    <div className="field m-0">
      <Dropdown
        id="theme-dropdown"
        value={selectedTheme}
        options={themes}
        onChange={handleThemeChange}
        optionGroupLabel="label"
        optionGroupChildren="items"
        optionLabel="label"
        placeholder="Select a Theme"
        filter
        className="w-15rem"
        itemTemplate={optionTemplate}
        valueTemplate={optionTemplate}
      />
    </div>
  );
};

export default ThemeSwitcher;
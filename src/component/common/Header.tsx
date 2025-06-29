import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import ThemeSwitcher from "../ThemeSwitcher";
export default function Header() {
  const location = useLocation();

  const activeClass = "flex align-items-center p-menuitem-link font-bold";
  const nonActiveClass = "flex align-items-center p-menuitem-link";

  const linkClassName = (url:any) => {
    if(url === location.pathname){
      return activeClass;
    }
    return nonActiveClass;
  }

  const itemRenderer = (item:any) => (
    <Link to={item.url} className= {linkClassName(item.url)}>
      <span className={item.icon} />
      <span className='mx-2'>{item.label}</span>
      {item.badge && <Badge className='ml-auto' value={item.badge} />}
      {item.shortcut && (
        <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>
          {item.shortcut}
        </span>
      )}
    </Link>
  );
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
      template: itemRenderer,
    },
    {
      label: "About US",
      icon: "pi pi-star",
      url: "/about",
      template: itemRenderer,
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Form Demo",
          icon: "pi pi-bolt",
          url: "/form-demo",
          shortcut: "⌘+S",
          template: itemRenderer,
        },
        {
          label: "Table Demo",
          icon: "pi pi-server",
          url: "/table-demo",
          shortcut: "⌘+B",
          template: itemRenderer,
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
              badge: 2,
              template: itemRenderer,
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      badge: 3,
      template: itemRenderer,
    },
  ];
  const start = (
    <img
      alt='logo'
      src='https://primefaces.org/cdn/primereact/images/logo.png'
      height='40'
      width='40'
      className='logo mr-2 '
    ></img>
  );
  const end = (
    <div className='flex align-items-center gap-2'>
      <ThemeSwitcher/>
      <InputText
        placeholder='Search'
        type='text'
        className='w-8rem sm:w-auto'
      />
      <Avatar
        image='https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png'
        shape='circle'
      />
      <Button icon="pi pi-palette" rounded />
    </div>
  );


  return (
    <header className='header shadow-3'>
      <Menubar model={items} start={start} end={end} />
    </header>
  );
}

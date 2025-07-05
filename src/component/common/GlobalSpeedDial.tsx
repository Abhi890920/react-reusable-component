import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { MenuItem } from 'primereact/menuitem';
import Button from '../Button';

const GlobalSpeedDial: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      command: () => navigate('/about')
    },
    {
      label: 'Form Demo',
      icon: 'pi pi-file-edit',
      command: () => navigate('/form-demo')
    },
    {
      label: 'Table Demo',
      icon: 'pi pi-table',
      command: () => navigate('/table-demo')
    },
    {
      label: 'Button Examples',
      icon: 'pi pi-th-large',
      command: () => navigate('/button-examples')
    },
    {
      label: 'Scroll to Top',
      icon: 'pi pi-arrow-up',
      command: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  ];

  return (

    <Button btnType="speeddial" model={menuItems} radius={170} speedtype="quarter-circle" direction="up-left" style={{ right: 20, bottom: 20, zIndex: 9999, position: 'fixed' }} />

  );
};

export default GlobalSpeedDial; 
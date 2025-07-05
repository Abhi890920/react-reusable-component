import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Button from "../component/Button";
import { increment, decrement } from "../store";



const Home: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const count = useSelector((state:any) => state.counter.value);
  const dispatch = useDispatch();




  const items: MenuItem[] = [
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            showToast({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            showToast({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            showToast({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
          navigate('/about');
        }
    },
    {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
          navigate('https://react.dev/');
        }
    }
];

  return (
    <div className="flex flex-column align-content-center ">
      <h1 className="text-3xl font-bold">Welcome to React + PrimeReact + Tailwind + Redux Toolkit</h1>
      <div className="flex justify-center items-center gap-4 width-full">
        <Button label="Decrement" icon="pi pi-minus" className="p-button-danger" onClick={() => dispatch(decrement())} />
        <span className="text-2xl font-semibold">{count}</span>
        <Button label="Increment" icon="pi pi-plus" className="p-button-success" onClick={() => dispatch(increment())} />

        
      </div>

      <div className="flex flex-row gap-3 mt-5">

        <Button
          btnType="button"
          label="Show Tost!"
          icon="pi pi-check"
          severity="success"
          onClick={() =>
            showToast({
              severity: 'success',
              summary: 'Success',
              detail: 'Operation completed!',
            })
          }
        />

        <Button
          btnType="button"
          label="Regular Button"
          icon="pi pi-check"
          onClick={() => alert('Button clicked')}
        />

        <Button
          btnType="split"
          label="Options"
          icon="pi pi-cog"
          model={items}
          onClick={() => alert('Main Action')}
        />

      </div>

      <div className="card">
            <div style={{ height: '500px' }} className="flex align-items-center justify-content-center">
                <Button btnType="speeddial" model={items} radius={80} speedtype="circle" severity="warning"/>
            </div>
        </div>
      
    </div>
  );
}

export default Home;
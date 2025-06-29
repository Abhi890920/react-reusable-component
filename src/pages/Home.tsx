import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { increment, decrement } from "../store";


export default function Home() {
  const count = useSelector((state:any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-column align-content-center">
      <h1 className="text-3xl font-bold">Welcome to React + PrimeReact + Tailwind + Redux Toolkit</h1>
      <div className="flex justify-center items-center gap-4 width-full">
        <Button label="Decrement" icon="pi pi-minus" className="p-button-danger" onClick={() => dispatch(decrement())} />
        <span className="text-2xl font-semibold">{count}</span>
        <Button label="Increment" icon="pi pi-plus" className="p-button-success" onClick={() => dispatch(increment())} />
      </div>
      
    </div>
  );
}
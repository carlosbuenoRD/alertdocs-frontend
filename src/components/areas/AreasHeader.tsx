import React, { useState, useEffect } from "react";

// Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getDepartments, getDirecciones } from "@/redux/reducers/area";
import { Button } from "primereact/button";

function AreasHeader(props: any) {
  const dispatch = useAppDispatch();

  const [area, setArea] = useState("");
  const [direccion, setDireccion] = useState("");

  const { areas, direcciones } = useAppSelector((state) => state.area);

  useEffect(() => {
    if (area) {
      dispatch(getDirecciones(area));
      props.setSection("direcciones");
      return;
    }
  }, [area]);

  useEffect(() => {
    if (direccion) {
      dispatch(getDepartments(direccion));
      props.setSection("department");
    }
  }, [direccion]);

  const clearInputs = () => {
    props.setSection("area");
    setArea("");
    setDireccion("");
  };

  return (
    <div className="area_header shadow-1">
      <div className="flex align-items-center cursor-pointer mr-5 px-4">
        <span className="p-input-icon-left p-float-label mr-2">
          <i className="pi pi-search" />
          <InputText id="search" className="w-24rem" />
          <label htmlFor="search">Buscar...</label>
        </span>

        <span className="p-float-label mr-2">
          <Dropdown
            options={areas || []}
            optionLabel="name"
            optionValue="_id"
            className="w-20rem"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            filter
          />

          <label htmlFor="search">Viceministerios</label>
        </span>

        <span className="p-float-label mr-2">
          <Dropdown
            options={direcciones || []}
            optionLabel="name"
            optionValue="_id"
            className="w-20rem"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            filter
          />

          <label htmlFor="search">Direcciones</label>
        </span>
        <Button
          icon="pi pi-refresh"
          className="bg-orange-400 border-none"
          onClick={clearInputs}
        />
      </div>
    </div>
  );
}

export default AreasHeader;

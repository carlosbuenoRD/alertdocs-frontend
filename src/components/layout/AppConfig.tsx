import React from "react";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const AppConfig = (props: any) => {
  const themes = [
    { name: "blue", color: "#0F8BFD" },
    { name: "green", color: "#0BD18A" },
    { name: "magenta", color: "#EC4DBC" },
    { name: "orange", color: "#FD9214" },
    { name: "purple", color: "#873EFE" },
    { name: "red", color: "#FC6161" },
    { name: "teal", color: "#00D0DE" },
    { name: "yellow", color: "#EEE500" },
  ];

  const componentThemes = [
    { name: "blue", color: "#0F8BFD" },
    { name: "green", color: "#0BD18A" },
    { name: "magenta", color: "#EC4DBC" },
    { name: "orange", color: "#FD9214" },
    { name: "purple", color: "#873EFE" },
    { name: "red", color: "#FC6161" },
    { name: "teal", color: "#00D0DE" },
    { name: "yellow", color: "#EEE500" },
  ];

  return (
    <div id="layout-config">
      {/* <button
        id="layout-config-button"
        className="layout-config-button p-link"
        onClick={props.onConfigButtonClick}
      >
        <i className="pi pi-cog"></i>
      </button> */}
      <div
        className={classNames("layout-config", {
          "layout-config-active": props.configActive,
        })}
        onClick={props.onConfigClick}
      >
        <h5>Tipo de menu</h5>
        <div className="field-radiobutton">
          <RadioButton
            name="menuMode"
            value="static"
            id="mode1"
            checked={props.menuMode === "static"}
            onChange={() => props.changeMenuMode("static")}
          ></RadioButton>
          <label htmlFor="mode1">Static</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            name="menuMode"
            value="overlay"
            id="mode2"
            checked={props.menuMode === "overlay"}
            onChange={() => props.changeMenuMode("overlay")}
          ></RadioButton>
          <label htmlFor="mode2">Overlay</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            name="menuMode"
            value="slim"
            id="mode3"
            checked={props.menuMode === "slim"}
            onChange={() => props.changeMenuMode("slim")}
          ></RadioButton>
          <label htmlFor="mode3">Slim</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            name="menuMode"
            value="horizontal"
            id="mode4"
            checked={props.menuMode === "horizontal"}
            onChange={() => props.changeMenuMode("horizontal")}
          ></RadioButton>
          <label htmlFor="mode4">Horizontal</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            name="menuMode"
            value="sidebar"
            id="mode5"
            checked={props.menuMode === "sidebar"}
            onChange={() => props.changeMenuMode("sidebar")}
          ></RadioButton>
          <label htmlFor="mode5">Sidebar</label>
        </div>
        <hr />

        <h5>Modo de pantalla</h5>
        <div className="field-radiobutton">
          <RadioButton
            name="colorScheme"
            value="light"
            id="theme1"
            checked={props.colorScheme === "light"}
            onChange={() => props.changeColorScheme("light")}
          ></RadioButton>
          <label htmlFor="theme1">Claro</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            name="colorScheme"
            value="dark"
            id="theme2"
            checked={props.colorScheme === "dark"}
            onChange={() => props.changeColorScheme("dark")}
          ></RadioButton>
          <label htmlFor="theme2">Oscuro</label>
        </div>
        <hr />

        <h5>Link de powerbi</h5>
        <InputText className="w-full mb-3" />
        <Button label="Guardar" className="w-full" />
      </div>
    </div>
  );
};

export default AppConfig;

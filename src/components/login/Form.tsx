import React from "react";

import loginForm from "@/forms/loginForm";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Form() {
  const { formik, isFormFieldValid, getFormErrorMessage } = loginForm();

  return (
    <form style={{ width: "60%" }} onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <span className="p-float-label">
          <InputText
            id="in"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={classNames("w-full bg-white text-lg p-2 border-none", {
              "p-invalid": isFormFieldValid("username"),
            })}
          />
          <label
            htmlFor="in"
            className={classNames("text-black ", {
              "p-error": isFormFieldValid("username"),
            })}
          >
            Usuario
          </label>
        </span>
        {getFormErrorMessage("username")}
      </div>
      <div>
        <span className="p-float-label">
          <InputText
            name="password"
            type={"password"}
            id="in"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={classNames("w-full bg-white text-lg p-2 border-none", {
              "p-invalid": isFormFieldValid("password"),
            })}
          />
          <label
            htmlFor="in"
            className={classNames("text-black ", {
              "p-error": isFormFieldValid("password"),
            })}
          >
            Contraseña
          </label>
        </span>
        {getFormErrorMessage("password")}
      </div>

      <Button
        label="Entrar"
        className="p-button-raised w-full mt-5 border-noround p-2 text-lg"
        type="submit"
      />
    </form>
  );
}

export default Form;

import { useFormik } from "formik";
import { useAppDispatch } from "@/redux/store";

// Actions
import { signIn } from "@/redux/reducers/auth";

export default function loginForm() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.username) {
        errors.username = "El usuario es requerido.";
      }

      if (!data.password) {
        errors.password = "La contraseña es requerida";
      }
      return errors;
    },
    onSubmit: (data) => {
      dispatch(signIn(data));
      formik.resetForm();
    },
  });

  const formikTouched: any = formik.touched;
  const formikErrors: any = formik.errors;

  const isFormFieldValid = (name: string) =>
    !!(formikTouched[name] && formikErrors[name]);

  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formikErrors[name]}</small>
      )
    );
  };

  return {
    isFormFieldValid,
    getFormErrorMessage,
    formik,
  };
}

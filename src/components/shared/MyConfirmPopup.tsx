import { ConfirmPopup } from "primereact/confirmpopup"; // To use <ConfirmPopup> tag
import { confirmPopup } from "primereact/confirmpopup"; // To
import { Button } from "primereact/button";

const MyConfirmPopup = (props: Props) => {
  const confirm = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: props.message,
      icon: "pi pi-exclamation-triangle",
      accept: () => props.accept(),
      reject: () => console.log("no"),
    });
  };

  return (
    <>
      <Button
        onClick={confirm}
        icon={props.iconButton}
        label={props.labelButton}
        className={props.className}
      ></Button>

      <ConfirmPopup />
    </>
  );
};

interface Props {
  iconButton?: string;
  labelButton?: string;
  message: string;
  icon?: string;
  accept: Function;
  className?: string;
}

export default MyConfirmPopup;

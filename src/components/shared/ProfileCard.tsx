import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import userService from "@/services/users";

const { usersById } = userService();

// Components
import PercentageCircle from "@/components/shared/PercentageCircle";
import { Button } from "primereact/button";
import { useAppDispatch } from "@/redux/store";

function ProfileCard(props: any) {
  const navigate = useNavigate();
  const [isBrowser, setIsBrowser] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setIsBrowser(true);
    getUser();
  }, [props.userId]);

  const getUser = async () => {
    const user = await usersById(props.userId);
    setUser(user);
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    props.onClose();
  };

  const modalContent: ReactNode = props.show ? (
    <div style={{ zIndex: 100000, position: "relative" }}>
      <div id="wave1"></div>
      <div className="profileCard_container">
        <main
          className="profileCard shadow-2"
          style={{ backgroundColor: "rgb(249, 250, 251)" }}
        >
          <div
            className="text-2xl absolute right-0 mr-4 mt-2 top-0"
            onClick={handleClose}
          >
            X
          </div>
          <div id="profile">
            <img src="/assets/images/mypic.png" alt="Photo" />
            <div id="info">
              <h6 className="">{user.name}</h6>
              {/**/}
              <p className="jobtitle text">
                Directora Institucional de Planificación y Desarrollo
              </p>
            </div>
            <div className="flex w-full mt-3 gap-2">
              <div className="card p-1 shadow-2 text-center w-full">
                <p className="mb-1">Completados</p>
                <h6 className=" m-0">14</h6>
              </div>
              <div className="card p-1 shadow-2 text-center w-full">
                <p className="mb-1">devueltos</p>
                <h6 className=" m-0">14</h6>
              </div>
            </div>
          </div>
          {/**/}

          <div>
            <PercentageCircle
              title={"Promedio"}
              color="orange"
              user={props.userId}
              size={120}
            />
          </div>
          <hr className="mb-1" />
          <div className="p-2 flex justify-content-between">
            <Button
              icon="pi pi-eye"
              className="p-button-rounded w-3rem h-3rem"
              onClick={() => navigate(`/perfil/${props.userId}`)}
            />
            {/* <Button
              icon="pi pi-thumbs-down-fill"
              className="p-button-rounded p-button-danger w-3rem h-3rem"
            /> */}
            <Button
              icon="pi pi-comment"
              className="p-button-rounded w-3rem h-3rem"
            />
          </div>
        </main>
      </div>
      <div id="wave2"></div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      //@ts-ignore
      document.getElementById("root-modal")
    );
  } else {
    return null;
  }
}

export default ProfileCard;

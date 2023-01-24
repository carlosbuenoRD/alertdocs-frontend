import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Chat(props: any) {
  return (
    <div className={`chat_container ${props.open && "active"}`}>
      <div className="chat_users bg-bluegray-50">
        <InputText placeholder="Buscar usuario..." />
        <ul>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
          <li className="chat_option">Carlos Bueno</li>
        </ul>
      </div>
      <div className="chat_messages_container w-full">
        <div className="chat_header border-bottom-1 w-100 border-100">
          <h2>Carlos Bueno Tavares</h2>
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger"
            aria-label="Cancel"
            onClick={props.onClose}
          />
        </div>
        <div className="chat_messages flex-1">
          <div className="chat_message">
            <p className="text-lg mb-2">Hola que tal esta todo?</p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:18am
            </label>
          </div>
          <div className="chat_message">
            <p className="text-lg mb-2">
              Te queria preguntar que significar bobelto porque el documento
              necesita eso
            </p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:19am
            </label>
          </div>
          <div className="chat_message me">
            <p className="text-lg mb-2">
              Si eso es problemas viejo necesitas bobos
            </p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:48am
            </label>
          </div>
          <div className="chat_message">
            <p className="text-lg mb-2">Hola que tal esta todo?</p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:18am
            </label>
          </div>
          <div className="chat_message me">
            <p className="text-lg mb-2">Todo bien y tu que tal?</p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:18am
            </label>
          </div>
          <div className="chat_message">
            <p className="text-lg mb-2">Bien aqui trabajando</p>
            <label className="text-bluegray-500 text-xs text-right block">
              7:18am
            </label>
          </div>
        </div>
        <div className="chat_footer">
          <InputText placeholder="Escribe aqui" />
        </div>
      </div>
    </div>
  );
}

export default Chat;

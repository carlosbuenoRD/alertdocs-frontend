import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";
import { Mention } from "primereact/mention";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function ReturnActivity(props: any) {
  const [value, setValue] = useState("");
  const [customers, setCustomers] = useState<any>([]);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [todoList, setTodoList] = useState<any>([]);
  const [todo, setTodo] = useState<string>("");

  const footer = () => (
    <>
      <Button label="Cancelar" className="btn-red" onClick={props.onHide} />
      <Button label="Guardar" onClick={props.onHide} />
    </>
  );

  const onSearch = (event: any) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query;
      let suggestions;

      if (!query.trim().length) {
        suggestions = [...customers];
      } else {
        suggestions = customers.filter((customer: any) => {
          return customer.nickname
            .toLowerCase()
            .startsWith(query.toLowerCase());
        });
      }

      setSuggestions(suggestions);
    }, 250);
  };

  const addTodoList = () => {
    if (!todo) return;
    setTodoList((prev: any[]) => [...prev, todo]);
    setTodo("");
  };

  const handleDeleteTodo = (i: any) => {
    setTodoList((prev: any) => prev.filter((todo: string) => todo !== i));
  };

  const itemTemplate = (suggestion: any) => {
    // const src = 'images/avatar/' + suggestion.representative.image;

    return (
      <div className="flex align-items-center">
        {/* <img alt={suggestion.name} src={src} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{verticalAlign: 'middle'}} /> */}
        <span className="flex flex-column ml-2">
          {suggestion.name}
          <small
            style={{ fontSize: ".75rem", color: "var(--text-secondary-color)" }}
          >
            @{suggestion.nickname}
          </small>
        </span>
      </div>
    );
  };

  return (
    <Dialog
      header="Devolver documento"
      visible={props.visible}
      modal={false}
      style={{ width: "30vw" }}
      footer={() => footer()}
      onHide={props.onHide}
    >
      <div className="mt-2 flex flex-column">
        <label htmlFor="comment" className="mb-1">
          Escribe un comentario *
        </label>
        <Mention
          id="comment"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          suggestions={suggestions}
          onSearch={onSearch}
          field="nickname"
          inputClassName="w-full h-8rem"
          itemTemplate={itemTemplate}
        />

        <div className="flex flex-column mt-2">
          <label htmlFor="comment" className="mb-1">
            Tareas pendientes *
          </label>
          <div className="flex">
            <InputText
              className="flex-1"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button label="Agregar" onClick={addTodoList} />
          </div>
          <div className="card shadow-1 w-full mt-2 surface-50">
            {todoList.length > 0 ? (
              todoList.map((todo: any, i: number) => (
                <div
                  key={i}
                  className="flex align-items-center justify-content-between"
                >
                  <p className="mb-1">
                    {i + 1}- {todo}
                  </p>
                  <span
                    className="pi pi-times cursor-pointer"
                    onClick={() => handleDeleteTodo(todo)}
                  >
                    {" "}
                  </span>
                </div>
              ))
            ) : (
              <p>Debes agregar una tarea</p>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ReturnActivity;

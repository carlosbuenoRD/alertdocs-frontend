import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";
import { Mention } from "primereact/mention";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Card from "../shared/Card";
import { Dropdown } from "primereact/dropdown";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { postDevolucion } from "@/redux/reducers/devolucion";

function ReturnActivity(props: any) {
  const dispatch = useAppDispatch();

  const { activities, activity } = useAppSelector<any>(
    (state) => state.activity
  );
  const { user } = useAppSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [customers, setCustomers] = useState<any>([]);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [todo, setTodo] = useState<string>("");

  const [selectedTask, setSelectedTask] = useState<string>("");
  const [todoList, setTodoList] = useState<any>([]);

  const footer = () => (
    <>
      <Button label="Cancelar" className="btn-red" onClick={props.onHide} />
      <Button label="Devolver" onClick={handleCreateDevolucion} />
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

  const OptionTemplate = (option: any) => {
    return (
      <>
        {option.step} - {option.description}
      </>
    );
  };

  const handleCreateDevolucion = () => {
    if (!comment || !todoList) return false;
    else {
      const devolucion = {
        activityFrom: activity._id,
        activityTo: selectedTask,
        userFrom: user?._id,
        comment,
        missing: todoList,
      };

      dispatch(postDevolucion(devolucion));
      props.onHide();
    }
  };

  return (
    <Dialog
      header="Devolver documento"
      visible={props.visible}
      style={{ width: "35vw" }}
      footer={() => footer()}
      onHide={props.onHide}
    >
      <div className="mt-2 flex flex-column">
        <Card title="Paso a devolver" height="" className="w-full">
          <Dropdown
            className="w-full"
            options={activities}
            optionLabel="description"
            optionValue="_id"
            showClear
            itemTemplate={OptionTemplate}
            value={selectedTask}
            onChange={(e: any) => setSelectedTask(e.target.value)}
          />

          <h6 className="uppercase text-xs text-center m-0 mt-3 underline">
            {
              activities?.filter((a: any) => a._id === selectedTask)[0]?.usersId
                .name
            }
          </h6>
        </Card>

        <Card title="Tareas pendientes" height="">
          <div className="flex flex-column mt-2">
            <div className="flex">
              <InputText
                className="flex-1 mr-1"
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
        </Card>

        <Card title="Comentario" height="" className="w-full">
          <Mention
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            suggestions={suggestions}
            onSearch={onSearch}
            field="nickname"
            inputClassName="w-full h-8rem"
            className="w-full"
            itemTemplate={itemTemplate}
          />
        </Card>
      </div>
    </Dialog>
  );
}

export default ReturnActivity;

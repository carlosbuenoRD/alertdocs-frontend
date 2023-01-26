import React, { useRef, useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  fetchCommentsByActivities,
  fetchCommentsByDocuments,
} from "@/redux/reducers/comments";
import { Message } from "primereact/message";

function CommentSection(props: any) {
  const dispatch = useAppDispatch();
  const dt = useRef<any>(null);

  const { comments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (props.document) {
      dispatch(fetchCommentsByDocuments());
    } else {
      dispatch(fetchCommentsByActivities());
    }
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div className="card">
          <DataTable
            className="p-datatable-customers"
            ref={dt}
            value={comments || []}
            dataKey="_id"
            rowHover
            rows={10}
            responsiveLayout="scroll"
            rowsPerPageOptions={[10, 20, 30, 50]}
            paginator
          >
            <Column
              field="_id"
              header="#"
              style={{ minWidth: "4rem" }}
            ></Column>
            <Column field="activityId.step" header="Paso"></Column>
            <Column
              field="userId.name"
              header="Usuario"
              align="center"
            ></Column>
            <Column field="text" header="Comentario" sortable></Column>
            <Column
              field="createdAt"
              header="Fecha"
              sortable
              //   body={(data) => <p>1/5/2023</p>}
            ></Column>
          </DataTable>
        </div>
      ) : (
        <Message
          severity="error"
          text="La actividad no tiene comentarios"
          className="w-full h-3rem bg-pink-100"
        />
      )}
    </>
  );
}

export default CommentSection;

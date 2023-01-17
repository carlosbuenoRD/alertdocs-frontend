import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  fetchCommentsByActivities,
  removeCommentAction,
} from "@/features/comments/commentSlice";
import NoResult from "@/components/shared/NoResult";
import { dateFormat } from "@/utils/dateFormat";
import MyConfirmPopup from "@/components/confirmPopup";

function CommentsContainer() {
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCommentsByActivities());
  }, []);

  const handleRemoveComment = (id: string) => {
    dispatch(removeCommentAction(id));
  };

  return (
    <>
      <h4>Comentarios</h4>
      <div>
        {comments?.length > 0 ? (
          <>
            {comments?.map((comment) => (
              <div className="card shadow-1" key={comment._id}>
                <div className="flex justify-content-between">
                  <p className="font-bold">{comment.text}</p>
                  <MyConfirmPopup
                    message="Estas seguro de borrar el comentario?"
                    iconButton="pi pi-trash"
                    accept={() => handleRemoveComment(comment._id)}
                    className="bg-pink-400 border-none w-2rem"
                  />
                </div>
                <label className="font-medium flex">
                  <p className="m-0 mr-3">
                    {dateFormat(comment.createdAt, "date")}
                  </p>
                  <p className="m-0">{dateFormat(comment.createdAt, "time")}</p>
                </label>
              </div>
            ))}
          </>
        ) : (
          <NoResult text="La actividad no tiene comentarios." />
        )}
      </div>
    </>
  );
}

export default CommentsContainer;

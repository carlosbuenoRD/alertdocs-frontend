import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

//Actions
import {
  createChatMessage,
  getChatMessages,
  getChats,
  joinChat,
  setChat,
  setMessages,
} from "@/redux/reducers/chats";

import { toastConfig } from "@/utils/data";
import {
  getSender,
  isSameSenderMargin,
  isSameUser,
} from "@/utils/messageUtils";

// Components
import userService from "@/services/users";
import { dateFormat } from "@/utils/dateFormat";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import chatSocket from "./../sockets/chat.socket";
import { setNotifications } from "@/redux/reducers/users";
import { notifyMe } from "@/services/Notify";

const { userBySearch } = userService();

let selectedChatCompare: any;

function Chat(props: any) {
  const dispatch = useAppDispatch();

  const { chat, chats, messages } = useAppSelector((state) => state.chat);
  const { notifications } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    dispatch(getChats());
    chatSocket.emit("setup", user?._id);
  }, [user]);

  useEffect(() => {
    chatSocket.on("message recieved", (message: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== message.chat._id
      ) {
        dispatch(setNotifications([message, ...notifications]));
        dispatch(getChats());
        if (!message.chat.isGroupChat) {
          notifyMe("Has recibido un mensaje!");
          return;
        }
        return;
      } else {
        dispatch(setMessages([...messages, message]));
        dispatch(getChats());
      }
    });
    chatSocket.on("typing", () => setIsTyping(true));
    chatSocket.on("stop typing", () => setIsTyping(false));
  });

  useEffect(() => {
    console.log("SUPER CHAT", chat);

    if (chat) {
      dispatch(getChatMessages());
      selectedChatCompare = chat;
      chatSocket.emit("join chat", chat?._id);
    }
  }, [chat]);

  useEffect(() => {
    getChatBottom();
  }, [messages]);

  const handleCreateMessage = (e: any) => {
    e.preventDefault();
    if (content) {
      dispatch(createChatMessage({ content }));
      chatSocket.emit("stop typing", chat?._id);
      setContent("");
    }
  };

  const typingHandler = (e: any) => {
    setContent(e.target.value);

    if (!typing) {
      setTyping(true);
      chatSocket.emit("typing", chat?._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        chatSocket.emit("stop typing", chat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleAccessChat = async (id: string) => {
    try {
      setLoadingChat(true);
      setSearch("");
      dispatch(joinChat(id));
      setLoadingChat(false);
    } catch (error: any) {
      toast(error.message, toastConfig);
      setLoadingChat(false);
    }
  };

  const handleGetUsers = async (e: any) => {
    try {
      setSearch(e.target.value);
      setLoading(true);

      const users = await userBySearch(search);
      setSearchResult(users);
      setLoading(false);
    } catch (error: any) {
      toast(error.message, toastConfig);
    }
  };

  const getChatBottom = () => {
    let chatMessages = document.getElementById("chat_messages");

    chatMessages?.scroll(0, chatMessages.scrollHeight);
  };

  const handleClose = () => {
    dispatch(setChat(null));
    props.onClose();
  };

  return (
    <div className={`chat_container ${props.open && "active"}`}>
      <div className="chat_users py-6">
        <InputText
          placeholder="Buscar usuario..."
          className="p-3 border-blue-200 border-1"
          value={search}
          onChange={(e) => handleGetUsers(e)}
        />
        {search && searchResult && (
          <ul>
            {searchResult?.map((user) => (
              <li
                key={user._id}
                className="chat_option text-xs uppercase mb-2 border-none border-round-lg hover:bg-blue-200 transition-all"
                onClick={() => handleAccessChat(user._id)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        <ul>
          {chats?.map((chatItem) => (
            <li
              key={chatItem._id}
              className={`chat_option mb-2 border-round-lg ${
                chatItem.isGroupChat
                  ? "hover:bg-green-100 hover:text-green-800"
                  : "hover:bg-blue-100 hover:text-blue-500"
              } ${chatItem._id === chat?._id ? "bg-blue-100" : ""}`}
              onClick={() => dispatch(setChat(chatItem))}
            >
              <div className="mb-3 flex align-items-center justify-content-between">
                <p className="font-medium text-sm m-0">
                  {chatItem.isGroupChat
                    ? chatItem.chatName
                    : getSender(user, chatItem.users)}
                </p>
                {chatItem.isGroupChat && (
                  <div className="h-1rem w-1rem bg-green-300 border-circle"></div>
                )}
              </div>
              {chatItem.latestMessage && (
                <div className="flex align-items-center justify-content-between">
                  <span className="text-sm">
                    {chatItem.latestMessage?.content}
                  </span>
                  <span className="text-sm">
                    {dateFormat(chatItem.latestMessage?.createdAt, "time")}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat_messages_container relative w-full p-6 shadow-2">
        {!chat ? (
          <div className="chat_header py-2 w-100 border-100">
            <h2>Seleccione un chat</h2>
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger"
              aria-label="Cancel"
              onClick={handleClose}
            />
            <img
              src="assets/images/undraw_begin_chat.svg"
              alt="begin chat"
              className="fixed"
              style={{
                top: "20%",
                left: "60%",
                right: "50%",
                transform: "translateX(-50%)",
                height: "70vh",
              }}
            />
          </div>
        ) : (
          <>
            <div className="chat_header border-bottom-1 py-2 w-100 border-100">
              <h2>
                {chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}
              </h2>
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-danger"
                aria-label="Cancel"
                onClick={handleClose}
              />
            </div>
            <div className="chat_messages" id="chat_messages">
              {messages.map((m, i) => (
                <div
                  key={m._id}
                  className="chat_message p-3 px-4"
                  style={{
                    backgroundColor: `${
                      m.sender._id === user?._id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    marginLeft: isSameSenderMargin(
                      messages,
                      m,
                      i,
                      user?._id as string
                    ),
                    marginTop: isSameUser(messages, m, i) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                >
                  {chat.isGroupChat && m.sender._id !== user?._id && (
                    <p className="text-500 mb-2 text-sm">{m.sender.name}</p>
                  )}
                  <p className="text-lg mb-2">{m.content}</p>
                  <label className="text-bluegray-500 text-xs text-right block">
                    7:18am
                  </label>
                </div>
              ))}
            </div>
            <form
              className="chat_footer relative"
              onSubmit={(e) => handleCreateMessage(e)}
            >
              {isTyping && (
                <div
                  className=" absolute bg-white p-3 px-6 shadow-2 flex align-items-center justify-content-center border-round-lg"
                  style={{ top: -60 }}
                >
                  Escribiendo...
                </div>
              )}
              <InputText
                placeholder="Escribe aqui"
                value={content}
                onChange={(e) => typingHandler(e)}
                className="p-3"
              />
              <button className="hidden" type="submit"></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;

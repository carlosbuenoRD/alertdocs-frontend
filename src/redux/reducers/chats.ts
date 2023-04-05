import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  accessChat,
  getAllChats,
  createMessage,
  getMessages,
} from "@/services/chats.service";
import chatSocket from "@/sockets/chat.socket";

const initialState: InitialState = {
  chat: null,
  chats: [],
  messages: [],
};

export const joinChat = createAsyncThunk(
  "chat/accessChat",
  async (userId: string, thunkApi) => {
    const { chat } = thunkApi.getState() as RootState;

    try {
      const data = await accessChat(userId);

      if (!chat.chats.find((c: any) => c._id === data._id))
        thunkApi.dispatch(setChats([data, ...chat.chats]));

      thunkApi.dispatch(setChat(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkApi) => {
    try {
      const chats = await getAllChats();
      thunkApi.dispatch(setChats(chats));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const createChatMessage = createAsyncThunk(
  "chat/createChatMessage",
  async (data: { content: string }, thunkApi) => {
    const { chat } = thunkApi.getState() as RootState;

    let chatId = chat.chat._id;

    try {
      const message = await createMessage(data.content, chatId);
      chatSocket.emit("new message", message);
      thunkApi.dispatch(setMessages([...chat.messages, message]));
      thunkApi.dispatch(getChats());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (_, thunkApi) => {
    const { chat } = thunkApi.getState() as RootState;

    let chatId = chat.chat._id;

    try {
      const messages = await getMessages(chatId);
      thunkApi.dispatch(setMessages(messages));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

interface InitialState {
  chat: any;
  chats: any[];
  messages: any[];
}

export const { setChat, setChats, setMessages } = chatSlice.actions;

export default chatSlice.reducer;

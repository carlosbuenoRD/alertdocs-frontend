import axios from "../utils/axios";

export const accessChat = async (userId: string) => {
  try {
    const { data } = await axios.post("/api/chats", { userId });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllChats = async () => {
  try {
    const { data } = await axios.get("/api/chats");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createGroupChat = async (body: { name: string; users: any[] }) => {
  try {
    const { data } = await axios.post("/api/chats/group", {
      name: body.name,
      users: body.users,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createMessage = async (content: string, chat: string) => {
  try {
    const { data } = await axios.post(`/api/messages`, { content, chat });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMessages = async (chat: string) => {
  try {
    const { data } = await axios.get(`/api/messages/${chat}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

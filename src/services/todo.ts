import instance from "./instance";

export const getTodo = async () => {
  try {
    const { data } = await instance.get(`/tasks`);
    return data;
  } catch (error) {
    return error;
  }
};

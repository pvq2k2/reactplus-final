import { UserType } from "../types/user";
import instance from "./instance";

export const signup = async (user: UserType) => {
  try {
    const { data } = await instance.post(`/users`, user);
    return data;
  } catch (error) {
    return error;
  }
};

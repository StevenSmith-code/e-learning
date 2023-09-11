import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UserType = {
  id: number;
  username: string;
  email: string;
  enrollments: [];
  courses: [];
};

type LoginUserType = {
  username: string;
  password: string;
};

export async function getUsers(): Promise<UserType[]> {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Check if the error response data is an object and stringify it if it is.
      const errorMessage =
        typeof error.response?.data === "object"
          ? JSON.stringify(error.response?.data)
          : error.response?.data || "Error fetching user data";
      throw new Error(errorMessage);
    } else {
      throw new Error("Error fetching user data");
    }
  }
}

export async function getUser(): Promise<UserType> {
  try {
    const response = await axios.get(`/api/user`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Check if the error response data is an object and stringify it if it is.
      const errorMessage =
        typeof error.response?.data === "object"
          ? JSON.stringify(error.response?.data)
          : error.response?.data || "Error fetching user data";
      throw new Error(errorMessage);
    } else {
      throw new Error("Error fetching user data");
    }
  }
}

export async function postLoginForm(formdata: LoginUserType) {
  try {
    const response = await axios.post("/api/login", formdata);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data === "object"
          ? JSON.stringify(error.response?.data)
          : error.response?.data || "Error fetching user data";
      throw new Error(errorMessage);
    } else {
      throw new Error("Error fetching user data");
    }
  }
}

export async function postSignupForm(formdata: LoginUserType) {
  try {
    const response = await axios.post("/api/users", formdata);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        typeof error.response?.data === "object"
          ? JSON.stringify(error.response?.data)
          : error.response?.data || "Error fetching user data";
      throw new Error(errorMessage);
    } else {
      throw new Error("Error fetching user data");
    }
  }
}

export const useUserQuery = () => {
  return useQuery<Array<UserType>>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useLoginQuery = () => {
  return useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

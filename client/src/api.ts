import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

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

export async function getUser(): Promise<UserType[]> {
  let { userId } = useParams();
  try {
    const response = await axios.get(`/api/users/${userId}`);
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

export const useUsersQuery = () => {
  return useQuery<Array<UserType>>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useLoginQuery = () => {
  return useQuery<Array<UserType>>({
    queryKey: ["user"],
    queryFn: getUsers,
  });
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
type UserType = {
  id: number;
  username: string;
  email: string;
  enrollments: [];
  courses: [];
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

export const useUsersQuery = () => {
  return useQuery<Array<UserType>>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

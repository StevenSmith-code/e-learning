import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { postLoginForm } from "@/api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
const formSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 or more characters long" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 or more characters" })
    .max(20, { message: "Password must be 20 characters or less" }),
});

export function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: postLoginForm,
    onSuccess: (data) => {
      navigate(`/users/${data.id}/profile`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  useEffect(() => {
    if (user && user.id) {
      navigate(`/users/${user.id}/profile`);
    }
  }, []);

  return (
    <div className="flex">
      <div className="bg-zinc-900 w-1/2 h-screen flex flex-col justify-center items-center ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
          Learn Web-development the Easy Way
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-white">
          Login or create an account to look at courses made by me to help you
          kickstart your journey into Web-development!
        </p>
      </div>
      <div className="flex m-auto items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 min-w-[450px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    {loginMutation.isLoading ? (
                      <Skeleton className="h-4 w-[250px]" />
                    ) : (
                      <Input placeholder="Username" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {loginMutation.isLoading ? (
                      <Skeleton className="h-4 w-[250px]" />
                    ) : (
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              {loginMutation.isLoading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">Login</Button>
              )}
              <Button type="button" onClick={() => navigate("/signup")}>
                Don't have an account?
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default Login;

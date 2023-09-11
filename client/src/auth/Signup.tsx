import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { postSignupForm } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 or more characters long" }),
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 or more characters" })
    .max(20, { message: "Password must be 20 characters or less" }),
});

function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const signupMutation = useMutation({
    mutationFn: postSignupForm,
  });
  useEffect(() => {
    if (signupMutation.isError) {
      let errorMessage = "An error occurred"; // default message

      // Define the expected error type
      type ErrorType = {
        message: string;
      };

      type ParsedErrorType = {
        errors?: {
          [key: string]: string[];
        };
      };

      const errorObject = signupMutation.error as ErrorType;

      try {
        const parsedError: ParsedErrorType = JSON.parse(errorObject.message);

        // Type guard to ensure we have the expected shape
        if (parsedError?.errors) {
          const firstErrorKey = Object.keys(parsedError.errors)[0];
          const errorArray = parsedError.errors[firstErrorKey];

          if (Array.isArray(errorArray) && errorArray.length > 0) {
            errorMessage = errorArray[0];
          }
        }
      } catch (e) {
        // handle any JSON parsing errors here
      }

      toast({
        description: `Username ${errorMessage}`,
        variant: "destructive",
      });
    }
  }, [signupMutation.isError]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "john@doe.com",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signupMutation.mutate(values);
    if (signupMutation.isSuccess) {
      console.log(signupMutation.data.id);
      setUser(signupMutation.data.id);
      navigate(`/users/${signupMutation.data.id}/profile`);
    }
  }
  return (
    <section className="flex">
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
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your email you want to associate your account with.
                  </FormDescription>
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
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password needs at least 6 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Signup
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Signup;

// //  <FormItem>

// </FormItem>
// <FormItem>
// <FormLabel>Password</FormLabel>
// <FormControl>
//   <Input type="password" placeholder="" {...field} />
// </FormControl>
// <FormDescription>
//   Password needs at least 6 characters
// </FormDescription>
// <FormMessage />
// </FormItem>

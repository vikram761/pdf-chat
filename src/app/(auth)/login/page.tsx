"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  if (session?.status === "authenticated") {
    router.push("/upload");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast({
          title: "Ugh Something wrong happend",
          description: "try again",
        });
      }

      if (callback?.ok && !callback.error) {
        toast({
          title: "User logged in succcessfully",
        });
        router.push("/upload");
      }
    });
  };

  return (
    <div className="flex justify-center mt-28">
      <div className=" bg-gray-100 rounded-sm max-w-md w-full p-8 shadow-xl mx-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="font-bold font-montserrat text-xl">LOGIN</h2>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      {...field}
                      className="border-zinc-400"
                    />
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
                    <Input
                      type="password"
                      placeholder=""
                      {...field}
                      className="border-zinc-400"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="px-8 mt-2 w-full">
              Submit
            </Button>
            <p className="text-sm t">
              <span className="text-gray-400">Don{"'"}t have and account?</span>{" "}
              <Link
                href={"/register"}
                className="hover:underline delay-50 hover:text-gray-500"
              >
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

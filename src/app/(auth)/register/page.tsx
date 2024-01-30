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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string(),
  password: z.string().min(8),
});

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    axios
      .post("http://localhost:3000/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then(() => router.push("/login"))
      .catch(() => alert("Something went wrong!"));
  };

  return (
    <div className="flex justify-center mt-28">
      <div className=" bg-gray-100 rounded-sm max-w-md w-full p-8 shadow-xl mx-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="font-bold font-montserrat text-xl">REGISTER</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john doe"
                      {...field}
                      className=" border-zinc-400 "
                    />
                  </FormControl>

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
              <span className="text-gray-400">Have and account?</span>{" "}
              <Link
                href={"/login"}
                className="hover:underline delay-50 hover:text-gray-500"
              >
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

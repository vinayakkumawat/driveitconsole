"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  emailOrUsername: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

interface LoginFormProps {
  onForgotPasswordClick: () => void;
  onLoginSuccess: (verificationId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPasswordClick,
  onLoginSuccess,
}) => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError("");
    try {
      const result = await login({
        username: values.emailOrUsername.trim(),
        password: values.password,
      });

      if (result.success) {
        if (result.verificationId) {
          onLoginSuccess(result.verificationId);
        } else {
          // If no verificationId is returned, assume direct login
          router.push("/");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-3xl font-bold">הי, שנתחבר?</h2>
        {error && (
          <div role="alert" className="text-destructive text-sm">
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="login-email-username" className="text-lg">
                שם משתמש / מייל<span className="text-destructive mr-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="login-email-username"
                  className="bg-white"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormDescription>כתובת המייל איתה נרשמת</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="login-password" className="text-lg">
                סיסמה<span className="text-destructive mr-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    {...field}
                    className="pl-10 bg-white"
                    aria-describedby="password-toggle"
                  />
                  <button
                    id="password-toggle"
                    type="button"
                    className="absolute inset-y-0 left-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Image
                      src={"/icons/open-eye.svg"}
                      alt={showPassword ? "Hide password" : "Show password"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </FormControl>
              <FormDescription>
                <button
                  type="button"
                  className="w-full text-end hover:underline cursor-pointer"
                  onClick={onForgotPasswordClick}
                >
                  שכחתי את הסיסמה
                </button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="w-full text-black">
            כניסה
          </Button>
          <Button
            type="button"
            className="w-full text-black bg-secondary flex items-center gap-2"
          >
            כניסה מהירה
            <Image
              src="/icons/google.svg"
              alt="Sign in with Google"
              width={15}
              height={15}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

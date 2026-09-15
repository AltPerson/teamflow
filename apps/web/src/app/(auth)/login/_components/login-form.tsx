"use client";

import TextInput from "@/components/inputs/text-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import useLoginForm from "../hooks/useLoginForm";

const LoginForm = () => {
  const { errors, handleSubmit, isValid, errorLoginUser, onSubmit, register, loadingLoginUser } =
    useLoginForm();

  return (
    <Card className="w-full rounded-[0.75rem] border border-solid p-6 md:p-8">
      <CardHeader className="w-full p-0">
        <CardTitle className="text-[1.5rem] font-semibold">Welcome back</CardTitle>
        <CardDescription className="text-muted-foreground mt-2 text-[0.875rem]">
          Sign in to continue to your workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            placeholder="********"
            helperText="Must be at least 8 characters."
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {errorLoginUser && <p className="text-destructive text-sm">{errorLoginUser.message}</p>}

          <Button
            type="submit"
            className="mt-6 min-h-11 w-full"
            disabled={!isValid || loadingLoginUser}
          >
            {loadingLoginUser ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <p className="mx-auto mt-6 text-center text-[0.875rem]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-2">
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

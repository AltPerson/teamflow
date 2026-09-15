"use client";

import TextInput from "@/components/inputs/text-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import useRegisterForm from "../hooks/useRegisterForm";

const RegisterForm = () => {
  const {
    errors,
    handleSubmit,
    isValid,
    loadingRegisterUser,
    onSubmit,
    register,
    errorRegisterUser,
  } = useRegisterForm();

  return (
    <Card className="w-full rounded-[0.75rem] border border-solid p-6 md:p-8">
      <CardHeader className="w-full p-0">
        <CardTitle className="text-[1.5rem] font-semibold">Create your account</CardTitle>
        <CardDescription className="text-muted-foreground mt-2 text-[0.875rem]">
          Start collaborating with your team.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Display name"
            placeholder="Your name"
            {...register("displayName")}
            error={errors.displayName?.message}
          />
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
          <TextInput
            label="Confirm password"
            placeholder="********"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          {errorRegisterUser && (
            <p className="text-destructive text-sm">{errorRegisterUser.message}</p>
          )}

          <Button
            type="submit"
            className="mt-6 min-h-11 w-full"
            disabled={!isValid || loadingRegisterUser}
          >
            {loadingRegisterUser ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="mx-auto mt-6 text-center text-[0.875rem]">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;

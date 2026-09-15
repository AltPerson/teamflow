import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../_graphql/login.mutation";
import { LoginFormData, loginSchema } from "../_schemas/login.schema";

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { loading: loadingLoginUser, error: errorLoginUser }] =
    useMutation(LOGIN_MUTATION);

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      const response = await loginUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      console.log("response", response.data);
    } catch {}
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    loadingLoginUser,
    errorLoginUser,
  };
};

export default useLoginForm;

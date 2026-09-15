import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { REGISTER_MUTATION } from "../_graphql/register.mutation";
import { RegisterFormData, registerSchema } from "../_schemas/register.schema";

const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    defaultValues: {
      displayName: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { loading: loadingRegisterUser, error: errorRegisterUser }] =
    useMutation(REGISTER_MUTATION);

  const onSubmit = async (data: RegisterFormData) => {
    const { displayName, email, password } = data;

    try {
      await registerUser({
        variables: {
          input: {
            displayName,
            email,
            password,
          },
        },
      });
    } catch {}
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    loadingRegisterUser,
    errorRegisterUser,
  };
};

export default useRegisterForm;

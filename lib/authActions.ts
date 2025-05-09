"use server"
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { APIError } from "better-auth/api";

interface State {
    errorMessage: string;
}
export async function signUpAction(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
  };

  const { email, password, firstName, lastName } = rawFormData;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        errorMessage: error.message
      }
    }
    console.error("Signup with this email and password has not worked", error);
  }
  console.log('redirecting');
  redirect("/dashboard");
}

export async function signInAction(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { email, password} = rawFormData;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        errorMessage: error.message
      }
    }
    console.error("Signin with this email and password has not worked", error);
  }
//   console.log('redirecting...');
  redirect("/dashboard");
}
"use client";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

// Define schema using zod
const schema = z.object({
  email: z.string().email({ message: "Email Tidak Sah" }),
  password: z.string().min(6, { message: "Password Salah" }),
});

type FormData = z.infer<typeof schema>;

const LoginView = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      console.log("Login response:", res);
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email atau password salah");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setIsLoading(false);
      setError("Email atau password salah");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <h1 className="text-5xl font-bold">Login</h1>
      <div className=" flex w-[30%] shadow-lg rounded-sm flex-col p-5 m-5 ">
        {/* FORM */}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="w-[100%] bg-gray-100 rounded-[2px] shadow-sm hover:bg-gray-300 mb-3 h-8"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {/* Passowrd */}
          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-[100%] bg-gray-100 rounded-[2px] shadow-sm hover:bg-gray-300 mb-2 h-8"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 transform -translate-y-1/2 "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="py-1 font-medium bg-yellow-500 mt-3 rounded-sm cursor-pointer text-white hover:bg-yellow-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex flex-col ">
          <hr className="my-5" />
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="py-1 font-medium bg-yellow-500 text-white rounded-sm cursor-pointer px-2 hover:bg-yellow-600 flex items-center justify-center "
          >
            <FaGoogle className="mr-2" />
            Login With Google
          </button>
        </div>
      </div>
      <p>
        Belum Memiliki akun? Sign In{" "}
        <Link href="/register" className="text-blue-400">
          Here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;

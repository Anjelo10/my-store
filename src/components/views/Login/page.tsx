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
import Image from "next/image";
import { assets } from "@/components/asset/assets";

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
    <div className="flex md:grid md:grid-cols-2 items-center justify-center h-screen w-full p-4 sm:p-0">
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Image
          className="absolute top-0 left-0 m-10 w-15 md:w-20"
          src={assets.logo}
          alt="logo"
          width={100}
          height={100}
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-black">
          Welcome Back.
        </h1>
        <p className="text-sm">
          Masuk dengan email Anda untuk mengakses akun Anda
        </p>
        <div className="flex flex-col p-5 m-5 shadow-lg rounded-sm w-[70%]">
          <div>
            {/* <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="text"
                className="w-full bg-gray-100 rounded-[2px] shadow-sm hover:bg-gray-200 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 mb-3 h-9 px-3 py-2 text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 rounded-[2px] shadow-sm hover:bg-gray-200 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 mb-2 h-9 px-3 py-2 text-sm pr-10"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="py-2 px-4 font-medium bg-yellow-500 mt-3 rounded-md cursor-pointer text-white hover:bg-yellow-600 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </form> */}

            <div className="flex flex-col mt-4">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl })}
                className="py-2 px-4 font-medium bg-yellow-500 text-white rounded-md cursor-pointer
                  hover:bg-yellow-600 flex items-center justify-center transition-colors duration-200 ease-in-out"
              >
                <FaGoogle className="mr-2" />
                Login With Google
              </button>
            </div>

            {/* <p className="mt-4 text-sm sm:text-base">
              Belum Memiliki akun? Sign In{" "}
              <Link
                href="/auth/register"
                className="text-blue-500 hover:underline"
              >
                Here
              </Link>
            </p> */}
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-yellow-500 w-full h-screen bg-login"></div>
    </div>
  );
};

export default LoginView;

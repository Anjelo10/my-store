"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

// Variabel Scema yang di devinisikan dengan ZOD
const schema = z.object({
  email: z.string().email({ message: "Email Tidak Sah" }),
  fullname: z.string().min(1, { message: "Minimal harus 1 karakter" }),
  password: z
    .string()
    .min(6, { message: "Minimal harus 6 karakter" })
    .regex(/[A-Z]/, {
      message: "Harus mengandung minimal 1 huruf besar",
    })
    .regex(/[0-9]/, {
      message: "Harus mengandung minimal 1 angka",
    })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
      message: "Harus mengandung minimal 1 karakter khusus",
    }),
  phone: z
    .string()
    .min(10, { message: "Minimal harus 10 karakter" })
    .regex(/[0-9]/, {}),
});

type FormData = z.infer<typeof schema>;

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      push("/login");
    } else {
      setError("Email sudah terdaftar");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center h-screen w-full flex-col">
      <div className="grid grid-cols-2 h-full">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-5xl font-bold p-3">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className=" flex flex-col p-5 m-3 ">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {/* Fullname */}
              <label htmlFor="fullname" className="text-sm ">
                Full Name
              </label>
              <input
                {...register("fullname")}
                id="fullname"
                type="text"
                className="w-[100%]  rounded-[2px] shadow-sm  transition border hover:bg-gray-300 mb-2 h-8 border-gray-300"
              />
              {errors.fullname && (
                <p className="text-red-500">{errors.fullname.message}</p>
              )}
              {/* Email */}
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                id="email"
                type="text"
                className="w-[100%]  rounded-[2px] shadow-sm  transition border hover:bg-gray-300 mb-2 h-8 border-gray-300"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              {/* Password */}
              <div className="relative">
                <label htmlFor="password">Password</label>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-[100%]  rounded-[2px] shadow-sm  transition border hover:bg-gray-300 mb-2 h-8 border-gray-300"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-10 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 text-[20px] " />
                  ) : (
                    <FaEye className="text-gray-500 text-[18px]" />
                  )}
                </button>
              </div>
              {/* Phone */}
              <label htmlFor="phone">Phone</label>
              <input
                {...register("phone")}
                id="phone"
                type="number"
                className="no-spinner w-[100%] rounded-[2px] shadow-sm  transition border hover:bg-gray-300 mb-2 h-8 border-gray-300"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}

              <button
                type="submit"
                className="bg-blue-400 mt-3 rounded-sm cursor-pointer text-white hover:bg-blue-600"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
          <p>
            Have an account? Sign In{" "}
            <Link href="/login" className="text-blue-400">
              Here
            </Link>
          </p>
        </div>
        <div className="bg-gray-200">Kolom 2</div>
      </div>
    </div>
  );
};

export default RegisterView;

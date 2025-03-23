"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <h1 className="text-5xl font-bold">Register</h1>
      <div className=" flex w-[30%] shadow-lg rounded-sm flex-col p-5 ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            className="w-[100%] bg-gray-100 rounded-sm shadow-sm hover:bg-gray-300 mb-3"
          />
          <label htmlFor="fullname">Full Name</label>
          <input
            name="fullname"
            id="fullname"
            type="text"
            className="w-[100%] bg-gray-100 rounded-sm shadow-sm hover:bg-gray-300 mb-2"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            className="w-[100%] bg-gray-100 rounded-sm shadow-sm hover:bg-gray-300 mb-2"
          />
          <label htmlFor="phone">Phone</label>
          <input
            name="phone"
            id="phone"
            type="number"
            className="w-[100%] bg-gray-100 rounded-sm shadow-sm hover:bg-gray-300 mb-2"
          />
          <button
            type="submit"
            className="bg-blue-400 mt-3 rounded-sm cursor-pointer text-white hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      <p>
        Have an account? Sign In{" "}
        <Link href="" className="text-blue-400">
          Here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;

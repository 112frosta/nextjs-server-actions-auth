"use client";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "./actions";

interface FormFields {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  // server-actions
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await auth(data);
  };

  // API Endpoint
  const onSubmitAPI: SubmitHandler<FormFields> = async (data) => {
    const res = await axios
      .post("/api/auth/login", {
        data,
      })
      .catch((err: unknown) => {
        throw new Error("Sth went wrong");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label> <br />
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            id="email"
            className={`  px-4 py-2 mt-2 transition-all duration-150 border rounded-lg outline-none bg-slate-800 border-slate-700 ${
              errors.email ? "focus:outline-red-700" : "focus:outline-blue-700"
            }`}
          />
          <div className="mt-2 text-sm font-medium text-red-600">
            {errors.email && errors.email.message}
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            id="password"
            className={`  px-4 py-2 mt-2 transition-all duration-150 border rounded-lg outline-none bg-slate-800 border-slate-700 ${
              errors.password
                ? "focus:outline-red-700"
                : "focus:outline-blue-700"
            }`}
          />
          <div className="mt-2 text-sm font-medium text-red-600">
            {errors.password && errors.password.message}
          </div>
        </div>
        <button
          disabled={isSubmitting}
          className="w-full px-4 py-2 font-medium transition-all duration-150 bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-blue-800"
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

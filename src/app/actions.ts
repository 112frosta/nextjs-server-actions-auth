"use server";

export const auth = async (data: { email: string; password: string }) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve("e"), 3000);
  });

  console.log(data.email, data.password);
};

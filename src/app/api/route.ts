interface FormFields {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const data = (await req.json()) as FormFields;

  await new Promise((resolve) => {
    setTimeout(() => resolve("e"), 3000);
  });

  console.log(data.email, data.password);
}

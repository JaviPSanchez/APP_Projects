"use server";

// import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt-edge";
import { db } from "@/database/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //To validate en the backend
  const validateFields = RegisterSchema.safeParse(values);
  console.log(validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validateFields.data;
  //Hash Password
  const hashedPassword = bcrypt.hashSync(password, 10);
  // Check if email exist already
  const existingUser = await getUserByEmail(email);
  // Send error
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  // Creamos user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email sent!" };
};

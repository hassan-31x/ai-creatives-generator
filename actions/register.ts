"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/utils/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use" }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      // TODO: remove this after testing
      emailVerified: new Date()
    }
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(email, verificationToken.token)

  return { success: "Registration successful. Login to continu." }
}
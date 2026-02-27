import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name should be greater than or equal to 3 char"),
  email: z.email("Invalid email format"),
  phone: z.string().min(11, "Phone number is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 number,char,alphabets"),
  role: z.string(),
});

export const userLoginShema = z.object({
  email: z.email("Invalid email format"),
  password: z.string(),
});

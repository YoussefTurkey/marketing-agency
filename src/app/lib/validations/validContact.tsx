import { z } from "zod";

export const registerSchema = z
  .object({
    phone: z
      .string()
      .regex(/^\+\d{1,3}\s?\d{6,12}$/, {
        message: "Enter a valid phone number starting with + and country code",
      })
      .optional()
      .or(z.literal("")), // يسمح إنه يبقى فاضي
    email: z
      .string()
      .email({ message: "Email is not valid" })
      .optional()
      .or(z.literal("")), // يسمح إنه يبقى فاضي
    msg: z.string().optional(), // مش مطلوب
  })
  .refine((data) => data.phone || data.email, {
    message: "Please enter at least a phone number or email",
    path: ["phone"], // يربط الرسالة بالموبايل
  });

export type TRegist = z.infer<typeof registerSchema>;

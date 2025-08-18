import z from "zod";

export const registerSchema = z.object({
  phone: z.string().regex(/^\+\d{1,3}\s?\d{6,12}$/, {
    message: "Enter a valid phone number starting with + and country code",
  }),
  email: z
    .string()
    .min(1, { message: "This Field is required" })
    .email({ message: "Email is not vaild" }),
  msg: z
    .string()
    .min(1, { message: "This Field is required" })
    .refine((val) => val.trim().length > 0, {
      message: "Message cannot be empty",
    }),
});

export type TRegist = z.infer<typeof registerSchema>;

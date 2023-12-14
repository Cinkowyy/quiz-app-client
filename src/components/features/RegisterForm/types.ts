import { z } from "zod";

export const RegisterValidationSchema = z.object({
    nickname: z.string({
        required_error: "Nickname jest wymagany",
    }),
    email: z
        .string({
            required_error: "Email jest wymagany",
        })
        .email({
            message: "Email musi być poprawny",
        }),
    password: z
        .string({
            required_error: "Hasło jest wymagane",
        })
        .min(8, {
            message: "Hasło musi mieć minimum 8 znaków",
        }),
});

export type RegisterValuesType = z.infer<typeof RegisterValidationSchema>;


export type RegisterErrorType = {
    message: string;
    error: "UserExists";
};
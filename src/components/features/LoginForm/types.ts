import { z } from "zod";

export const LoginValidationSchema = z.object({
    email: z
        .string({
            required_error: "Email jest wymagany",
        }),
    password: z.string({
        required_error: "Hasło jest wymagane",
    }),
});

export type LoginValuesType = z.infer<typeof LoginValidationSchema>;


export type LoginErrorType = {
    message: string;
    error: "InvalidCredentials";
};

export type LoginResponseType = {
    accessToken: string;
    refreshToken: string;
};
import { z } from "zod";

export type CategoryType = {
    id: string;
    name: string;
};
export const QuizDataValidationSchema = z.object({
    title: z
        .string({
            required_error: "Tytuł jest wymagany",
        })
        .min(1, {
            message: "Tytuł jest wymagany",
        }),
    duration: z.number({
        invalid_type_error: "Czas trwania jest wymagany",
        required_error: "Czas trwania jest wymagany",
    }),
    category: z.string(),
});

export type QuizDataType = z.infer<typeof QuizDataValidationSchema>;
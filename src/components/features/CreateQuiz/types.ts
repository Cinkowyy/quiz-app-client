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

export type QuizFormDataType = z.infer<typeof QuizDataValidationSchema>;

export const AnswerValidationSchema = z.object({
    content: z.string({
        required_error: "Treść jest wymagana",
    })
        .min(1, {
            message: "Treść jest wymagana",
        }),
    // isCorrect: z.boolean()
})

export const QuestionValidationSchema = z.object({
    content: z
        .string({
            required_error: "Treść jest wymagana",
        })
        .min(1, {
            message: "Treść jest wymagana",
        }),
    type: z.enum(["single", "mutli"]),
    answers: z.array(AnswerValidationSchema),
});

export type QuestionFormDataType = z.infer<typeof QuestionValidationSchema>;
export type QuestionType = QuestionFormDataType & {
    id: number;
};
import { z } from "zod";

export const QuestionValidationSchema = z.object({
    content: z
        .string({
            required_error: "Treść jest wymagana",
        })
        .min(1, {
            message: "Treść jest wymagana",
        }),
    type: z.enum(["single", "mutli"]),
});

export type QuestionDataType = z.infer<typeof QuestionValidationSchema>;
import { FormInstance } from "antd";
import { z } from "zod";

export type CategoryType = {
    id: string;
    name: string;
};

export const AnswerValidationSchema = z.object({
    content: z.string({
        required_error: "Treść jest wymagana",
    })
        .min(1, {
            message: "Treść jest wymagana",
        }),
    isCorrect: z.boolean()
})

export const QuestionValidationSchema = z.object({
    id: z.number(),
    content: z
        .string({
            required_error: "Treść jest wymagana",
        })
        .min(1, {
            message: "Treść jest wymagana",
        }),
    type: z.enum(["single", "multi"]),
    answers: z.array(AnswerValidationSchema),
});

export type QuestionType = z.infer<typeof QuestionValidationSchema>;
export type QuestionFormDataType = Omit<QuestionType, 'id'>

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
    questions: z.array(QuestionValidationSchema)
});

export type QuizFormDataType = z.infer<typeof QuizDataValidationSchema>;

export type FormNames = "quizForm" | "questionForm";

export type QuizForms = {
    quizForm: FormInstance<QuizFormDataType>;
    questionForm: FormInstance<QuestionFormDataType>;
};

export type QuizValues = QuizFormDataType | QuestionFormDataType;

type OnFormFinishParam = {
    name: 'quizForm';
    values: QuizFormDataType;
    forms: QuizForms
} | {
    name: 'questionForm';
    values: QuestionFormDataType;
    forms: QuizForms
}

export type OnFormFinish = (
    info: OnFormFinishParam
) => void;
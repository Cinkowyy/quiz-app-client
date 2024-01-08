import { useState } from "react";
import { QuestionFormDataType, QuestionType, QuizFormDataType } from "./types";
import { FormInstance } from "antd";


const useQuizQuestions = (form: FormInstance<QuizFormDataType>) => {
    const [questionToEdit, setQuestionToEdit] = useState<QuestionType | null>(
        null
    );

    const addQuestion = (question: QuestionFormDataType) => {
        console.log(question);

        const prevQuestions: QuestionType[] = form.getFieldValue('questions')
        form.setFieldValue('questions', [
            ...prevQuestions,
            {
                id: Date.now(),
                ...question,
            },
        ])
    };

    const editQuestion = (updatedQuestionData: QuestionFormDataType) => {
        if (!questionToEdit) return;
        const questionId = questionToEdit.id;

        const prevQuestions: QuestionType[] = form.getFieldValue('questions')
        form.setFieldValue('questions', prevQuestions.map((question) =>
            question.id === questionId
                ? { id: questionId, ...updatedQuestionData }
                : question
        ))

        setQuestionToEdit(null);
    };

    const removeQuestion = (questionId: number) => {
        const prevQuestions: QuestionType[] = form.getFieldValue('questions')
        form.setFieldValue('questions', prevQuestions.filter((q) => q.id != questionId))
    };

    return {
        questionToEdit,
        addQuestion,
        editQuestion,
        setQuestionToEdit,
        removeQuestion
    }
}

export default useQuizQuestions
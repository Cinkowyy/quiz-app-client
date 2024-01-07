import { useState } from "react";
import { QuestionFormDataType, QuestionType } from "./types";


const useQuizQuestions = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [questionToEdit, setQuestionToEdit] = useState<QuestionType | null>(
        null
    );

    const addQuestion = (question: QuestionFormDataType) => {
        console.log(question);

        setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                id: Date.now(),
                ...question,
            },
        ]);
    };

    const editQuestion = (updatedQuestionData: QuestionFormDataType) => {
        if (!questionToEdit) return;
        const questionId = questionToEdit.id;

        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? { id: questionId, ...updatedQuestionData }
                    : question
            )
        );
        setQuestionToEdit(null);
    };

    const removeQuestion = (questionId: number) => {
        setQuestions((prev) => prev.filter((q) => q.id != questionId));
      };

    return {
        questions,
        questionToEdit,
        addQuestion,
        editQuestion,
        setQuestionToEdit,
        removeQuestion
    }
}

export default useQuizQuestions
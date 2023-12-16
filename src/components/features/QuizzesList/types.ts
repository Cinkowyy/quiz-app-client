export type QuizType = {
    id: string;
    title: string;
    duration: number;
    category: string;
    questionsCount: number
    author: {
        id: string;
        nickname: string;
    };
};
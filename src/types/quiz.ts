interface IQuestion {
    content: string,
    answers: Record<string, string>
    correctAnswer: string
}

export interface IQuiz {
    _id: string,
    title: string,
    questions: Record<string, IQuestion>
    author: {
        _id: string,
        nickname: string
    }
}
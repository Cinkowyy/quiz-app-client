import axios from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex, Radio, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

type Answer = {
  id: string;
  content: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  content: string;
  type: "single" | "multi";
  answers: Answer[];
};

type Quiz = {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
};

const SolveQuiz = ({ quizId }: { quizId: string }) => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const {
    data: quizData,
    isLoading,
    isError,
  } = useQuery<Quiz>({
    queryKey: ["quiz" + quizId],
    queryFn: async () => {
      const res = await axios.get<Quiz>("/quizzes/getQuiz/" + quizId);
      setActiveQuestion(res.data.questions[activeQuestionIndex]);
      return res.data;
    },
    staleTime: Infinity,
  });

  const submitQuestion = () => {
    if (quizData && activeQuestionIndex < quizData.questions.length - 1) {
      setActiveQuestion(quizData.questions[activeQuestionIndex + 1]);
      setActiveQuestionIndex((prev) => prev + 1);
    } else {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      {!quizData && isLoading ? <p>Ładowanie...</p> : null}
      {!quizData && isError ? <p>Wystąpił błąd...</p> : null}
      {quizData && activeQuestion ? (
        <Card
          bordered={false}
          style={{ width: "fit-content", minWidth: "500px" }}
          title={
            <Flex style={{ width: "100%" }} justify="space-between">
              <Text>{quizData.title}</Text>
              <Text>7:34</Text>
            </Flex>
          }
        >
          {activeQuestionIndex < quizData.questions.length ? (
            <>
              <Flex vertical gap={24}>
                <Text>
                  Pytanie {activeQuestionIndex + 1}: {activeQuestion.content}
                </Text>
                <Radio.Group>
                  <Flex vertical gap={8}>
                    {activeQuestion.answers.map((answer) => (
                      <Radio value={answer.id} key={answer.id}>
                        {answer.content}
                      </Radio>
                    ))}
                  </Flex>
                </Radio.Group>
              </Flex>
              <Button
                type="primary"
                size="large"
                style={{
                  marginTop: "16px",
                  marginLeft: "auto",
                  display: "block",
                }}
                onClick={submitQuestion}
              >
                Dalej
              </Button>
            </>
          ) : (
            <>
            <Text style={{fontSize: 16}}>
              Gratulacje! Udało Ci sie ukończyć quiz w <b>12min 26s</b>! <br/>
              Twój wynik to <b>11/14</b> punktów
            </Text>
            <Button
              type="primary"
              size="large"
              style={{
                marginTop: "16px",
                marginLeft: "auto",
                display: "block",
              }}
            >
              Wróć do listy quizów
            </Button>
          </>
          )}
        </Card>
      ) : null}
    </>
  );
};

export default SolveQuiz;

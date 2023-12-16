import { useQuery } from "@tanstack/react-query";
import { Form, Input, InputNumber, Select, Button, Flex, App } from "antd";
import axios from "@api/axios";
import { z } from "zod";
import { createSchemaFieldRule } from "antd-zod";
import { QuestionDataType } from "../../types";

const { Item } = Form;

type CategoryType = {
  id: string;
  name: string;
};
const QuizDataValidationSchema = z.object({
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

type QuizDataType = z.infer<typeof QuizDataValidationSchema>;

const rule = createSchemaFieldRule(QuizDataValidationSchema);

const CreateQuizForm = ({ questions }: { questions: QuestionDataType[] }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const { isLoading, data: categoriesList } = useQuery({
    queryKey: ["categoriesList"],
    queryFn: async () => {
      const response = await axios.get<CategoryType[]>(
        "/quizzes/getCategories"
      );

      const mappedCategories = response.data.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });

      return mappedCategories;
    },
    staleTime: Infinity,
  });

  const onFinish = (values: QuizDataType) => {
    if (questions.length < 5) {
      message.error({
        content: "Quiz musi mieć przynajmniej 5 pytań",
        duration: 5,
      });
      return;
    }
    console.log(values);
  };

  if (isLoading && !categoriesList) return <span>Loading...</span>;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      id="createQuizForm"
      initialValues={{
        duration: 20,
        category: categoriesList?.[0].value,
      }}
    >
      <Item label="Tytuł" name="title" rules={[rule]}>
        <Input size="large" placeholder="Podaj tytuł quizu" />
      </Item>
      <Item label="Czas trwania" name="duration" rules={[rule]}>
        <InputNumber min={5} max={100} size="large" addonAfter="min" />
      </Item>
      <Item label="Ketegoria" name="category">
        <Select size="large" options={categoriesList} />
      </Item>
    </Form>
  );
};
export default CreateQuizForm;

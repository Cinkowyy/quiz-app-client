import { useQuery } from "@tanstack/react-query";
import { Form, Input, InputNumber, Select, App } from "antd";
import axios from "@api/axios";
import { createSchemaFieldRule } from "antd-zod";
import { CategoryType, QuizDataType, QuizDataValidationSchema } from "./types";

const { Item } = Form;

const rule = createSchemaFieldRule(QuizDataValidationSchema);

const CreateQuizForm = ({ questionsCount }: { questionsCount: number }) => {
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
    if (questionsCount < 5) {
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

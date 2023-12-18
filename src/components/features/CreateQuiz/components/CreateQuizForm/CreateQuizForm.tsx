import axios from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { Form, Input, InputNumber, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { CategoryType, QuizDataType, QuizDataValidationSchema } from "./types";

const { Item } = Form;

const rule = createSchemaFieldRule(QuizDataValidationSchema);

const CreateQuizForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (v: QuizDataType) => void;
}) => {
  const [form] = Form.useForm();

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

  return (
    <Form
      form={form}
      onFinish={onFormSubmit}
      id="createQuizForm"
      initialValues={{
        duration: 20,
        category: categoriesList?.[0].value ?? "Wiedza Ogólna",
      }}
    >
      <Item label="Tytuł" name="title" rules={[rule]}>
        <Input size="large" placeholder="Podaj tytuł quizu" />
      </Item>
      <Item label="Czas trwania" name="duration" rules={[rule]}>
        <InputNumber min={5} max={100} size="large" addonAfter="min" />
      </Item>
      <Item label="Ketegoria" name="category">
        <Select size="large" options={categoriesList} loading={isLoading} />
      </Item>
    </Form>
  );
};
export default CreateQuizForm;

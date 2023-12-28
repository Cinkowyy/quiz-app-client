import axios from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { Form, Input, InputNumber, Radio, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import {
  CategoryType,
  QuizDataValidationSchema,
  QuizFormDataType,
} from "../../types";

const { Item } = Form;

const rule = createSchemaFieldRule(QuizDataValidationSchema);

const CreateQuizForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (v: QuizFormDataType) => void;
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
      size="large"
      initialValues={{
        duration: 20,
        category: categoriesList?.[0].value ?? null,
        visibility: "public",
      }}
    >
      <Item label="Tytuł" name="title" rules={[rule]}>
        <Input placeholder="Podaj tytuł quizu" />
      </Item>
      <Item label="Czas trwania" name="duration" rules={[rule]}>
        <InputNumber min={5} max={100} addonAfter="min" />
      </Item>
      <Item label="Widoczność" name="visibility">
        <Radio.Group
          options={[
            { label: "Publiczny", value: "public" },
            { label: "Prywatny", value: "private" },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Item>
      <Item label="Ketegoria" name="category">
        <Select options={categoriesList} loading={isLoading} />
      </Item>
    </Form>
  );
};
export default CreateQuizForm;

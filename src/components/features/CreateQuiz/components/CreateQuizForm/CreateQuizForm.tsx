import axios from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { Form, FormInstance, Input, InputNumber, Radio, Select } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import {
  CategoryType,
  QuizDataValidationSchema,
  QuizFormDataType,
} from "../../types";
import { useEffect } from "react";

const { Item } = Form;

const rule = createSchemaFieldRule(QuizDataValidationSchema);

const CreateQuizForm = ({ form }: { form: FormInstance<QuizFormDataType> }) => {
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

  useEffect(() => {
    if (categoriesList && !form.getFieldValue("category"))
      form.setFieldValue("category", categoriesList[0].value);
  }, [categoriesList, form]);

  return (
    <Form
      form={form}
      name="quizForm"
      id="quizForm"
      size="large"
      initialValues={{
        duration: 20,
        visibility: "public",
        questions: []
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
      <Item name="questions" hidden/>
    </Form>
  );
};
export default CreateQuizForm;

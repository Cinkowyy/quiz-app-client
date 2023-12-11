import { useQuery } from "@tanstack/react-query";
import { Form, Input, InputNumber, Select, Button } from "antd";
import axios from "../../../api/axios";

const { Item } = Form;

type CategoryType = {
  id: string;
  name: string;
};

const CreateQuizForm = () => {
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
  });

  const onFinish = (values: any) => {
    console.log(values);
  };

  if (isLoading && !categoriesList) return <span>Loading...</span>;

  return (
    <Form form={form} onFinish={onFinish}>
      <Item label="Tytuł" name="title">
        <Input size="large" placeholder="Podaj tytuł quizu" />
      </Item>
      <Item label="Czas trwania" name="duration">
        <InputNumber min={5} defaultValue={20} max={100} size="large" />
      </Item>
      <Item label="Ketegoria" name="category">
        <Select
          defaultValue={categoriesList?.[0]}
          size="large"
          options={categoriesList}
        />
      </Item>
    </Form>
  );
};
export default CreateQuizForm;

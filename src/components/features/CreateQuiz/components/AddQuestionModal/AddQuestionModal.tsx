import { Button, Flex, Modal, Form, Input, Radio } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { QuestionDataType, QuestionValidationSchema } from "../../types";

const { Item } = Form;

const rule = createSchemaFieldRule(QuestionValidationSchema);

type AddQuestionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addQuestion: (value: QuestionDataType) => void;
};

const AddQuestionModal = ({
  isOpen,
  setIsOpen,
  addQuestion,
}: AddQuestionModalProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: QuestionDataType) => {
    console.log(values);
    addQuestion(values);
    form.resetFields();
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="Dodaj pytanie"
      footer={
        <Flex justify="space-between">
          <Button onClick={() => setIsOpen(false)}>Anuluj</Button>
          <Button type="primary" htmlType="submit" form="questionForm">
            Dodaj
          </Button>
        </Flex>
      }
    >
      <Form
        id="questionForm"
        form={form}
        onFinish={onFinish}
        initialValues={{
          type: "single",
        }}
      >
        <Item label="Treść" name="content" rules={[rule]}>
          <Input size="large" placeholder="Podaj treść pytania" />
        </Item>
        <Item label="Typ" name="type">
          <Radio.Group
            options={[
              { label: "Single", value: "single" },
              { label: "Multi", value: "multi" },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Item>
      </Form>
    </Modal>
  );
};
export default AddQuestionModal;

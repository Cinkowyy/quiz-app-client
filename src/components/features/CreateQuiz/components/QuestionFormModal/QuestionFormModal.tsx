import { Button, Flex, Modal, Form, Input, Radio } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { QuestionFormDataType, QuestionValidationSchema } from "../../types";

const { Item } = Form;

const rule = createSchemaFieldRule(QuestionValidationSchema);

type QuestionModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  addQuestion: (value: QuestionFormDataType) => void;
};

const QuestionFormModal = ({
  isOpen,
  closeModal,
  addQuestion,
}: QuestionModalProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: QuestionFormDataType) => {
    addQuestion(values);
    form.resetFields();
    closeModal();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Dodaj pytanie"
      footer={
        <Flex justify="space-between">
          <Button onClick={closeModal} size="large">
            Anuluj
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            form="questionForm"
          >
            Dodaj
          </Button>
        </Flex>
      }
    >
      <Form
        id="questionForm"
        form={form}
        size="large"
        onFinish={onFinish}
        initialValues={{
          type: "single",
        }}
      >
        <Item label="Treść" name="content" rules={[rule]}>
          <Input placeholder="Podaj treść pytania" />
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

export default QuestionFormModal;

import { Button, Flex, Modal, Form, Input, Radio } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import {
  QuestionFormDataType,
  QuestionType,
  QuestionValidationSchema,
} from "../../types";
import { useEffect } from "react";

const { Item } = Form;

const rule = createSchemaFieldRule(QuestionValidationSchema);

type QuestionModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (value: QuestionFormDataType) => void;
  dataToEdit: QuestionType | null;
};

const QuestionFormModal = ({
  isOpen,
  closeModal,
  onSubmit,
  dataToEdit,
}: QuestionModalProps) => {
  const [form] = Form.useForm<QuestionFormDataType>();

  const onFinish = (values: QuestionFormDataType) => {
    onSubmit(values);
    form.resetFields()
    closeModal();
  };

  useEffect(() => {

    if(!dataToEdit) form.resetFields()
    else form.setFieldsValue({
      content: dataToEdit.content,
      type: dataToEdit.type
    })
  }, [dataToEdit, form])

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
            {dataToEdit ? "Zapisz" : "Dodaj"}
          </Button>
        </Flex>
      }
    >
      <Form
        id="questionForm"
        form={form}
        size="large"
        onFinish={onFinish}
        initialValues={
          {
            content: undefined,
            type: "single",
          }
        }
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

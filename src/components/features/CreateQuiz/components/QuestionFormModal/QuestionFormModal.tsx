import { Button, Flex, Modal, Form, Input, Radio, Checkbox } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import {
  QuestionFormDataType,
  QuestionType,
  QuestionValidationSchema,
} from "../../types";
import { ChangeEvent, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./QuestionFormModal.module.scss";

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

  const onClose = () => {
    form.resetFields();
    closeModal();
  };

  const handleAnswerCheck = (
    e: ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const {
      answers,
      type,
    }: {
      answers: QuestionFormDataType["answers"];
      type: QuestionFormDataType["type"];
    } = form.getFieldsValue(["answers", "type"]);

    const changedAnswer = answers[answerIndex];
    const checked = e.target.checked;
    if (type === "single") {
      const clearedAnswers = answers.map((answer) => ({
        ...answer,
        isCorrect: false,
      }));
      form.setFieldValue("answers", clearedAnswers);
    }

    console.log(answers[answerIndex], type);
    return checked;
  };

  const onFinish = (values: QuestionFormDataType) => {
    console.log(values);
    return;

    onSubmit(values);
    onClose();
  };

  useEffect(() => {
    if (!dataToEdit) form.resetFields();
    else
      form.setFieldsValue({
        content: dataToEdit.content,
        type: dataToEdit.type,
        answers: [...dataToEdit.answers],
      });
  }, [dataToEdit, form]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Dodaj pytanie"
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose} size="large">
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
        initialValues={{
          content: undefined,
          type: "single",
          answers: [
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
          ],
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
        <Form.List name="answers">
          {(fields, { add, remove }) => (
            <div className={styles["awswers-grid"]}>
              {fields.map(({ key, name, ...restField }) => (
                <Item
                  key={key}
                  {...restField}
                  name={[name, "content"]}
                  initialValue={""}
                  rules={[
                    { required: true, message: "Treść jest wymagana" },
                    { min: 1, message: "Treść jest wymagana" },
                  ]}
                >
                  <Input
                    addonBefore={
                      <Item
                        name={[name, "isCorrect"]}
                        initialValue={false}
                        noStyle
                        valuePropName="checked"
                        getValueFromEvent={(e) => handleAnswerCheck(e, name)}
                      >
                        <Checkbox />
                      </Item>
                    }
                    addonAfter={
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length < 3) return;
                          remove(name);
                        }}
                      />
                    }
                  />
                </Item>
              ))}
              {fields.length < 6 ? (
                <Button type="dashed" onClick={() => add()}>
                  <PlusOutlined />
                  Dodaj odpowiedź
                </Button>
              ) : null}
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default QuestionFormModal;

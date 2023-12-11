import { Card } from "antd"
import CreateQuizForm from "../../components/features/CreateQuizForm/CreateQuizForm"

const CreateQuiz = () => {
  return (
    <Card title="Stwórz quiz" style={{ width: 500 }} bordered={false}>
      <CreateQuizForm />
    </Card>
  )
}
export default CreateQuiz
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const GuestHomePage = () => {
  return (
    <Card bordered={false}>
      <h2>Witaj w QuizzesApp</h2>
      <p>Posiadasz już konto?</p>
      <Link to="sign-in">
        <Button type="primary">Zaloguj się</Button>
      </Link>
      <p>Nie posiadasz?</p>
      <Link to="sign-up">
        <Button type="primary">Stwórz je</Button>
      </Link>
    </Card>
  );
};
export default GuestHomePage;

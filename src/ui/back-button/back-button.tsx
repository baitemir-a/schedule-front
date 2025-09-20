import { useNavigate } from "react-router-dom";
import Button from "../button/button";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant="secondary">Назад</Button>
  );
};

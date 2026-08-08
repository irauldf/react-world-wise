import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      Back
    </Button>
  );
}

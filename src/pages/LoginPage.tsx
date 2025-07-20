import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../mutations/authMutations";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useSendOtpMutation();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Please Enter Your Phone Number
      </Typography>
      <TextField
        label="Phone Number"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isPending}
        onClick={() =>
          mutate(
            { phone: value },
            {
              onSuccess: () => {
                navigate("/confirm-otp", { state: { phone: value } });
              },
            }
          )
        }
      >
        {isPending ? "Sending..." : "Send Code"}
      </Button>
    </Container>
  );
};

export default LoginPage;

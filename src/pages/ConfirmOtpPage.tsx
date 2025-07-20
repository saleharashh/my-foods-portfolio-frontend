import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../mutations/authMutations";
import { useAuth } from "../contexts/AuthContext";

const ConfirmOtpPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const { setToken } = useAuth();
  const { mutate } = useVerifyOtpMutation();

  return (
    <>
      <Container maxWidth={"sm"} sx={{ mt: 8 }}>
        <Typography>
          Enter OTP code sended to <b>{state?.phone}</b>
        </Typography>
        <TextField
          label="OTP"
          fullWidth
          sx={{ my: 2 }}
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={() =>
            mutate(
              { phone: state?.phone, code: OTP },
              {
                onSuccess: (data) => {
                  setToken(data.token);
                  navigate("/user-information");
                },
              }
            )
          }
        >
          verify OTP
        </Button>
      </Container>
    </>
  );
};

export default ConfirmOtpPage;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MjE3OTEwMTc5IiwiaWF0IjoxNzUyMzI5NDY1LCJleHAiOjE3NTIzMzMwNjV9.DDvq11g7fmk1wC_6rdQo4w8N4gmBNxyn-Zg16SRHnDw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MjE3OTEwMTc5IiwiaWF0IjoxNzUyMzI5NDY1LCJleHAiOjE3NTIzMzMwNjV9.DDvq11g7fmk1wC_6rdQo4w8N4gmBNxyn-Zg16SRHnDw
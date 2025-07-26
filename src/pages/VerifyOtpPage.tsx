import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../mutations/authMutations";
import { useAuth } from "../contexts/AuthContext";

const VerifyOtpPage = () => {
  const [otp, setotp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setToken, setRefreshToken, refreshToken } = useAuth();
  const { mutate } = useVerifyOtpMutation();

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const val = e.target.value;

    var newOtp = [...otp];
    newOtp[index] = val;
    setotp(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const pervIndex = index - 1;
      inputRefs.current[pervIndex]?.focus();
      var newOtp = [...otp];
      newOtp[pervIndex] = "";
      setotp(newOtp);
      e.preventDefault();
    }
  };

  const handleVerify = () => {
    mutate(
      { code: otp.join(""), phone: state?.phone },
      {
        onSuccess: (data) => {
          setToken(data.data.user?.token);
          setRefreshToken(data.data.user?.refreshtoken);
          // console.log("login response:", data);
          // console.log(refreshToken)
          if (data.data.isNewUser) {
            navigate("/user-information");
          }
        },
      }
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* login image  */}
      <Stack sx={{ width: "100%", height: "100vh" }} direction={"row"}>
        <Box
          sx={{ width: "50%", height: "100vh", backgroundColor: "#FFFFFF" }}
        ></Box>
        {/* login form */}
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={4}
            direction={"column"}
            alignItems={"center"}
            sx={{ px: 7.5 }}
          >
            <Stack direction={"column"} spacing={2} alignItems={"center"}>
              <Typography variant="h6">Check Your Phone</Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                paddingX={5}
                textAlign={"center"}
              >
                Please Enter the six digit verification code we sent to
              </Typography>
              <Typography variant="subtitle1">{state?.phone}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  inputRef={(e1) => (inputRefs.current[index] = e1)}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  onChange={(e) => handleOnchange(e, index)}
                  style={{ textAlign: "center" }}
                  sx={{
                    "& input": {
                      textAlign: "center",
                    },
                  }}
                />
              ))}
            </Stack>
            <Button variant="contained" onClick={handleVerify} fullWidth>
              Verify OTP
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default VerifyOtpPage;

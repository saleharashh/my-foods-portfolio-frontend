import { Typography, Button, Box, Stack, TextField } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../mutations/authMutations";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  const { mutate, isPending } = useSendOtpMutation();

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
            <Typography variant="h4">Welcome</Typography>
            <Typography variant="caption" color="textSecondary" paddingX={5}>
              Welcome to My Foods Please enter your phone
            </Typography>
            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ mx: 5 }}
              label="Phone Number"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              disabled={isPending}
              onClick={() => {
                mutate(
                  { phone: value },
                  {
                    onSuccess: () => {
                      navigate("/verify-otp", { state: { phone: value } });
                    },
                  }
                );
              }}
              fullWidth
            >
              {isPending ? "Sending..." : "Send OTP"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;

import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import type { UserFormData } from "../type/user";
import { useGetUser, useUpdateUser } from "../mutations/usersMutations";

const UserInformationPage = () => {
  const [formData, setFormData] = useState<UserFormData>({
    phone: "",
    name: "",
    address: "",
  });

  const { mutate } = useUpdateUser();

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
              Check Your Phone We Sent You a Verification Code
            </Typography>
            <TextField
              sx={{ mx: 5 }}
              label="Phone Number"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => {
                
              }}
              fullWidth
            >
              Verify OTP
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserInformationPage;

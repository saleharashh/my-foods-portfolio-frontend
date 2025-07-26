import { useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { UserFormData } from "../type/user";
import { useUpdateUser } from "../requests/usersMutations";
import { useAuth } from "../contexts/AuthContext";

const UserInformationPage = () => {
  const [formData, setFormData] = useState<UserFormData>({
    phone: "",
    name: "",
    address: "",
  });
  const { mutate } = useUpdateUser();
  const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    var newFormData = formData;
    newFormData.name = e.target.value;
    setFormData(newFormData);
  };
  const hanldeAddressOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    var newFormData = formData;
    newFormData.address = e.target.value;
    setFormData(newFormData);
  };
  const handleSubmit = () => {
    mutate(
      { address: formData.address, name: formData.name },
      {
        onSuccess: (data) => {
          console.log(data.message);
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
      <Stack
        direction={"column"}
        width={"50%"}
        alignItems={"start"}
        spacing={4}
      >
        <Stack width={"100%"} alignItems={"center"} spacing={1}>
          <Typography variant="h4">User Information</Typography>
          <Typography variant="body2">Please enter your information</Typography>
        </Stack>
        <Stack direction={"column"} spacing={1} width={"100%"}>
          <Typography variant="body2">Full Name:</Typography>
          <TextField size="small" fullWidth onChange={handleNameOnChange} />
        </Stack>
        <Stack direction={"column"} spacing={1} width={"100%"}>
          <Typography variant="body2">Address:</Typography>
          <TextField
            size="small"
            multiline
            fullWidth
            onChange={hanldeAddressOnChange}
          ></TextField>
        </Stack>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default UserInformationPage;

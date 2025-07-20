import { useState } from "react";
import { Button, TextField } from "@mui/material";
import type { UserFormData } from "../type/user";
import { useGetUser, useUpdateUser } from "../mutations/usersMutations";

const UserInformationPage = () => {
  const [formData, setFormData] = useState<UserFormData>({
    phone: "",
    name: "",
    address: "",
  });

  const { mutate } = useUpdateUser();

  const getInfomutate = useGetUser().mutate;
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((perv) => ({ ...perv, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name: formData.name, address: formData.address },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
  };
  const handleClickInfo = () => {
    getInfomutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="address"
          name="address"
          value={formData.address}
          onChange={handleOnChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      <Button variant="contained" color="primary" onClick={handleClickInfo}>
        get info
      </Button>
    </>
  );
};

export default UserInformationPage;

import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import useReorderMessage from "../../hooks/userReorderMessage";

const ReorderMessage = () => {

  const { data, isLoading } = useReorderMessage();

  console.log(data);

  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        {data.map((message) => (
          <SnackbarContent
            message={message.message}
          />
        ))}
      </Stack>
    </>
  );
};

export default ReorderMessage;

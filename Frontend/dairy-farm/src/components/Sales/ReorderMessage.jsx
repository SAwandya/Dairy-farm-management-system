import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import useReorderMessage from "../../hooks/userReorderMessage";
import { Box, Container } from "@mui/system";
import { Alert, Typography } from "@mui/material";

const ReorderMessage = () => {
  const { data, isLoading } = useReorderMessage();

  console.log(data);

  return (
    <>
      <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", marginTop: "15px",fontWeight:"bold" }}>Production Notifications</Typography>
      <Container
        sx={{
          maxWidth: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "40px",
          }}
        >
          <Stack spacing={2}>
            {data?.map((message) => (
              <Alert
                sx={{ height: "14vh", fontSize: "24px" }}
                severity="warning"
              >
                {message.message}
              </Alert>
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default ReorderMessage;

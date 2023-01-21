import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography
      variant="body2"
      sx={{
        marginLeft: "4%",
        fontWeight: "bold",
      }}
      color="text.secondary"
    >
      {"Copyright © "}
      <Link color="inherit" href=" ">
        oNstore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "70vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container
          // sx={{
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
          maxWidth="sm"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              fontFamily: "papyrus",
            }}
            variant="body1"
          >
            Made with ❤️
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

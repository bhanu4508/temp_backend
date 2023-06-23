// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ErrorStack} from "./ErrorStack";
import Header from "./Header";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Keeper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export const SignIn = () => {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [mess,setmess] = useState(false)
  const [errmes,seterrmes] = useState("");
  let navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('userInfo');
    
    if (token){
      navigate('/home');
    }

  }, [navigate]);


  
  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const json = await response.json();
        if (json.message) {
          setmess(true);
          seterrmes(json.msg);
        } else {
          setmess(false);
          localStorage.setItem("userInfo", JSON.stringify(json.data));
          navigate('/home');
        }
      } else {
        // Handle non-successful response
        const errorData = await response.json();
        // You can extract the specific error message from the response if available
        const errorMessage = errorData.message || "An error occurred";
        setmess(true);
        seterrmes(errorMessage);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setmess(true);
      seterrmes("An error occurred");
    }
  };
  
  
  const handleSubmit = async(event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Header />
      <ThemeProvider theme={defaultTheme}>
      {mess && <ErrorStack message={errmes}/>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e=>{setusername(e.target.value)}}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>{setPassword(e.target.value)}}
            />
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

    </div>
  );
}

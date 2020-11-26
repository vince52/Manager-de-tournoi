import React from "react";
import API from "../../utils/API";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    };
    send = async () => {
        const { email, password, cpassword } = this.state;
        if (!email || email.length === 0) return;
        if (!password || password.length === 0 || password !== cpassword) return;
        try {
          const { data } = await API.signup({ email, password });
          localStorage.setItem("token", data.token);
          window.location = "/dashboard";
        } catch (error) {
          console.error(error);
        }
    };
    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        });
    };
    render() {
        const { email, password, cpassword } = this.state;
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div /*className={classes.paper}*/>
              <Avatar /*className={classes.avatar}*/>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form /*className={classes.form}*/ noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      value={password}
                      onChange={this.handleChange}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="cpassword"
                      label="Confirm Password"
                      value={cpassword}
                      onChange={this.handleChange}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onChange={this.send}
                  //className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
    }
}
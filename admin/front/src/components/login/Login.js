import React from "react";
import { Button, FormGroup, FormControl, Form} from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {
    state = {
        email: "",
        password: ""
    };
    send = async () => {
        const {email, password} = this.state;
        if (!email || email.lenth === 0) {
            return;
        }
        if (!password || password.lenth === 0) {
            return;
        }
        try {
            const { data } = await API.login(email, password);
            localStorage.ssetItem("token", data.token);
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                    <Form.Label>Email</Form.Label>
                    <FormControl
                    autoFocus
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                <Form.Label>Password</Form.Label>
                    <FormControl
                    autoFocus
                    value={password}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <Button onClick={this.send} block bsSize="large" type="submit">
                    Connexion
                </Button>
            </div>
        );
    }
}
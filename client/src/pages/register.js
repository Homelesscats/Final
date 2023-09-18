import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { Container } from "@mui/material";
import { teal } from "@mui/material/colors";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      password
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser] = useMutation(REGISTER_USER, {
    refetchQueries: [],
    onUpdate(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },

    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },

    variables: { registerInput: values },
  });

  return (
    <Container className="Container" spacing={2} maxWidth="sm">
      <h2>Register</h2>
      <h5>Please register below to create an account</h5>
      <Stack className="Stack" spacing={2} paddingBottom={2}>
        <TextField
          className="TextField"
          label="Username"
          name="username"
          onChange={onChange}
        />
        <TextField
          className="TextField"
          label="Email"
          name="email"
          onChange={onChange}
        />
        <TextField
          className="TextField"
          label="Password"
          name="password"
          onChange={onChange}
        />
        <TextField
          className="TextField"
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return (
          <Alert className="Alert" severity="error">
            {error.message}
          </Alert>
        );
      })}
      <Button
        sx={{ backgroundColor: "teal" }}
        className="Button"
        variant="contained"
        onClick={onSubmit}
      >
        Register
      </Button>
    </Container>
  );
}

export default Register;

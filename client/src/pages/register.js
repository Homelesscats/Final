import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

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
    console.log("callback hit"); //--------------------------------------------
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

    variables: { registerInput: values }, // values as in password, email...
  });
  console.log(values);
  return (
    <Container spacing={2} maxWidth="sm">
      <h2>Register</h2>
      <h5>This is the register page, register below to create an account</h5>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
}
export default Register;

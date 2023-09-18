import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Replace with the correct path to your CSS file
// eslint-disable-next-line
//import { teal } from "@mui/material/colors";
// eslint-disable-next-line
const teal = require("@mui/material/colors").teal;

const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

function Login(props) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser({ variables: { loginInput: values } });
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  console.log(values, " hello these are the values in main form");

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },

    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },

    variables: { loginInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <div className="container">
        <div className="form-container">
          <h3>Login</h3>
          <p>This is the login page, login below:</p>
          <div className="form-group">
            <TextField label="Email" name="email" onChange={onChange} />
          </div>
          <div className="form-group">
            <TextField label="Password" name="password" onChange={onChange} />
          </div>
          {errors.map(function (error, index) {
            return (
              <div key={index} className="error-message">
                {error.message}
              </div>
            );
          })}
          <Button
            sx={{ backgroundColor: "teal" }}
            className="login-button"
            variant="contained"
            onClick={onSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;

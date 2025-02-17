import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BASE_URL from "../../config";
import Swal from "sweetalert2";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    setEmailError("");
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email e password sono obbligatorie.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Inserisci un'email valida.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log("Response status:", response.status); // Log dello status della risposta
        return response.json().then((data) => {
          console.log("Response data:", data); // Log dei dati della risposta
          if (!response.ok) {
            if (response.status === 401) {
              // Mostra un alert con SweetAlert2 se l'email non è nel database
              console.log("Errore 401: email non trovata");
              Swal.fire({
                icon: "error",
                title: "Errore di accesso",
                text: "L'email non è associata a nessun account!",
                confirmButtonColor: "#b22222",
              });
            } else {
              console.log("Errore generico:", data.message);
              Swal.fire({
                icon: "error",
                title: "Errore",
                text: data.message || "Si è verificato un errore!",
                confirmButtonColor: "#b22222",
              });
            }
            throw new Error(data.message);
          }
          return data;
        });
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        navigate("/");
      })
      .catch((error) => {
        console.error("Errore durante il login: ciao", error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email ciao" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!emailError} />
        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button type="submit">Login</Button>
    </Form>
  );
}

export default LoginForm;

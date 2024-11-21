import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://backend.cashuboli.it/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Salvataggio Token, Utente, Ruolo e ID nel Localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId); // Aggiungi l'ID dell'utente
        navigate("/"); // Reindirizza alla dashboard o alla pagina desiderata
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../config";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      Swal.fire("Errore", "Token non valido.", "error");
      navigate("/"); // Reindirizza alla home o login
      return;
    }

    fetch(`${BASE_URL}/auth/verify-email?token=${token}`)
      .then((response) => response.text())
      .then((message) => {
        Swal.fire("Verifica completata!", message, "success").then(() => {
          navigate("/"); // Dopo conferma, va alla pagina di login
        });
      })
      .catch(() => {
        Swal.fire("Errore", "Token scaduto o non valido.", "error");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [location, navigate]);

  return loading ? <p>Verifica in corso...</p> : null;
}

export default VerifyEmail;

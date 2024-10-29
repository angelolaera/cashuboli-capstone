import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Inizializza useNavigate
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Converti in centesimi
      });

      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }

      const data = await response.json();
      console.log("Client secret ricevuto:", data.clientSecret);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Errore nel recupero del client secret:", error);
      setErrorMessage("Errore nel recupero delle informazioni di pagamento. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      handlePayment();
    }
  }, [clientSecret]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe o Elements non sono inizializzati.");
      setErrorMessage("Errore nell'inizializzazione del sistema di pagamento. Ricarica la pagina.");
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Errore durante il pagamento:", result.error.message);
        setErrorMessage(result.error.message);
        alert("Pagamento fallito. Verrai reindirizzato alla pagina di prenotazione per riprovare.");
        navigate("/booking"); // Reindirizza alla pagina di booking in caso di errore
      } else {
        if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
          alert("Pagamento completato con successo!");
          navigate("/"); // Reindirizza alla homepage in caso di successo
        }
      }
    } catch (error) {
      console.error("Errore imprevisto durante la conferma del pagamento:", error);
      setErrorMessage("Si è verificato un errore durante il pagamento. Riprova più tardi.");
      navigate("/booking"); // Reindirizza alla pagina di booking in caso di errore imprevisto
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clientSecret) {
      createPaymentIntent();
    } else {
      handlePayment();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Elaborazione..." : "Paga Ora"}
      </button>
    </form>
  );
};

export default CheckoutForm;

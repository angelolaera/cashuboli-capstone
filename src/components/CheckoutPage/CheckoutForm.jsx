import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "../CheckoutPage/CheckoutForm.css";
import BASE_URL from "../../config";

const CheckoutForm = ({ totalAmount, prenotazioneData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/payments/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }

      const data = await response.json();
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
      setErrorMessage("Errore nell'inizializzazione del sistema di pagamento.");
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        alert("Pagamento fallito. Verrai reindirizzato alla pagina di prenotazione per riprovare.");
        navigate("/booking");
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        alert("Pagamento completato con successo!");
        await submitBooking(); // Invio dei dati della prenotazione
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Errore durante la conferma del pagamento.");
      navigate("/booking");
    } finally {
      setLoading(false);
    }
  };

  const submitBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/prenotazioni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prenotazioneData),
      });

      if (!response.ok) {
        throw new Error("Errore nell'invio dei dati della prenotazione");
      }
    } catch (error) {
      setErrorMessage("Errore durante l'invio della prenotazione.");
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
    <form onSubmit={handleSubmit} className="cashoutForm mb-5">
      <CardElement className="paymentLabel" />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button className="checkoutFormBtn" type="submit" disabled={loading}>
        {loading ? "Elaborazione..." : "Paga Ora"}
      </button>
    </form>
  );
};

export default CheckoutForm;

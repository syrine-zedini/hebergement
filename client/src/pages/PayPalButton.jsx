import { useEffect, useRef } from "react";

export default function PayPalButton({ total, onSuccess }) {
  const paypalRef = useRef();

  useEffect(() => {
    // Vérifie si le script est déjà chargé pour éviter les doublons
    if (window.paypal && paypalRef.current && !paypalRef.current.hasChildNodes()) {
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                  currency_code: "EUR",
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            onSuccess(details);
          });
        },
        onError: function (err) {
          console.error("Erreur PayPal :", err);
          alert("Une erreur est survenue avec PayPal.");
        },
      }).render(paypalRef.current);
    }
  }, [total, onSuccess]);

  return <div ref={paypalRef}></div>;
}

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  const getFinalAmount = () => {
    return selectedAmount || Number(customAmount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setCardError(null);
    setSuccess(false);

    const amount = getFinalAmount();
    if (!amount || isNaN(amount) || amount <= 0) {
      setCardError("Please select or enter a valid donation amount.");
      setProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const userName = user?.displayName || "Anonymous";
    const userEmail = user?.email || "no-email@example.com";

    try {
      // STEP 1: Get client secret from backend
      const res = await fetch(`${import.meta.env.VITE_server}payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userName, userEmail }),
      });

      const data = await res.json();
      console.log("Server response:", data);
      const clientSecret = data?.clientSecret;

      if (!clientSecret) {
        toast.error("Unable to initiate payment. Please try again.");
        setProcessing(false);
        return;
      }

      // STEP 2: Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail
          },
        },
      });

      if (confirmError) {
        toast.error("Payment Failed");
        setCardError(confirmError.message);
        setProcessing(false);
        return;
      }

      console.log(paymentIntent);
      // STEP 3: Save payment history on success
      if (paymentIntent.status === 'succeeded') {
        const historyRes = await fetch(`${import.meta.env.VITE_server}payment/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, userName, userEmail }),
        });

        const historyData = await historyRes.json();
        // console.log(historyData)
        // console.log(historyData.insertResult.insertedId)
        if (historyData.insertResult.insertedId) {
          toast.success("Payment Successful");
          setSuccess(true);
          setProcessing(false);
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setCardError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-4rem)] pt-10'>
      <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-center text-red-600 flex items-center justify-center gap-2">
          💳 Support Human Blood Foundation
        </h2>

        <p className="text-sm text-center text-gray-600 mb-4">
          Your donation helps us run blood donation campaigns, maintain emergency services, and save lives.
        </p>

        {/* Donation Amount Selector */}
        <h3 className="font-semibold mb-2">Choose a donation amount:</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {[100, 200, 500].map((amount) => (
            <label key={amount} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="amount"
                checked={selectedAmount === amount}
                onChange={() => handleAmountSelect(amount)}
                className="accent-red-600"
              />
              ৳{amount}
            </label>
          ))}
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="amount"
              checked={selectedAmount === null && customAmount !== ''}
              onChange={() => setSelectedAmount(null)}
              className="accent-red-600"
            />
            Custom:
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-20 ml-1 focus:outline-red-500"
              placeholder="৳"
              value={customAmount}
              onChange={handleCustomChange}
              min="1"
            />
          </label>
        </div>

        {/* Stripe Card Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-4 rounded-md shadow-sm bg-gray-50 focus-within:ring-2 ring-blue-500 transition">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#333',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#e5424d',
                  },
                },
              }}
            />
          </div>

          {/* Error & Success Messages */}
          {cardError && (
            <p className="text-red-500 text-sm mt-1 font-medium">{cardError}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mt-1 font-medium">
              Payment completed successfully!
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-2 rounded-md text-white font-medium transition ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              'Contribute to Human Blood Foundation'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

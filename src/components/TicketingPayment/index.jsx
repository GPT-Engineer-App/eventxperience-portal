import React, { useState } from 'react';
import TicketForm from './TicketForm';
import PaymentProcessor from './PaymentProcessor';
import TicketDistribution from './TicketDistribution';

const TicketingPayment = () => {
  const [ticketData, setTicketData] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleTicketCreation = (data) => {
    setTicketData(data);
  };

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
  };

  const handlePaymentCancel = () => {
    setTicketData(null);
    setPaymentComplete(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Ticketing and Payment</h2>
      {!ticketData && <TicketForm onSubmit={handleTicketCreation} />}
      {ticketData && !paymentComplete && (
        <PaymentProcessor
          amount={ticketData.tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
      {paymentComplete && <TicketDistribution ticket={ticketData.tickets[0]} />}
    </div>
  );
};

export default TicketingPayment;
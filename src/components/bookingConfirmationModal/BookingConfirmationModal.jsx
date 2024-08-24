import React from "react";
import { FcApproval } from "react-icons/fc";
import "./bookingConfirmationModal.css";
import { RiCloseLine } from "react-icons/ri";

const BookingConfirmationModal = ({ closeModal }) => {
  return (
    <div className="registration-form-overlay">
      <div className="registration-form slide-top">
        <h1 className="registration-welcome">Booking successful</h1>
        <RiCloseLine
          onClick={() => {
            closeModal(false);
          }}
          className="registration-close"
        />
        <div className="wd--booking-confirmation-modal">
          <div>
            <FcApproval size={100} />
          </div>
          <div>
            <p>
              Your booking has been successfully made. Check your email for
              confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;

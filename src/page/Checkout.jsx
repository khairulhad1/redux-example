import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import BookingInformation from "../parts/Checkout/BookingInformation";
import ItemDetails from "../../src/json/itemDetails.json";
import Complated from "../parts/Checkout/Complated";
import Payment from "../parts/Checkout/Payment";
import { useSelector } from "react-redux";
import Stepper, {
  Numbering,
  Meta,
  MainContent,
  Controller,
} from "../../src/elements/Stepper/";
import Button from "../elements/button";

const Checkout = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    proofPayment: "",
    bankName: "",
    bankHolder: "",
  });

  const bookingState = useSelector((state) => state.booking);
  const { _id, duration, date } = bookingState || {};

  const checkout = {
    duration: duration,
  };

  if (!duration) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Anda Harus Pilih Kamar Dulu</p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Back To Home
          </a>
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Staycation | Checkout";
  }, []);

  const onChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const steps = {
    bookingInformation: {
      title: "Booking Information",
      description: "Please fill up the blank fields below",
      content: (
        <BookingInformation
          data={data}
          checkout={checkout}
          onChange={onChange}
          itemDetails={ItemDetails}
        />
      ),
    },

    payment: {
      title: "Payment",
      description: "Kindly follow the instructions below",
      content: (
        <Payment
          data={data}
          checkout={checkout}
          onChange={onChange}
          itemDetails={ItemDetails}
        />
      ),
    },

    completed: {
      title: "Yay! Completed",
      description: "",
      content: <Complated />,
    },
  };

  return (
    <div>
      <Header isCentered />
      <Stepper steps={steps} initialStep="bookingInformation">
        {(prevStep, nextStep, CurrentStep, steps) => (
          <>
            <Numbering data={steps} current={CurrentStep} />

            <Meta data={steps} current={CurrentStep} />

            <MainContent data={steps} current={CurrentStep} />
            {CurrentStep === "bookingInformation" && (
              <Controller>
                {data.firstName !== "" &&
                  data.lastName !== "" &&
                  data.email !== "" &&
                  data.phone !== "" && (
                    <Button
                      className="btn mb-3"
                      type="button"
                      isBlock
                      isPrimary
                      hasShadow
                      onClick={nextStep}
                    >
                      Continue to Book
                    </Button>
                  )}
                <Button
                  className="btn"
                  type="link"
                  isBlock
                  isLight
                  href={`/properties/${checkout._id}`}
                >
                  Cancel
                </Button>
              </Controller>
            )}

            {CurrentStep === "payment" && (
              <Controller>
                {data.proofPayment !== "" &&
                  data.bankName !== "" &&
                  data.bankHolder !== "" && (
                    <Button
                      className="mb-3 w-[300px]"
                      type="button"
                      isBlock
                      isPrimary
                      hasShadow
                      onClick={nextStep}
                    >
                      Continue to Book
                    </Button>
                  )}
                <Button
                  className="btn"
                  type="button"
                  isBlock
                  isLight
                  onClick={prevStep}
                >
                  Cancel
                </Button>
              </Controller>
            )}

            {CurrentStep === "completed" && (
              <Controller>
                <Button
                  className="btn"
                  type="link"
                  isPrimary
                  hasShadow
                  href="/"
                >
                  Back to Home
                </Button>
              </Controller>
            )}
          </>
        )}
      </Stepper>
    </div>
  );
};

export default Checkout;

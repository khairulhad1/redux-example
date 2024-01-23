// DetailsPage.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkoutBooking } from "../store/reducers/index";
import Header from "../parts/Header";
import PageDetailsTitle from "../parts/PageDetailsTitle";
import itemDetails from "../../src/json/itemDetails.json";
import FeatureImg from "../parts/FeatureImg";
import Catagories from "../parts/Catagories";
import PageDetailsDec from "../parts/PageDetailsDec";
import BookingForm from "../parts/BookingForm";
import Testimony from "../parts/Testimony";
import Footer from "../parts/Footer";

const DetailsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.title = "Details Page";
    window.scrollTo(0, 0);
  }, []);

  const breadcrumb = [
    { pageTitle: "Home", pageHref: "/" },
    { pageTitle: "House Details", pageHref: "" },
  ];

  const handleStartBooking = ({ _id, duration, date }) => {
    // const totalPrice = itemDetails.price * duration;
    dispatch(checkoutBooking({ _id, duration, date }));
  };

  return (
    <>
      <Header />
      <PageDetailsTitle breadcrumb={breadcrumb} data={itemDetails} />
      <FeatureImg data={itemDetails.imageUrls} />
      <section className="container mx-auto mb-24">
        <div className="flex justify-between flex-row">
          <PageDetailsDec data={itemDetails} />
          <BookingForm
            itemDetails={itemDetails}
            startBooking={handleStartBooking}
          />
        </div>
      </section>
      <Catagories data={itemDetails.categories} />
      <Testimony data={itemDetails.testimonial} />
      <Footer />
    </>
  );
};

export default DetailsPage;

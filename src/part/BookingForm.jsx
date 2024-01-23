import React, { Component } from "react";
import propTypes from "prop-types";
import InputDate from "../../../new-stycation-bwa/src/elements/Form/inputDate/InputDateCalender";
import InputNumber from "../../../new-stycation-bwa/src/elements/Form/inputNumber/index";

import Button from "../../../new-stycation-bwa/src/elements/button";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
    };
  }

  updateData = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;
    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(data.date.endDate);
      const countDuration = new Date(endDate - startDate).getDate();
      if (prevState.data.duration !== countDuration) {
        this.setState({
          data: {
            ...this.state.data,
            duration: countDuration,
          },
        });
      }
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +data.duration - 1)
      );

      if (prevState.data.date.endDate !== endDate) {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            date: {
              ...this.state.data.date,
              endDate: endDate,
            },
          },
        });
      }
    }
  }

  startBooking = () => {
    const { data } = this.state;
    this.props.startBooking({
      _id: this.props.itemDetails._id,
      duration: data.duration,
      date: {
        startDate: data.date.startDate,
        endDate: data.date.endDate,
      },
    });
  };

  render() {
    const { data } = this.state;
    const { itemDetails, startBooking } = this.props;

    return (
      <div className="basis-2/5 h-[550px] rounded-[15px] border border-neutral-200 py-[64px] px-[110px]">
        <h4 className="text-blue-950 text-xl font-medium mb-[14px]">
          Start Booking
        </h4>
        <h5 className="text-teal-500 text-4xl font-medium my-6">
          {itemDetails.price}{" "}
          <span className="text-zinc-400 text-4xl">per {itemDetails.unit}</span>
        </h5>
        <label htmlFor="duration">How long you will stay</label>
        <div className="my-4">
          <InputNumber
            max={30}
            suffix=" nigth"
            isSuffixPlurer
            onChange={this.updateData}
            name="duration"
            value={data.duration}
          />
        </div>
        <label htmlFor="date">Pick a date</label>
        <div className="my-4">
          <InputDate onChange={this.updateData} name="date" value={data.date} />
        </div>
        <h6 className="text-gray-500 font-light mb-10">
          You will pay{" "}
          <span className="text-blue-950 leading-7 text-base font-medium">
            ${itemDetails.price * data.duration} USD
          </span>{" "}
          per{" "}
          <span className="text-blue-950 leading-7 text-base font-medium">
            {data.duration} {itemDetails.unit}
          </span>
        </h6>
        <div className=" w-full mx-auto grid place-items-center">
          <Button
            isPrimary
            type={`link`}
            isShadow
            href={`/checkout`}
            onClick={this.startBooking}
            className={`w-full`}
          >
            Continue to Book
          </Button>
        </div>
      </div>
    );
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
};

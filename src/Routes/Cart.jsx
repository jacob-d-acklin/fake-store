import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { BsCreditCard } from "react-icons/bs";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useCart } from "react-use-cart";
import { useForm } from "react-hook-form";

export const Cart = (props) => {
  // form submit
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    window.scrollTo(0, 0);
    setSuccessMsg("Thank you for your purchase!");
    if (setSuccessMsg) {
      setTimeout(function () {
        setSuccessMsg("");
        navigate("/", emptyCart());
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // set loaction dropdown state
  const [yourLocation, setYourLocation] = useState({
    country: "",
    region: "",
  });
  const selectCountry = (value) => {
    setYourLocation({ ...yourLocation, country: value });
  };
  const selectRegion = (value) => {
    setYourLocation({ ...yourLocation, region: value });
  };
  const { country, region } = yourLocation;

  // maxlength check
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  // add zero if price doesn't have trailing zero
  function addZeroes(num) {
    const dec = num.toString().split(".")[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return Number(num).toFixed(len);
  }

  // useCart destructuring
  const { cartTotal, emptyCart } = useCart();

  // navigation logic
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state;
  console.log(items);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4">
        <h1 className="text-center text-4xl underline underline-offset-8 decoration-gray-300">
          Fake Store
        </h1>
        {successMsg && (
          <p className="text-center text-2xl text-green-500">{successMsg}</p>
        )}
        <div className="flex divide-x-4 p-4 mb-12">
          <div className="md:w-3/4">
            <h1 className="text-center text-2xl mb-2">Billing details</h1>
            <h1 className="text-md text-blue-500 mb-8">
              Client side validation only:
            </h1>

            {/* User Information container */}
            <div className="mb-4 flex justify-between px-4 gap-4">
              {/* first name */}
              <div className="flex flex-col">
                <div className="flex">
                  <label
                    className="block text-gray-700 text-sm font-bold   mb-2"
                    for="firstName">
                    First Name
                  </label>
                  <h1 className="text-red-500 ml-2">*</h1>
                </div>
                <input
                  class="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  {...register("firstname", {
                    required: true,
                    minLength: 0,
                  })}
                />
                {errors.firstname && errors.firstname.type === "required" && (
                  <p className="text-sm text-red-500 ml-4">
                    First name is required
                  </p>
                )}
              </div>

              {/* last name */}
              <div className="flex flex-col">
                <div className="flex">
                  <label
                    className="block text-gray-700 text-sm font-bold   mb-2"
                    for="lastName">
                    Last Name
                  </label>
                  <h1 className="text-red-500 ml-2">*</h1>
                </div>
                <input
                  className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  {...register("lastname", {
                    required: true,
                    minLength: 0,
                  })}
                />
                {errors.lastname && errors.lastname.type === "required" && (
                  <p className="text-sm text-red-500">Last name is required</p>
                )}
              </div>
            </div>
            {/* Country/Region*/}
            <div className="mb-4 flex flex-col justify-between px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold  mb-2 "
                  for="Country/Region">
                  Country/Region
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>

              <div className="flex">
                <CountryDropdown
                  className="w-full"
                  value={country}
                  onChange={(value) => selectCountry(value)}
                />

                <RegionDropdown
                  // disableWhenEmpty={true}
                  country={country}
                  value={region}
                  // countryValueType="short"
                  labelType="short"
                  valueType="short"
                  onChange={(value) => selectRegion(value)}
                />
              </div>
            </div>

            <div className="flex flex-col px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="address">
                  Street Address
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>
              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="address"
                type="text"
                placeholder="Street"
                name="street"
                {...register("street", {
                  required: true,
                  minLength: 0,
                })}
              />
              {errors.street && errors.street.type === "required" && (
                <p className="text-sm text-red-500">Street is required</p>
              )}

              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="apartment"
                type="text"
                placeholder="Apartment (Optional)"
              />
            </div>

            <div className="flex flex-col px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="city">
                  City
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>
              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="city"
                type="text"
                placeholder="City"
                name="city"
                {...register("city", {
                  required: true,
                  minLength: 0,
                })}
              />
              {errors.city && errors.city.type === "required" && (
                <p className="text-sm text-red-500">City is required</p>
              )}
            </div>

            <div className="flex flex-col px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="zipCode">
                  Zip Code
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>
              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="zipCode"
                type="text"
                maxLength={5}
                onInput={maxLengthCheck}
                placeholder="Zip Code"
                name="zipcode"
                {...register("zipcode", {
                  required: true,
                  minLength: 5,
                })}
              />
              {errors.zipcode && errors.zipcode.type === "required" && (
                <p className="text-sm text-red-500">Zip code is required</p>
              )}
              {errors.zipcode && errors.zipcode.type === "minLength" && (
                <p className="text-sm text-red-500">Zip code invalid.</p>
              )}
            </div>

            <div className="flex flex-col px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="phone">
                  Phone
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>
              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="phone"
                type="tel"
                placeholder="Phone"
                maxLength={10}
                onInput={maxLengthCheck}
                name="phone"
                {...register("phone", {
                  required: true,
                  minLength: 10,
                })}
              />
              {errors.phone && errors.phone.type === "required" && (
                <p className="text-sm text-red-500">Phone number is required</p>
              )}
              {errors.phone && errors.phone.type === "minLength" && (
                <p className="text-sm text-red-500">
                  Please complete phone number.
                </p>
              )}
            </div>

            <div className="flex flex-col px-4">
              <div className="flex">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email">
                  Email
                </label>
                <h1 className="text-red-500 ml-2">*</h1>
              </div>
              <input
                className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline mb-2"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email", {
                  required: true,
                  minLength: 0,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p className="text-sm text-red-500">Email is required</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="text-sm text-red-500">Email is not valid.</p>
              )}
            </div>
          </div>

          {/* payment details container */}
          <div className="w-1/2 h-screen">
            <h1 className="text-center text-2xl mb-12">Cart Summary</h1>
            <div className="flex justify-between px-4 mb-8">
              <h1 className="underline underline-offset-8">Product</h1>
              <h1 className="underline underline-offset-8">Subtotal</h1>
            </div>
            <div className="overflow-auto h-3/4">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between px-4 gap-12 mb-8">
                    <img src={item.image} className="w-8" alt="" />
                    <h1 className="text-center text-xs ">
                      {item.title} ({item.quantity})
                    </h1>
                    <h1 className="text-center">{addZeroes(item.itemTotal)}</h1>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-6 flex justify-between border-t-2 border-b-2 border-gray-200">
              <h1 className="text-md pl-4">Total</h1>
              <h1 className="pr-6">{addZeroes(cartTotal).slice(0, 6)}</h1>
            </div>
          </div>
        </div>

        {/* Payment Information Container */}
        <div className="mt-2">
          <h1 className="text-center text-2xl mb-12 pt-4">
            Payment Information
          </h1>
          <div className="p-4 mx-4 mb-12 bg-gray-200">
            <h1>Please Don't Enter Your Actual Information!</h1>
            <div className="border-2 border-black m-auto">
              <div className="flex flex-col px-4 mt-4">
                <div className="flex">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="cardNumber">
                    Card Number
                  </label>
                  <h1 className="text-red-500 ml-2">*</h1>
                </div>
                <i className="ml-auto px-8">
                  <BsCreditCard className="absolute z-10 mt-2" size={26} />
                </i>

                <input
                  className="border rounded shadow appearance-none w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 relative"
                  id="cardNumber"
                  type="text"
                  maxLength="16"
                  onInput={maxLengthCheck}
                  placeholder="****-****-****-****"
                  name="cardnumber"
                  {...register("cardnumber", {
                    required: true,
                    minLength: 16,
                  })}
                />
                {errors.cardnumber && errors.cardnumber.type === "required" && (
                  <p className="text-sm text-red-500">
                    Card number is required
                  </p>
                )}
                {errors.cardnumber &&
                  errors.cardnumber.type === "minLength" && (
                    <p className="text-sm text-red-500">Card number invalid.</p>
                  )}
              </div>

              <div className="mb-4 flex justify-between px-4">
                {/* Expiration */}
                <div className="flex flex-col w-80">
                  <div className="flex">
                    <label
                      className="block text-gray-700 text-sm font-bold  mb-2"
                      for="expDate">
                      Expiration
                    </label>
                    <h1 className="text-red-500 ml-2">*</h1>
                  </div>
                  <input
                    class="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                    id="expDate"
                    maxLength="5"
                    onInput={maxLengthCheck}
                    type="text"
                    placeholder="MM/YY"
                    name="expiration"
                    {...register("expiration", {
                      required: true,
                      minLength: 5,
                    })}
                  />
                  {errors.expiration &&
                    errors.expiration.type === "required" && (
                      <p className="text-sm text-red-500">
                        Expiration is required
                      </p>
                    )}
                  {errors.expiration &&
                    errors.expiration.type === "minLength" && (
                      <p className="text-sm text-red-500">
                        Enter valid expiration.
                      </p>
                    )}
                  <h1 className="text-xs">Please use MM/YY format</h1>
                </div>

                {/* CVV*/}
                <div className="flex flex-col w-80">
                  <div className="flex">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="cvv">
                      CVV
                    </label>
                    <h1 className="text-red-500 ml-2">*</h1>
                  </div>
                  <input
                    className="shadow appearance-none border rounded   w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                    id="cvv"
                    maxLength={3}
                    onInput={maxLengthCheck}
                    type="text"
                    placeholder="***"
                    name="cvv"
                    {...register("cvv", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  {errors.cvv && errors.cvv.type === "required" && (
                    <p className="text-sm text-red-500">Cvv is required</p>
                  )}
                  {errors.cvv && errors.cvv.type === "minLength" && (
                    <p className="text-sm text-red-500">Cvv invalid.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 align-center justify-center mx-auto mb-8 w-96 ">
          <button
            className="w-full border-2 rounded border-gray-400 text-2xl text-gray-700"
            type="submit">
            Purchase
          </button>
          <div className="flex border-b-2 border-gray-200">
            <BsArrowReturnLeft size={24} />
            <button
              className="w-full text-2xl text-gray-700"
              onClick={() => {
                navigate(-1);
              }}>
              Go back to cart
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

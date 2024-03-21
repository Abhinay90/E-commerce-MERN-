import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  deleteToCartAsync,
  selectItemsByUser,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { updateUserAsync } from "../features/auth/authSlice";
import { addOrder } from "../features/order/orderAPI";
import {
  addOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { discountPrice } from "../app/constants";

// const addresses = [
//   {
//     name: "Leslie Alexander",
//     street: "11th Main",
//     city: "Delhi",
//     pinCode: "11003",
//     state: "Delhi",
//     phone: 9868456789,
//   },
//   {
//     name: "Michael Foster",
//     street: "4th Tagor-towen",
//     city: "Prayagraj",
//     pinCode: "21134",
//     state: "Prayagraj",
//     phone: 9134334789,
//   },
// ];

export default function CheckOut() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const products = useSelector(selectItemsByUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const user = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const totalProduct = products.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = products.reduce(
    (total, item) => total + discountPrice(item.products) * item.quantity,
    0
  );
  const handleQuantity = (e, product) => {
    // console.log(e.target.value, product);
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteToCartAsync(itemId));
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
    console.log(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    const order = {
      products,
      totalAmount,
      totalProduct,
      users: user.id,
      paymentMethod,
      selectedAddress,
    };
    console.log(order);
    dispatch(addOrderAsync(order));
  };
  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate to={`/order-success/${currentOrder?.id}`}></Navigate>
      )}
      
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`}></Navigate>
      )}

      <div className="mx-auto max-w-5xl lg:px-5 lg:py-5 ">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-3">
          <div className="group relative lg:col-span-2">
            <form
              className="mx-auto max-w-2xl py-5 px-6 lg:px-8 bg-white"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    id: user.id,
                    addresses: [...user.addresses, data],
                  })
                );  
                reset();
              })}
              noValidate
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-6">
                  <h2 className="text-2xl font-bold leading-5 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    Use a permanent address where you can receive Product.{" "}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("FullName", {
                            required: "Full Name is required",
                          })}
                          id="full-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block  text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pin-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="pin-code"
                          {...register("pinCode", {
                            required: "Pin-code is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose From Existing Address
                  </p>

                  <ul role="list">
                    {user.addresses.map((address, key) => (
                      <label htmlFor={`address[${key}]`}>
                        <li
                          key={address.email}
                          className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 m-1 p-2 cursor-pointer"
                        >
                          <div className="flex min-w-0 gap-x-4 ">
                            <input
                              id={`address[${key}]`}
                              onChange={(e) => handleAddress(e)}
                              name="address"
                              type="radio"
                              value={key}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />

                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.FullName}, {address.pinCode}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.street}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                              Phone: {address.phone}
                            </p>

                            <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                              {address.state}
                            </p>
                          </div>
                        </li>
                      </label>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-2 text-gray-900">
                        Payment Method
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3 ">
                          <input
                            id="cash"
                            name="payment"
                            type="radio"
                            value="cash"
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                          >
                            Cash Payment
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3 ">
                          <input
                            id="card"
                            name="payment"
                            type="radio"
                            checked={paymentMethod === "card"}
                            onClick={handlePayment}
                            value="card"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer cursor-pointer"
                          />
                          <label
                            htmlFor="card"
                            className="block cursor-pointer text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div> */}
            </form>
          </div>

          <div className="group relative">
            <div className=" mx-auto max-w-xl px-2 lg:px-5 bg-white ">
              <div className="-mt-2 ">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 m-2">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-7">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">
                                ${discountPrice(product.products)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.products.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              Qty
                              <select
                                className="text-s ml-2 py-0 cursor-pointer"
                                value={product.quantity}
                                onChange={(e) => handleQuantity(e, product)}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() =>
                                  handleRemove(product.products.id)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 px-4 py-6 sm:px-6 mt-10">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Item</p>
                  <p>{totalProduct} items</p>
                </div>

                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
                  >
                    Place Order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

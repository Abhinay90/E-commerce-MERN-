import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteToCartAsync,
  selectCartLoaded,
  selectItemsByUser,
  updateCartAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constants";

export default function Cart() {
  const products = useSelector(selectItemsByUser);
  const cartLoadedStatus = useSelector(selectCartLoaded);
  console.log("product=", products);
  console.log("cartLoadedstatus=", cartLoadedStatus);
  const dispatch = useDispatch();
  const totalProduct = products.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = products.reduce(
    (total, item) => total + discountPrice(item.products) * item.quantity,
    0
  );
  const [open, setOpen] = useState(true);

  const handleQuantity = (e, product) => {
    console.log(e.target.value, product);
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteToCartAsync(itemId));
  };
  return (
    <>
      {cartLoadedStatus?products.length <= 0 ?(
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            {/* todo add a Flipcart image  */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your cart is empty!
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Add items to it now.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Shop now
              </Link>
            </div>
          </div>
        </main>

      ):(       
        <div className=" mx-auto max-w-2xl py-0 sm:px-6 lg:px-8 ">
          <div className="mt-8 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 m-2">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-7">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.products.thumbnail}
                        alt={product.products.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.products.href}>
                              {product.products.title}
                            </a>
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
                            onClick={() => handleRemove(product.id)}
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
              <p>Total Product</p>
              <p>{totalProduct} items</p>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Price</p>
              <p>${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
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
      ):<div>{cartLoadedStatus}</div>}
    </>
  );
}

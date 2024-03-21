import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectOrdersByUser, selectUserInfo } from "../userSlice";
import { discountPrice } from "../../../app/constants";

const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectOrdersByUser);
  console.log("orders=",orders);
  useEffect(() => {
    console.log("dispatched=",user.id);
    dispatch(fetchLoggedInUserOrdersAsync());
  }, []);
  return (
    <>
      {orders?.map((order) => (
        <div className=" mx-auto my-5 max-w-2xl py-2 sm:px-6 lg:px-8 bg-white ">
          <div className="mt-8 ">
            <h1 className=" text-4xl font-bold tracking-tight text-gray-900 m-2">
              Order #{order.id}
            </h1>
            <h4 className="text-xl font-bold tracking-tight text-red-500 m-2">
              Order Status: {order.status}
            </h4>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.products.map((product) => (
                  <li key={product.products.id} className="flex py-7">
                    {console.log(product.products)}
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
                            <a href={product.products.href}>{product.products.title}</a>
                          </h3>
                          <p className="ml-4">${discountPrice(product.products)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.products.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          Qty:{product.quantity}
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
              <p>{order.totalProduct} items</p>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Price</p>
              <p>${order.totalAmount}</p>
            </div>
          </div>

          <div
            key={order.selectedAddress.email}
            className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 m-2 my-2 p-2 cursor-pointer"
          >
            <div className="flex min-w-0 gap-x-4 ">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {order.selectedAddress.FullName}, {order.selectedAddress.pinCode}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.street}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                Phone: {order.selectedAddress.phone}
              </p>

              <p className="mt-1 truncate text-xs leading-5 text-gray-700">
                {order.selectedAddress.state}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default UserOrder;

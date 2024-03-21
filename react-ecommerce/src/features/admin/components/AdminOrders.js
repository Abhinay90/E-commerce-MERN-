import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  selectOrder,
  selectTotalOrder,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/constants";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const orders = useSelector(selectOrder);
  const totalOrder = useSelector(selectTotalOrder);
  const [editId, setEditId] = useState(null);
  const [sort, setSort] = useState({});
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handelPage = (page) => {
    console.log(page);
    setPage(page);
  };

  const chooseColor = (status) => {
    const classOfColors = {
      pending: "bg-purple-200 text-purple-600",
      dispatched: "bg-yellow-200 text-yellow-600",
      delivered: "bg-green-200 text-green-600",
      cancelled: "bg-red-200 text-red-600",
    };
    console.log(classOfColors[status]);
    return classOfColors[status];
  };

  const handleUpdate = (e, order) => {
    console.log(e.target.value, order);
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditId(null);
  };

  const handleSort = (option) => {
    const sortOpion = { _sort: option.sort, _order: option.order };
    console.log(sortOpion);
    setSort(sortOpion);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    console.log(sort);
    dispatch(getAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  return (
    <>
      {/* component */}
      <div className="overflow-x-auto shadow-md ">
        <div className="min-w-screen p-5 bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden ">
          <div className="w-full">
            <div className="bg-white shadow-md rounded w-full">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="cursor-pointer py-3 px-6 text-left "
                      onClick={() =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      ORDER#
                      {sort._sort==='id' && 
                      (sort._sort==='id' && sort._order==='desc'?  
                      <ArrowDownIcon className="w-5 inline"></ArrowDownIcon>
                       :<ArrowUpIcon className="w-5 inline"></ArrowUpIcon> 
                      )}
                        
                    </th>
                    <th className="py-3 px-6 text-left">PRODUCTS</th>
                    <th className="py-3 px-6 text-center cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })}
                    >TOTAL AMOUNT
                    
                    {sort._sort==='totalAmount' && 
                      (sort._sort==='totalAmount' && sort._order==='desc'?  
                      <ArrowDownIcon className="w-5 inline"></ArrowDownIcon>
                       :<ArrowUpIcon className="w-5 inline"></ArrowUpIcon> 
                      )}

                    </th>
                    <th className="py-3 px-6 text-center">SHIPPING ADDRESS</th>
                    <th className="py-3 px-6 text-center">STATUS</th>
                    <th className="py-3 px-6 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.products.map((product) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={product.products.thumbnail}
                              />
                            </div>
                            <span>{product.products.title}</span>
                            <span className="ml-2">
                              - #{product.quantity} - ${discountPrice(product.products)}
                              /Pec.{" "}
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="  flex items-center justify-center">
                          <div className="">
                            <strong>{order.selectedAddress.FullName} </strong>,
                            {order.selectedAddress.phone}
                            <div>
                              {order.selectedAddress.street},
                              {order.selectedAddress.city}
                              <div>
                                {order.selectedAddress.state},
                                {order.selectedAddress.pinCode}
                              </div>
                              {order.selectedAddress.country}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        {editId !== order.id ? (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        ) : (
                          <span>
                            <select
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-6 rounded-full text-xs`}
                              onChange={(e) => handleUpdate(e, order)}
                            >
                              <option value="pending">pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <EyeIcon onClick={handleShow}></EyeIcon>
                          </div>
                          <div className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <PencilIcon
                              onClick={() => handleEdit(order.id)}
                            ></PencilIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={page}
          handelPage={handelPage}
          totaleItems={totalOrder}
        />
      </div>
    </>
  );
};
export default AdminOrders;

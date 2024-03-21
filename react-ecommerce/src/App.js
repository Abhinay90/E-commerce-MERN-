import React, { useEffect } from "react";
// import './App.css';
import { createRoot } from "react-dom/client";
import ProductList from "./features/product/Components/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailedPage from "./pages/ProductDetailedPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserAsync } from "./features/cart/cartSlice";
import Order_success from "./pages/Order_success";
import UserOrder from "./features/user/components/UserOrder";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
} from "./features/user/userSlice";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice";
import { fetchLoggedInUser } from "./features/user/userAPI";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProtected from "./features/auth/components/AdminProtected";
import AdminProductList from "./features/admin/components/AdminProductList";
import AdminHome from "./pages/AdminHome";
import ProductAddForm from "./features/admin/components/ProductAddForm";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import StripeCheckOut from "./pages/Stripe_checkOut";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },

  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailedPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <Order_success></Order_success>
      </Protected>
    ),
  },
  {
    path: "/order",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckOut></StripeCheckOut>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "admin/product-form",
    element: (
      <AdminProtected>
        <ProductAddForm></ProductAddForm>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <AdminProtected>
        <ProductAddForm></ProductAddForm>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage></AdminOrdersPage>
       </AdminProtected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked);
  console.log(user);

   useEffect(()=>{
       dispatch(checkAuthAsync());
   },[])

  useEffect(() => {
    user && dispatch(fetchLoggedInUserAsync()); 
    // we cna get user by token on backend
    user && dispatch(fetchItemsByUserAsync());
  }, [dispatch, user]);
  return (
    userChecked && <RouterProvider router={router} />
  );
}

export default App;

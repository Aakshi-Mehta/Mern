import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import axios from "axios";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "./component/Home/Home";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStripeApiKey = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with your actual token retrieval method
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get("/api/v1/stripeapikey", { headers });
        setStripeApiKey(data.stripeApiKey);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
        setLoading(false);
      }
    };

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    fetchStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  if (loading) {
    // Optional: Show a loading indicator while fetching data
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login/shipping"
          element={<ProtectedRoute element={<Shipping />} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute element={<ConfirmOrder />} />}
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute element={<Payment />} />
              </Elements>
            }
          />
        )}
        <Route
          path="/success"
          element={<ProtectedRoute element={<OrderSuccess />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<MyOrders />} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute element={<OrderDetails />} />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute element={<ProductList />} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoute element={<NewProduct />} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute element={<UpdateProduct />} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute element={<OrderList />} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute element={<ProcessOrder />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<UsersList />} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute element={<UpdateUser />} />}
        />
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute element={<ProductReviews />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import GeneratePrompt from "./pages/generateprompt/GeneratePrompt";
import SellPrompt from "./pages/sellprompt/SellPrompt";
import AdminApproval from "./pages/admin/admin-appoval-prompts/AdminApproval";
import HireEngineerHome from "./pages/hire/HireEngineerHome";
import MarketPlaceHome from "./pages/marketplace/MarketPlaceHome";
import Notifications from "./pages/notifications/Notifications";
import PromptDetails from "./pages/promptdetails/PromptDetails";
import BoughtPromptDetails from "./pages/promptdetails/BoughtPromptDetails";
import Cart from "./pages/payment/Cart";
import Payment from "./pages/payment/Payment";
import PaymentSuccessful from "./pages/payment/PaymentSuccesful";
import ViewPaymentHistory from "./pages/payment/ViewPaymentHistory";
import AdminViewTransactionHistory from "./pages/admin/admin-transaction-history/AdminViewTransactionHistory";
import EditPrompt from "./pages/editprompt/EditPrompt";
import UserProfile from "./pages/profile/UserProfile";
import EngineerProfile from "./pages/profile/EngineerProfile";
import Discussion from "./pages/discussion/Discussion";
import Success from "./pages/success/Success";
import Chats from "./pages/chats/Chats";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generate" element={<GeneratePrompt />} />
        <Route path="/sellprompt" element={<SellPrompt />} />
        <Route path="/admin-approval" element={<AdminApproval />} />
        <Route path="/hire" element={<HireEngineerHome />} />
        <Route path="/marketplace" element={<MarketPlaceHome />} />
        <Route path="/marketplace/:id" element={<PromptDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy-prompt/:id" element={<Payment />} />
        <Route path="/bought-prompt-details/:id" element={<BoughtPromptDetails />} />
        <Route path="/payment-successful" element={<PaymentSuccessful />} />
        <Route path="/payment-history" element={<ViewPaymentHistory />} />
        <Route
          path="/admin-transaction-history"
          element={<AdminViewTransactionHistory />}
        />
        <Route path="/edit-prompt/:id" element={<EditPrompt />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/engineer-profile/:id" element={<EngineerProfile />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;

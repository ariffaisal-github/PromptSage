import express from "express";
import { Prompt } from "../models/promptSchema.js";
import { ObjectId } from "mongodb";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import SSLCommerzPayment from "sslcommerz-lts";

const app = express();

export const payPrompt = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // const { boughtPromptId, user_id } = req.body;
  // console.log(`prompt=${boughtPromptId} --- user=${user_id}`)
  const store_id = process.env.SSLCOMMERZ_STORE_ID;
  console.log("Storeeeeeeeeeeeeeeee",store_id);
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
  const is_live = false; //true for live, false for sandbox
  const tran_id = new ObjectId().toString();
  const prompt = await Prompt.findById(id);
  const data = {
    total_amount: prompt.price,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `${process.env.FRONTEND_URL}/payment-success`,
    fail_url: `${process.env.FRONTEND_URL}/payment-failed`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    ipn_url: `${process.env.FRONTEND_URL}/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    console.log("Redirecting to: ", GatewayPageURL);
  });
});

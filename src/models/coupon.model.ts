import { timeStamp } from "console";
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: [true, "Please enter the COUPON Name "],
    },
    amount: {
      type: Number,
      require: [true, "Please enter the discount Amount"],
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);

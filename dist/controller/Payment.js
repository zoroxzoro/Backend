import { TryCatch } from "../middleware/error.js";
import { Coupon } from "../models/coupon.model.js";
import ErrorHandler from "../utils/utils_class.js";
import { stripe } from "../app.js";
export const createPayment = TryCatch(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return next(new ErrorHandler("please enter amount", 400));
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "inr",
        description: "testing",
    });
    return res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        description: paymentIntent.description,
    });
});
export const newCoupon = TryCatch(async (req, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount) {
        return next(new ErrorHandler("Please enter both Code and Amount", 400));
    }
    await Coupon.create({ code, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${code} Created`,
    });
});
export const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new ErrorHandler("Invalid Coupon Code", 400));
    return res.status(200).json({
        success: true,
        discount: discount.amount,
    });
});
export const allCoupon = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find();
    res.status(200).json({
        success: true,
        coupons,
    });
});
export const delelteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon)
        return next(new ErrorHandler("Coupon Not Found", 404));
    return res.status(200).json({
        success: true,
        Message: `coupon ${coupon.code} is deleted`,
    });
});

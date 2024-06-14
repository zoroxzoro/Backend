import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        state: {
            type: String,
            require: true,
        },
        country: {
            type: String,
            require: true,
        },
        pincode: {
            type: Number,
            require: true,
        },
    },
    user: {
        type: String,
        ref: "User",
        require: true,
    },
    subTotal: {
        type: Number,
        require: true,
    },
    tax: {
        type: Number,
        require: true,
    },
    shippingCharges: {
        type: Number,
        require: true,
    },
    discount: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing",
    },
    orderItems: [
        {
            name: String,
            photo: String,
            quantity: Number,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],
}, { timestamps: true });
export const Order = mongoose.model("Order", orderSchema);

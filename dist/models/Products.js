import mongoose from "mongoose";
// Define the Product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"],
    },
    price: {
        type: String,
        required: [true, "Please enter price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter cstegory"],
    },
}, {
    timestamps: true, // Add timestamps option here
});
// Export the Product model
export const Product = mongoose.model("Product", ProductSchema);

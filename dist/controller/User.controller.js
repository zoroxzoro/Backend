import { User } from "../models/User.js";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../utils/utils_class.js";
export const newUser = TryCatch(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    if (!_id || !name || !email || !photo) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    }
    user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });
    res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}! User created successfully.`,
        data: user,
    });
});
export const getAllUser = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        users,
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "User deleted",
        user,
    });
});

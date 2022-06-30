import User from "../modals/User.js";

// update User
export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateUser)
    } catch (err) {
        next(err);
    }
}

// delete User
export const deleteUser = async (req, res, next) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("User name are deleted successfully")
    } catch (err) {
        next(err);
    }
}

// show User
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}

// show all User
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err);
    }
}
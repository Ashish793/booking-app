import User from "../modals/User.js"
import bcrypt from 'bcryptjs';
import {createError} from '../utils/error.js';
import jwt from 'jsonwebtoken';
// registeration
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save()
        res.status(200, "User has been created, you can login");
    } catch (err) {
        next(err)
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) 
            return next(createError(404, "username not found"))

        const isPasswordCorect = await bcrypt.compare(
            req.body.password, 
            user.password
        );
        if(!isPasswordCorect) 
            return next(createError(400, "Wrong password or username!"));
        
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin},
            process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user;
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...otherDetails});
    } catch (err) {
        next(err)
    }
}
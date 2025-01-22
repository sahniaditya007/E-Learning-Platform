import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register =async(req,res)=>{
    try {
        const {email,name,password}=req.body;

        let user =await  User.findOne({email});

        if(user) {
            return res.status(400).json({
                message:"User Already exists",
            });
        }
        const hashPassword =await bcrypt.hash(password,10);
        user ={
            name,
            email,
            password:hashPassword
        }

        const otp =Math.floor(Math.random()*1000000);
        const activationToken = jwt.sign({
            user,
            otp,

        },process.env.Activation_Secret,
        {
            expiresIn:"15m",
        });
        const data ={
            name,
            otp,
        };
        await sendMail(
            email,
            "E-learning",
            data
        )
        res.status(200).json({
            message:"Otp send to your mail",
            activationToken,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};


export const verifyUser =TryCatch(async(req,res)=>{
    const {otp,activationToken} =req.body
    const verify =jwt.verify(activationToken,process.env.Activation_Secret)

    if(!verify) return res.status(400).json({
        message:"Otp Expired",
    });
    if(verify.otp !== otp)return res.status(400).json({
        message:"Wrong Otp",
    });

    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
    })
    res.json({
        message:"user Registered Successfully",
    })
});

export const loginUser =TryCatch(async(req,res)=>{
    const {email,password} =req.body

    const user =await User.findOne({email})

    if(!user) return res.status(400).json({
        message:"No User with this email registerd "
    });

    const matchPassword =await bcrypt.compare(password,user.password);

    if(!matchPassword)return res.status(400).json({
        message:"wrong Password",
    });
    const token =  jwt.sign({_id: user._id}, process.env.Jwt_Sec,{
        expiresIn:"15d",
    });

    res.json({
        message:`Welcome back ${user.name}`,
        token,
        user,
    });
});

export const myProfile =TryCatch(async(req,res)=>{
    const user =await User.findById(req.user._id);
    res.json({user});
});

export const forgotPassword = TryCatch(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) 
        return res.status(404).json({
            message: "No User with this email",
        });

    // Generate a token with expiry
    const token = jwt.sign({ email }, process.env.Forgot_Secret, { expiresIn: '5m' });

    const data = { email, token };

    try {
        await sendForgotMail("E-learning", data);
        
        // Set the token expiration time
        user.resetPassowrdExpire = Date.now() + 5 * 60 * 1000;
        
        await user.save();

        res.json({
            message: "Reset Password Link is sent to your mail",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to send email. Please try again later.",
        });
    }
});


export const resetPassword=TryCatch(async(req,res)=>{
    const decodedData =jwt.verify(req.query.token ,process.env.Forgot_Secret);

    const user =await User.findOne({email:decodedData.email});

    if(!user) return res.status(404).json({
        message:"No User with this email"
    });

    if(user.resetPassowrdExpire ===null) return res.status(400).json({
        message:"Token Expired",
    });
    if(user.resetPassowrdExpire <Date.now()){
        return res.status(400).json({
            message:"Token Expired",
        });
    }
    const password = await bcrypt.hash(req.body.password,10)

    user.password =password

    user.resetPassowrdExpire =null;

    await user.save()
    res.json({message :"Password Reset"});
})

   
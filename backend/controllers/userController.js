import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message: "Usuario nao existe"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Senha invalida"})
        }

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Erro"})

    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register

export const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email})

        if (exists) {
            return res.json({success: false, message: "Este usuario ja foi criado!"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: true, message: "Por favor escreva um email valido"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Por favaor coloque uma seha maior que 8"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token});



    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Erro"})
    }
}


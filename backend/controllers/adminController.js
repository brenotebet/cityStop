import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import adminModel from '../models/adminModel.js'


const adminLogin = async (req, res) => {
    const {name, password} = req.body

    try {
        const admin = await adminModel.findOne({name})

        if (!admin) {
            return res.json({success:false, message: "Usuario nao existe"})
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.json({success:false, message:"Senha invalida"})
        }

        const token = createToken(admin._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Erro"})

    }
}

const adminRegister = async (req, res) => {
    const {name, password} = req.body;
    try {
        const exists = await adminModel.findOne({name})

        if (exists) {
            return res.json({success: false, message: "Este usuario ja foi criado!"})
        }


        if (password.length < 8) {
            return res.json({success: false, message: "Por favaor coloque uma seha maior que 8"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newAdmin = new adminModel({
            name: name,
            password: hashedPassword,
        })
        
        const admin = await newAdmin.save()
        const token = createToken(admin._id)
        res.json({success:true, token});



    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Erro"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export { adminLogin, adminRegister }

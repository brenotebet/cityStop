import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food

const addFood = async (req, res) => {

    console.log(req.file)

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({success:true, message:"Produto adicionado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Erro ao adicionar o produto"})
    }
}

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});

        res.json({success:true, data:foods})
    } catch (error) {
        console.log("Error")
        res.json({sucess:false, message:"Error"})
    }
}

//remove items

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Produto Removido"})
    } catch (error) {
        console.logo(error)
        res.json({success:false, message: "Error"})
    }
}

export {addFood, listFood, removeFood}
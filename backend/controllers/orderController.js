import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "brl",
        product_data: {
          name: "Taxa de entrega",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      locale: 'pt',
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erro" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      const order = await orderModel.findById(orderId);
      const user = await userModel.findById(order.userId);

      sendEmail(user.email, 'Pagamento Sucedido!', `Seu pagamento ID: ${orderId} foi recebido, seu pedido esta em preparo. Obrigado pela confianca, City Stop agradece.`);

      res.json({ success: true, message: "Pago" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Não Pago" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erro" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    const user = await userModel.findById(order.userId);
    let emailSubject;
    let emailText;

    switch (req.body.status) {
      case 'Saiu para entrega!':
        emailSubject = 'Sua encomenda City Stop esta a caminho!';
        emailText = `Seu pedido ID: ${order._id} esta a caminho!.`;
        break;
      case 'Sua encomenda City Stop foi entrege!':
        emailSubject = 'Order Delivered';
        emailText = `Seu pedido ID: ${order._id} foi entrege!`;
        break;
      default:
        emailSubject = 'Atualização, do seu pedido';
        emailText = `Seu pedido ID ${order._id} foi atualizado, o status agora é: ${req.body.status}.`;
    }

    sendEmail(user.email, emailSubject, emailText);

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erro" });
  }
};

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({ payment: true });

        res.json({success:true, data:orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Erro"})
    }
}

export { placeOrder, verifyOrder, listOrders, updateStatus };

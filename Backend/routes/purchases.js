const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Purchase, validate } = require("../models/purchase");
const { Customer } = require("../models/customer");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

router.get("/", async (req, res) => {
  const purchase = await Purchase.find();
  res.send(purchase);
});

router.get("/:id", async (req, res) => {
  const purchase = await Purchase.find({
    "customer._id": req.params.id,
  });
  res.send(purchase);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalide customer");

  const product = await Product.findByIdAndUpdate(
    req.body.productId,
    {
      $inc: { quantity: -req.body.quantity },
    },
    { quantity: true }
  );
  if (!product) return res.status(400).send("Invalide product");

  let purchase = new Purchase({
    quantity: req.body.quantity,
    customer: customer,
    product: product,
    deliveryDetails: {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      state: req.body.state,
    },
    paymentDetails: {
      cardName: req.body.cardName,
      cardNumber: req.body.cardNumber,
      cvv: req.body.cvv,
      expDate: req.body.expDate,
    },
  });

  purchase = await purchase.save();

  res.send(purchase);
});

router.put("/:id", async (req, res) => {
  let purchase = await Purchase.findByIdAndUpdate(req.params.id, {
    approve: req.body.approve,
  });

  purchase = await purchase.save();

  console.log(purchase);

  if (!purchase)
    return res.status(400).send("The purchase with the given id not found");

    
  // send email using nodemailer

  let config = {
    service: "gmail",
    auth: {
      user: "nevilnutrifeeds@gmail.com",
      pass: "ugel zylt zrcy fhjb",
    },
  };

  let transpoter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    them: "default",
    product: {
      name: "Nevil Nutri Feed(Pvt)(Ltd)",
      link: "https://mailgen.js/",
    },
  });

  let response = {};

  if(req.body.approve == 'approve'){

    response = {
      body: {
        name: purchase.customer.name,
        intro: "Your oder has approved",
        table: {
          data: [
            {
              item: purchase.product.name,
              quantity: purchase.quantity + " Packs",
              price: purchase.product.price * 20 * purchase.quantity + "LKR",
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };
  }else{

    response = {
      body: {
        name: purchase.customer.name,
        intro: "Your oder has rejected!!!",
        table: {
          data: [
            {
              item: purchase.product.name,
              quantity: purchase.quantity + " Packs",
              price: purchase.product.price * 20 * purchase.quantity + "LKR",
            },
          ],
        },
        outro: "Please contact us ! +94715581536",
      },
    };

  }

  

  let mail = MailGenerator.generate(response);

  let message = {
    from: "nevilnutrifeeds@gmail.com",
    to: purchase.customer.email,
    subject: "Place Order",
    html: mail,
  };

  transpoter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        msg: "you should recived an email",
        purchase: purchase,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // ---------------------------
});

router.put("/update/:id", async (req, res) => {
  let purchase = await Purchase.findByIdAndUpdate(req.params.id, {
    "deliveryDetails.address1": req.body.address1,
    "deliveryDetails.address2": req.body.address2,
    "deliveryDetails.city": req.body.city,
    "deliveryDetails.state": req.body.state,
    "deliveryDetails.firstName": req.body.firstName,
    "deliveryDetails.lastName": req.body.lastName,
    "paymentDetails.cardNumber": req.body.cardNumber,
    "paymentDetails.cardName": req.body.cardName,
    "paymentDetails.cvv": req.body.cvv,
    "paymentDetails.expDate": req.body.expDate,
  });

  purchase = await purchase.save();

  if (!purchase)
    return res.status(400).send("The purchase with the given id not found");

  res.send(purchase);
});

router.delete("/:id", async (req, res) => {
  let purchase = await Purchase.findByIdAndDelete(req.params.id);

  if (!purchase)
    return res.status(400).send("The purchase with the given id not found");

  res.send(purchase);
});

module.exports = router;

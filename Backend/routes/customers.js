const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

router.get("/", async (req, res) => {
  const customers = await Customer.find();

  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("User already registered");

  customer = new Customer({
    name: req.body.name,
    type: req.body.type,
    address: req.body.address,
    phone: req.body.phone,
    rep: req.body.rep,
    licenseNo: req.body.licenseNo,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  customer = await customer.save();

  let token = jwt.sign({ _id: customer._id }, config.get("jwtPrivateKey"));

  // res.header("x-auth-token", token).send({
  //   name: customer.name,
  //   email: customer.email,
  // });

  res.send(token);
});

router.put("/approve/:id", async (req, res) => {
  let customer = await Customer.findByIdAndUpdate(req.params.id, {
    approvel: req.body.approvel,
  });

  customer = await customer.save();

  if (!customer)
    return res.status(400).send("The customer with the given id is not found");

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

  if (req.body.approvel == true) {
    response = {
      body: {
        name: customer.name,
        intro: "Your registration is approved",
        table: {
          data: [
            {
              customer: customer.name,
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };
  } else {
    response = {
      body: {
        name: customer.name,
        intro: "Your registration is rejected!!!",
        table: {
          data: [
            {
              customer: customer.name, 
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
    to: customer.email,
    subject: "Registration request",
    html: mail,
  };

  transpoter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        msg: "you should recived an email",
        customer: customer,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // ---------------------------

  // res.send(customer);
});

router.delete("/:id", async (req, res) => {
  let customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(400).send("The customer with the given id not found");

  res.send(customer);
});

module.exports = router;

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const app = express();
const PORT=process.env.PORT || 5000;
const path=require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://inventory-management-v1.onrender.com/"); // replace with your frontend's URL
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({origin:'https://inventory-management-v1.onrender.com/'}))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);
// mongoose.connect("mongodb://localhost:27017/shopDB");
const itemSchema = {
  name: String,
  price: String,
  quantity: String,
  
    tbuy:String,
    tsell:String,
    tpro:String
};
const customerSchema = {
  customerName: String,
  fatherName: String,
  village: String,
  tbuy:String,
  tsell:String,
  tpro:String
};
const transactionSchema = {
  customerName: String,
  itemName: String,
  BuyingPrice:String,
  SellingPrice:String,
  quantity:String,
  datetime:String,
  profit:String
};
const item = mongoose.model("item", itemSchema);
const customer = mongoose.model("customer", customerSchema);
const transaction = mongoose.model("transaction", transactionSchema);

app.get('/', (req, res) => {

  async function f1() {
    const items = await item.find();

    res.json(items);

  }
  f1();
  
  // Send the users array back to the frontend as JSON
  
});
app.get('/customers', (req, res) => {
    async function f1() {
    const customers = await customer.find();

    res.json(customers);

  }
  f1();

  // Send the users array back to the frontend as JSON

});
app.get('/sell', (req, res) => {

  async function f1() {
    const transactions = await transaction.find();

    res.json(transactions);


  }
  f1();

  // Send the users array back to the frontend as JSON

});

app.put('/', (req, res) => {
  const {name,price,quantity,tbuy,tsell,tpro}=req.body;
  

  item.updateOne({name:name},{$set:{name:name,price:price,quantity:quantity,tbuy:tbuy,tsell:tsell,tpro:tpro}})
  .then(result => {
    console.log(result.modifiedCount); // Handle the result of the update operation
  })
  .catch(error => {
    console.error(error); // Handle errors
  });

  // Update the customer in the database here using the customerId and customerName variables

  res.status(200).json({ message: 'Customer updated successfully' });
});
app.put('/updatecustomer', (req, res) => {
  const {customerName,fatherName,village,tbuy,tsell,tpro}=req.body;
  

  customer.updateOne({customerName:customerName},{$set:{customerName:customerName,fatherName:fatherName,village:village,tbuy:tbuy,tsell:tsell,tpro:tpro}})
  .then(result => {
    console.log(result.modifiedCount); // Handle the result of the update operation
  })
  .catch(error => {
    console.error(error); // Handle errors
  });

  // Update the customer in the database here using the customerId and customerName variables

  res.status(200).json({ message: 'Customer updated successfully' });
});
// app.put('/', (req, res) => {
//   const {name,price,quantity}=req.body;
  
  
  
//   item.updateOne({name:name},{$set:{name:name,price:price,quantity:quantity}}, (err, doc) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error updating document');
//     } else {
//       res.send('Document updated successfully');
//     }
//   });
//   res.status(200).json({ message: 'Customer updated successfully' });
// });
app.post("/", function (req, res) {
  const { name, price, quantity ,tbuy,tsell,tpro} = req.body;
  const newItem = new item({ name, price, quantity,tbuy,tsell,tpro });
  newItem.save();
  
  res.json({
    message: 'Data received!'
  });

})
app.post("/customers", function (req, res) {
  const { customerName, fatherName, village,tbuy,tsell,tpro } = req.body;
  console.log("called")
  const newCustomer = new customer({ customerName, fatherName, village ,tbuy,tsell,tpro});
  console.log(newCustomer)
  newCustomer.save();
  res.json({
    message: 'Data received!'
  });

})
app.post("/sell", function (req, res) {
  const { customerName, itemName, BuyingPrice,SellingPrice,quantity,datetime,profit} = req.body;
  const newTransaction = new transaction({ customerName, itemName, BuyingPrice,SellingPrice,quantity,datetime,profit});
  newTransaction.save();
  
  res.json({
    message: 'Data received!'
  });

})

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
})


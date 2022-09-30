const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const dbConnection = require("./util/DBConnection");
app.use(express.json());
app.use(cors());


const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " Please provide a name... "],
    trim: true,
    unique: [true, "Each product must have a unique name !"],
    minLength: [3, " Product name must be 3 at least characters "],
    maxLength: [12, " Product name can't be upto 12 characters "]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be less that Zero."]
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ["kg", "litre", "pcs"],
      message: " Unit values must be kg/liter/pcs "
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: (values) => {
        const isNumber = Number.isInteger(values);
        if (isNumber) {
          return true
        } else {
          return false
        }
      }
    },
    massage: "Quantity must be an integer"
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["available", "out of stock", "discontinued"],
      message: " Status can't be {VALUE}"
    }
  },
},
  {
    timestamps: true
  });

ProductSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = "out of stock"
  }
  console.log("Before Enter to the Schema");
  next()
})

ProductSchema.post('save', function (doc, next) {
  console.log("After Enter to the Schema");
  next()
})

const Product = mongoose.model('Product', ProductSchema)


app.post('/api/v1/product', async (req, res, next) => {

  try {
    const product = new Product(req.body);
    // if (product.quantity === 0) {
    //   product.status = "out of stock"
    // }
    const result = await product.save();
    res.status(200).send({ status: true, message: "Product save to db", data: result });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: " Product Can't Update ",
      error: error.message
    })
  }

})


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;

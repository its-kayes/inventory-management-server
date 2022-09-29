const mongoose = require('mongoose');

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
            value: ["kg", "litre", "pcs"],
            message: " Unit value must be kg/liter/pcs "
        },
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: (value) => {
                const isNumber = Number.isInteger(value);
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
            value: ["available", "out of stock", "discontinued"],
            message: " Status can't be {VALUE}"
        }
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    catagories: [{
        name: {
            type: String,
            required: true
        },
        _id: mongoose.Schema.Types.ObjectId
    }]
    
},
{
    timestamps: true
})













// createdAt: {
//     type: Date,
//     default: Date.now, 
// },
// updateAt: {
//     default: Date.now
// } 
const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const OderSchema = new Schema({
    customer: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
    },

    cart: [{ productId: String, quantity: Number }],
    date: { type: Date, default: Date.now },
    value: { type: Number },
    address: String,
    purchased: Boolean

});
const Oders = mongoose.model("Oders", OderSchema);
module.exports = Oders;

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    host: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
    value: {
        type: String,
    },
    cus: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    }
});
const Reserve = mongoose.model("Reserve", reserveSchema);
module.exports = Reserve;

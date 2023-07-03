const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const collectionSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    room: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    }]
});
const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;

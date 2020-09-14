const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://Hany_Sabeh:H@Ny$@Be7@cluster0.i6gw8.mongodb.net/online-shop?retryWrites=true&w=majority";
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number 
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            let item = new CartItem(data);
            return item.save();
        }).then(() => { mongoose.disconnect(); resolve();
        }).catch(err => { mongoose.disconnect(); reject(err); });
    });
};

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { return CartItem.find({ userId: userId }, {}, { sort: { timestamp: 1 }});
        }).then(items => { mongoose.disconnect(); resolve(items);
        }).catch(err => { mongoose.disconnect(); reject(err); });
    });
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => CartItem.updateOne({ _id: id }, newData))
        .then(items => { mongoose.disconnect(); resolve(items);
        }).catch(err => { mongoose.disconnect(); reject(err); });
    });
}; 

exports.deleteItem = id => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => CartItem.findByIdAndDelete(id))
            .then(items => { mongoose.disconnect(); resolve(items);
            }).catch(err => { mongoose.disconnect(); reject(err); });
    });
};

exports.getItemById = id => {
    return new Promise((resolve, reject) => { 
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => CartItem.findById(id))

            .then(items => { mongoose.disconnect(); resolve(items);
            }).catch(err => { mongoose.disconnect(); reject(err); });
    });
}; 

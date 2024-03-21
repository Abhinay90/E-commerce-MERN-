const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: [1, "Price is Lower then 1"] },
  discountPercentage: {
    type: Number,
    min: [1, "Percent is Lower then 1"],
    max: [95, "Percent is greater then 95"],
  },
  rating: {
    type: Number,
    min: [1, "Rating is Lower then 1"],
    max: [5, "Rating is Greater then 5"],
    default: 1,
  },
  stock: { type: Number, min: [0, "Rating is Lower then 0"], default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  delete: { type: Boolean, default: false },
});

const virtual=productSchema.virtual('id');
virtual.get(function(){
    return this._id
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})


exports.Product=mongoose.model('product',productSchema);

const mongoose=require('mongoose');
const {Schema}=mongoose;

const orderSchema=new Schema({
    products:{type:[Schema.Types.Mixed],required:true},
    users:{type:Schema.Types.ObjectId,ref:'user',required:true},
    totalAmount: {type:Number,required:true},
     totalProduct:{type:Number,required:true},
     //TODO:Type changed enum
     paymentMethod: {type:String,required:true},
    selectedAddress:{type:Schema.Types.Mixed,required:true},
    status:{type:String,default:'pending'}
})

const virtual=orderSchema.virtual('id');
virtual.get(function(){
    return this._id
})

orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.Order=mongoose.model('order',orderSchema);
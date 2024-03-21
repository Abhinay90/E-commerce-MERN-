const { Order } = require("../Model/order");

exports.addToOrder = async (req, res) => {
      console.log('addToOrder=',req.body);
    try {
    const order = new Order(req.body);
    const response = await order.save();
    // result = await response.populate("products");
    console.log('response=',response);
    res.status(201).json(response);
} catch (err) {
      console.log('err=',err);
    res.status(400).json(err);
  }
};

exports.fetchAllOrders=async(req,res)=>{
   console.log(req.query);
   let query=Order.find({});
   let totalCountQuery=Order.find({}); 
   if(req.query._sort && req.query._order){
       query=query.sort({[req.query._sort]:req.query._order})
       totalCountQuery=totalCountQuery.sort({[req.query._sort]:req.query._order})
   }
   if(req.query._page && req.query._limit){
       const pageSize=req.query._limit;
       const page=req.query._page;
       query=query.skip(pageSize*page-pageSize).limit(pageSize);
   }
     const totalCount=await totalCountQuery.count().exec();
    try{
       const response=await query.exec();
       console.log(response);
       res.set("X-Total-Count", totalCount);
       res.status(200).json(response);
   }catch(err){
      res.status(404).json(err);
   }
}

exports.fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await Order.find({ users: id })
    //   .populate("users")
    //   .populate("products");
    console.log("fetchOrderByUser=",response)
    res.status(200).json(response);
} catch (err) {
      console.log("fetchOrderByUser=",err)
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result=await response.populate('products');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteToOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndDelete(id)
    //   .populate("users")
    //   .populate("products");
      res.status(200).json(response);
    } catch (err) {
    res.status(400).json(err);
  }
};



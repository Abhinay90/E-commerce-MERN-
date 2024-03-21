const { Category } = require("../Model/category");

exports.fetchCategory = async(req,res) => {
    try{
        const response=await Category.find({});
        res.json(response)
    }catch(err){
       res.status(404).json(err);
    }
};

exports.createCategory=async(req,res)=>{
         const category=new Category(req.body);
         try{
             response=await category.save();
             res.status(201).json(response);
         }catch(err){
            res.status(404).json(err);
        }
}

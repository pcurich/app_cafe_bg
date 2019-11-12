const Category = require('../models/Category');
const Product =  require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId;


//Add New Category
exports.New = async(req, res,next) => {
    const category = new Category(req.body);

    try { 
        await category.save();
        res.json({message: 'Se agrego una nueva categoria'})
    } catch (error) {
        res.send(error);
        next();
    }
}

//Show All Categories
exports.List = async(req, res,next) => {
    try {
        //save record
        const categories = await Category.find({deleted:false});
        res.json(categories);
    } catch (error) {
        //console log, and next
        console.log(error);
        next();
    }
}

//Show Category by Id
exports.FindById = async(req, res,next) => {
    try {
        var category = await Category.findById(req.params.id)

        if(!category){
            res.json({message: "Esta categoria no existe"});
            next();
        }
        
        res.json(category);
    } catch (error) {
        res.send(error);
        next();
    }
}

//Update Category by Id
exports.Update = async(req, res,next) => {
    try {
        var category = await Category.findOneAndUpdate( {_id : req.params.id}, req.body, {new: true} );
        res.json(category);
    } catch (error) {
        res.send(error);
        next();
    }
}

//delete category by Id
exports.Delete = async(req, res,next) => {
    try { 
        //Pregunto si esa categoria esta asignada a un producto
        const product = await Product.find({category:new ObjectId(req.params.id)});
        if(product.length == 0 ){
            //No estaba asignado por ende puedo borrar
            await Category.findOneAndDelete( {_id : req.params.id} );
        }else{
            const filter = { _id: req.params.id };
            const update = { deleted: true };
            //si esta asignado entonces puede que exista historico y actualizo el campo {deleted: true}
            await Category.findOneAndUpdate(filter, update, {new: true});
        } 
        res.json( { message: "Categoria Eliminada"}); 
    } catch (error) {
        res.send(error);
        next();
    }
}

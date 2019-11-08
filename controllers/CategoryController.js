const Category = require('../models/Category');

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

//delete customer by Id
exports.Delete = async(req, res,next) => {
    try {
        await Customer.findOneAndDelete( {_id : req.params.id} );
        res.json( { message: "Categoria Eliminada"});
        //TODO nECESITO SABER SI HAY PRODUCTOS CON COMPRA ANTES DE BORRAR FISICAMENTEgit add .
    } catch (error) {
        res.send(error);
        next();
    }
}

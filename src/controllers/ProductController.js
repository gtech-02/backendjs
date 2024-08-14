const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

ProductModel.belongsTo(UserModel, {foreignKey: 'user_id'});

const ProductController = {
    create(request, response) {
        ProductModel.create(request.body);
        response.json({
            message: "Produto criado com sucesso"
        });
    },

    async list(request, response) {
        const products = await ProductModel.findAll({
            include: UserModel
        });
        response.json(products);
    }


    





    /*async list(request, response) {
        let token = request.headers.authorization ? request.headers.authorization.split(' ') : ''
            token = token ? token[1] : ''
        
        if (!token){
            response.json({message: "Token inválido!", sucess: false})
        } else{

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                const products = await ProductModel.findAll({
                    where: { user_id: decoded.id }
                });
                response.json(products);
            } catch(error) {
                console.log(Object.getOwnPropertyNames(error));
                console.log(error.message);
                if(error.name === "SequelizeDatabaseError") {
                    return response.json({
                        message: "Ocorreu um erro no servidor"
                    });
                }
                return response.json({
                    message: error.message
                })
            }

            
            
            
            
        }
    }*/
}

module.exports = ProductController;
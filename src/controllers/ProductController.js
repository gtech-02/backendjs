const ProductModel = require('../models/ProductModel');
const ProductImagesModel = require('../models/ProductImagesModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

ProductModel.belongsTo(UserModel, {foreignKey: 'user_id'});

const ProductController = {
    async create(request, response) {
        let product = await ProductModel.create(request.body);

        if(request.body?.images) {
            // Inserindo ID do produto no objeto com os dados da imagem
            let images = request.body.images.map(image => {
                return {
                    product_id: product.id,
                    path: image.content,
                    ...image
                }
            })
            
            // Salvando uma lista de imagens de uma so vez
            await ProductImagesModel.bulkCreate(images)
        }

        return response.json({
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
const dotenv = require("dotenv");
dotenv.config();

const connection = require('./connection');

require('../models/UserModel');
require('../models/CategoryModel');
require('../models/ProductModel');
require('../models/ProductImagesModel');

connection.sync();


const Product = require('../models/Product');

//Crear producto (solo admin)
exports.createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador' });
        }
        const { name, price, description, category, stock } = req.body;
        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            user: req.user.id
        });
        return res.status(201).json({ datos: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al crear el producto', error: error.message });
    }
};

//Listar productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ datos: products });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al obtener los productos', error: error.message });
    }   
};

//Obtener producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });            
        }
        return res.status(200).json({ datos: product });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al obtener el producto', error: error.message });
    }
};

//Actualizar producto (solo admin)
exports.updateProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador' });
        }
        const {name, price, description, category, stock} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, stock },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json({ datos: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al actualizar el producto', error: error.message });
    }
};

//Eliminar producto (solo admin)
exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador' });
        }
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al eliminar el producto', error: error.message });
    }
};


        
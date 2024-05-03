const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'Products testing route'})
}

module.exports = {
    getAllProducts,
}
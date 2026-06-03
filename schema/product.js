let products = [];
const addProduct = p => { products.push({id: products.length+1, ...p}); return 'ok'; };
const getProducts = () => products;
module.exports = { addProduct, getProducts };

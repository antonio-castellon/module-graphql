var { getProducts, addProduct } = require("./product.js");
module.exports = {
  products: () => getProducts(),
  createProduct: args => addProduct(args.product)
};

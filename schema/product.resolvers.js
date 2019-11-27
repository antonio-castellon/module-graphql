// import all required business logic
var { getProducts, addProduct } = require("./product.js");

// export the required resolvers for GraphQL interface
module.exports = {
    products: () => {  return getProducts();  },
    product: ({ id }) => {
        const products = getProducts();
        return products.find(p => p.id === id);
    },
    createProduct: args => {
        const { name, description } = args;
        const newProduct = addProduct(name, description);
        return `Created: ${newProduct.id} ${newProduct.name} - ${newProduct.description}`;
    }
};

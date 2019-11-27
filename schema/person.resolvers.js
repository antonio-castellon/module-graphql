// import all required business logic
var { getPeople, addPerson } = require("./person.js");

// export the required resolvers for GraphQL interface
module.exports = {
    people: () => {  return getPeople(); },
    createPerson: args => {
        const { person } = args;
        return addPerson(person);
    }
};

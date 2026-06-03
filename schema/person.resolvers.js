var { getPeople, addPerson } = require("./person.js");

module.exports = {
  people: () => getPeople(),
  createPerson: args => addPerson(args.person)
};

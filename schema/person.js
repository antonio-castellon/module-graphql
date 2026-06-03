let people = [ { id: 1, name: "pepe" } ];

const addPerson = person => {
  const nextId = people.length === 0 ? 1 : people[people.length - 1].id + 1;
  people = [...people, { ...person, id: nextId }];
  console.log("people", people);
  return "success";
};

const getPeople = () => people;

module.exports = { addPerson, getPeople };

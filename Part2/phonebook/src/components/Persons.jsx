const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;

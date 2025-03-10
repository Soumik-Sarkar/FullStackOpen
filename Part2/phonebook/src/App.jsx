import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumberInput = (event) => setNewNumber(event.target.value);
  const handleFilterInput = (event) => setSearchName(event.target.value);

  const resetNotification = () => {
    setNotificationMessage("");
    setIsError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setIsError(true);
            setTimeout(resetNotification, 3000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });

        return;
      }
    }

    const newPerson = { name: newName, number: newNumber };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${returnedPerson.name}`);
        setIsError(false);
        setTimeout(resetNotification, 3000);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error ||
          `Server error not able to add ${newPerson.name}`;
        setNotificationMessage(errorMessage);
        setIsError(true);
        setTimeout(resetNotification, 3000);
      });
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log("Deleted person successfully");
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setIsError(true);
          setTimeout(resetNotification, 3000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter searchName={searchName} handleFilterInput={handleFilterInput} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

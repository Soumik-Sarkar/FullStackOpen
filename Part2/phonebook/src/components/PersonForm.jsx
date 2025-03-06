const PersonForm = ({
  newName,
  newNumber,
  handleNameInput,
  handleNumberInput,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;

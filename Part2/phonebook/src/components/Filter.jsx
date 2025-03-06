const Filter = ({ searchName, handleFilterInput }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchName} onChange={handleFilterInput} />
    </div>
  );
};

export default Filter;

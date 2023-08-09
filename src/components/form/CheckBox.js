import React from 'react';

const CheckBox = ({ id, name, type, handleClick, isChecked, setIsCheck }) => {
  const handleInputChange = (e) => {
    const { checked } = e.target;
    console.log("id hatha", id, checked);

    if (checked) {
      setIsCheck(prevCheck => [...prevCheck, id]); // Utiliser la fonction de mise à jour du state
    } else {
      setIsCheck(prevCheck => prevCheck.filter((item) => item !== id));
      console.log("id tna7a", id, checked);
    }
  };

  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleInputChange}
        checked={isChecked}
      />
    </>
  );
};

export default CheckBox;

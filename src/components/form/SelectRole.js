import React from 'react';
import { Select } from '@windmill/react-ui';

const SelectRole = ({ setRole, register, name, label }) => {
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
         choisir une Specialite
        </option>
        <option value="Cardiologue">Cardiologue</option>
        <option value="Dermatologue">Dermatologue</option>
        <option value="Pédiatre">Pédiatre</option>
        <option value="Neurologue">Neurologue</option>
        <option value="Psychiatre"> Psychiatre </option>
        <option value="Orthopédiste">Orthopédiste</option>
      </Select>
    </>
  );
};

export default SelectRole;

import React from 'react';
import { Select } from '@windmill/react-ui';

const SelectPrevilege = ({ setPrevilege, register, name, label }) => {
  return (
    <>
      <Select
        onChange={(e) => setPrevilege(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Staff Previlege
        </option>
        <option value="Admin">Admin</option>
        <option value="Accountant">Accountant</option>
        <option value="Driver"> Driver </option>
        <option value="Security Guard">Security Guard</option>
        <option value="Deliver Person">Delivery Person</option>
      </Select>
    </>
  );
};

export default SelectPrevilege;

import React from 'react';
// import { Select } from '@windmill/react-ui';
import Select from 'react-select';
const SelectDepartment = ({ setDepartment, register, name, label, departments }) => {
  const options = departments?.map((department) => ({
    value: department.id,
    label: department.title,
  }));
  const handleChange = (selectedOption) => {
    setDepartment(selectedOption.value);
  };
  return (
    <>
      <Select
        options={options} // Pass the options array to react-select
        onChange={handleChange} 
        isMulti
        //onChange={(e) => setDepartment(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Staff Department
        </option>
        {departments?.map((department) => (
          <option key={department.id} value={department.id}>
            {department.title}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectDepartment;

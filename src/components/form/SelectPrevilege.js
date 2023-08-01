import React from 'react';
// import { Select } from '@windmill/react-ui';
import Select from 'react-select';

const SelectPrevilege = ({ setSelecttedPrevilege, register, label ,data, previleges }) => {
  const options = previleges?.map((previlege) => ({
    value: previlege.id,
    label: previlege?.name,
  }));

  const handleChange = (selectedOption) => {
    console.log(selectedOption, '__')
    setSelecttedPrevilege(selectedOption.value);
  };
  return (
    <>
      <Select
       options={options} // Pass the options array to react-select
        onChange={handleChange} 
        isMulti
        // onChange={(e) => setSelecttedPrevilege(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={'previlege'}
        // {...register(`${name}`, {
        //   required: `${label} is required!`,
        // })}
      >
        <option value="" defaultValue hidden>
          Staff Previlege
        </option>
        {previleges?.map((previlege) => (
          <option key={previlege.id} value={previlege.id}>
            {previlege?.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectPrevilege;

import React from 'react';
// import { Select } from '@windmill/react-ui';
import Select from 'react-select';

const SelectProject = ({ setSelecttedProject, register, label ,data, projects }) => {
  const options = projects?.map((project) => ({
    value: project.id,
    label: project?.title,
  }));

  const handleChange = (selectedOption) => {
    console.log(selectedOption, '__')
    setSelecttedProject(selectedOption.value);
  };
  return (
    <>
      <Select
       options={options} // Pass the options array to react-select
        onChange={handleChange} 
        isMulti
        // onChange={(e) => setSelecttedProject(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={'projects'}
        // {...register(`${name}`, {
        //   required: `${label} is required!`,
        // })}
      >
        <option value="" defaultValue hidden>
         Category Project
        </option>
        {projects?.map((project) => (
          <option key={project.id} value={project.id}>
            {project?.title}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectProject;

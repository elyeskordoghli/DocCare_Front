import { Select } from "@windmill/react-ui";

import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';

//internal import

import useAsync from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import { showingTranslateValue } from "utils/translate";

const SelectCategory = ({ setCategory, lang , name, label, categories}) => {
  const response = useAsync(CategoryServices.getAllCategories);
  const { data } = response.data;
  
  const { t } = useTranslation();
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
       
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        // name={name}
        // {...register(`${name}`, {
        //   required: `${label} is required!`,
        // })}
      >

        <option value="All" defaultValue hidden>
          {t("Category")}
        </option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCategory;

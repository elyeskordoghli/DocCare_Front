import { Select } from "@windmill/react-ui";

import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';

//internal import

import useAsync from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import { showingTranslateValue } from "utils/translate";

const SelectCategory = ({ setSelectedCategory,selectedCategory, lang , name, label, categories}) => {
  const response = useAsync(CategoryServices.getAllCategories());
  const { data } = response.data;
  
  console.log("categories selectonné",selectedCategory)
  const { t } = useTranslation();
  return (
    <>
              <Select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            value={selectedCategory}
          >
            <option value="All">
              {t("All Projects")} 
            </option>
            {/* <option value="Category" defaultValue hidden>
              {t("Category")}
            </option> */}
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

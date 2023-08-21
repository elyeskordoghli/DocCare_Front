import { Select } from "@windmill/react-ui";

import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';

//internal import

import useAsync from "hooks/useAsync";
import ReferencesServices from "services/ReferencesServices";
import { showingTranslateValue } from "utils/translate";

const SelectReferences = ({ setSelectedReferences,selectedReference, lang , name, label, References}) => {
  // const response = useAsync(ReferencesServices.getAllReferences());
  // const { data } = response.data;
  
  const { t } = useTranslation();
  return ( 
    <>
      <Select
        onChange={(e) => setSelectedReferences(e.target.value)}
       
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        // name={name}
        // {...register(`${name}`, {
        //   required: `${label} is required!`,
        // })}
        value={selectedReference}

      >

        <option value="All" defaultValue hidden>
          {t("References")}
        </option>
        {References?.map((reference) => (
          <option key={reference.id} value={reference.id}>
            {reference.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectReferences;

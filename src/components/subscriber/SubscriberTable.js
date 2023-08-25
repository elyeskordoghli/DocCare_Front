import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ServiceServices from "services/ServiceServices";
import ServiceDrawer from "components/drawer/ServiceDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import React, { useState, useEffect } from 'react'
//internal import  

const SubscriberTable = ({
  setId,
  searchSubscriber,
  isCheck,
  setIsCheck,
  currency,
  lang,
  data,
  isLoading,
  setIsLoading,
}) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
 


  
  return (
    <>

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>


            <TableCell>
              <CheckBox
                id={item.id}
                name={item.title_en}
                type="checkbox"
                isChecked={isCheck?.includes(item.id)}
                handleClick={() => handleClick(item.id)}
                setIsCheck={setIsCheck} // Passer la fonction setIsCheck en tant que prop
              />
            </TableCell>



            <TableCell>
              <div className="flex items-center">
              
              
               
                  <h2 className="text-sm font-medium">
                    {item.id}
                  </h2>
               
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm font-medium">
                {item.email}
              </span>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default SubscriberTable;

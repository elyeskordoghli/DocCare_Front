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
import Consultation from "pages/Consultation";
  //internal import  
  
  const ConsultationTable = ({
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
                  name={item.nom}
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
                  {item.nom}
                </span>
              </TableCell>
  
              <TableCell>
                <span className="text-sm font-medium">
                  {item.prenom}
                </span>
              </TableCell>
  
              <TableCell>
                <span className="text-sm font-medium">
                  {item.date}
                </span>
              </TableCell>
  
              <TableCell>
                <span className="text-sm font-medium">
                  {item.time}
                </span>
              </TableCell>
  
              <TableCell className="text-center">
              <ShowHideButton id={item.id} status={item.status} />
              {/* {product.status} */}
            </TableCell>
  
              <TableCell>
                <Link
                  to={`/Consultations`}
                  className="flex justify-center text-gray-400 hover:text-orange-600"
                  onClick={() => handleDownload(item.id)}
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={t("DetailsTbl")}
                    bgColor="#1a5184"
                  />
                </Link>
              </TableCell>
  
  
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  };
  
  export default ConsultationTable;
  
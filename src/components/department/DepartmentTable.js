import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
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
import DepartmentServices from "services/DepartementServices";
import DepartmentDrawer from "components/drawer/DepartmentDrawer";
//internal import  

const DepartmentTable = ({ setId,data, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading }) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();


 
    // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
   

  const getDepartment = async () => {
    try {
      const dep = await DepartmentServices.getDepartmentById(serviceId)
      setIsCheck([...isCheck, dep.id]);

    } catch (error) {
      console.error("Erreur lors de la récupération de department :", error);

    }
  }


  useEffect(() => {
    getDepartment();
  }, [])

  const beforeHandleModalOpen = (id, title, department) => {
    handleModalOpen(id, title, department);
    // setIsCheck([id]);
  }
  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <>
    
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data?.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <DepartmentDrawer  id={serviceId} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck}   />
        </MainDrawer>
      )}

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
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={item?.image}
                  alt="Department"
                />
                <div>
                  <h2 className="text-sm font-medium">
                    {item?.title}
                  </h2>
                </div>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item?.description}
              </span>

            </TableCell>
 

            <TableCell>
              <EditDeleteButton
                id={item.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                department={item}
                isCheck={isCheck}
                handleClick={handleClick}
                handleUpdate={handleUpdate}
                handleModalOpen={beforeHandleModalOpen}
                title={showingTranslateValue(item?.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DepartmentTable;

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
import DeleteButton from "components/table/DeleteButton";
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
import DepartmentContactServices from "services/DepartementContactServices";
//internal import  

const DepartmentContactTable = ({ data,searchDepartmentContact, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading }) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();
  const [status, setStatus] = useState("");

  const handleStatusChange = async (id,newStatus) => {
    setStatus(newStatus);
    
    const formData = {status: newStatus,};
    setIsLoading(false);
    console.log("serser : ",newStatus);
    console.log("formDataaa : ",formData);

    // Appelez le service pour mettre à jour le statut dans la base de données
   DepartmentContactServices.updateContact(id,
       formData
       )

      .then((response) => {
        // Traitez la réponse si nécessaire
        setIsLoading(true);

        console.log('contact updated:', response.data);
      })
      .catch((error) => {
        // Traitez les erreurs si nécessaire
        console.error('Error updating contact:', error);
      });
  };
 
   

  const getDepartmentContact = async () => {
    try {
      const con = await DepartmentContactServices.getContactById(serviceId)
      setIsCheck([...isCheck, con.id]);
      console.log('contact selectionnée : ', con.id);

    } catch (error) {
      console.error("Erreur lors de la récupération de contact :", error);

    }
  }


  useEffect(() => {
    getDepartmentContact();
  }, [])

  const beforeHandleModalOpen = (id, name, DepartmentsContact) => {
    handleModalOpen(id, name, DepartmentsContact);
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
      {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}  */}
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data?.name}
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
              name={item?.name}
              type="checkbox"
              isChecked={isCheck?.includes(item.id)}
              handleClick={() => handleClick(item.id)}
              setIsCheck={setIsCheck} // Passer la fonction setIsCheck en tant que prop
            />
          </TableCell>



            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">
                    {item?.name}
                  </h2>
                </div>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item?.email}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.phone}
              </span>
            </TableCell>

            <TableCell>
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id,e.target.value)}
              >
                <option value="in progress">in progress</option>
                <option value="completed">completed</option>
                <option value="canceled">canceled</option>
              </select>
            </TableCell>


            <TableCell>
              <span className="text-sm">
                {item?.department?.title}
              </span>
            </TableCell>
 
            <TableCell>
              <Link
                to={`/contact/${item.id}`}
                className="flex justify-center text-gray-400 hover:text-orange-600"
                // handleUpdate={handleUpdate}

              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"Details"}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <DeleteButton
                id={item.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                DepartmentsContact={item}
                isCheck={isCheck}
                handleClick={handleClick}
                handleModalOpen={beforeHandleModalOpen}
                title={showingTranslateValue(item?.name, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DepartmentContactTable;

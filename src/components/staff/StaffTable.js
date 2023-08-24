import {
  Avatar,
  TableBody,
  TableCell,
  Badge,
  TableRow,
} from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import useToggleDrawer from "hooks/useToggleDrawer";
import StaffDrawer from "components/drawer/StaffDrawer";
import DeleteModal from "components/modal/DeleteModal";
import PrevilegesModal from "components/modal/PrevilegesModal";

import ActiveInActiveButton from "components/table/ActiveInActiveButton";
import EditDeleteButton from "components/table/EditDeleteButton";

import previlegesButton from "components/table/previlegesButton";

import Status from "components/table/Status";
import MainDrawer from "components/drawer/MainDrawer";
import { showingTranslateValue } from "utils/translate";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import AdminServices from "services/AdminServices";
import Tooltip from "components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import CheckBox from "components/form/CheckBox";
import Loader from 'components/loader/Loader';

const StaffTable = ({
  searchAdmin,
  lang,
  isCheck,
  setIsCheck,
  isLoading,
  data,
  full,
  full_access,
  setIsLoading,
}) => {
  const {
    title, 
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();
  

  const getAdmin = async () => {
    try {
      const ad = await AdminServices.getStaffById(serviceId);
      setIsCheck([...isCheck, ad.id]);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'admin :", error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const beforeHandleModalOpen = (id, title, staff) => {
    try {
      handleModalOpen(id, title,staff);
      setIsCheck([]);

    } catch (error) {
      alert(`Une erreur est survenue ${error}`);
    }


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
     
      {/* <DeleteModal id={serviceId} title={title} /> */}
      {isCheck?.length < 1 && (
        <DeleteModal
          id={serviceId}
          title={data.title}
          isLoading={isLoading} // Passer la variable isLoading
          setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true}
        />
      )}
      {isCheck?.length < 2 && (
        <MainDrawer>
          <StaffDrawer
            id={serviceId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsCheck={setIsCheck}
            isCheck={isCheck}
            full_access={full_access}
          />
        </MainDrawer>
      )}
      {/* <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
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

            <TableCell className="text-center">
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{item.name}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{item.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.last_login_at}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.last_login_ip}</span>
            </TableCell>
            <TableCell>
              {item?.status === 1 ? (
                <Badge className="bg-green-500 text-white !important">
                  {"Active"}
                </Badge>
              ) : (
                <Badge className="bg-green-500 text-white">{"Inactive"}</Badge>
              )}
            </TableCell>
            {/* <TableCell>
              {item?.previleges ? (
                <ul className="list-disc pl-6">
                  {item.previleges.map((previlege, index) => (
                    <li key={index} className="text-sm font-semibold">
                      {previlege.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm font-semibold">Aucun privilège</span>
              )}
            </TableCell> */}

            {/* <TableCell>
            {item?.departments ? (
              item.departments.map((department, index) => (
                <span key={index} className="text-sm font-semibold">
                  {department.title}
                  {index !== item.departments.length - 1 && ", "} 
                </span>
              ))
            ) : (
              <span className="text-sm font-semibold">Aucun department</span>
            )}
          </TableCell> */}

            <TableCell className="text-center">
              {full === item.previleges.length ? (
                <Badge type="success">{"FULL ACCESS"}</Badge>
              ) : (
                <Link
                  to={`/admin/${item.id}/previleges`}
                  className="flex justify-center text-gray-400 hover:text-orange-600"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={"DetailsTbl"}
                    bgColor="#10B981"
                  />
                </Link>
              )}
            </TableCell>

            <TableCell >
              {item?.departments.length !== 0 ? (
                <ul className="list-disc pl-6">
                  {item.departments.map((department, index) => (
                    <li key={index} className="text-sm font-semibold">
                      {department.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <Badge type="success">{"NO DEPARTMENTS"}</Badge>
              )}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item.id}
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                staff={item}
                isCheck={serviceId}
                handleClick={handleClick}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={beforeHandleModalOpen}
                handleResetPassword={handleResetPassword}
                name={item?.name}
              />
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </>
  );
};

export default StaffTable;

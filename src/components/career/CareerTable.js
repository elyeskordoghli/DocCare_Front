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
import CareerServices from "services/CareerServices";
import CareerDrawer from "components/drawer/CareerDrawer";
import Loader from 'components/loader/Loader';
import { useTranslation } from "react-i18next";

//internal import  

const CareerTable = ({ setId,data, searchCareer, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading }) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
  } = useToggleDrawer();

  const { t } = useTranslation();


  const getCareer = async () => {
    try {
      const car = await CareerServices.getCareerById(serviceId)
      setIsCheck([...isCheck, car.id]);

    } catch (error) {
      console.error("Erreur lors de la récupération de career :", error);

    }
  }


  useEffect(() => {
    getCareer();
  }, [])

  const beforeHandleModalOpen = (id, title, career) => {
    handleModalOpen(id, title, career);
    setIsCheck([]);
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
           {isLoading ? <Loader /> : null}

      {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}  */}
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <CareerDrawer id={serviceId} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck} />
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
                  alt="Career"
                />
               
                <div>
                  <h2 className="text-sm font-medium">
                    {item.title}
                  </h2>
                </div>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item?.short_description && (
                  <span className="text-sm">
                    {item.short_description
                      .split(' ')
                      .slice(0, 10) // Tronquer après 10 mots
                      .join(' ')}
                    {item.short_description.split(' ').length > 10 && ' ...'}
                  </span>
                )}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
               {item?.associatedCareersCount}
              </span>
            </TableCell>
            <TableCell>
              <Link
                to={`/career/${item.id}`}
                className="flex justify-center text-gray-400 hover:text-orange-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#ff5a1f"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                career={item}
                isCheck={serviceId}
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

export default CareerTable;

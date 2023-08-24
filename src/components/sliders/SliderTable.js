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
import SlidersServices from "services/SlidersServices";
import SliderDrawer from "components/drawer/SliderDrawer";
//internal import  

const SliderTable = ({ data, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading, Sliders }) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();


  
  const getSlider = async () => {
    try {
      const ser = await SlidersServices.getSliderById(serviceId)
      setIsCheck([...isCheck, ser.id]);
      console.log('Slider selectionnée : ', ser.id);

    } catch (error) {
      console.error("Erreur lors de la récupération  :", error);

    }
  }


  useEffect(() => {
    getSlider();
  }, [])

  const beforeHandleModalOpen = (id, title, Slider) => {
    console.log(id)
    handleModalOpen(id, title, Slider);
    // setIsCheck([id]);
  }
  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id hatha", id, checked);
  
    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
      console.log("id tna7a", id, checked);
    }
  };
  return (
    <>
     
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <SliderDrawer id={serviceId} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck}   />
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
                {/* {data?.image ? ( */}
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={item?.image}
                  alt="Slider"
                />
                {/* ) : ( */}
                {/* <Avatar */}
                {/* //   src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                  //   alt="Service"
                  // />
                // ) */}
                {/* } */}
                <div>
                  <h2 className="text-sm font-medium">
                    {item.title}
                  </h2>
                </div>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item.subtitle}
              </span>

            </TableCell>


{/* 
            <TableCell>

              <span className="text-sm ">
                {item.short_description.length > 30
                  ? item.short_description.substring(0, 30) + "..."
                  : item.short_description}
              </span>


            </TableCell> */}


            <TableCell>
              <span className="text-sm">
                {item.id_video_youtube} 
              </span>
            </TableCell>
            <TableCell>
              <Link
                to={`/slider/${item.id}`}
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
                slider={item}
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

export default SliderTable;

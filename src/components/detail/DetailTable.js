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
import DetailsServices from "services/DetailsServices";
import DetailDrawer from "components/drawer/DetailDrawer";
//internal import  

const DetailTable = ({ data, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading, Details }) => {
  const {
    handleModalOpen,
  
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();


  const  [serviceId, setServiceId] = useState();
  // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
 

  const getDetail = async () => {
    try {
      const ser = await DetailsServices.getDetailById(serviceId)
      // setServiceId(ser.id);
      setIsCheck([...isCheck, ser.id]);

    } catch (error) {
      console.error("Erreur lors de la récupération  :", error);

    }
  }


  useEffect(() => {
    getDetail();
  }, [])

  const beforeHandleModalOpen = (id, title, Detail) => {
    handleModalOpen(id, title, Detail);
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

      
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>

            {/* <TableCell>
              <CheckBox
                id={item.id}
                name={item.title_en}
                type="checkbox"
                isChecked={isCheck?.includes(item.id)}
                handleClick={() => handleClick(item.id)}
                setIsCheck={setIsCheck} // Passer la fonction setIsCheck en tant que prop
              />
            </TableCell> */}


            <TableRow >
              <TableCell>{"Adresse"}</TableCell>
              <TableCell>
                <span className="text-sm "> {item.adresse_en}</span>
              </TableCell>
            </TableRow> 
            <TableRow >
              <TableCell>{"Whatsapp Number"}</TableCell>
              <TableCell>
                <span className="text-sm "> {item.whatsapp_num}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Standard Number"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.standard_num}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Email"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.email}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Working Hours"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.working_hours_en}</span>
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell>{"Facebook"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.facebook}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Instagram"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.insta}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Twitter"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.twitter}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"LinkedIn"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.linkedIn}</span>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{"Video"}</TableCell>
              <TableCell>
                <span className="text-sm ">  {item.video}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"Location"}</TableCell>
              <TableCell>
                <a href={item.map_localisation} className="text-sm">Our Location</a>
              </TableCell>
            </TableRow>
            <TableCell>
              {/* <EditDeleteButton
                id={item.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                slider={item}
                isCheck={isCheck}
                handleClick={handleClick}
                handleUpdate={handleUpdate}
                handleModalOpen={beforeHandleModalOpen}
                title={showingTranslateValue(item?.title, lang)}
              /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default DetailTable;

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
import React, { useState,useEffect } from 'react'
//internal import 

const ServiceTable = ({ setId , isCheck, setIsCheck, currency, lang }) => {
  const [data, setData] = useState([]); 
  const { 
    handleModalOpen,
    serviceId, 
    handleUpdate, 
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();

  useEffect(() => {
    // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
    const fetchServices = async () => {
      try {
        const response = await ServiceServices.getAllServices({
          title: null,
          subtitle: null,
          short_description: null,
          description: null,
          image:null,
          catalogue:null,
        });

        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    };

    fetchServices(); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
    }, []); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const beforeHandleModalOpen = (id, title, service) => {
    console.log(id)
    handleModalOpen(id, title, service); 
    setIsCheck([id]); 
  }
  return (
    <>
    {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}  */}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ServiceDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
               
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title}
                id={item.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item.id)}
              />
            </TableCell>

         

            <TableCell>
              <div className="flex items-center">
                {/* {data?.image ? ( */}
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={item?.image}
                    alt="Service"
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

           

            <TableCell>
             
              <span className="text-sm "> 
                {item.short_description.length > 30 
                  ? item.short_description.substring(0, 30) + "..." 
                  : item.short_description} 
              </span>
                
             
            </TableCell>

       
            <TableCell>
            <span className="text-sm">   
             <a href={item.catalogue}>{item.title} Catalogue</a> 
              </span>
            </TableCell>
            <TableCell>
              <Link
                to={`/service/${item.id}`}
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
                service={item}
                isCheck={isCheck}
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

export default ServiceTable;

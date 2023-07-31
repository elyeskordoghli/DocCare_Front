import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProjectServices from "services/ProjectServices";
import ProjectDrawer from "components/drawer/ProjectDrawer";
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
import {useAsync} from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";

//internal import 

const ProjectTable = ({ isCheck, setIsCheck, currency, lang }) => {
  const [data, setData] = useState([]); 
  const {
    handleModalOpen,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin
  } = useToggleDrawer();

  
  useEffect(() => {
    // Utilisez la fonction getAllProjects pour récupérer les données des projets depuis l'API
    const fetchProjects = async () => {
      try {
        const response = await ProjectServices.getAllProjects({
          category_id: null,
          title: null,
          subtitle: null,
          short_description: null,
          description: null,
          image:null,
        });

        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects(); // Appelez la fonction fetchProjects pour récupérer les projets au chargement du composant
  }, []); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };


  return (
    <>
      {/* {isCheck?.length < 1 && <DeleteModal id={data.id} title={data.title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProjectDrawer  id={data.id} />
        </MainDrawer>
      )} */}

      <TableBody>
        {data?.map((data, i) => (
          <TableRow key={i + 1}>
               
            <TableCell>
              <CheckBox
                type="checkbox"
                name={data?.title}
                id={data.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(data.id)}
              />
            </TableCell>

         

            <TableCell>
              <div className="flex items-center">
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={data?.image}
                    alt="project"
                  />
                <div>
                  <h2 className="text-sm font-medium">
                    {data.title}
                  </h2>
                </div>
              </div>
       
            </TableCell> 

            <TableCell>
            <span className="text-sm font-semibold">
              {data.subtitle}
              </span> 
            </TableCell>

            <TableCell>
               <span className="text-sm font-semibold">
                    {data.category_id}
              </span>
         
            </TableCell>


            <TableCell className="truncate max-w-xs">
              <span className="text-sm font-semibold">
                {data.short_description.length > 30
                  ? data.short_description.substring(0, 30) + "..."
                  : data.short_description}
              </span>
            </TableCell>

            

{/* 
            <TableCell >
              <span className="text-sm font-semibold">
              {data.description.length >20 ? data.description.substring(0,30) +"...": data.description}
              </span>
            </TableCell> */}

            
            <TableCell>
              <Link
                to={`/project/${data.id}`}
                className="flex justify-center text-gray-400 hover:text-orange-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link> 
            </TableCell>
           
            <TableCell>
              <EditDeleteButton
                id={data.id}
                data={data}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(data?.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProjectTable;



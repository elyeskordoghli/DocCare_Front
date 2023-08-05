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

const ProjectTable = ({ isCheck, setIsCheck, currency, lang ,selectedCategory,isLoading, setIsLoading}) => {


 

  const [data, setData] = useState([]); 
  const {
    handleModalOpen,
    handleUpdate,
    serviceId,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin
  } = useToggleDrawer();

  console.log('serviceId',serviceId);

  //----------------------------------------------------------------


  // Utilisez la fonction getAllProjects pour récupérer les données des projets depuis l'API
  const fetchProjects = async () => {
    try {
      const response = await ProjectServices.getAllProjects({
      });
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }  finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };

  useEffect(() => {
    fetchProjects(); // Appelez la fonction fetchProjects pour récupérer les projets au chargement du composant
  }, [isLoading]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant



//----------------------------------------------------------------

  const getProject = async() =>{
    try{
      const pr = await ProjectServices.getProjectById(isCheck)
      setIsCheck([...isCheck, pr.id]);
      console.log('Projet selectionnée : ',pr.id);

    }catch(error){
      console.error("Erreur lors de la récupération de projet :", error);

    }
  }


  useEffect(() =>{
    getProject();
  },[])

//----------------------------------------------------------------


  

//----------------------------------------------------------------




  const beforeHandleModalOpen = (id, title, project) => {
    console.log(id)
    handleModalOpen(id, title, project); 
    setIsCheck([id]); 
  }

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
      {isCheck?.length < 2 && <DeleteModal 
      id={serviceId} 
      title={data.title} 
      isLoading={isLoading} // Passer la variable isLoading
      setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
       />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProjectDrawer  id={serviceId}  />
        </MainDrawer>
      )}


      <TableBody>
         {/* Afficher le loader si la table est en cours de chargement */}
    {/* {isLoading && <div>Chargement en cours...</div>} */}
    
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
               
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item.title}
                id={item.id}
                isCheck={isCheck}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item.id)}

              />
            </TableCell>

          

            <TableCell>
              <div className="flex items-center">
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={item?.image}
                    alt="project"
                  />
                <div>
                  <h2 className="text-sm font-medium">
                    {item.title}
                  </h2>
                </div>
              </div>
       
            </TableCell> 

            <TableCell>
            <span className="text-sm font-semibold">
              {item.subtitle}
              </span> 
            </TableCell>

            <TableCell>
               <span className="text-sm font-semibold">
                    {item.category_id}
              </span>
         
            </TableCell>


            <TableCell className="truncate max-w-xs">
              <span className="text-sm font-semibold">
                {item.short_description.length > 30
                  ? item.short_description.substring(0, 30) + "..."
                  : item.short_description}
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
                to={`/project/${item.id}`}
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
                id={item.id}
                // cercleprogress
                isLoading={isLoading} // Passer la variable isLoading
                setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
                data={item}
                isCheck={isCheck}
                handleClick={handleClick}
                handleUpdate={handleUpdate}
                handleModalOpen={beforeHandleModalOpen }
                title={showingTranslateValue(item?.title, lang)}
              />
        
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProjectTable;



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
import React, { useState, useEffect } from 'react'
import { useAsync } from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import Loader from 'components/loader/Loader';

//internal import 

const ProjectTable = ({ isCheck, setIsCheck,categories ,References, search, data, lang, selectedCategory, isLoading, setIsLoading, projects, handleServiceIdChange = null }) => {

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




  const {
    handleModalOpen, 
    handleUpdate,
    serviceId,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin
  } = useToggleDrawer();
  console.log("service id from projectTable : ",serviceId)
  console.log('isCheck : ', isCheck)
  console.log('selectedCategory : ', selectedCategory);
  console.log('isLoading : ', isLoading);

  useEffect(() => {
    handleServiceIdChange(serviceId)
  }, [serviceId])
 
  //----------------------------------------------------------------


  // Utilisez la fonction getAllProjects pour récupérer les données des projets depuis l'API
  // const fetchProjects = async () => {
  //   try {
  //     const response = await ProjectServices.getAllProjects({
  //     });
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des projets :", error);
  //   }  finally {
  //     setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
  //   }
  // };

  // useEffect(() => {
  //   fetchProjects(); // Appelez la fonction fetchProjects pour récupérer les projets au chargement du composant
  // }, [isLoading]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

  // const fetchProjects = async (selectedCategory, isLoading, search) => {
  //   try {
  //     let response;
  //     setIsLoading(true);

  //     if (selectedCategory === "All" && !search) {
      

  //       // Si la catégorie sélectionnée est "All", récupérer tous les projets
  //       response = await ProjectServices.getAllProjects();

  //     }
  //     else if (search && selectedCategory ) {
  //       console.log("hihihi : ",selectedCategory);

  //       response = await ProjectServices.search(search, selectedCategory);


  //     } else if (selectedCategory !== "All") {

  //       response = await ProjectServices.getProjectByCategoryId(selectedCategory);

  //     }
  //     setIsLoading(false);


  //     setData(response.data);
  //     console.log("data new data : ",response.data)
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des projets :", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProjects(selectedCategory, isLoading, search);
  // }, [selectedCategory, search]);



  //----------------------------------------------------------------

  const getProject = async () => {
    try {
      const pr = await ProjectServices.getProjectById(serviceId)
      setIsCheck([...isCheck, pr.id]);
      console.log('Projet selectionnée : ', pr.id);

    } catch (error) {
      console.error("Erreur lors de la récupération de projet :", error);

    }
  }


  useEffect(() => {
    getProject();
  }, [])

  //----------------------------------------------------------------


  // const introjects = async (selectedCategory) =>{
  //   try {
  //     // setIsLoading(true);
  //     const response = await ProjectServices.getProjectByCategoryId(selectedCategory);
  //     setData(response.data);
  //     console.log('projectcat',data)
  //     // setIsLoading(false);
  //     // Vérifier si response.data est un tableau avant d'utiliser .map()


  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des projets :", error);
  //   } 
  // }

  // console.log('selected categoriiiiiiiii',selectedCategory)


  // useEffect(() =>{
  //   introjects(selectedCategory);
  // },[selectedCategory,isLoading])


  //----------------------------------------------------------------




  const beforeHandleModalOpen = (id, title, project) => {
    try {
      console.log('idddddddd', id)
      handleModalOpen(id, title, project);
      setIsCheck([]);

    } catch (error) {
      alert(`Une erreur est survenue ${error}`);
    }


  }





console.log("serviceID : : : : : ",serviceId);


  return (
    <>

      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {/* {isCheck?.length < 2 && (
        <MainDrawer>
          <ProjectDrawer 
            id={serviceId}
            isLoading={isLoading} // Passer la variable isLoading
            setIsLoading={setIsLoading}/>
        </MainDrawer>
      )} */}


      <TableBody>
        {/* Afficher le loader si la table est en cours de chargement */}
        {/* {isLoading && <div>Chargement en cours...</div>} */}

        {data?.map((item, i) => (
          <TableRow key={i + 1}>

            {/* <TableCell>
              <CheckBox
                type="checkbox"
                name={item.title_en}
                id={item.id}
                isChecked={isCheck?.includes(item.id)}
                handleClick={handleClick}
              />
            </TableCell> */}
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
                {item?.category ? item.category.name_en : "No Category"}
              </span>
            </TableCell>


            {/* <TableCell className="truncate max-w-xs">
              <span className="text-sm font-semibold">
                {item.short_description.length > 30
                  ? item.short_description.substring(0, 30) + "..."
                  : item.short_description}
              </span>
            </TableCell> */}



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
                handleUpdate={handleUpdate}

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
                isLoading={isLoading} // Passer la variable isLoading
                setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
                data={item}
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

export default ProjectTable;



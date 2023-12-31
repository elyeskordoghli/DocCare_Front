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
import PatientDrawer from "components/drawer/PatientDrawer";

//internal import 

const ProjectTable = ({ isCheck, setIsCheck,categories ,setReference,setCategory,References, data, lang, selectedCategory, isLoading, setIsLoading, projects}) => {

  const handleClick = (e) => {
    const { id, checked } = e.target;

    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };



  
  const {
    handleModalOpen, 
    handleUpdate,
    serviceId,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin
  } = useToggleDrawer();
  

  // useEffect(() => {
  //   handleServiceIdChange(serviceId)
  // }, [serviceId])
 
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

    } catch (error) {
      console.error("Erreur lors de la récupération de cette projet :", error);

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
      handleModalOpen(id, title, project);
      setIsCheck([]);

    } catch (error) {
      alert(`Une erreur est survenue ${error}`);
    }


  }







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
          <PatientDrawer 
            id={serviceId}
            isLoading={isLoading} // Passer la variable isLoading
            setIsLoading={setIsLoading}
            References={References}
            // setReferences={setReferences}

            isCheck ={isCheck}
            setIsCheck={setIsCheck}

            categories={categories}
            setCategory={setCategory}
            
            />
        </MainDrawer>
      )}


      <TableBody>
        {/* Afficher le loader si la table est en cours de chargement */}
        {/* {isLoading && <div>Chargement en cours...</div>} */}

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
                  bgColor="#1a5184"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item.id}
                // isLoading={isLoading} // Passer la variable isLoading
                // setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
                data={item}
                isCheck={serviceId}
                handleClick={handleClick}
                handleUpdate={handleUpdate}
                handleModalOpen={beforeHandleModalOpen}
                title={showingTranslateValue(item?.nom, lang)}
              />

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProjectTable;



import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";

//internal import
import { IoRemoveSharp } from "react-icons/io5";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import CategoryDrawer from "components/drawer/CategoryDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import CategoryServices from "services/CategoryServices";
import React, { useState,useEffect } from 'react'

const CategoryTable = ({
  lang, 
  isCheck,
  categories,
  setIsCheck,
  useParamId,
  showChild,
  isLoading, 
  setIsLoading,
  search
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  // const handleClick = (e) => {
  //   const { id, checked } = e.target;
  //   setIsCheck([...isCheck, id]);
  //   if (!checked) {
  //     setIsCheck(isCheck.filter((item) => item !== id));
  //   }
  // };
  const [data, setData] = useState([]); 
 

  const fetchProjects = async (selectedCategory,isLoading,search) => {
    try {
      let response;
      if (selectedCategory === "All" && !search) {
      // Si la catégorie sélectionnée est "All", récupérer tous les projets
        response = await CategoryServices.getAllCategories();
      }
        else if (search) {
          response = await CategoryServices.search(search,selectedCategory);
      }
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
  fetchProjects(selectedCategory,isLoading,search);
}, [selectedCategory,isLoading,search])


    // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
    const fetchCategories = async (search) => {
      try {
        const response = await CategoryServices.getAllCategories({
          name: null,
          slug: null,
          short_description: null,
          projects: null,
        });

        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des categories :", error);
      }
      finally {
        setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
      }
    };
    useEffect(() => {
    fetchCategories(); // Appelez la fonction fetchCategories pour récupérer les projets au chargement du composant
    }, [isLoading]);
// console.log("name",data);
    const getCategory = async () => {
      try {
        const cat = await CategoryServices.getCategoryById(isCheck)
        setIsCheck([...isCheck, cat.id]);
        console.log('Category selectionnée : ', cat.id);

      } catch (error) {
        console.error("Erreur lors de la récupération du category :", error);

      }
    }


    useEffect(() => {
      getCategory();
    }, [])

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
      {isCheck?.length < 1 && (
        <DeleteModal 
        useParamId={useParamId} 
        id={serviceId} 
        title={title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading}  />
      )}

      {isCheck?.length < 2 && (
        <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
        </MainDrawer>
      )}

      {/* <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer> */}

      <TableBody>
        {data?.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="category"
                id={category.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(category.id)}
                setIsCheck={setIsCheck} 
              />
            </TableCell>

            <TableCell className="font-semibold uppercase text-xs">
              {category?.id}
            </TableCell>

            <TableCell className="font-medium text-sm ">
                <span>{category?.name}</span>
            </TableCell>
            <TableCell className="text-sm">
              {category?.slug}
            </TableCell>

            {/* <TableCell>
              {category?.projects ? (
                <ul className="list-disc pl-6"> 
                  {category.projects.map((project, index) => (
                    <li key={index} className="text-sm ">
                      {project.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm font-semibold">Aucun privilège</span>
              )}
            </TableCell> */}
            <TableCell>
              <EditDeleteButton
                id={category?.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleClick={handleClick}
                parent={category}
                category={category}
                isCheck={isCheck}
                children={category?.children}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={category?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;

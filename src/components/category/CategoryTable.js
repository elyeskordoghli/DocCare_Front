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
import React, { useState,useEffect } from 'react'
import CategoryServices from "services/CategoryServices";

const CategoryTable = ({
  lang, 
  isCheck,
  categories,
  setIsCheck,
  useParamId,
  showChild,
  isLoading, 
  setIsLoading,
  search,
  data
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate} = useToggleDrawer();
    const getCategory = async () => {
      try {
        const cat = await CategoryServices.getCategoryById(isCheck)
        setIsCheck([...isCheck, cat.id]);

      } catch (error) {
        console.error("Erreur lors de la récupération du category :", error);

      }
    }


    useEffect(() => {
      getCategory();
    }, [])

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
      {isCheck?.length < 1 && (
        <DeleteModal 
        id={serviceId} 
        title={data.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading}  />
      )}

      {isCheck?.length < 2 && (
        <MainDrawer>
        <CategoryDrawer 
        id={serviceId} 
        data={data}
        lang={lang} 
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} />
        </MainDrawer>
      )}
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

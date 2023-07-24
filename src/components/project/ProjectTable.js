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
//internal import 

const ProjectTable = ({ isCheck, setIsCheck, currency, lang }) => {
  const [data, setData] = useState([]); 

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
      {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProjectDrawer currency={currency} id={serviceId} />
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
                {/* {data?.image ? ( */}
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={data?.image}
                    alt="project"
                  />
                {/* ) : ( */}
                  {/* <Avatar */}
                  {/* //   src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                  //   alt="project"
                  // />
                // ) */}
               {/* } */}
                <div>
                  <h2 className="text-sm font-medium">
                    {data.title}
                  </h2>
                </div>
              </div>
       
            </TableCell> 

            <TableCell>
              {/* <span className="text-sm">
                {showingTranslateValue(data?.category?.id, lang)}
              </span> */}
              {data.subtitle}
            </TableCell>

            <TableCell>
              {/* <span className="text-sm font-semibold">
                {currency}
                {data?.data?.title}
              </span> */}
              {data.category_id}
            </TableCell>


            <TableCell>
              {data.short_description}
            </TableCell>

            <TableCell >
              {/* <span className="text-sm">{data.title}</span> */}
              {data.description}
            </TableCell>
            <TableCell>
              {/* {data.stock > 0 ? (
                <Badge type="success">{t("Selling")}</Badge>
              ) : (
                <Badge type="danger">{t("SoldOut")}</Badge>
              )} */}
            </TableCell>
            <TableCell>
              <Link
                to={`/admin/projects/project/${data.id}`}
                className="flex justify-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link> 
            </TableCell>
            <TableCell className="text-center">
              {/* <ShowHideButton id={data._id} status={data.status} />
              // {project.status}  */}
            </TableCell>
            <TableCell>
              {/* <EditDeleteButton
                id={data.id}
                data={data}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(data?.title, lang)}
              /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProjectTable;

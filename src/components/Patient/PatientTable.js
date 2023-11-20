import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
  } from "@windmill/react-ui";
  import MainDrawer from "components/drawer/MainDrawer";
  import ProjectServices from "services/ProjectServices";
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
  import PatientServices from "services/PatientServices";
import PatientDrawer from "components/drawer/PatientDrawer";

  //internal import 
  
  const PatientTable = ({ isCheck, setIsCheck,categories ,setReference,setCategory,data,References, lang, selectedCategory, isLoading, setIsLoading, projects}) => {
  
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
    
  
  
  
  
  
    

  
  
  
  
    const beforeHandleModalOpen = (id, title, project) => {
      try {
        handleModalOpen(id, title, project);
        setIsCheck([]);
  
      } catch (error) {
        alert(`Une erreur est survenue ${error}`);
      }
  
  
    }
  

    const handleDownload = async (id) => {
      try {
        const response = await PatientServices.DownloadDossierMedical(id);
        
        // Créer un Blob à partir de la réponse
        const blob = new Blob([response.data], { type: 'application/zip' });
    
        // Créer un lien pour le téléchargement du fichier
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `DossierMedical_Patient_${id}.zip`);
    
        // Ajouter le lien au document et déclencher le téléchargement
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Erreur lors du téléchargement du dossier médical :', error);
        // Gérer les erreurs
      }
    };
    
    




 


   

  
    return (
      <>
  
        {isCheck?.length < 1 && <DeleteModal
          id={serviceId}
          title={data.nom}
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
                  name={item.nom}
                  type="checkbox"
                  isChecked={isCheck?.includes(item.id)}
                  handleClick={() => handleClick(item.id)}
                  setIsCheck={setIsCheck} // Passer la fonction setIsCheck en tant que prop
                />
              </TableCell>
  
  
  
  
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-sm font-medium">
                      {item.nom}
                    </h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-sm font-medium">
                      {item.prenom}
                    </h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-sm font-medium">
                      {item.dateN}
                    </h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-sm font-medium">
                      {item.adresse}
                    </h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <div>
                    <h2 className="text-sm font-medium">
                      {item.num}
                    </h2>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Link
                  to={`/Patients`}
                  className="flex justify-center text-gray-400 hover:text-orange-600"
                  onClick={() => handleDownload(item.id)}
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
  
  export default PatientTable;
  
  
  
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import useToggleDrawer from "hooks/useToggleDrawer";
import React, { useState, useEffect } from 'react'
import HistoryServices from "services/HistoryServices";
//internal import  

const HistoryTable = ({ setId, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading, history }) => {
  const [data, setData] = useState([]);
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();


 
    // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
    const fetchHistory = async (isLoading) => {
      try {
        
        const response = await HistoryServices.getAllHistory();
      
        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération  :", error);
      }
      finally {
        setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
      }
    };
    
    useEffect(() => {
    fetchHistory(isLoading); // Appelez la fonction fetchHistory pour récupérer les projets au chargement du composant
  }, [isLoading]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

 





  return (
    <>
  

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <div className="flex items-center">
            
                
                  <h2 className="text-sm font-medium">
                    {item.id}
                  </h2>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item.admin_id}
              </span>

            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item.action} 
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item.description} 
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default HistoryTable;

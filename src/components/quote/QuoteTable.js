import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import DeleteButton from "components/table/DeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import React, { useState, useEffect } from 'react'
import DepartmentServices from "services/DepartementServices";
import DepartmentDrawer from "components/drawer/DepartmentDrawer";
import DepartmentContactServices from "services/DepartementContactServices";
import QuoteServices from "services/QuoteServices";
//internal import  

const QuoteTable = ({ setId, searchQuote, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading }) => {
  const [data, setData] = useState([]);
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();



  // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
  const fetchQuotes = async (isLoading, searchQuote) => {
    try {
      let response;
      if (searchQuote) {
        response = await QuoteServices.searchQuote(searchQuote);
      }
      else {
        response = await QuoteServices.getAllQuote();
      }
      // Mettez à jour la variable data avec les données récupérées
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des quotes :", error);
    }
    finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };

  useEffect(() => {
    fetchQuotes(isLoading, searchQuote); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
  }, [isLoading, searchQuote]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

  const getQuote = async () => {
    try {
      const qu = await QuoteServices.getQuoteById(isCheck)
      setIsCheck([...isCheck, qu.id]);
      console.log('contact selectionnée : ', qu.id);

    } catch (error) {
      console.error("Erreur lors de la récupération de quote :", error);

    }
  }


  useEffect(() => {
    getQuote();
  }, [])

  const beforeHandleModalOpen = (id, firt_name, Quote) => {
    handleModalOpen(id, firt_name, Quote);
    // setIsCheck([id]);
  }
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
      {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}  */}
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data?.first_name}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <DepartmentDrawer id={serviceId} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>

            <TableCell>
              <CheckBox
                id={item.id}
                name={item?.first_name}
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
                    {item?.first_name}
                  </h2>
                </div>
              </div>

            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.last_name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.email}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.phone}
              </span>
            </TableCell>
            <TableCell>
            {item?.services ? (
                <ul className="list-disc pl-6">
                  {item?.services.map((services, index) => (
                    <li key={index} className="text-sm font-semibold">
                      {services?.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm font-semibold">Aucun service</span>
              )}
            </TableCell>
       
            <TableCell>
              <Link
                to={`/quote/${item.id}`}
                className="flex justify-center text-gray-400 hover:text-orange-600"
              // handleUpdate={handleUpdate}

              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"Details"}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <DeleteButton
                id={item.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                Quote={item}
                isCheck={isCheck}
                handleClick={handleClick}
                handleModalOpen={beforeHandleModalOpen}
                title={showingTranslateValue(item?.first_name, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default QuoteTable;

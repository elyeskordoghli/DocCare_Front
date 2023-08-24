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

const QuoteTable = ({ id, setId, data, searchQuote, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading }) => {
  const {
    handleModalOpen,
    handleUpdate,
    serviceId,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();
  const [status, setStatus] = useState("");

  console.log("id from quoteTable : ", serviceId);

  const handleStatusChange = async (id, newStatus) => {
    // Mettez à jour l'état local
    setStatus(newStatus);
    // console.log("newStatus",newStatus)
    // const qu = await QuoteServices.getQuoteById(id)
    // setId([...id, qu.id]);
    const formData = { status: newStatus, };
    // console.log("fffffffff",formData)
    setIsLoading(false);
    console.log("serser : ", id);
    // Appelez le service pour mettre à jour le statut dans la base de données
    QuoteServices.updateQuote(id,
      formData
    )

      .then((response) => {
        // Traitez la réponse si nécessaire
        setIsLoading(true);

        console.log('Quote updated:', response.data);
      })
      .catch((error) => {
        // Traitez les erreurs si nécessaire
        console.error('Error updating quote:', error);
      });
  };


  // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API

  const getQuote = async () => {
    try {
      const qu = await QuoteServices.getQuoteById(serviceId)
      setIsCheck([...isCheck, qu.id]);
      setId([...id, qu.id]);
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
        id={id}
        title={data?.first_name}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <DepartmentDrawer id={id} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck} />
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
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                className={`px-2 py-1 rounded-full border-none ${item?.status === "in progress"
                    ? "bg-blue-300 text-white font-bold"
                    : item?.status === "canceled"
                      ? "bg-red-300 text-white font-bold"
                      : item?.status === "completed"
                        ? "bg-green-300 text-white font-bold"
                        : ""
                  }`}
              >
                <option className="text-black bg-white border-none" value="in progress">in progress</option>
                <option className="text-black bg-white border-none" value="completed">completed</option>
                <option className="text-black bg-white border-none" value="canceled">canceled</option>
              </select>
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

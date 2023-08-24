import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
// import ProductServices from "services/ProductServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import HistoryTable from "components/history/HistoryTable";
import HistoryServices from "services/HistoryServices";

const History = () => {
  const { id,title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading]=useState(true);

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
  // console.log("product page", data);
  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.Services.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProductFilter(data?.Services);

  return (
    <>
      <PageTitle>{"History Page"}</PageTitle>
      
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          > 
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="History"
                filename={filename}
                isDisabled={isDisabled}
                totalDoc={data?.totalDoc}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>
          </form>
        </CardBody>
      </Card>

  

      {serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
            
                <TableCell>{"Id"}</TableCell>
                <TableCell>{"Admin Id"}</TableCell>
                <TableCell>{"Action"}</TableCell>
                <TableCell>{"Description"}</TableCell>
              </tr>
            </TableHeader>
            <HistoryTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              history={data?.history}
              setIsCheck={setIsCheck}
              data={data}
            /> 
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="History Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="History" />
      )}
    </>
  );
};

export default History;

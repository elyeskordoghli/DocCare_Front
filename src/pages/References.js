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
import ServiceTable from "components/service/ServiceTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ServiceDrawer from "components/drawer/ServiceDrawer";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import ServiceServices from "services/ServiceServices";
import MainModal from "components/modal/MainModal";
import ReferenceTable from "components/reference/ReferenceTable";
import ReferencesServices from "services/ReferencesServices";
import ReferenceDrawer from "components/drawer/ReferenceDrawer";
import Loader from 'components/loader/Loader';

const References = () => {
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
  const [searchReference, setSearchValue] = useState("");
  const [isLoading, setIsLoading]=useState(true);

   // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
   const fetchReferences = async (isLoading,searchReference) => {
    try {
      let response;
      if (searchReference) {
        response = await ReferencesServices.searchReference(searchReference);
      

    }
    else{
      response = await ReferencesServices.getAllReferences();
    }
      // Mettez à jour la variable data avec les données récupérées
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reference :", error);
    }
    finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };
  
  useEffect(() => {
    fetchReferences(isLoading,searchReference); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
}, [isLoading,searchReference]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant
  

  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };

  // const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  // const currency = globalSetting?.default_currency || "$";
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
               {isLoading ? <Loader /> : null}

      <PageTitle>{"References Page"}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />

      {/* <BulkActionDrawer ids={allId} data={data} title="Services" /> */}
      <MainDrawer>
        <ReferenceDrawer id={serviceId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck}/>
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          > 
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="References"
                filename={filename}
                isDisabled={isDisabled}
                totalDoc={data?.totalDoc}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              {/* <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 btn-gray text-gray-600 sm:mb-3"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {"BulkAction"}
                </Button>
              </div> */}

              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck?.length < 1}
                  onClick={() => handleDeleteMany(isCheck, data.products)}
                  className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {"Delete"}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {"Add Reference"}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search Reference"
                onChange={handleSearchInputChange} 
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
   </form>
        </CardBody>
      </Card>

       {serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{"Reference Name"}</TableCell>
                <TableCell>{"Reference Working field"}</TableCell>
                <TableCell className="text-right">{"Actions"}</TableCell>
              </tr>
            </TableHeader>
            <ReferenceTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              data={data}
              setIsCheck={setIsCheck}
              searchReference={searchReference}
            /> 
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Reference Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Reference" />
      )}
    </>
  );
};

export default References;

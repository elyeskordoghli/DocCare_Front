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
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import MainModal from "components/modal/MainModal";
import CareerServices from "services/CareerServices";
import CareerDrawer from "components/drawer/CareerDrawer";
import CareerTable from "components/career/CareerTable";
import Loader from 'components/loader/Loader';

const Careers = () => {
  const { id,title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

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
  const [searchCareer, setSearchValue] = useState("");
  const [isLoading, setIsLoading]=useState(true);

  const fetchCareers = async (isLoading, searchCareer) => {
    try {
      let response;
      if (searchCareer) {
        response = await CareerServices.searchCareer(searchCareer);


      }
      else {
        response = await CareerServices.getAllCareers();
      }
      // Mettez à jour la variable data avec les données récupérées
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des careers :", error);
    }
    finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };

  useEffect(() => {
    fetchCareers(isLoading, searchCareer);
  }, [isLoading, searchCareer]);
  

  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };

  // console.log("product page", data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li.id));
    console.log('ischecktw', isCheck);
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
  } = useProductFilter(data);

  return (
    <>
       {isLoading ? <Loader /> : null}
      <PageTitle>{"Careers Page"}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />

      {/* <BulkActionDrawer ids={allId} data={data} title="Services" /> */}
      <MainDrawer>
        <CareerDrawer id={serviceId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck}/>
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          > 
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Careers"
                filename={filename}
                isDisabled={isDisabled}
                totalDoc={data?.totalDoc}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
        
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
                  {"Add Career"}
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
                placeholder="Search Career"
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
                <TableCell>{"Career Title"}</TableCell>
                <TableCell>{"Career Short Description"}</TableCell>
                <TableCell>{"Applies"}</TableCell>
                <TableCell className="text-center">{"Details"}</TableCell>
                <TableCell className="text-right">{"Actions"}</TableCell>
              </tr>
            </TableHeader>
            <CareerTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              Careers={data?.Careers}
              setIsCheck={setIsCheck}
              searchCareer={searchCareer}
              data={data}
            /> 
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Career Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Career" />
      )}
    </>
  );
};

export default Careers;

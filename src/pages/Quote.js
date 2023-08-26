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
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import MainModal from "components/modal/MainModal";
import DepartmentServices from "services/DepartementServices";
import DepartmentDrawer from "components/drawer/DepartmentDrawer";
import DepartmentTable from "components/department/DepartmentTable";
import Loader from 'components/loader/Loader';
import QuoteServices from "services/QuoteServices";
import QuoteTable from "components/quote/QuoteTable";
import CardItemTwo from "components/dashboard/CardItemTwo";
import {
  FiLayout,
  FiTruck,
  FiBookOpen,
  FiCheck,
  FiRefreshCw,
  FiAperture,
  FiServer,
  FiTrello,
  FiGrid,
} from 'react-icons/fi';
import {

  Badge,

} from "@windmill/react-ui";
const Quote = () => {
  const { id,title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [searchQuote, setSearchValue] = useState("");

  const[status,setStatus] =useState('All');

  const [stat, setStat] = useState(['in progress', 'canceled', 'completed']);

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

  const handleStatusInputChange = (e) => {
    const newStatusValue = e.target.value;
    setStatus(newStatusValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };

  const fetchQuotes = async (isLoading, searchQuote) => {
    try {
      let response;
      if(status === "All" && !searchQuote) {
        response = await QuoteServices.getAllQuote();
      }

      else if (searchQuote || status) {
        response = await QuoteServices.searchQuote(searchQuote,status);
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
  }, [isLoading, searchQuote,status]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant

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
  const countQuotesByStatus = (status) => {
    return data.filter((Quote) => Quote.status === status).length;
  };
  return (
    <>
    {isLoading ? <Loader /> : null}
      <PageTitle>{t("QuotePage")}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />

      {/* <BulkActionDrawer ids={allId} data={data} title="Services" /> */}
      <MainDrawer>
        <DepartmentDrawer id={serviceId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck}/>
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 "
          >
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Quotes"
                filename={filename}
                isDisabled={isDisabled}
                totalDoc={data?.totalDoc}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>

            {/* <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0"> */}
            <div className="grid gap-4 mb-8 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 xl:w-100%">
                {stat?.map((et) => (
                    <CardItemTwo
                      // mode={mode}
                      // currency={currency}
                      title2={et}
                      // icon={FiBookOpen}
                      price={countQuotesByStatus(et)}
                      className="text-white dark:text-orange-100 bg-dark"
                    />
                ))}
            {/* </div> */}
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
                placeholder={t("SearchQuote")}
                onChange={handleSearchInputChange} 
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={handleStatusInputChange} 
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("Status")}
                </option>
                <option value="All">{t("All")}</option>
                <option value="in progress">{t("inprogress")}</option>
                <option value="completed">{t("completed")}</option>
                <option value="canceled">{t("canceled")}</option>
              </Select>
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
                <TableCell>{t("NameTbl")}</TableCell>
                <TableCell>{t("EmailTbl")}</TableCell>
                <TableCell>{t("PhoneTbl")}</TableCell>
                <TableCell>{t("StatusTbl")}</TableCell>
                <TableCell>{t("ServiceTbl")}</TableCell>
                <TableCell className="text-center">{t("Details")}</TableCell>
                <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
              </tr>
            </TableHeader>
            <QuoteTable
              id={serviceId}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              quote={data?.quote}
              setIsCheck={setIsCheck}
              // currency={currency}
              data={data}
              searchQuote={searchQuote}
            /> 
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Quote Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Quote" />
      )}
    </>
  );
};

export default Quote;

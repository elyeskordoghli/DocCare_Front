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

import QuoteServices from "services/QuoteServices";
import QuoteTable from "components/quote/QuoteTable";

const Quote = () => {
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

  const { data, loading } = useAsync(() =>
    QuoteServices.getAllQuote({
      first_name: searchText,
    })
  );
  
  const [searchQuote, setSearchValue] = useState("");

  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
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
  const [isLoading, setIsLoading]=useState();

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
      <PageTitle>{"Quote Page"}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />

      {/* <BulkActionDrawer ids={allId} data={data} title="Services" /> */}
      <MainDrawer>
        <DepartmentDrawer id={serviceId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck}/>
      </MainDrawer>
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
                placeholder="Search Quote"
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

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? (
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
                <TableCell>{"First Name"}</TableCell>
                <TableCell>{"Last Name"}</TableCell>
                <TableCell>{"Email"}</TableCell>
                <TableCell>{"Phone"}</TableCell>
                <TableCell>{"Service"}</TableCell>
                <TableCell className="text-center">{"Details"}</TableCell>
                <TableCell className="text-right">{"Actions"}</TableCell>
              </tr>
            </TableHeader>
            <QuoteTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              quote={data?.quote}
              setIsCheck={setIsCheck}
              currency={currency}
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

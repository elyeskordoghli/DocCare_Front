import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import CheckBox from "components/form/CheckBox";
import { FiEdit, FiTrash2 } from "react-icons/fi";

//internal import
import useProductFilter from "hooks/useProductFilter";
import DeleteModal from "components/modal/DeleteModal";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import UploadManyTwo from "components/common/UploadManyTwo";
import MainDrawer from "components/drawer/MainDrawer";
import StaffDrawer from "components/drawer/StaffDrawer";
import TableLoading from "components/preloader/TableLoading";
import StaffTable from "components/staff/StaffTable";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { AdminContext } from "context/AdminContext";
import { SidebarContext } from "context/SidebarContext";
import AdminServices from "services/AdminServices";
import PrevilegeServices from "services/PrevilegeServices";
import React, { useState, useEffect } from "react";
import MainModal from "components/modal/MainModal";
import useToggleDrawer from "hooks/useToggleDrawer";

const Staff = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { id, title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const { data, loading } = useAsync(() => AdminServices.getAllStaff({
    email: adminInfo.email,
    name: searchText,
  }));
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [isLoading, setIsLoading] = useState();
  const [isCheck, setIsCheck] = useState([]);
  const {
    searchText,
    searchRef,
  } = useContext(SidebarContext);
  const {
    userRef,
    setRole,
    setPrevilege,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data?.data);
  const {

    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProductFilter(data?.Services);
  const [searchAdmin, setSearchValue] = useState("");
  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("StaffPageTitle")} </PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainDrawer>
        <StaffDrawer
          id={serviceId}
          setIsCheck={setIsCheck}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCheck={isCheck} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitUser}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Admins"
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
                  {"Add Admin"}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
         
           <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
             
            </div>
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
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                {t("AddStaff")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card> */}
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-16 md:h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Search Admin")}
                onChange={handleSearchInputChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-8 md:mt-5 mr-1" // Augmenter la marge verticale ici
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>
      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={7} width={163} height={20} />
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
                  //isChecked={isCheckAll}
                  // handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Email")}</TableCell>
                <TableCell>{t("Last login at")}</TableCell>
                <TableCell>{t("Last login ip")}</TableCell>
                <TableCell>{t("Status")}</TableCell>
                {/* <TableCell className="text-center">{t("OderStatusTbl")}</TableCell>
                <TableCell className="text-center">{t("PublishedTbl")}</TableCell>*/}

                <TableCell>{t("Previleges")}</TableCell>
                <TableCell>{t("Department")}</TableCell>
                <TableCell className="text-right">{t("StaffActionsTbl")}</TableCell>
              </tr>
            </TableHeader>

            <StaffTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              Staff={data?.Staff}
              searchAdmin={searchAdmin}
              //  data={dataTable} 
              lang={lang} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no staff right now." />
      )}
    </>
  );
};

export default Staff;

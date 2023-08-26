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
import Cookies from "js-cookie";

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
import Loader from 'components/loader/Loader';

const Staff = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { id, title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  const [searchAdmin, setSearchValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [full, setFull] = useState();
  const [full_access, setFullAccess] = useState(false);


  const fetchAdminAccess = async () => {
    try {
      const adminInfoString = Cookies.get("adminInfo");
      if (adminInfoString) {
        const adminInfo = JSON.parse(adminInfoString);

        if (adminInfo && adminInfo.id) {
          const response = await AdminServices.getStaffById(adminInfo.id);

          const adminAccess = response.data.full_access;
          setFullAccess(adminAccess); // Utiliser le même nom d'état ici
          console.log("user full_access", adminAccess);
        } else {
          console.log('ID de l\'admin non trouvé dans les informations');
        }
      } else {
        console.log('Cookie adminInfo non trouvé');
      }
    } catch (error) {
      console.log('Erreur lors de la récupération d\'access', error);
    }
  };
  useEffect(() => {
    fetchAdminAccess();
  }, []);

  const fetchAdmins = async () => {
    try {
      let response;
      if (searchAdmin) {
        response = await AdminServices.searchAdmin(searchAdmin);
      } else {
        // setIsLoading(true);
        response = await AdminServices.getAllStaff();
        // setIsLoading(false);

      }

      // Mettez à jour la variable data avec les données récupérées
      setData(response.data);
      setFull(response.countPrevilege);
    } catch (error) {
      console.error("Erreur lors de la récupération des services :", error);
    } finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };
  useEffect(() => {
    fetchAdmins(); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
  }, [searchAdmin, isLoading]);



  const [isCheckAll, setIsCheckAll] = useState(false);

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
  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <PageTitle>{t("StaffPageTitle")} </PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainDrawer>
        <StaffDrawer
          id={serviceId}
          setIsCheck={setIsCheck}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCheck={isCheck}
          full_access={full_access} />
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

                  {t("Delete")}
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
                  {t("AddAdmin")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
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
                placeholder={t("SearchAdmin")}
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
                  //isChecked={isCheckAll}
                  // handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t("NameTbl")}</TableCell>
                <TableCell>{t("EmailTbl")}</TableCell>
                <TableCell>{t("LastLoginAt")}</TableCell>
                <TableCell>{t("LastLoginIp")}</TableCell>
                <TableCell>{t("StatusTbl")}</TableCell>
                {/* <TableCell className="text-center">{t("OderStatusTbl")}</TableCell>
                <TableCell className="text-center">{t("PublishedTbl")}</TableCell>*/}

                <TableCell>{t("Previleges")}</TableCell>
                <TableCell>{t("DepartmentTbl")}</TableCell>
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
              data={data}
              full={full}
              lang={lang}
              full_access={full_access} />
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

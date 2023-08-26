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
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import MainModal from "components/modal/MainModal";
import SlidersServices from "services/SlidersServices";
import SliderDrawer from "components/drawer/SliderDrawer";
import SliderTable from "components/sliders/SliderTable";
import Loader from 'components/loader/Loader';

const Sliders = () => {
  const { id, title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
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
  const [isLoading, setIsLoading] = useState(true);

  // Utilisez la fonction getAllServices pour récupérer les données des projets depuis l'API
  const fetchSliders = async (isLoading) => {
    try {
     
     const response = await SlidersServices.getAllSliders();
   
      // Mettez à jour la variable data avec les données récupérées
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
    finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
  };
  
  useEffect(() => {
  fetchSliders(isLoading); // Appelez la fonction fetchSliders pour récupérer les projets au chargement du composant
}, [isLoading]); // Utilisez une dépendance vide pour que cela ne s'exécute qu'une fois au chargement du composant


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

      <PageTitle>{t("SlidersPage")}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} title={data.title} setIsLoading={setIsLoading} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />

      {/* <BulkActionDrawer ids={allId} data={data} title="Services" /> */}
      <MainDrawer>
        <SliderDrawer id={serviceId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
           <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Sliders"
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
                  {t("AddSlider")}
                </Button>
              </div>
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
                <TableCell>{t("SliderTitleTbl")}</TableCell>
                <TableCell>{t("SliderSubtitleTbl")}</TableCell>
                <TableCell>{t("SliderVideoTbl")}</TableCell>
                <TableCell className="text-center">{t("Details")}</TableCell>
                <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
              </tr>
            </TableHeader>
            <SliderTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              lang={lang}
              isCheck={isCheck}
              Sliders={data?.Sliders}
              setIsCheck={setIsCheck}
              // currency={currency}
              data={data}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Slider Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Slider" />
      )}
    </>
  );
};

export default Sliders;

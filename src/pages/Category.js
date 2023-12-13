import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import MainModal from "components/modal/MainModal";

//internal import

import useAsync from "hooks/useAsync";
import { SidebarContext } from "context/SidebarContext";
import CategoryServices from "services/CategoryServices";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import DeleteModal from "components/modal/DeleteModal";
import PageTitle from "components/Typography/PageTitle";
import MainDrawer from "components/drawer/MainDrawer";
import CategoryDrawer from "components/drawer/CategoryDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import SwitchToggleChildCat from "components/form/SwitchToggleChildCat";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import CategoryTable from "components/category/CategoryTable";
import NotFound from "components/table/NotFound";
import Loader from 'components/loader/Loader';
import Calender from 'components/Calender/Calender';
import Cookies from 'js-cookie';

const Category = () => {
  const { toggleDrawer, lang,categoryRef } = useContext(SidebarContext);
  const [data, setData] = useState([]); 

  const [dataa, setDataa] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearchValue] = useState("");


  const [connectedDoctorId, setConnectedDoctorId] = useState(""); // State pour conserver l'ID du docteur connecté

  const getConnectedDoctorIdFromCookie = () => {
    const adminInfoCookie = Cookies.get('adminInfo');
    if (adminInfoCookie) {
      const adminInfo = JSON.parse(adminInfoCookie);
      if (adminInfo && adminInfo.id) {
        setConnectedDoctorId(adminInfo.id);

      }
    }
    return null; // Retourner null si aucune information n'est trouvée dans le cookie
  };

  

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(""); 


  console.log("id admin : ", connectedDoctorId);

  const handleTimeChange = (event) => {
    setTime(event.target.value); // Mettre à jour le state time avec la valeur saisie
  };
  
  const fetch = async (isLoading) => {
    try {
      let response;
      // Si la catégorie sélectionnée est "All", récupérer tous les projets
        response = await CategoryServices.getAllDispo();
      setDataa(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des categories :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(isLoading);
  }, [isLoading])
  
  const donnee = {
    DocteurId: connectedDoctorId,
    Time: time,
    Date: date
  };

  const addDispo = async () => {
    try {
      // Si la catégorie sélectionnée est "All", récupérer tous les projets
      setIsLoading(true);

        const res = await CategoryServices.createDispo(donnee, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);

    } catch (error) {
      console.error("Erreur lors de la récupération des categories :", error);
    } 
  };


  

  useEffect(() => {
    getConnectedDoctorIdFromCookie();
  }, [])

  const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();

  const { t } = useTranslation();

  const {
    handleSubmitCategory,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data[0]?.children ? data[0]?.children : data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data[0]?.children.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };


  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
  };


  return (
    <>
           {isLoading ? <Loader /> : null}

     <PageTitle>{"All Disponibities"}</PageTitle>
     <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} setIsLoading={setIsLoading} />
      {/* <DeleteModal ids={allId} setIsCheck={setIsCheck} /> */}
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />


      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang}  setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
          <form onSubmit={handleSubmitCategory} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            {/* </div> */}
            <div className="flex justify-start w-1/2 xl:w-1/2 md:w-full">
              <UploadManyTwo
                title="Categories"
                exportData={data}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-32 lg:w-32 xl:w-32  mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 bg-red-500 disabled  btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>

                  {"Add Disponibility"}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              {/* <Input
                ref={categoryRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={t("SearchCategory")}
                onChange={handleSearchInputChange} // Ajoutez cet attribut onChange
              /> */}
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="flex items-start justify-between">

          <div className="flex flex-col items-start justify-between">
            {/* Calender */}
            <Calender date={date} setDate={setDate} />

            {/* Input en-dessous du Calender */}
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow mt-6 w-full md:w-auto lg:w-full xl:w-full">
                <Input
                  ref={categoryRef}
                  type="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder={"Time"}
                  onChange={handleTimeChange} // Appeler la fonction handleTimeChange lors de l'événement onChange
                  />
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow mt-6 w-full md:w-auto lg:w-full xl:w-full">
                <Button onClick={addDispo} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>

                  {"Add disponibility"}
                </Button>
              </div>

          </div>

              
            
              {dataa?.length !== 0 ? ( 
              <TableContainer className="mb-8 ml-32">

          <Table>
          
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>

                <TableCell>{"ID"}</TableCell>
                {/* <TableCell>{t("catIconTbl")}</TableCell> */}
                <TableCell>{"Date"}</TableCell>
                <TableCell>{"Time"}</TableCell>
                {/* <TableCell>{t("Projects")}</TableCell> */}
                <TableCell className="text-right">{t("catActionsTbl")}</TableCell>
              </tr>
            </TableHeader>
            <CategoryTable
            dataa={dataa}
            isLoading={isLoading}
            />
            
            
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
        <NotFound title="Sorry, There are no categories right now." />
      )} 
      </div>
      

    </>
    
  );
};

export default Category;

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
import MainModal from "components/modal/MainModal";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
// import ProductServices from "services/ProductServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ProjectTable from "components/project/ProjectTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ProjectDrawer from "components/drawer/ProjectDrawer";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import ProjectServices from "services/ProjectServices";
import CategoryServices from "services/CategoryServices";
import Loader from 'components/loader/Loader';

const Projects = () => {
  const { title, subtitle, short_description, description, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    // searchText,
    category,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

const [data, setData] = useState([]);
const [isLoading, setIsLoading]=useState(true);
const [selectedCategory, setSelectedCategory] = useState('All');
const [search, setSearchValue] = useState("");
const [categories, setCategory] = useState();

//---------------------------------------------------------
  const fetchProjects = async (selectedCategory, setIsLoading, search) => {
    try {
      let response;

      if (selectedCategory === "All" && !search) {
      
        setIsLoading(true);

        // Si la catégorie sélectionnée est "All", récupérer tous les projets
        response = await ProjectServices.getAllProjects();
        setIsLoading(false);

      }
      else if (search && selectedCategory ) {
        console.log("hihihi : ",selectedCategory);
        setIsLoading(true);

        response = await ProjectServices.search(search, selectedCategory);
        setIsLoading(false);


      } else if (selectedCategory !== "All") {
        setIsLoading(true);

        response = await ProjectServices.getProjectByCategoryId(selectedCategory);
        setIsLoading(false);

      }


      setData(response.data);
      console.log("data new data : ",response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }
  };
  

  useEffect(() => {
      fetchProjects(selectedCategory, setIsLoading, search);
    }, [selectedCategory, search]);
//---------------------------------------------------------



//---------------------------------------------------------



  const getCategoriesData = async () => {
    try {
      const res = await CategoryServices.getAllCategories();
      // Mettez à jour le state avec les départements récupérés depuis l'API
      setCategory(res.data);
    } catch (err) {
     console.log(err ? err?.response?.data?.message : err?.message);

    }
  }

  useEffect(() => {
    getCategoriesData();    
  }, []);

  console.log("categories project",categories)

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
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


  const handleSearchInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue); // Mettez à jour l'état avec la nouvelle valeur de recherche
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
    {
        isLoading?
          <Loader />
        :
          ''
      }
      <PageTitle>{"Projects Page"}</PageTitle>
      <DeleteModal id={serviceId} ids={allId} setIsCheck={setIsCheck} isLoading={isLoading} setIsLoading={setIsLoading} title={data.title} />
      <MainModal id={isCheck} title={data.title} setIsLoading={setIsLoading} />
      <BulkActionDrawer ids={allId} title="Projects" />
      <MainDrawer>
        <ProjectDrawer id={serviceId}  
              isLoading={isLoading} // Passer la variable isLoading
              setIsLoading={setIsLoading} 
                isCheck ={isCheck}
                categories={categories}
                setIsCheck={setIsCheck}/>
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >

            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Projects"
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
                  {t("BulkAction")}
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
                  {"Add Project"}
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
                placeholder="Search Project"
                onChange={handleSearchInputChange} // Ajoutez cet attribut onChange

              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              >aaaa</button>
            </div>

{/* categorie */}
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory 
              setCategory={setCategory} 
              categories={categories} 
              setSelectedCategory={setSelectedCategory} 
              selectedCategory={selectedCategory}
              lang={lang} 
              isLoading={isLoading} // Passer la variable isLoading
              setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
              />
            </div>
{/*end categorie */}
 
{/* 
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setSortedField(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("Price")}
                </option>
                <option value="low">{t("LowtoHigh")}</option>
                <option value="high">{t("HightoLow")}</option>
                <option value="published">{t("Published")}</option>
                <option value="unPublished">{t("Unpublished")}</option>
                <option value="status-selling">{t("StatusSelling")}</option>
                <option value="status-out-of-stock">{t("StatusStock")}</option>
                <option value="date-added-asc">{t("DateAddedAsc")}</option>
                <option value="date-added-desc">{t("DateAddedDesc")}</option>
                <option value="date-updated-asc">{t("DateUpdatedAsc")}</option>
                <option value="date-updated-desc">
                  {t("DateUpdatedDesc")}
                </option>
              </Select>
            </div> */}
          </form>
        </CardBody>
      </Card>

      
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
                <TableCell>{"Project Title"}</TableCell>
                <TableCell>{"Project SubTitle"}</TableCell>
                <TableCell>{"Category"}</TableCell>
                {/* <TableCell>{t("short description")}</TableCell> */}
                {/* <TableCell>{t("description")}</TableCell> */}
                {/* <TableCell>{t("StatusTbl")}</TableCell> */}
                <TableCell className="text-center">{"Details"}</TableCell>
                {/* <TableCell className="text-center">
                  {t("PublishedTbl")}
                </TableCell> */}
                <TableCell className="text-right">{"Actions"}</TableCell>
              </tr>
            </TableHeader>
            <ProjectTable
              lang={lang}
              isCheck={isCheck}
              data={data}
              setIsCheck={setIsCheck}
              currency={currency}
              selectedCategory={selectedCategory}
              setIsLoading={setIsLoading}
              isLoading={isLoading} 
              search={search}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Project Page Navigation"
            />
          </TableFooter>
        </TableContainer>
     
    </>
  );
};

export default Projects;

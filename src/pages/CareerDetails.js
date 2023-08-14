import {
  Badge,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
//internal import
import AttributeList from "components/attribute/AttributeList";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import useProductSubmit from "hooks/useProductSubmit";
import useToggleDrawer from "hooks/useToggleDrawer";
import ServiceServices from "services/ServiceServices";
import { showingTranslateValue } from "utils/translate";
import SettingServices from "services/SettingServices";
import ServiceDrawer from "components/drawer/ServiceDrawer";
import CareerServices from "services/CareerServices";
import CareerDrawer from "components/drawer/CareerDrawer";
import ApplyTable from "components/apply/ApplyTable"
const CareerDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  // const { attribue } = useProductSubmit(id);
  // const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);
  const response = useAsync(() => CareerServices.getCareerById(id));
  const { loading } = response;
  const { data } = response.data;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [showApplies, setShowApplies] = useState(false);

  function formatRequirements(text) {
    if (!text) {
      return "";
    }

    const sentences = text.split("."); // Divise le texte en phrases

    const formattedSentences = sentences
      .filter((sentence) => sentence.trim() !== "") // Filtrer les phrases vides
      // .map((sentence) => `- ${sentence.trim()}`) // Ajouter un tiret et supprimer les espaces inutiles
      .join("<br />"); // Joindre les phrases avec un retour à la ligne

    return formattedSentences;
  }
  // function ApplyTable({ applies }) {
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>First Name</th>
  //           <th>Last Name</th>
  //           <th>Email</th>
  //           <th>Phone Number</th>
  //           <th>Resume</th>

  //           {/* ... d'autres en-têtes ... */}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.careers.map((item) => (
  //           <tr key={item?.id}>
  //             <td>{item?.first_name}</td>
  //             <td>{item?.last_name}</td>
  //             <td>{item?.email}</td>
  //             <td>{item?.phone_number}</td>
  //             <td>{item?.resume_path}</td>

  //             {/* ... d'autres colonnes ... */}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // }

  console.log("data.title", data);
  return (
    <>
      <MainDrawer product>
        <CareerDrawer id={id} setIsCheck={setIsCheck} setIsLoading={setIsLoading} isLoading={isLoading} isCheck={isCheck} />
      </MainDrawer>

      <PageTitle>{"Career Details"}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-col md:flex-col w-full overflow-hidden">

            <div className="flex-shrink-0 flex items-center justify-center h-auto">
              <img src={data?.image} alt="Career" className="h-64 w-64" />
              <div className="mb-5 ml-10 block ">

                <p className="uppercase font-bold text-lg mb-6 text-gray-500 dark:text-gray-400 ">
                  {"Career title"} :{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data?.title}
                  </span>
                </p>

              </div>
            </div>

            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="font-serif product-price  dark:text-gray-400">
                <p className="   text-gray-500 dark:text-gray-400 text-sm">
                  <div className="uppercase p-4 font-bold" >{"Career Short description"} :{" "} </div>

                  <div
                    className=" text-gray-500 dark:text-gray-400 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: data?.short_description ?? "",
                    }}
                  />

                </p>
                <p className="   text-gray-500 dark:text-gray-400 text-sm">
                  <div className="uppercase p-4 font-bold" >{"Career  description"} :{" "} </div>
                  <div
                    className=" text-gray-500 dark:text-gray-400 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: data?.description ?? "",
                    }}
                  />

                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <div className="uppercase p-4 font-bold">{"Career  Requirements"} :</div>
                  <div
                    className="text-gray-500 dark:text-gray-400 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: formatRequirements(data?.Requirements) ?? "",
                    }}
                  />
                </p>
                <p className="   text-gray-500 dark:text-gray-400 text-sm">
                  <div className="uppercase p-4 font-bold" >{"Career  Responsibilities"} :{" "} </div>

                  <div
                    className=" text-gray-500 dark:text-gray-400 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: formatRequirements(data?.Responsibilities) ?? "",
                    }}
                  />

                </p>
              </div>
              <div className=" mt-6 space-x-20 flex justify-center items-center mb-6">
                <button
                  onClick={() => handleUpdate(data.id)}
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-orange-500 border border-transparent active:bg-orange-600 hover:bg-orange-600 focus:ring focus:ring-purple-300"
                >
                  {"Edit Career"}
                </button>
                <div>
                  <button
                    onClick={() => setShowApplies(!showApplies)}
                    className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-blue-500 border border-transparent active:bg-blue-600 hover:bg-blue-600 focus:ring focus:ring-purple-300"
                  >
                    {showApplies ? "Hide Apply" : "View Apply"}
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="">
                  {/* ... contenu de la carrière ... */}
                  {showApplies && <ApplyTable data={data} />}
                </div>
              </div>





            </div>
          </div>
        </div>
      )}
      {/* {data?.isCombination && variantTitle?.length > 0 && !loading && ( 
          <> 
            <PageTitle>{t("ProductVariantList")}</PageTitle> 
            <TableContainer className="mb-8 rounded-b-lg"> 
              <Table> 
                <TableHeader> 
                  <tr> 
                    <TableCell>{t("SR")}</TableCell> 
                    <TableCell>{t("Image")}</TableCell> 
                    <TableCell>{t("Combination")}</TableCell> 
                    <TableCell>{t("Sku")}</TableCell> 
                    <TableCell>{t("Barcode")}</TableCell> 
                    <TableCell>{t("OrginalPrice")}</TableCell> 
                    <TableCell>{t("SalePrice")}</TableCell> 
                    <TableCell>{t("Quantity")}</TableCell> 
                  </tr> 
                </TableHeader> 
                <AttributeList 
                  lang={lang} 
                  variants={dataTable} 
                  currency={currency} 
                  variantTitle={variantTitle} 
                /> 
              </Table> 
              <TableFooter> 
                <Pagination 
                  totalResults={totalResults} 
                  resultsPerPage={resultsPerPage} 
                  onChange={handleChangePage} 
                  label="Product Page Navigation" 
                /> 
              </TableFooter> 
            </TableContainer> 
          </> 
        )} */}
    </>
  );
};

export default CareerDetails;

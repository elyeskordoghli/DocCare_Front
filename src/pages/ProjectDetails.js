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
//   import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
//internal import
import ProjectServices from "services/ProjectServices";
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
import ProductServices from "services/ProductServices";
import { showingTranslateValue } from "utils/translate";
import SettingServices from "services/SettingServices";

const ProjectDetails = () => {
  //pour recuperer les parametre
  const { id } = useParams();
  //  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  // const { attribue } = useProductSubmit(id);
  const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);

  const response = useAsync(() => ProjectServices.getProjectById(id));
  const { loading } = response;
  const { data } = response.data;
console.log(data.id);
  // const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  // const currency = globalSetting?.default_currency || "$";

  // const { handleChangePage, totalResults, resultsPerPage, dataTable } =
  //   useFilter(data?.variants);
  // console.log('data',data)

  // useEffect(() => {
  //   if (!loading) {
  //     const res = Object.keys(Object.assign({}, ...data?.variants));

  //     const varTitle = attribue?.filter((att) =>
  //       // res.includes(att.title.replace(/[^a-zA-Z0-9]/g, ''))
  //       res.includes(att._id)
  //     );

  //     setVariantTitle(varTitle);
  //   }
  // }, [attribue, data?.variants, loading, lang]);

  // console.log("data.variants", globalSetting);

  return (
    <>
      <MainDrawer product>
        <ProductDrawer id={id} />
      </MainDrawer>

      <PageTitle>{"ProjectDetails"}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-col md:flex-col w-full overflow-hidden">
            
            <div className="flex-shrink-0 flex items-center justify-center h-auto">
              <img src={data?.image} alt="Project" className="h-64 w-64" />
              <div className="mb-5 ml-10 block ">
               
                <p className="uppercase font-bold text-lg mb-6 text-gray-500 dark:text-gray-400 ">
                  {"Project title"} :{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data?.title}
                  </span>
                </p>
                <p className="uppercase font-bold text-lg  text-gray-500 dark:text-gray-400 ">
                  {"Project subtitle"} :{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data?.subtitle}
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="font-serif product-price font-bold dark:text-gray-400">
                <p className="uppercase font-bold  text-gray-500 dark:text-gray-400 text-sm">
                  {"Project description"} :{" "}
                  <div className=" p-4">
                    <div
                      className="font-bold text-gray-500 dark:text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: data?.description ?? "",
                      }}
                    />
                  </div>
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(data.id)}
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-orange-500 border border-transparent active:bg-orange-600 hover:bg-orange-600 focus:ring focus:ring-purple-300"
                >
                  {"EditProject"}
                </button>
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

export default ProjectDetails;

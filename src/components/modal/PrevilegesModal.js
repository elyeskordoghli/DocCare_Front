import { Button, Modal,TableBody,TableRow , ModalBody, ModalFooter } from "@windmill/react-ui";

import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    TableContainer,
    Select,
    Input,
    Card,
    CardBody,
    Pagination,
  } from "@windmill/react-ui";
//internal import
import spinnerLoadingImage from "assets/img/spinner.gif";
import { SidebarContext } from "context/SidebarContext";
import AdminServices from "services/AdminServices";
import CategoryServices from "services/CategoryServices";
import CouponServices from "services/CouponServices";
import CustomerServices from "services/CustomerServices";
import LanguageServices from "services/LanguageServices";
import ProjectServices from "services/ProjectServices";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import useToggleDrawer from "hooks/useToggleDrawer";
import AttributeServices from "services/AttributeServices";
import CurrencyServices from "services/CurrencyServices";
import { notifyError, notifySuccess } from "utils/toast";
import ServiceServices from "services/ServiceServices";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { To } from "react-flags-select";
import BlogServices from "services/BlogServices";

const PrevilegesModal = ({ data ,handleModalOpen,staff,name}) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);



  const { t } = useTranslation();

  return (
    <>
    
    
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center  px-8 pt-6 pb-4">
{/* -------------------------------------------------------- */}

        {/* <TableContainer className="mb-8 rounded-b-lg"> */}
          <Table>
            <TableHeader>
              <tr>
              
                
                <TableCell>{t("ID")}</TableCell>
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Description")}</TableCell>
                {/* <TableCell className="text-center">{t("OderStatusTbl")}</TableCell>
                <TableCell className="text-center">{t("PublishedTbl")}</TableCell>*/}

               
              </tr>
            </TableHeader>
            {/* <StaffTable
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              Staff={data?.Staff}
              searchAdmin={searchAdmin}
              //  data={dataTable} 
              lang={lang} /> */}
          </Table>
          


    <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
          

           

            <TableCell>
              <span className="text-sm">{item.id}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.description}</span>
            </TableCell>
           
        
          </TableRow>
        ))}
    </TableBody>
          
        {/* </TableContainer> */}

        </ModalBody>
{/* -------------------------------------------------------- */}
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            {t("modalKeepBtn")}
          </Button>
          {/* <div className="flex justify-end">
            {isSubmitting ? (
              <Button
                disabled={true}
                type="button"
                className="w-full h-12 sm:w-auto"
              >
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="font-serif ml-2 font-light">
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
                {t("modalDeletBtn")}
              </Button>
              // <button
              //   type="submit"
              //   className="text-sm mt-6 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-orange-400 hover:bg-orange-500 h-10"
              // >
              //   Park Order
              // </button>
            )}
          </div> */}
          
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(PrevilegesModal);

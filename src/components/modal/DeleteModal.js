import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
import ReferencesServices from "services/ReferencesServices";
import DepartmentServices from "services/DepartementServices";
import DepartmentContactServices from "services/DepartementContactServices";
import QuoteServices from "services/QuoteServices";
import CareerServices from "services/CareerServices";
import SlidersServices from "services/SlidersServices";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId, isLoading, setServiceId, setIsLoading }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const location = useLocation();

  const close = () => {
    closeModal();
    setServiceId();
    setIsCheck([]);
  };

  console.log("serviceID ", id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDelete = async () => {
    // return notifyError("CRUD operation is disabled for this option!");
    try {
      setIsSubmitting(true);
      if (location.pathname === "/our-staff") {
        setIsLoading(true);
        const res = await AdminServices.deleteStaff(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/quotes") {
        setIsLoading(true);
        const res = await QuoteServices.deleteQuote(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }
      if (location.pathname === "/contacts") {
        setIsLoading(true);
        const res = await DepartmentContactServices.deleteContact(id);
        setIsLoading(false);
        // setIsCheck([]);

        setIsUpdate(true);
        notifySuccess(res.message);

        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }
      if (location.pathname === "/projects") {
        setIsLoading(true);
        const res = await ProjectServices.deleteProject(id);
        setServiceId();
        setIsCheck([]);
        setIsLoading(false);
  
        setIsUpdate(true);
        notifySuccess(res.message);



        closeModal();
        setIsSubmitting(false);
      }
      if (location.pathname === "/references") {
        setIsLoading(true);
        const res = await ReferencesServices.deleteReference(id);
        setIsLoading(false);
        // setIsCheck([]);

        setIsUpdate(true);
        notifySuccess(res.message);

        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }
      if (location.pathname === "/careers") {

        setIsLoading(true);
        const res = await CareerServices.deleteCareer(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        // setIsCheck([]);
        setServiceId();
        closeModal();
        setIsSubmitting(false);

      }
      if (location.pathname === "/departments") {
        setIsLoading(true);
        const res = await DepartmentServices.deleteDepartment(id);
        setIsLoading(false);
        // setIsCheck([]);

        setIsUpdate(true);
        notifySuccess(res.message);

        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }
      if (location.pathname === "/services") {

        setIsLoading(true);
        const res = await ServiceServices.deleteService(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        setIsCheck([]);
        setServiceId();
        closeModal();
        setIsSubmitting(false);

      }
      if (location.pathname === "/sliders") {

        setIsLoading(true);
        const res = await SlidersServices.deleteSlider(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        setIsCheck([]);
        setServiceId();
        closeModal();
        setIsSubmitting(false);

      }
      if (location.pathname === "/blogs") {

        setIsLoading(true);
        const res = await BlogServices.deleteBlog(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        // setIsCheck([]);
        setServiceId();
        closeModal();
        setIsSubmitting(false);

      }
      if (location.pathname === "/coupons") {
        if (ids) {
          const res = await CouponServices.deleteManyCoupons({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          // setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CouponServices.deleteCoupon(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/categories") {
        setIsLoading(true);
        const res = await CategoryServices.deleteCategory(id);
        setIsLoading(false);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeModal();
        setServiceId();
        setIsSubmitting(false);
      }

      if (location.pathname === "/customers") {
        const res = await CustomerServices.deleteCustomer(id);
        setIsUpdate(true);
        notifySuccess(res.message);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/attributes") {
        if (ids) {
          const res = await AttributeServices.deleteManyAttribute({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          //  setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await AttributeServices.deleteAttribute(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (
        location.pathname === `/attributes/${location.pathname.split("/")[2]}`
      ) {
        if (ids) {
          const res = await AttributeServices.deleteManyChildAttribute({
            id: location.pathname.split("/")[2],
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          //  setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          console.log("att value delete", id, location.pathname.split("/")[2]);

          const res = await AttributeServices.deleteChildAttribute({
            id: id,
            ids: location.pathname.split("/")[2],
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }




      if (location.pathname === "/languages") {
        if (ids) {
          const res = await LanguageServices.deleteManyLanguage({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          //  setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await LanguageServices.deleteLanguage(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/currencies") {
        if (ids) {
          const res = await CurrencyServices.deleteManyCurrency({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
          //  setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CurrencyServices.deleteCurrency(id);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
   //   setServiceId();
      // setIsCheck([]);
      closeModal();
      setIsSubmitting(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
          <h2 className="text-xl font-medium mb-2">
            {t("DeleteModalH2")} <span className="text-red-500">{title}</span>?
          </h2>
          <p>{t("DeleteModalPtag")}</p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={close}
          >
            {t("modalKeepBtn")}
          </Button>
          <div className="flex justify-end">
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
          </div>

        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(DeleteModal);

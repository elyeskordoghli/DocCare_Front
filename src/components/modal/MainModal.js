import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";

import CustomerServices from "services/CustomerServices";
import AdminServices from "services/AdminServices";
import CouponServices from "services/CouponServices";
import ProjectServices from "services/ProjectServices";
import CategoryServices from "services/CategoryServices";
import { SidebarContext } from "context/SidebarContext";
import { notifySuccess, notifyError } from "utils/toast";
import useToggleDrawer from "hooks/useToggleDrawer";
import ServiceServices from "services/ServiceServices";
import ReferencesServices from "services/ReferencesServices";
import BlogServices from "services/BlogServices";
import DepartmentServices from "services/DepartementServices";
import DepartmentContactServices from "services/DepartementContactServices";
import QuoteServices from "services/QuoteServices";
import CareerServices from "services/CareerServices";
import SlidersServices from "services/SlidersServices";
import CountServices from "services/CountServices";
import DetailsServices from "services/DetailsServices";
import PatientServices from "services/PatientServices";

const MainModal = ({ id, isLoading, setIsLoading, isCheck, setIsCheck }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();

  const handleDelete = () => {

    // alert(location.pathname)

    setIsLoading(true);
    if (location.pathname === "/details") {
     DetailsServices.deleteDetail(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/sliders") {
      SlidersServices.deleteSlider(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/counts") {
      CountServices.deleteCount(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/quotes") {
      QuoteServices.deleteQuote(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    // if (location.pathname === "/our-staff") {
    //   AdminServices.deleteStaff(id)
    //     .then((res) => {
    //       setIsLoading(false);
    //       setIsUpdate(true);
    //       notifySuccess(res.message);
    //     })
    //     .catch((err) => notifyError(err.message));
    //   closeModal();
    //   setServiceId();
    // }
    if (location.pathname === "/projects") {
      ProjectServices.deleteProject(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          setIsCheck([]);
          setServiceId();
          notifySuccess(res.message);
        })

       

        .catch((err) => notifyError(err.message));
      setIsCheck([]);
      setServiceId();
      closeModal();
    }

    if (location.pathname === "/Patients") {
      PatientServices.deletePatient(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          setIsCheck([]);
          setServiceId();
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
        setIsCheck([]);
        setServiceId();
        closeModal();
      }


    if (location.pathname === "/references") {
      ReferencesServices.deleteReference(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/blogs") {
      BlogServices.deleteBlog(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/departments") {
      DepartmentServices.deleteDepartment(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname.includes('contacts')){
      DepartmentContactServices.deleteContact(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })

        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
   
    if (location.pathname === "/services") {
      ServiceServices.deleteService(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/careers") {
      CareerServices.deleteCareer(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/categories") {
      CategoryServices.DeleteDispo(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customers") {
      CustomerServices.deleteCustomer(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/coupons") {
      CouponServices.deleteCoupon(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/our-staff") {
      AdminServices.deleteStaff(id)
        .then((res) => {
          setIsLoading(false);
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

  };





  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-1">
            Are You Sure! Want to Delete{" "}
            <span className="text-red-500"></span> Record?
          </h2>
          <p>
            Do you really want to delete these records? You can't view this in
            your list anymore if you delete!
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            No, Keep It
          </Button>
          <Button onClick={handleDelete} className="w-full sm:w-auto">
            Yes, Delete It
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(MainModal);

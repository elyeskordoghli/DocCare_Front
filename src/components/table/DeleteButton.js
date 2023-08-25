import React from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DeleteButton = ({
  id,
  title,
  handleModalOpen,
  isCheck,
  service,
  blog,
  project,
  staff,
  category,
  reference,
  department,
  DepartmentsContact,
  Quote,
  name,
  first_name,
  type, // Nouvelle prop "type"
  parent,
  children,
}) => {
  const { t } = useTranslation();
//   console.log('id staff',id);
//   console.log('ffdzdf',name);
//   console.log('staff',staff);
// console.log('cat',category);

  const location = useLocation();
  if (location.pathname.includes('contacts')){
    return (
      <>
      
        <div className="flex justify-center text-center">
          <button
            // disabled={isCheck?.length > 0}
            onClick={() => handleModalOpen(id, name, DepartmentsContact)}
            className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
          >
            <Tooltip
              id="delete"
              Icon={FiTrash2}
              title={t("Delete")}
              bgColor="#EF4444"
            />
          </button>
        </div>
      </>
    );
  }
  
  if (location.pathname === "/quotes"){
    return (
      <>
      
        <div className="flex justify-center text-center">
          <button
            // disabled={isCheck?.length > 0}
            onClick={() => handleModalOpen(Quote.id, first_name, Quote)}
            className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
          >
            <Tooltip
              id="delete"
              Icon={FiTrash2}
              title={t("Delete")}
              bgColor="#EF4444"
            />
          </button>
        </div>
      </>
    );
  }
};

export default DeleteButton;

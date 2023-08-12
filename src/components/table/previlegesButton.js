import React from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const previlegesButton = ({
  id,
  title,
  handleModalOpen,
  staff,
}) => {
  const { t } = useTranslation();
//   console.log('id staff',id);
//   console.log('ffdzdf',name);
//   console.log('staff',staff);
// console.log('cat',category);

  const location = useLocation();
  if (location.pathname === "/our-staff"){ 
    return (
    <>
    
      <div className="flex justify-end text-right">
      {/* {isService ? ():();} */}
      
        <button
          // disabled={isCheck?.length > 0}
          onClick={() => handleModalOpen(id, title, staff)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
        >
         <Tooltip
              id="edit"
              Icon={FiEdit}
              title={"Edit"}
              bgColor="#ff5a1f"
            />
        </button>
      </div>
    </>
  );}

};

export default previlegesButton;

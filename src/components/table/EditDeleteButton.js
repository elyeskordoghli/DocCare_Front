import React from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EditDeleteButton = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  service,
  project,
  staff,
  category,
  name,
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
  if (location.pathname === "/categories"){
    return (
      <>
      
        <div className="flex justify-end text-right">
        {/* {isService ? ():();} */}
        
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("View")}
                  bgColor="#ff5a1f"
                />
              </Link>
  
              <button
                disabled={isCheck?.length > 0}
                onClick={() => handleUpdate(id)}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="edit"
                  Icon={FiEdit}
                  title={t("Edit")}
                  bgColor="#ff5a1f"
                />
              </button>
            </>
          ) : (
            <button
              // disabled={isCheck?.length > 0}
              onClick={() => handleUpdate(id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
            >
              <Tooltip
                id="edit"
                Icon={FiEdit}
                title={t("Edit")}
                bgColor="#ff5a1f"
              />
            </button>
          )}
  
          <button
            // disabled={isCheck?.length > 0}
            onClick={() => handleModalOpen(id, name, category)}
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
  if (location.pathname === "/our-staff"){
    return (
      <>
      
        <div className="flex justify-end text-right">
        {/* {isService ? ():();} */}
        
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("View")}
                  bgColor="#ff5a1f"
                />
              </Link>
  
              <button
                disabled={isCheck?.length > 0}
                onClick={() => handleUpdate(id)}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="edit"
                  Icon={FiEdit}
                  title={t("Edit")}
                  bgColor="#ff5a1f"
                />
              </button>
            </>
          ) : (
            <button
              // disabled={isCheck?.length > 0}
              onClick={() => handleUpdate(id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
            >
              <Tooltip
                id="edit"
                Icon={FiEdit}
                title={t("Edit")}
                bgColor="#ff5a1f"
              />
            </button>
          )}
  
          <button
            // disabled={isCheck?.length > 0}
            onClick={() => handleModalOpen(id, name, staff)}
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
  if (location.pathname === "/projects"){ 
    return (
    <>
    
      <div className="flex justify-end text-right">
      {/* {isService ? ():();} */}
      
        {children?.length > 0 ? (
          <>
            <Link
              to={`/categories/${parent?._id}`}
              className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
            >
              <Tooltip
                id="view"
                Icon={FiZoomIn}
                title={t("View")}
                bgColor="#ff5a1f"
              />
            </Link>

            <button
              disabled={isCheck?.length > 0}
              onClick={() => handleUpdate(id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
            >
              <Tooltip
                id="edit"
                Icon={FiEdit}
                title={t("Edit")}
                bgColor="#ff5a1f"
              />
            </button>
          </>
        ) : (
          <button
            // disabled={isCheck?.length > 0}
            onClick={() => handleUpdate(id)}
            className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
          >
            <Tooltip
              id="edit"
              Icon={FiEdit}
              title={t("Edit")}
              bgColor="#ff5a1f"
            />
          </button>
        )}

        <button
          // disabled={isCheck?.length > 0}
          onClick={() => handleModalOpen(id, title, project)}
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
  );}
  if (location.pathname === "/services") {
    return (
      <>
      
        <div className="flex justify-end text-right">
        {/* {isService ? ():();} */}
        
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("View")}
                  bgColor="#ff5a1f"
                />
              </Link>
  
              <button
                disabled={isCheck?.length > 0}
                onClick={() => handleUpdate(id)}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="edit"
                  Icon={FiEdit}
                  title={t("Edit")}
                  bgColor="#ff5a1f"
                />
              </button>
            </>
          ) : (
            <button
              // disabled={isCheck?.length > 0}
              onClick={() => handleUpdate(id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
            >
              <Tooltip
                id="edit"
                Icon={FiEdit}
                title={t("Edit")}
                bgColor="#ff5a1f"
              />
            </button>
          )}
  
          <button
          // disabled={isCheck?.length > 0}
          onClick={() => handleModalOpen(id, title, service)}
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

export default EditDeleteButton;

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
  career,
  slider,
  count,
  isLoading,
  data,
  setIsLoading,
  blog,
  project,
  staff,
  category,
  reference,
  department,
  DepartmentsContact,
  name,
  type, // Nouvelle prop "type"
  parent,
  children,
}) => {
  const { t } = useTranslation();

  const location = useLocation();
  if (location.pathname === "/sliders") {
    return (
      <>
        <div className="flex justify-end text-right">
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"View"}
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
            onClick={() => handleModalOpen(id, title, slider)}
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




  if (location.pathname === "/Patients") {
    return (
      <>
        <div className="flex justify-end text-right">
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"View"}
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
            onClick={() => handleModalOpen(id, title, slider)}
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





  if (location.pathname === "/counts") {
    return (
      <>
        <div className="flex justify-end text-right">
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"View"}
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
            onClick={() => handleModalOpen(id, title, count)}
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
  if (location.pathname === "/careers") {
    return (
      <>
      
        <div className="flex justify-end text-right">
      
        
          {children?.length > 0 ? (
            <>
              <Link
                to={`/categories/${parent?._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={"View"}
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
            onClick={() => handleModalOpen(id, title, career)}
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
  if (location.pathname === "/contacts"){
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
  if (location.pathname === "/departments"){
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
            onClick={() => handleModalOpen(id, title, department)}
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
  if (location.pathname === "/references"){
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
            onClick={() => handleModalOpen(id, name, reference)}
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
  if (location.pathname === "/blogs"){
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
            onClick={() => handleModalOpen(id, name, blog)}
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
                  title={"View"}
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
                    title={"View"}
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
                title={"View"}
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
          disabled={isCheck?.length > 0}
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
                  title={"View"}
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

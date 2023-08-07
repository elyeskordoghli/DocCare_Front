import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React ,{ useState,useEffect } from "react";
import useToggleDrawer from "hooks/useToggleDrawer";
import StaffDrawer from "components/drawer/StaffDrawer";
import DeleteModal from "components/modal/DeleteModal";
import ActiveInActiveButton from "components/table/ActiveInActiveButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import Status from "components/table/Status";
import MainDrawer from "components/drawer/MainDrawer";
import { showingTranslateValue } from "utils/translate";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import AdminServices from "services/AdminServices";

const StaffTable = ({ lang }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();
  const [data, setData] = useState([]); 
  // const { globalSetting } = useFilter();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await AdminServices.getAllStaff({
          name: null,
          email: null,
          last_login_at: null,
          last_llogin_ip: null,
          status:null,
          previlege :null,
          department : null,
          // catalogue:null,
        });

        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    };

    fetchServices(); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
    }, []);
  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center">
                
                <div>
                  <h2 className="text-sm font-medium">
                    {item.name}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{item.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.last_login_at}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item.last_login_ip}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{item?.status}</span>
            </TableCell>
            <TableCell>
              {item?.previleges ? (
                <ul className="list-disc pl-6"> {/* Utilisez une liste à puces avec une marge à gauche de 6px */}
                  {item.previleges.map((previlege, index) => (
                    <li key={index} className="text-sm font-semibold">
                      {previlege.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm font-semibold">Aucun privilège</span>
              )}
            </TableCell>

          <TableCell>
            {item?.departments ? (
              item.departments.map((department, index) => (
                <span key={index} className="text-sm font-semibold">
                  {department.title}
                  {index !== item.departments.length - 1 && ", "} {/* Ajoute une virgule entre chaque privilège, sauf pour le dernier */}
                </span>
              ))
            ) : (
              <span className="text-sm font-semibold">Aucun department</span>
            )}
          </TableCell>
{/* 
            <TableCell className="text-center">
              <ActiveInActiveButton
                id={item?.id}
                item={item}
                option="item"
                // status={staff.status}
              />
            </TableCell> */}
            {/* <TableCell>
              <Link
                to={`/staff/${item.id}`}
                className="flex justify-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link> 
            </TableCell> */}
            <TableCell>
              <EditDeleteButton
                id={item.id}
                staff={item}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                name={item?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;

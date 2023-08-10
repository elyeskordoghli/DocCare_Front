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
import CheckBox from "components/form/CheckBox";

const StaffTable = ({searchAdmin, lang , isCheck, setIsCheck, isLoading, setIsLoading}) => {
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
 
    const fetchAdmins = async () => {
      try {
        let response;
        if (searchAdmin) {
          response = await AdminServices.searchAdmin(searchAdmin);
      }
      else{
        response = await AdminServices.getAllStaff();
      }
        
        // Mettez à jour la variable data avec les données récupérées
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    finally {
      setIsLoading(false); // Mettre à jour l'état pour indiquer que le chargement est terminé
    }
    };
    useEffect(() => {
    fetchAdmins(); // Appelez la fonction fetchServices pour récupérer les projets au chargement du composant
    }, [isLoading,searchAdmin]);

    const getAdmin = async () => {
      try {
        const ad = await AdminServices.getStaffById(isCheck)
        setIsCheck([...isCheck, ad.id]);
        console.log('Admin selectionnée : ', ad.id);
  
      } catch (error) {
        console.error("Erreur lors de la récupération de l'admin :", error);
  
      }
    }
  
  
    useEffect(() => {
      getAdmin();
    }, []);
    // const beforeHandleModalOpen = (id, title, staff) => {
    //   console.log(id)
    //   handleModalOpen(id, title, staff);
    //   setIsCheck([id]);
    // }
    const handleClick = (e) => {
      const { id, checked } = e.target;
      console.log("id hatha", id, checked);
    
      if (checked) {
        setIsCheck([...isCheck, id]);
      } else {
        setIsCheck(isCheck.filter((item) => item !== id));
        console.log("id tna7a", id, checked);
      }
    };
  return (
    <>
      {/* <DeleteModal id={serviceId} title={title} /> */}
      {isCheck?.length < 1 && <DeleteModal
        id={serviceId}
        title={data.title}
        isLoading={isLoading} // Passer la variable isLoading
        setIsLoading={setIsLoading} // Passer la fonction setIsLoadingisLoading={true} 
      />}
      {isCheck?.length < 2 && (
        <MainDrawer>
        <StaffDrawer id={serviceId} isLoading={isLoading} setIsLoading={setIsLoading} setIsCheck={setIsCheck} isCheck={isCheck}  />
        </MainDrawer>
      )}
      {/* <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
          <TableCell>
            <CheckBox
              id={item.id}
              name={item.title_en}
              type="checkbox"
              isChecked={isCheck?.includes(item.id)}
              handleClick={() => handleClick(item.id)}
              setIsCheck={setIsCheck} // Passer la fonction setIsCheck en tant que prop
            />
          </TableCell>

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
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                staff={item}
                isCheck={isCheck}
                handleClick={handleClick}
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

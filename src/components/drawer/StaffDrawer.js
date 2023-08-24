import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useStaffSubmit from "hooks/useStaffSubmit";
import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";
import SelectRole from "components/form/SelectRole";
import SelectPrevilege from "components/form/SelectPrevilege";
import SelectDepartment from "components/form/SelectDepartment";
import PrevilegeServices from "services/PrevilegeServices";
import DrawerButton from "components/form/DrawerButton";
import { useEffect, useState, useContext } from "react";
import DepartmentServices from "services/DepartementServices";
import AdminServices from "services/AdminServices";
import { notifySuccess } from "utils/toast";
import { SidebarContext } from "context/SidebarContext";

const StaffDrawer = ({ id, full_access, data, isLoading, setIsLoading, isCheck, setIsCheck }) => {
  const {
    register,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    handleSelectLanguage,
  } = useStaffSubmit(id);
  const { t } = useTranslation();


  //----------begin states----------------
  const { closeDrawer } = useContext(SidebarContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("1");

  const [previleges, setPrevilege] = useState([]);
  const [selecttedPrevilege, setSelecttedPrevilege] = useState([]);

  const [departments, setDepartment] = useState([]);
  const [selecttedDepartment, setSelecttedDepartment] = useState([]);

  const [oldprevileges, setOldPrevileges] = useState([]);

  //----------end states--------------

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const handlePasswordCheckboxChange = (e) => {
    setChangePassword(e.target.checked);
    setShowPasswordField(e.target.checked);
  };

  const Error = ({ errorName }) => {
    return (
      <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Assurez-vous d'annuler le comportement par défaut du formulaire si nécessaire


    const adminData = {
      name: name,
      email: email,
      password: password,
      previleges: JSON.stringify(selecttedPrevilege),
      departments: JSON.stringify(selecttedDepartment),
      changing_password : changePassword,
    };

    try {
      if (id == null) {
        setIsLoading(true);
        const res = await AdminServices.addStaff(adminData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },

        });
        closeDrawer();
        // setIsUpdate(true);
        notifySuccess(res.message);
        setIsLoading(false);
        setIsCheck([]);
      } else {
        setIsLoading(true);
        const res = await AdminServices.updateStaff(id, adminData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        closeDrawer();
        // setIsUpdate(true);
        notifySuccess(res.message);
        setIsLoading(false);
        setIsCheck([]);

      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'admin :", error);
    }
  };


  const initFormForUpdate = async (id) => {
    setIsLoading(true);
    const res = await AdminServices.getStaffById(id);
    setIsLoading(false);

    setName(res.data.name);
    setEmail(res.data.email);
    setPassword(res.data.password);
    setOldPrevileges(res.data.previleges);
    // setDepartment(res.data.departments);

  };

  useEffect(() => {
    if (id && id !== undefined) {
      initFormForUpdate(id);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      // setOldPrevileges("");
      setIsCheck([]);

    }
  }, [id]);

  const getPrevilegesData = async () => {
    try {
      const res = await PrevilegeServices.getAllPrevilege();
      // Mettez à jour le state avec les départements récupérés depuis l'API
      setPrevilege(res.data);
    } catch (err) {
      console.log(err ? err?.response?.data?.message : err?.message);

    }
  }

  const getDepartementsData = async () => {
    try {
      const res = await DepartmentServices.getAllDepartment();
      // Mettez à jour le state avec les départements récupérés depuis l'API
      setDepartment(res.data);
    } catch (err) {
      console.log(err ? err?.response?.data?.message : err?.message);

    }
  }
  useEffect(() => {
    getPrevilegesData()
    getDepartementsData()

  }, [])



  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"name "} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="name"
                      type="text"
                      placeholder={"name"}
                      // onBlur={(e) => handleProductSlug(e.target.value)}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Email "} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="email"
                      type="text"
                      placeholder={"Email"}
                      // onBlur={(e) => handleProductSlug(e.target.value)}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>



                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={"Change password ?"} />
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      type="checkbox"
                      onChange={handlePasswordCheckboxChange}
                      checked={changePassword}
                    />
                     <span className="ml-2">Yes</span>
                  </div>
                </div>

                {/* Afficher le champ de mot de passe si l'admin est un super admin et la case est cochée */}
                {full_access && changePassword && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={"password "} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="password"
                        type="password"
                        placeholder={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <Error errorName={errors.password} />
                    </div>
                  </div>
                )}





                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Previlege" />
                  {/* {JSON.stringify(selecttedPrevilege )} 00 */}
                  <div className="col-span-8 sm:col-span-4">
                    <SelectPrevilege setSelecttedPrevilege={setSelecttedPrevilege} oldprevileges={oldprevileges} register={register} label="Previlege" previleges={previleges} selecttedPrevilege={selecttedPrevilege} />
                    <Error errorName={errors.previlege} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Department" />
                  {/* {JSON.stringify(selecttedDepartment )} 00 */}

                  <div className="col-span-8 sm:col-span-4">
                    <SelectDepartment setSelecttedDepartment={setSelecttedDepartment} selecttedDepartment={selecttedDepartment} register={register} label="Department" name="department" departments={departments} />
                    <Error errorName={errors.department} />
                  </div>
                </div>
              </div>
              <DrawerButton id={id} title="Staff" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;

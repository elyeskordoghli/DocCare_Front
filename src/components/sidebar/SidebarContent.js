import React, { useContext, useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";
import logoDark from "assets/img/logo/sim_new.svg";
import logoLight from "assets/img/logo/sim_new_white.svg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AdminServices from "services/AdminServices";

import sidebar from "routes/sidebar";
import { AdminContext } from "context/AdminContext";
import SidebarSubMenu from "./SidebarSubMenu";
import { useTranslation } from "react-i18next";

const SidebarContent = () => {
  const reduxDisPatch = useDispatch();

  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);

  const [adminprevilegesList, setAdminprevilegesList] = useState([]);

  useEffect(() => {
    async function fetchAdminprevileges() {
      try {
        const adminInfoString = Cookies.get("adminInfo");
  
        if (adminInfoString) {
          const adminInfo = JSON.parse(adminInfoString);
  
          if (adminInfo && adminInfo.id) {
            const response = await AdminServices.getStaffById(adminInfo.id);
  
            const adminprevileges = response.data.previleges.map(obj => { return obj.slug });
            setAdminprevilegesList(adminprevileges);
          } else {
            console.log('ID de l\'admin non trouvé dans les informations');
          }
        } else {
          console.log('Cookie adminInfo non trouvé');
        }
      } catch (error) {
        console.log('Erreur lors de la récupération des privilèges', error);
      }
    }
  
    fetchAdminprevileges();
  }, []);
  
  const handleLogOut = async () => {
    try {
      const response = await AdminServices.logoutAdmin();
      if (response.status === 200) {
        dispatch({ type: "USER_LOGOUT" });
        Cookies.remove("adminInfo");
        window.location.replace(`/login`);
      } else {
        console.log('Erreur lors de la déconnexion', response);
      }
    } catch (error) {
      console.log('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <div className="py-4  text-gray-500 dark:text-gray-400">
      <a className="text-gray-900 dark:text-gray-200" href="/dashboard">
        {mode === "dark" ? (
          <img src={logoLight} alt="dashtar" width="130" className="pl-6" />
        ) : (
          <img src={logoDark} alt="dashtar" width="130" className="pl-6 " />
        )}
      </a>
      <ul className="mt-8 ">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} adminprevilegesList={adminprevilegesList} />
          ) : (
            <li className="relative  hover:text-orange-500" key={route.name}>
              {route?.outside ? (
                <a
                  href={process.env.REACT_APP_STORE_DOMAIN}
                  target="_blank"
                  className="px-6 py-4 inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-colors duration-150 hover:text-orange-700 dark:hover:text-gray-200"
                  rel="noreferrer"
                >
                  <Route path={route.path} exact={route.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1  hover:text-orange-500 bg-orange-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <route.icon className="w-5 h-5  hover:text-orange-500" aria-hidden="true" />
                  <span className="ml-4  hover:text-orange-500" >{t(`${route.name}`)}</span>
                </a>
              ) : (
                ( !route.previleges || route.previleges.some((previlege) =>
                  adminprevilegesList.includes(previlege)
                ) ) && (
                  <NavLink
                    exact
                    to={route.path}
                    target={`${route?.outside ? "_blank" : "_self"}`}
                    className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150"
                    activeClassName="text-orange-500 dark:text-gray-100"
                  >
                    <Route path={route.path} exact={route.exact}>
                      <span
                        className="absolute inset-y-0 left-0 w-1  hover:text-orange-500 bg-orange-500 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    </Route>
                    <route.icon className="w-5 h-5  hover:text-orange-500" aria-hidden="true" />
                    <span className="ml-4  hover:text-orange-500">{t(`${route.name}`)}</span>
                  </NavLink>
                )
              )}
            </li>
          )
        )}
      </ul>
      <span className="lg:relative bottom-0 px-6 py-6 w-64 mx-auto  relative mt-3 block">
        <Button
          onClick={handleLogOut}
          size="large"
          className="w-full"
        >
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{t("LogOut")}</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;

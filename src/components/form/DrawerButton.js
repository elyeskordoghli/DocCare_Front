import React, { useContext } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "context/SidebarContext";
import spinnerLoadingImage from "assets/img/spinner.gif";

const DrawerButton = ({ id, title, value ,onClick}) => {
  const { t } = useTranslation();
  const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
  return (
    <>
      <div
        className="fixed z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        style={{ right: !isDrawerOpen && -50 }}
      >
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <Button
            onClick={toggleDrawer}
            className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
            layout="outline"
          >
            {t("CancelBtn")}
          </Button>
        </div>

        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          {}
          {value==="next" ? (
            <Button
            type="button" // Utilisez le type "button" pour éviter une soumission accidentelle
            onClick={onClick} // Utilisez la prop onClick pour gérer le clic
            className="w-full h-12"
          >Next</Button>
          ) : (
            <Button type="submit" className="w-full h-12">
              {id ? (
                <span>
                  {t("UpdateBtn")} {title}
                </span>
              ) : (
                <span>{title}</span>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DrawerButton;

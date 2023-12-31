import { Button, Input } from "@windmill/react-ui";
import exportFromJSON from "export-from-json";
import ProjectServices from "services/ProjectServices";

import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFileEarmarkCode, BsFileEarmarkMedical } from "react-icons/bs";
import {
  FiDownload,
  FiPlus,
  FiUpload,
  FiUploadCloud,
  FiXCircle,
} from "react-icons/fi";
// import { ImFileExcel } from "react-icons/im";
import { useLocation } from "react-router-dom";
import spinnerLoadingImage from "../../assets/img/spinner.gif";
import { SidebarContext } from "../../context/SidebarContext";
import ProductServices from "../../services/ProductServices";
import CategoryServices from "../../services/CategoryServices";
import PatientServices from "services/PatientServices";

import ServiceServices from "services/ServiceServices";
import AdminServices from "services/AdminServices";
import SlidersServices from "services/SlidersServices";
import CountServices from "services/CountServices";
import DetailsServices from "services/DetailsServices";
import HistoryServices from "services/HistoryServices";
import DepartmentContactServices from "services/DepartementContactServices";
import QuoteServices from "services/QuoteServices";
import SubscriberServices from "services/SubscriberServices";
const UploadManyTwo = ({
  title,
  totalDoc,
  exportData,
  isDisabled,
  handleSelectFile,
  filename,
  handleRemoveSelectFile,
  handleUploadMultiple,
}) => {
  const location = useLocation();
  const dRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const { loading } = useContext(SidebarContext);
  const [loadingExport, setLoadingExport] = useState({
    name: "",
    status: false,
  });

  // console.log(exportData);

  const handleExportCSV = () => {
    if (location.pathname === "/Patients") {
      setLoadingExport({ name: "csv", status: true });
      PatientServices.getAllPatients({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "Patients",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/subscribers") {
      setLoadingExport({ name: "csv", status: true });
     SubscriberServices.getAllSubscribers({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "subscribers",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/quotes") {
      setLoadingExport({ name: "csv", status: true });
      QuoteServices.getAllQuote({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "history",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/counts") {
      setLoadingExport({ name: "csv", status: true });
      CountServices.getAllCounts({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "counts",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/details") {
      setLoadingExport({ name: "csv", status: true });
      CountServices.getAllCounts({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "details",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/sliders") {
      setLoadingExport({ name: "csv", status: true });
      SlidersServices.getAllSliders({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "sliders",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/our-staff") {
      setLoadingExport({ name: "csv", status: true });
      AdminServices.getAllStaff({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "admins",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/projects") {
      setLoadingExport({ name: "csv", status: true });
      ProjectServices.getAllProjects({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "projects",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/services") {
      setLoadingExport({ name: "csv", status: true });
      ServiceServices.getAllServices({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "services",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/quotes") {
      setLoadingExport({ name: "csv", status: true });
     QuoteServices.getAllQuote({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "quotes",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/contacts") {
      setLoadingExport({ name: "csv", status: true });
      DepartmentContactServices.getAllContact({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "contacts",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }
    if (location.pathname === "/categories") {
      setLoadingExport({ name: "csv", status: true });
      CategoryServices.getAllCategories({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "csv", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "categories",
            exportType: exportFromJSON.types.csv,
          });
        })
        .catch((err) => {
          setLoadingExport({ name: "csv", status: true });
          setDropDown(false);
          console.log(err);
        });
    }

    
    if (location.pathname === "/attributes") {
      exportFromJSON({
        data: exportData,
        fileName: "attributes",
        exportType: exportFromJSON.types.csv,
      });
    }

    if (location.pathname === "/coupons") {
      exportFromJSON({
        data: exportData,
        fileName: "coupons",
        exportType: exportFromJSON.types.csv,
      });
    }
    if (location.pathname === "/customers") {
      exportFromJSON({
        data: exportData,
        fileName: "customers",
        exportType: exportFromJSON.types.csv,
      });
    }
  };

  const handleExportJSON = () => {
    if (location.pathname === "/subscribers") {
      setLoadingExport({ name: "json", status: true });
      SubscriberServices.getAllSubscribers({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "subscribers",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/sliders") {
      setLoadingExport({ name: "json", status: true });
      SlidersServices.getAllSliders({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "sliders",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/details") {
      setLoadingExport({ name: "json", status: true });
      DetailsServices.getAllDetails({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "details",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/counts") {
      setLoadingExport({ name: "json", status: true });
     CountServices.getAllCounts({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "counts",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/history") {
      setLoadingExport({ name: "json", status: true });
     HistoryServices.getAllHistory({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "counts",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/our-staff") {
      setLoadingExport({ name: "json", status: true });
      AdminServices.getAllStaff({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "admins",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/projects") {
      setLoadingExport({ name: "json", status: true });
      ProjectServices.getAllProjects({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "projects",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/services") {
      setLoadingExport({ name: "json", status: true });
      ServiceServices.getAllServices({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "services",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/contacts") {
      setLoadingExport({ name: "json", status: true });
      DepartmentContactServices.getAllContact({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "contacts",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }
    if (location.pathname === "/categories") {
      setLoadingExport({ name: "json", status: true });
      CategoryServices.getAllCategories({})
        .then((res) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log("Data to be exported:", res.data);
          exportFromJSON({
            data: res.data,
            fileName: "Categories",
            exportType: exportFromJSON.types.json,
          });

        })
        .catch((err) => {
          setDropDown(false);
          setLoadingExport({ name: "json", status: true });
          console.log(err);
        });
    }

   
    if (location.pathname === "/attributes") {
      exportFromJSON({
        data: exportData,
        fileName: "attributes",
        exportType: exportFromJSON.types.json,
      });
    }

    if (location.pathname === "/coupons") {
      exportFromJSON({
        data: exportData,
        fileName: "coupons",
        exportType: exportFromJSON.types.json,
      });
    }
    if (location.pathname === "/customers") {
      exportFromJSON({
        data: exportData,
        fileName: "customers",
        exportType: exportFromJSON.types.json,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dRef?.current?.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [dRef]);

  const [isImportBoxShown, setisImportBoxShown] = useState(false);
  const handleClick = (event) => {
    setisImportBoxShown((current) => !current);
  };

  const { t } = useTranslation();

  return (
    <div className=" lg:flex md:flex flex-grow-0">
      <div className="flex">
        <div ref={dRef} className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
          {(title === "Projects" ||
            title === "Services" ||
            title === "Admins" ||
            title === "Counts" ||
            title === "Sliders" ||
            title === "Subscribers" ||
            title === "Departments Contact" || 
            title === "Departments" || 
            title === "Quotes" ||
            title === "Details" ||
            title === "Attribute" ||
            title === "History" ||
            title === "Extra" ||
            title === "Coupon" ||
            title === "Customers" ||
            title === "Categories") && (
              <button
                onClick={() => {
                  setDropDown(!dropDown);
                }}
                className="border flex justify-center items-center border-gray-300 hover:border-orange-400 hover:text-orange-400  dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
              >
                {/* <BsPlus className="text-4xl" /> */}
                <FiUpload className="mr-2" />
                <span className="text-xs">{t("Export")}</span>
              </button>
            )}
          {dropDown && (
            <ul
              className="origin-top-left absolute  w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
              style={{}}
            >
              <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="focus:outline-none"
                >
                  <span className="flex items-center text-sm">
                    <BsFileEarmarkMedical
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />

                    <span>
                      Export to CSV
                      {loadingExport.name === "csv" &&
                        loadingExport.status &&
                        "...."}
                    </span>
                  </span>
                </button>
              </li>

              <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={handleExportJSON}
                >
                  <span className="flex items-center text-sm">
                    <BsFileEarmarkCode
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>
                      Export to JSON
                      {loadingExport.name === "json" &&
                        loadingExport.status &&
                        "...."}
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          )}
        </div>
        {/* 
        <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
          <button
            onClick={handleClick}
            className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300 dark:text-gray-300 cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none"
          >
            <FiDownload className="mr-2" />
            <span className="text-xs">Import</span>
          </button>
        </div> */}
      </div>

      {/* {isImportBoxShown && (
        <>
          <div className="w-full my-2 lg:my-0 md:my-0 flex">
            <div className="h-10 border border-dashed border-orange-500 rounded-md">
              <label className="w-full rounded-lg h-10 flex justify-center items-center text-xs dark:text-gray-400 leading-none">
                <Input
                  disabled={isDisabled}
                  type="file"
                  accept=".csv,.xls,.json"
                  onChange={handleSelectFile}
                />
                {filename ? (
                  filename
                ) : (
                  <>
                    <FiUploadCloud className="mx-2 text-orange-500 text-lg dark:text-gray-400" />{" "}
                    {t("SelectYourJSON")} {title} {t("File")}
                  </>
                )}
                {filename && (
                  <span
                    onClick={handleRemoveSelectFile}
                    type="button"
                    className="text-red-500 focus:outline-none mx-4 text-lg"
                  >
                    <FiXCircle />
                  </span>
                )}
              </label>
            </div>

            <div className="flex">
              {loading ? (
                <Button className="ml-2 h-10">
                  <img
                    src={spinnerLoadingImage}
                    alt="Loading"
                    width={20}
                    height={10}
                  />{" "}
                  <span className="font-serif ml-2 font-light">Processing</span>
                </Button>
              ) : (
                <Button
                  onClick={handleUploadMultiple}
                  className="w-full rounded-md h-10 ml-2  text-xs px-2"
                >
                  <span className="">
                    <FiPlus />
                  </span>
                  <span className=" text-sx w-20">{t("ImportNow")}</span>
                </Button>
              )}
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};
export default UploadManyTwo;

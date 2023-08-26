import {
  Badge,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableBody,
  TableRow
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
//internal import
import AttributeList from "components/attribute/AttributeList";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import useProductSubmit from "hooks/useProductSubmit";
import useToggleDrawer from "hooks/useToggleDrawer";
import ServiceServices from "services/ServiceServices";
import { showingTranslateValue } from "utils/translate";
import SettingServices from "services/SettingServices";
import ServiceDrawer from "components/drawer/ServiceDrawer";
import DepartmentContactServices from "services/DepartementContactServices";

const DepartmentContactDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  // const { attribue } = useProductSubmit(id);
  // const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);
  const response = useAsync(() => DepartmentContactServices.getContactById(id));
  const { loading } = response;
  const { data } = response.data;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isLoading, setIsLoading] = useState();
  return (
    <>


      <PageTitle>{t("ContactDetails")}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <TableContainer className=" mb-8 rounded-b-lg">
        <Table className="border-collapse border-0">
            <TableBody className="bg-gray-50 border-0">
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("Name")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.name}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("Email")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.email}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("Phone")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.phone}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("AppointmentDate")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.Appointment_date}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("AppointmentHour")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.Appointment_heure}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong> {t("Subject")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.subject}</span>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("Message")}:</strong>
                </TableCell>
                <TableCell>
                  {data?.message && (
                    <span className="text-sm">
                      {data.message.split(' ').map((word, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && index % 10 === 0 ? <br /> : ' '}
                          {word}
                        </React.Fragment>
                      ))}
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell className=" font-bold text-lg mb-6 text-gray-500 dark:text-gray-400">
                  <strong>{t("Department")}:</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{data?.department?.title}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      )}

    </>
  );
};

export default DepartmentContactDetails;

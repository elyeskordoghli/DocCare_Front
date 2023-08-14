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
import QuoteServices from "services/QuoteServices";
import CareerServices from "services/CareerServices";

const ApplyTable = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { handleUpdate } = useToggleDrawer();
    // const { attribue } = useProductSubmit(id);
    // const [variantTitle, setVariantTitle] = useState([]);
    const { lang } = useContext(SidebarContext);
    const response = useAsync(() => CareerServices.getCareerById(id));
    const { loading } = response;
    const { data } = response.data;
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [isLoading, setIsLoading] = useState();
    return (
        <>
            <TableContainer className=" mb-8 rounded-b-lg">
                <Table className="border-collapse border-0">
                    <TableHeader>
                        <tr>
                            <TableCell>{t("First Name ")}</TableCell>
                            <TableCell>{t("Last Name")}</TableCell>
                            <TableCell>{t("Email ")}</TableCell>
                            <TableCell>{t("Phone")}</TableCell>
                            <TableCell>{t("Resume")}</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody className="bg-gray-50 border-0">
                        {data?.careers.map((item, i) => (
                            <><TableRow key={i + 1}>

                                <TableCell>
                                    <span className="text-sm ">{item?.first_name}</span>
                                </TableCell>


                                <TableCell>
                                    <span className="text-sm ">{item?.last_name}</span>
                                </TableCell>

                                <TableCell>
                                    <span className="text-sm ">{item?.email}</span>
                                </TableCell>

                                <TableCell>
                                    <span className="text-sm ">{item?.phone_number}</span>
                                </TableCell>

                                <TableCell>
                                    <span className="text-sm">
                                        <a href={item?.resume_path}>{item?.first_name} Resume</a>
                                    </span>
                                </TableCell>
                            </TableRow>



                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ApplyTable;

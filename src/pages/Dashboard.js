import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import { Link } from 'react-router-dom';

import LineChart from "components/chart/LineChart/LineChart";
import PieChart from "components/chart/Pie/PieChart";
import CardItem from "components/dashboard/CardItem";
import CardItemTwo from "components/dashboard/CardItemTwo";
import ChartCard from "components/chart/ChartCard";
import OrderTable from "components/order/OrderTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImCreditCard, ImStack } from "react-icons/im";
import OrderServices from "services/OrderServices";
import AnalyticsServices from "services/AnalyticsServices";
import Skeleton from "react-loading-skeleton";
//internal import

const Dashboard = () => {
  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);
  const currency = globalSetting?.default_currency || "$";

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [departmentCounts, setDepartmentCounts] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await AnalyticsServices.getAll();
        setCategories(response.categories);
        setDepartmentCounts(response.departmentCounts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  // console.log('cat', categories)
  // console.log('departmentCounts', departmentCounts)
  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        {departmentCounts?.map((department, index) => (
                <Link to={`/contacts/${department.id}`} key={index}>

            <CardItemTwo
              mode={mode}
              currency={currency}
              title2={department.name}
              icon={department.icon}
              price={department.count}
              className="text-white dark:text-orange-100 bg-dark"
              loading={loading}
            />
          </Link>
        ))}
        {loading && (
          <>
            <Skeleton className="text-white dark:text-orange-100 bg-dark" />
            <Skeleton className="text-white dark:text-orange-100 bg-dark" />
            <Skeleton className="text-white dark:text-orange-100 bg-dark" />
            <Skeleton className="text-white dark:text-orange-100 bg-dark" />
          </>
        )}
      </div>
      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        {categories?.map((category, index) => (
          <Link to={category.route} key={index}>
            <CardItemTwo
              mode={mode}
              currency={currency}
              title2={category.name}
              icon={category.icon}
              price={category.count}
              className="text-white dark:text-orange-100 bg-orange"
              loading={loading}
            />
          </Link>
        ))}
        {loading && (
          <>
            <Skeleton className="text-white dark:text-orange-100 bg-orange" />
            <Skeleton className="text-white dark:text-orange-100 bg-orange" />
            <Skeleton className="text-white dark:text-orange-100 bg-orange" />
            <Skeleton className="text-white dark:text-orange-100 bg-orange" />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;

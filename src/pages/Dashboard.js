import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
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
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";
import OrderServices from "services/OrderServices";
import AnalyticsServices from "services/AnalyticsServices";
//internal import


const Dashboard = () => {
  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);
  const currency = globalSetting?.default_currency || "$";

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );
  // console.log("dashboardOrderCount", dashboardOrderCount);

  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [departmentCounts,setDepartmentCounts] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await AnalyticsServices.getAll();
        setCategories(response.categories); 
        setDepartmentCounts(response.departmentCounts)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);
console.log('cat',categories)
console.log('departmentCounts',departmentCounts)
  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>
      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
      {/* <Sidebar /> */}
      {categories.map((category, index) => (
          <CardItemTwo
            key={index} 
            mode={mode}
            currency={currency}
            title2={category.name}
            Icon={FiShoppingCart}
            price={category.count}
            className="text-white dark:text-green-100 bg-blue-500"
            loading={loadingOrderAmount}
          />
        ))}
        {departmentCounts.map((department, index) => (
          <CardItemTwo
            key={index} // Make sure to provide a unique key for each CardItemTwo
            mode={mode}
            currency={currency}
            title2={department.name} // Display the department name as the title
            Icon={FiShoppingCart}
            price={department.count} // Display the department count
            className="text-white dark:text-green-100 bg-blue-500"
            loading={loadingOrderAmount}
          />
        ))}
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalOrder || 0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title={t("OrderPending")}
          Icon={FiRefreshCw}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
          amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title={t("OrderProcessing")}
          Icon={FiTruck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalProcessingOrder || 0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title={t("OrderDelivered")}
          Icon={FiCheck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalDeliveredOrder || 0}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div> */}

      {/* <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          loading={loadingOrderAmount}
          title={t("WeeklySales")}
        >
          <LineChart salesReport={salesReport} />
        </ChartCard>

        <ChartCard
          mode={mode}
          loading={loadingBestSellerProduct}
          title={t("BestSellingProducts")}
        >
          <PieChart data={bestSellerProductChart} />
        </ChartCard>
      </div>

      <PageTitle>{t("RecentOrder")}</PageTitle> */}

      {/* <Loading loading={loading} /> */}

      {/* {loadingRecentOrder ? (
        <TableLoading row={5} col={4} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("InvoiceNo")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")} </TableCell>
                <TableCell> {t("MethodTbl")} </TableCell>
                <TableCell> {t("AmountTbl")} </TableCell>
                <TableCell>{t("OderStatusTbl")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
              </tr>
            </TableHeader>

            <OrderTable
              lang={lang}
              orders={dataTable}
              globalSetting={globalSetting}
              currency={globalSetting?.default_currency || "$"}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={dashboardRecentOrder?.totalOrder}
              resultsPerPage={8}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )} */}
    </>
  );
};

export default Dashboard;

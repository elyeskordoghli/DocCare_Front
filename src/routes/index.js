import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Attributes = lazy(() => import("../pages/Attributes"));
const ChildAttributes = lazy(() => import("../pages/ChildAttributes"));
const Products = lazy(() => import("../pages/Products"));
const Projects = lazy(() => import("../pages/Projects"));
const Patients = lazy(() => import("../pages/Patient"));

const Subscribers  = lazy(() => import("../pages/Subscriber"));
const Services = lazy(() => import("../pages/Services"));
const Sliders = lazy(() => import("../pages/Sliders"));
const Counts = lazy(() => import("../pages/Counts"));
const Details = lazy(() => import("../pages/Details"));
const History = lazy(() => import("../pages/History"));





const Blogs = lazy(() => import("../pages/Blogs"));
const References = lazy(() => import("../pages/References"));
const Departments = lazy(() => import("../pages/Departments"));
const Quotes = lazy(() => import("../pages/Quote"));
const Careers = lazy(() => import("../pages/Careers"));


const DepartmentContact = lazy(() => import("../pages/DepartmentContact"));





const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails"));
const SlidersDetails = lazy(() => import("../pages/SlidersDetails"));

const BlogDetails = lazy(() => import("../pages/BlogDetails"));
const ReferenceDetails = lazy(() => import("../pages/ReferenceDetails"));
const DepartmentDetails = lazy(() => import("../pages/DepartmentDetails"));


const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const adminDetails = lazy(() => import("../pages/adminDetails"));

const DepartmentContactDetails = lazy(() => import("../pages/DepartmentContactDetails"));
const QuoteDetails = lazy(() => import("../pages/QuoteDetails"));
const CareerDetails = lazy(() => import("../pages/CareerDetails"));




const Category = lazy(() => import("../pages/Category"));
const ChildCategory = lazy(() => import("../pages/ChildCategory"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Languages = lazy(() => import("../pages/Languages"));
const Currencies = lazy(() => import("../pages/Currencies"));
const Setting = lazy(() => import("../pages/Setting"));
/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/subscribers",
    component: Subscribers,
  },
  {
    path: "/history",
    component: History,
  },
  {
    path: "/careers",
    component: Careers,
  },
  {
    path: "/sliders",
    component: Sliders,
  },
  {
    path: "/counts",
    component: Counts,
  },
  {
    path: "/details",
    component: Details,
  },
  {
    path: "/quotes",
    component:  Quotes,
  },
  {
    path: "/references",
    component: References,
  },
  {
    path: "/departments",
    component: Departments,
  },
  {
    path: "/contacts",
    component: DepartmentContact,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/blogs",
    component: Blogs,
  },
  {
    path: "/Patients",
    component: Patients,
  },
  {
    path: "/services",
    component: Services,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/attributes",
    component: Attributes,
  },
  {
    path: "/attributes/:id",
    component: ChildAttributes,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
  {
    path: "/service/:id",
    component: ServiceDetails,
  },
  {
    path: "/career/:id",
    component: CareerDetails,
  },
  {
    path: "/reference/:id",
    component: ReferenceDetails,
  },
  {
    path: "/slider/:id",
    component: SlidersDetails,
  },
  {
    path: "/contact/:id",
    component: DepartmentContactDetails,
  },
  {
    path: "/contacts/:iddep",
    component: DepartmentContact,
  },
  {
    path: "/quote/:id",
    component: QuoteDetails,
  },
  {
    path: "/department/:id",
    component: DepartmentDetails,
  },
  {
    path: "/blog/:id",
    component: BlogDetails,
  },
  {
    path: "/project/:id",
    component: ProjectDetails,
  },
  {
    path: "/admin/:id/previleges",
    component: adminDetails,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/languages",
    component: Languages,
  },
  {
    path: "/currencies",
    component: Currencies,
  },

  {
    path: "/categories/:id",
    component: ChildCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/settings", component: Setting },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
];

export default routes;

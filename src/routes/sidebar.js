import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      {
        path: "/projects",
        name: "Projects",
      },
      {
        path: "/categories",
        name: "Categories",
      },
      {
        path: "/departments",
        name: "Departments",
      },
      {
        path: "/services",
        name: "Services",
      },
      {
        path: "/careers",
        name: "Careers",
      },
      {
        path: "/blogs",
        name: "Blogs",
      },
    ],
  },

  {
    path: "/Users",
    icon: FiUsers,
    name: "Users",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },

  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
  },

  {
    path: "/settings",
    icon: FiSettings,
    name: "StoreSetting",
  },
  {
    icon: FiGlobe,
    name: "International",
    routes: [
      {
        path: "/languages",
        name: "Languages",
      },
      {
        path: "/currencies",
        name: "Currencies",
      },
      {
        path: "/details",
        name: "Our Details",
      },
      {
        path: "/references",
        name: "References",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "ViewStore",
    path: "http://localhost:3000",
    outside: "store",
  },

  {
    icon: FiSlack,
    name: "Pages",
    routes: [
      // submenu

      {
        path: "/404",
        name: "404",
      },
      {
        path: "/coming-soon",
        name: "Coming Soon",
      },
    ],
  },
];

export default sidebar;

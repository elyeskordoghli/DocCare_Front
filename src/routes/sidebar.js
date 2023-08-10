import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiBookOpen,
  FiXOctagon,
  FiActivity,
  FiArchive,
  FiArrowUp,
  FiArrowUpCircle,
  FiAperture,
  FiPackage
} from "react-icons/fi";
import routes from "routes";

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
    name: "Project Catalog",
    routes: [
      {
        path: "/projects",
        name: "Projects",
      },
      {
        path: "/careers",
        name: "Careers",
      },
     
    ],
  },
  {
    icon : FiArchive,
    path: "/categories",
    name: "Categories",
  },
  {
    icon : FiAperture,
    path: "/references",
    name: "References",
  },
  {
    path: "/Users",
    icon: FiUsers,
    name: "Users",
  },
  {
    path: "/blogs",
    icon : FiBookOpen,
    name: "Blogs",
  },
  {
    path: "/services",
    icon: FiCompass,
    name: "Services",
  },
{
  icon: FiUser,
  name :"Admins",
  routes : [
    {
      path: "/our-staff",
      name: "OurStaff",
    },
  ]
},
  
{
  icon: FiPackage,
  name :"Departments",
  routes : [
    {
      path :"/our-departments",
      name : "Our Departments"
    },
    {
      path :"/departments-contact",
      name : "Departments Contact"
    }

  ]
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
     
    ],
  },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
];

export default sidebar;

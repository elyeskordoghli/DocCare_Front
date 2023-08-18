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
  FiCodepen,
  FiArchive,
  FiArrowUp,
  FiArrowUpCircle,
  FiAperture,
  FiFile,
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
    name: "Projects ",
    path: "/projects",
    previleges: ["view_project", "view_any_project","create_project","update_project","delete_project"],

  },
  {
    icon: FiCodepen,
    path: "/careers",
    name: "Careers",
    previleges: ["view_career", "view_any_career","create_career","update_career","delete_career"],

  },



  {
    icon: FiArchive,
    path: "/categories",
    name: "Categories",
    previleges: ["view_category", "view_any_category","create_category","update_category","delete_category"],

  },
  {
    icon: FiAperture,
    path: "/references",
    name: "References",
    previleges: ["view_reference", "view_any_reference","create_reference","update_reference","delete_reference"],
  },
  {
    path: "/contacts",
    icon: FiUsers,
    name: "Contacts",
    previleges: ["view_contact", "view_any_contact","create_contact","update_contact","delete_contact"],
  },
  {
    path: "/blogs",
    icon: FiBookOpen,
    name: "Blogs",
    previleges: ["view_blog", "view_any_blog","create_blog","update_blog","delete_blog"],
  },
  {
    path: "/services",
    icon: FiCompass,
    name: "Services",
    previleges: ["view_service", "view_any_service","create_service","update_service","delete_service"],

  },
  {
    path: "/quotes",
    icon: FiFile,
    name: "Quotes",
    previleges: ["view_quote", "view_any_quote","create_quote","update_quote","delete_quote"],

  },
  {
    icon: FiUser,
    name: "Admins",
    path: "/our-staff",
    previleges: ["view_admin", "view_any_admin","create_admin","update_admin","delete_admin"],


  },

  {
    icon: FiPackage,
    name: "Departments",
    path: "/departments",
    previleges: ["view_department", "view_any_department","create_department","update_department","delete_department"],

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

];

export default sidebar;

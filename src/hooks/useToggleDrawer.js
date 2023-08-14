import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";


const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState("");

  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  const handleUpdate = (id) => {
    setIsLoading(true);
    setServiceId(id);
    toggleDrawer();
    setIsLoading(false);
  };

  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  }; 

  const handleModalOpen = (id, title) => {
    setServiceId(id);
    toggleModal();
    
    setTitle(title);
  };
  // const handleModalOpen = (id, name) => {
  //   setServiceId(id);
  //   toggleModal();
  //   setName(name);
  // };
  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId();
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id,categories) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected categories");
  };


  return {
    title,
    allId,
    id,
    serviceId,
    name,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
  };
};

export default useToggleDrawer;

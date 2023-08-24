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
  //   import { useTranslation } from "react-i18next";
  import { useParams } from "react-router";
  //internal import

  import Tooltip from "components/tooltip/Tooltip";
  import ProjectServices from "services/ProjectServices";
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
  import AdminServices from "services/AdminServices";
  import { showingTranslateValue } from "utils/translate";
  import SettingServices from "services/SettingServices";
  import ProjectDrawer from "components/drawer/ProjectDrawer";
  
  const ProjectDetails = () => {
    //pour recuperer les parametre
    const { id } = useParams();
   
      const [isLoading, setIsLoading]=useState();
 
    const response = useAsync(() => AdminServices.getStaffById(id));
    const { loading } = response;
    const { data } = response.data;


  
    
  



// console.log("dataaaa : ",data)

    return (
      <>
        <MainDrawer product>
        <ProjectDrawer  id={id} 
               isLoading={isLoading} // Passer la variable isLoading
               setIsLoading={setIsLoading} />  
          </MainDrawer>
  
        <PageTitle>{"Admin Previleges"}</PageTitle>
        {loading ? (
          <Loading loading={loading} />
        ) : (


                <TableContainer className="mb-8 rounded-b-lg">
                    <Table>
                                <TableHeader>
                                    <tr>
                                    
                                        
                                        <TableCell>{"ID"}</TableCell>
                                        <TableCell>{"Name"}</TableCell>
                                        <TableCell>{"Description"}</TableCell>
                                    

                                    
                                    </tr>
                                </TableHeader>
                
                    
        
                    
        
                        <TableBody>
                            {data?.previleges && (
                                data.previleges.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                    <span className="text-sm">{item.id}</span>{" "}
                                    </TableCell>
                                    <TableCell>
                                    <span className="text-sm ">{item.name}</span>
                                    </TableCell>
                                    <TableCell>
                                    <span className="text-sm ">{item.description}</span>
                                    </TableCell>
                                </TableRow>
                                ))
                            )}
                            </TableBody>

            </Table>
        </TableContainer>
          
          )}
      
      </>
    );
  };
  
  export default ProjectDetails;
  
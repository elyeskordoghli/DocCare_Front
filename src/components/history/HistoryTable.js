import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import useToggleDrawer from "hooks/useToggleDrawer";
import React, { useState, useEffect } from 'react'
import HistoryServices from "services/HistoryServices";
//internal import  

const HistoryTable = ({ data, isCheck, setIsCheck, currency, lang, isLoading, setIsLoading, history }) => {
  const {
    handleModalOpen,
    serviceId,
    handleUpdate,
    // Destructurer d'autres valeurs ou fonctions nécessaires depuis useToggleDrawer si besoin 
  } = useToggleDrawer();
  return (
    <>
  

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <div className="flex items-center">
            
                
                  <h2 className="text-sm font-medium">
                    {item.id}
                  </h2>
              </div>

            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item.admin_id}
              </span>

            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item.action} 
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item.description} 
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default HistoryTable;

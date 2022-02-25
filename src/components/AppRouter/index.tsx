import React, {FC} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, RouteNames } from '../../router';

const  AppRouter = () => {
  return (
    <Routes>
        {publicRoutes.map(route => 
            <Route path={route.path} 
                    element={<route.component/>} 
                    key={route.path}
            />
        )}
        <Route path={RouteNames.ANY} element={<Navigate to={RouteNames.REGISTER_CLIENT}/>}/>
    </Routes>
  );
}

export default AppRouter;

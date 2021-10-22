import React from "react";
import { Route } from "react-router-dom";

import AdminForm from "../adminForm";

export const AdminUpdateRoutes = (
  <Route path="/admin/:tableName/:id" component={AdminForm}></Route>
);

export const AdminCreateRoutes = (
  <Route path="/admin/:tableName/new" component={AdminForm}></Route>
);

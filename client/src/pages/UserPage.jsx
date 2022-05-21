import React from "react";
import { Outlet } from "react-router-dom";

import WithIndent from "../components/ui/withIndent/WithIndent.jsx";
import UserPanel from "../components/userPanel/UserPanel.jsx";

function UserPage() {
  return (
    <WithIndent>
      <UserPanel />
      <Outlet />
    </WithIndent>
  );
}

export default UserPage;

import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import User from "./_views/User";
import RestaurantDetail from "./_views/RestaurantDetail";
import { PageTitle } from "@/components/PageTitle";

const Profile = () => {
  return (
    <DashboardLayout>
      <PageTitle title="Settings" />
      <User />
      <RestaurantDetail />
    </DashboardLayout>
  );
};

export default Profile;

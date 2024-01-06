import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import User from "./_views/User";
import RestaurantDetail from "./_views/RestaurantDetail";

const Profile = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-medium">Settings</h1>
      <User />
      <RestaurantDetail />
    </DashboardLayout>
  );
};

export default Profile;

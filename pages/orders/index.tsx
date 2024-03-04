import { PageTitle } from "@/components/PageTitle";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Orders = () => {
  return (
    <DashboardLayout>
      <PageTitle
        title="Orders"
        actions={
          <Link href="/orders/new-order">
            <Button>Take Order</Button>
          </Link>
        }
      />
    </DashboardLayout>
  );
};

export default Orders;

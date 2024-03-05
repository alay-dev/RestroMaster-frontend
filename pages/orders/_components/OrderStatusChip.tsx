const OrderStatusChip = ({ status }: { status: "Paid" | "Unpaid" }) => {
  if (status === "Paid") {
    return (
      <p className="py-1 px-3 w-24 border border-blue-300 bg-blue-50 rounded-lg text-xs text-blue-700 text-center">
        {status}
      </p>
    );
  }

  return (
    <p className="py-1 px-3 w-24 border border-orange-300 bg-orange-50 rounded-lg text-xs text-orange-700 text-center">
      {status}
    </p>
  );
};

export default OrderStatusChip;

import { orderApi, useMarkOrderPaidMutation } from "@/api/order";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/config/store";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckCircle } from "solar-icon-set";
import OrderStatusChip from "../_components/OrderStatusChip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OrderTable = ({ data = [] }: { data: Order[] }) => {
  const [markOrderPaid] = useMarkOrderPaidMutation();
  const columnHelper = createColumnHelper<Order>();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleMarkAsPaid = async (id: string) => {
    try {
      await markOrderPaid(id).unwrap();
      dispatch(orderApi.util.invalidateTags(["orders"]));
      toast({ title: "Order marked as paid", description: "" });
    } catch (err) {}
  };

  const columns = [
    columnHelper.accessor((row) => row.created_at, {
      id: "created_at",
      cell: (info) => (
        <span className="text-gray-500">
          {format(info.getValue(), "dd MMM, yyyy")}
        </span>
      ),
      header: () => <p className="min-w-[6rem]">Created at</p>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <p className="text-center min-w-[10rem]">Order ID</p>,
    }),

    columnHelper.accessor("customer_name", {
      header: () => <p className="min-w-[10rem]">Customer</p>,
      cell: ({ row }) => (
        <div className="flex gap-3 items-start">
          <Avatar>
            <AvatarImage
              src={`https://api.multiavatar.com/${row.original.customer_name}`}
            />
            <AvatarFallback>
              {row.original?.customer_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p>{row?.original?.customer_name}</p>
            <p className="text-gray-400 ">{row?.original?.customer_phone} </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("order_total", {
      header: () => <p className="text-center min-w-[5rem]">Order Total</p>,
      cell: (info) => <p>₹ {info.getValue()}</p>,
    }),
    columnHelper.accessor("paid", {
      header: () => <p className="text-center">Status </p>,
      cell: (info) => (
        <div className="w-full flex justify-center">
          <OrderStatusChip status={info.getValue() ? "Paid" : "Unpaid"} />
        </div>
      ),
    }),
    columnHelper.accessor("paid", {
      header: "Action",
      cell: (info) => (
        <div className="w-full flex justify-center">
          {!info?.row?.original?.paid ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => handleMarkAsPaid(info.row?.original?.id)}
                    variant="ghost"
                    size="icon"
                  >
                    <CheckCircle size={22} color="#9E9E9E" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black border-none text-white ">
                  <p className="text-xs">Mark order as paid</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader className="bg-gray-50 rounded-xl overflow-hidden ">
        {table?.getHeaderGroups().map((headerGroup) => (
          <TableRow className="border-none" key={headerGroup.id}>
            {headerGroup.headers.map((header, i) => (
              <TableHead
                className={cn("h-10 font-medium text-black/60 ")}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table?.getRowModel()?.rows?.map((row, i) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell, i) => (
              <TableCell
                className={cn("h-10", i === 0 ? "text-left" : "text-center")}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;

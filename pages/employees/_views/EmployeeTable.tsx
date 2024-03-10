import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/config/store";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employee";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";

const EmployeeTable = ({ data = [] }: { data: Employee[] }) => {
  const columnHelper = createColumnHelper<Employee>();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const columns = [
    columnHelper.accessor((row) => row.created_at, {
      id: "created_at",
      cell: (info) => (
        <span className="text-gray-500">
          {format(info.getValue(), "dd MMM,yyyy")}
        </span>
      ),
      header: () => <span>Created at</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <p className="text-center">Employee ID</p>,
    }),

    columnHelper.accessor("first_name", {
      header: () => "Employee",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={row.original?.photo} />
            <AvatarFallback>
              {row.original?.first_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start ">
            <p>{row?.original?.first_name}</p>
            <p className="text-gray-400">{row?.original?.phone} </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("designation", {
      header: () => <p className="text-center">Designation</p>,
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("date_of_birth", {
      header: () => <p className="text-center">Date of birth</p>,
      cell: (info) => (
        <div className="w-full flex justify-center">
          {format(info.getValue(), "dd MMM,yyyy")}
        </div>
      ),
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: (info) => <div className="w-full flex justify-center"></div>,
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

export default EmployeeTable;

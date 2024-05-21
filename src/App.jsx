import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "./data/data-fake.json";
import { useState } from "react";

const user = {
  id: 9,
  first_name: "Jaquelin",
  last_name: "Burgoin",
  email: "jburgoin8@ovh.net",
  gender: "Female",
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("first_name", {
    id: "Nombre",
    header: () => <span className="">Nombre</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("last_name", {
    header: () => <span>Apellido</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: () => <span>Correo Electrónico</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("gender", {
    header: () => <span>Género</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

function App() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
    state: {
      pagination,
    },
  });

  return (
    <div className="mt-8">
      <div className="w-full max-w-[500px] mx-auto">
        <div className="flex flex-col gap-1 w-full max-w-[200px]">
          <label htmlFor="" className="font-medium text-sm">
            Filtrar por nombre
          </label>
          <input
            type="text"
            className="border border-zinc-500 rounded-sm h-7 flex items-center justify-center text-sm px-2"
            placeholder="Escribe algo..."
            onChange={(e) => {
              console.log(e.currentTarget.value);
              table.getColumn("Nombre").setFilterValue(e.currentTarget.value);
            }}
          />
        </div>
      </div>

      <div className="border border-zinc-300 w-full max-w-[500px] overflow-x-scroll mx-auto px-6 py-2 mt-4 rounded-md">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {!!table.getRowModel().rows.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-zinc-300">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <>
                <tr className="">
                  <td colSpan={columns.length} className="py-8 text-center">
                    No hay resultados
                  </td>
                </tr>
              </>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>

      <div className="flex items-center justify-center mt-8 gap-4">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="bg-zinc-800 rounded-md text-zinc-100 px-6 h-10 hover:bg-zinc-700 transition-all duration-200 text-sm"
        >
          Atrás
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="bg-zinc-800 rounded-md text-zinc-100 px-6 h-10 hover:bg-zinc-700 transition-all duration-200 text-sm"
        >
          Adelante
        </button>
      </div>
    </div>
  );
}

export default App;

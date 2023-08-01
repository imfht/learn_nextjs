'use client'
import React from "react";

import {createColumnHelper, flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'

export default function App() {
    // const [isLoading, setIsLoading] = React.useState(true);


    type Person = {
        firstName: string
        lastName: string
        age: number
        visits: number
        status: string
        progress: number
    }
    const columnHelper = createColumnHelper<Person>()
    const defaultData: Person[] = [
        {
            firstName: 'tanner',
            lastName: 'linsley',
            age: 24,
            visits: 100,
            status: 'In Relationship',
            progress: 50,
        },
        {
            firstName: 'tandy',
            lastName: 'miller',
            age: 40,
            visits: 40,
            status: 'Single',
            progress: 80,
        },
        {
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
    ]
    const [data, setData] = React.useState(() => [...defaultData])
    const columns = [
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.lastName, {
            id: 'lastName',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Last Name</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            footer: info => info.column.id,
        }),
        columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: info => info.column.id,
        }),
    ]
    const table = useReactTable({
        columns: columns,
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <div className="p-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="px-6 py-3">
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
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
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
            <div className="h-4"/>
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    );
}

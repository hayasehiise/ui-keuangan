import { createFileRoute, useSearch, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { getProdukOption } from '@/query/produk'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/_layout/produk')({
  component: ProdukPage,
  validateSearch: (search) => {
    return {
      page: Number(search.page) || 1,
      limit: Number(search.limit) || 10,
      search: String(search.search || ''),
    }
  },
})

function ProdukPage() {
  const { page, limit, search } = useSearch({ from: '/_layout/produk' })
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery(
    getProdukOption(page, limit, search),
  )
  const [searchData, setSearchData] = useState(search)
  const [limitValue, setLimitValue] = useState(limit)
  const [pageValue, setPageValue] = useState(page)

  useEffect(() => {
    const handlerSearch = setTimeout(() => {
      navigate({
        to: '/produk',
        search: { page: pageValue, limit: limitValue, search: searchData },
      })
    }, 500)

    return () => clearTimeout(handlerSearch)
  }, [pageValue, searchData, limitValue, navigate])

  const columns = useMemo(
    () => [
      {
        header: '#',
        cell: (info) => {
          return info.row.index + 1 + (pageValue - 1) * limitValue
        },
      },
      { accessorKey: 'nama', header: 'Nama Produk' },
      {
        accessorKey: 'harga',
        header: 'Harga',
        cell: (info) => `Rp.${info.getValue().toLocaleString('id-ID')}`,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: (info) => (
          <span className={info.getValue() < 5 ? 'text-red-500 font-bold' : ''}>
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => (info.getValue() === 'TERSEDIA' ? 'Tersedia' : 'Habis'),
      },
      {
        accessorKey: 'createdAt',
        header: 'Tanggal Input Data',
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
      },
      {
        header: 'Aksi',
        cell: () => (
          <div className="flex gap-2">
            <button className="btn btn-xs">+1 stok</button>
            <button className="btn btn-xs btn-warning">Update</button>
            <button className="btn btn-xs btn-error">Delete</button>
          </div>
        ),
      },
    ],
    [pageValue, limitValue],
  )
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex flex-col w-full px-10 py-5 justify-center items-center">
        <img src="/loading.gif" alt="loading" className="w-40" />
      </div>
    )
  }
  if (isError) return <div>Error Fetching Data</div>
  return (
    <div className="flex flex-col w-full px-10 py-5 gap-5">
      <p className="font-black text-4xl">Produk Page</p>
      <div className="flex flex-row mb-4 gap-5">
        <input
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari produk..."
          className="input"
        />
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
            {/* <tr>
              <th></th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Tanggal Input Data</th>
              <th colSpan={3}>Aksi</th>
            </tr> */}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {/* {data.data.map((produk, index) => (
              <tr key={produk.id}>
                <td>{index + 1}</td>
                <td>{produk.nama}</td>
                <td>{produk.harga}</td>
                <td>{produk.stock}</td>
                <td>{produk.status === 'TERSEDIA' ? 'Tersedia' : 'Habis'}</td>
                <td>
                  {new Date(produk.createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td>+1 stok</td>
                <td>Update</td>
                <td>Delete</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

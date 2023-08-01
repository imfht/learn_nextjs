'use client'

import React, {useEffect, useState} from "react";

const Page = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('api/programs/123')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data.data)
                setLoading(false)
            })
        console.log(data)
    }, [])
    return (
        // show post data in table format
        <div>
            <h2 className="text-1xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight ">风险列表</h2>
            <div className="divider"></div>
            <h2 className="text-1xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight mt-8">资产清单</h2>
            <div className="divider"></div>
            <div className=" ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            主域名
                        </th>
                        <th scope="col" className="px-6 py-3">
                            关联子域名个数
                        </th>
                        <th scope="col" className="px-6 py-3">
                            存活子域名个数
                        </th>
                        <th scope="col" className="px-6 py-3">
                            关联IP个数
                        </th>
                        <th scope="col" className="px-6 py-3">
                            关联ASN个数
                        </th>
                        <th scope="col" className="px-6 py-3">
                            关联端口个数
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((post) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {post.domains}
                            </th>
                            <td className="px-6 py-4">
                                {post.subdomain_size}
                            </td>
                            <td className="px-6 py-4">
                                {post.valid_subdomain_size}
                            </td>

                            <td className="px-6 py-4">
                                {post.ip_size}
                            </td>
                            <td className="px-6 py-4">
                                {post.asn_size}
                            </td>
                            <td className="px-6 py-4">
                                {post.port_size}
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                <div className="w-36 float-right pt-5">
                    <div className="join grid grid-cols-2">
                        <button className="join-item btn btn-outline btn-sm		">上一页</button>
                        <button className="join-item btn btn-outline btn-sm		">下一页</button>
                    </div>
                </div>
            </div>
            <h2 className="text-1xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight mt-8">疑似影子资产</h2>
            <div className="divider"></div>
        </div>
    )
}

export default Page;
'use client'

import React, {useEffect, useState} from "react";

const Page = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/programs')
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
            <h2>数据统计</h2>
            <h3>123123</h3>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">累计项目数</div>
                    <div className="stat-value">498</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">收集域名数</div>
                    <div className="stat-value">498</div>
                    <div className="stat-desc">21% 个子域名包含在内</div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">相关IP数</div>
                    <div className="stat-value">498</div>
                    <div className="stat-desc">345 个开放的服务包含在内</div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">包含警告数</div>
                    <div className="stat-value">498</div>
                    <div className="stat-desc">高风险：1，中风险：2，低风险：3</div>
                </div>
            </div>


            <h2 className="card-title">Your Bounty Info</h2>
            <hr/>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Bounty名称</th>
                        <th scope="col" className="px-6 py-3">主域名数量</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((post) => (
                        <tr key={post._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{post._id}</td>
                            <td className="px-6 py-4">{post.name}</td>
                            <td className="px-6 py-4">{post.domains_count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="join grid grid-cols-2">
                    <button className="join-item btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default Page;
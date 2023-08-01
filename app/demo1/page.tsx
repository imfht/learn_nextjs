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
            <h2 className="text-1xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight ">数据统计</h2>
            <div className="divider"></div>
            <div className="grid grid-cols-4 gap-4">
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
            </div>

            <h2 className="text-1xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight mt-8">项目列表</h2>
            <div className="divider"></div>
            <div className=" ">
                <div className="grid grid-cols-3 gap-4">
                    {data && data.map((post) => (
                        <div>
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                {/*<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>*/}
                                {/*</figure>*/}
                                <div className="card-body">
                                    <h2 className="card-title">{post.name}</h2>
                                    <div>
                                        域名: <div className="badge-info"> {post.domains_count}</div>
                                        IP: <div className="badge-info"> {post.domains_count}</div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn ">查看信息</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="join grid grid-cols-2 bg-clip-padding">
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
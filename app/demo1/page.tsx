'use client'

import React, {useEffect, useState} from "react";

const Page = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/posts')
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
            <h2 className="-1">Posts Here</h2>
            <hr/>
            <div className="flex">
                <table className="border-collapse border border-slate-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((post) => (
                        <tr key={post._id} className="border border-slate-300 w-1/2 ">
                            <td>{post._id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page;
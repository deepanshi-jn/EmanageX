import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AllTask = () => {
    const [userData] = useContext(AuthContext)

    return (
        <div className="bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-6 mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-6">Task Overview</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-black">
                            <th className="px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-300 min-w-[150px]">Employee Name</th>
                            <th className="px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-300 min-w-[100px]">New Task</th>
                            <th className="px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-300 min-w-[100px]">Active Task</th>
                            <th className="px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-300 min-w-[100px]">Completed</th>
                            <th className="px-4 py-3 text-center text-sm sm:text-base font-semibold text-gray-300 min-w-[100px]">Failed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((element) => (
                            <tr
                                key={element.id}
                                className="bg-[#1e1e1e] border-b border-gray-800 hover:bg-[#222222]"
                            >
                                <td className="px-4 py-3 text-center text-sm sm:text-base text-gray-100">
                                    {element.firstName}
                                </td>
                                <td className="px-4 py-3 text-center text-sm sm:text-base text-gray-300">
                                    {element.taskCounts.newTask}
                                </td>
                                <td className="px-4 py-3 text-center text-sm sm:text-base text-gray-300">
                                    {element.taskCounts.active}
                                </td>
                                <td className="px-4 py-3 text-center text-sm sm:text-base text-gray-300">
                                    {element.taskCounts.completed}
                                </td>
                                <td className="px-4 py-3 text-center text-sm sm:text-base text-gray-300">
                                    {element.taskCounts.failed}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllTask

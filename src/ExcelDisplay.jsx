import React, { useState } from 'react';
import { parseExcel } from './parseExcel';
import dayjs from 'dayjs';

const ExcelDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('');

    const handleFileUpload = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const parsedData = await parseExcel(file);
        setData(parsedData);
        setLoading(false);
    };

    const filterData = (isDelayed) => {
        const today = dayjs();
        return data.slice(1).filter(row => {
            const implDate = dayjs(row[6], 'DD-MMM-YYYY'); // Adjust the date format as needed
            return isDelayed ? today.isBefore(implDate) : today.isAfter(implDate);
        });
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Excel File Viewer</h1>
            <input 
                type="file" 
                onChange={handleFileUpload} 
                className="mb-8 block w-full text-lg text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {loading && <p className="text-center text-blue-600 text-lg">Loading...</p>}
            {data.length > 0 && (
                <div className="flex justify-center space-x-4 mb-8">
                    <button 
                        onClick={() => setView('delayed')} 
                        className="px-6 py-3 bg-red-500 text-white rounded-lg text-xl font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Delayed
                    </button>
                    <button 
                        onClick={() => setView('upcoming')} 
                        className="px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Upcoming
                    </button>
                </div>
            )}
            {view && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-4 px-6 border-b border-gray-200 text-left text-sm uppercase font-semibold">ECN_NO</th>
                                <th className="py-4 px-6 border-b border-gray-200 text-left text-sm uppercase font-semibold">TITLE</th>
                                <th className="py-4 px-6 border-b border-gray-200 text-left text-sm uppercase font-semibold">LIKELY IMPL DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData(view === 'delayed').map((row, rowIndex) => (
                                <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}>
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm">{row[1]}</td> {/* ECN_NO column */}
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm">{row[2]}</td> {/* TITLE column */}
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm">{row[6]}</td> {/* LIKELY IMPL DATE column */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExcelDisplay;

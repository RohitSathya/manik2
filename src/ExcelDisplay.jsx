import React, { useState, useEffect } from 'react';
import { parseExcel } from './parseExcel';
import dayjs from 'dayjs';
import ECNDetails from './ECNDetails';

const ExcelDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('');
    const [counts, setCounts] = useState({ delayed: 0, upcoming: 0 });
    const [selectedECN, setSelectedECN] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            let delayedCount = 0;
            let upcomingCount = 0;

            data.slice(1).forEach(row => {
                const likelyImplDate = row[13] ? dayjs(row[13], 'DD-MMM-YYYY') : null; // Likely Impl Date
                const actualImplDate = row[14] ? dayjs(row[14], 'DD-MMM-YYYY') : null; // Actual Impl Date

                if (likelyImplDate) {
                    if (actualImplDate) {
                        if (likelyImplDate.isAfter(actualImplDate)) {
                            upcomingCount++;
                        } else {
                            delayedCount++;
                        }
                    } else {
                        delayedCount++;
                    }
                }
            });

            setCounts({ delayed: delayedCount, upcoming: upcomingCount });
        }
    }, [data]);

    const handleFileUpload = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const parsedData = await parseExcel(file);
        setData(parsedData);
        setLoading(false);
    };

    const filterData = (isDelayed) => {
        return data.slice(1).filter(row => {
            const likelyImplDate = row[13] ? dayjs(row[13], 'DD-MMM-YYYY') : null; // Likely Impl Date
            const actualImplDate = row[14] ? dayjs(row[14], 'DD-MMM-YYYY') : null; // Actual Impl Date

            if (likelyImplDate) {
                if (isDelayed) {
                    return actualImplDate ? !likelyImplDate.isAfter(actualImplDate) : true;
                } else {
                    return actualImplDate ? likelyImplDate.isAfter(actualImplDate) : false;
                }
            }
            return false;
        });
    };

    const handleECNClick = (ecn) => {
        setSelectedECN(ecn);
    };

    const closeECNDetails = () => {
        setSelectedECN(null);
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
                        Implemented <br /> {counts.delayed}
                    </button>
                    <button 
                        onClick={() => setView('upcoming')} 
                        className="px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Pending <br /> {counts.upcoming}
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
                                <th className="py-4 px-6 border-b border-gray-200 text-left text-sm uppercase font-semibold">
                                    {view === 'delayed' ? 'LIKELY IMPL DATE' : 'ACTUAL IMPL DATE'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData(view === 'delayed').map((row, rowIndex) => (
                                <tr 
                                    key={rowIndex} 
                                    className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50 cursor-pointer`}
                                    onClick={() => handleECNClick(row)}
                                >
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm">{row[2]}</td> {/* ECN_NO column */}
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm">{row[5]}</td> {/* TITLE column */}
                                    <td className="py-4 px-6 border-b border-gray-200 text-sm" onClick={()=>console.log(row)}>{view === 'delayed' ? row[13] : row[14]}</td> {/* Date column */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedECN && <ECNDetails ecnDetails={selectedECN} onClose={closeECNDetails} />}
        </div>
    );
};

export default ExcelDisplay;

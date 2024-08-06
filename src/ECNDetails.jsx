import React from 'react';

const ECNDetails = ({ ecnDetails, onClose }) => {
    if (!ecnDetails) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-2xl relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">ECN Details</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">ECN_NO</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">{ecnDetails[2]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">Current</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[6]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">New</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[7]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">Area</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[3]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">Station No.</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[4]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">Description</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[8]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">FPP Status</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[9]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">FPP Date</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[10]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">FPP Cut Off Number</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[11]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">ECN Likely</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[13]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">ECN Actual</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[14]}</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm font-semibold">ECN Cut Off Number</td>
                            <td className="py-3 px-6 border-b border-gray-200 text-left text-sm">{ecnDetails[15]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ECNDetails;

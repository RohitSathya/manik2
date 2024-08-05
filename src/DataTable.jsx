import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">ECN NO.</th>
            <th className="py-2 px-4 border-b">Part Name</th>
            <th className="py-2 px-4 border-b">Likely Implementation Date</th>
            <th className="py-2 px-4 border-b">Actual Implementation Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{item['ECN NO']}</td>
              <td className="py-2 px-4 border-b">{item['TITLE']}</td>
              <td className="py-2 px-4 border-b">{item['Likely Implementation Date']}</td>
              <td className="py-2 px-4 border-b">{item['ACT. IMP. DATE']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

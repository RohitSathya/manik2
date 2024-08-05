import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ECNTable = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Log headers and first few rows of data
            console.log('Headers:', jsonData[0]);
            console.log('First few rows of data:', jsonData.slice(0, 5));

            // Extract headers
            const headers = jsonData[0];
            const relevantColumns = {
                ECN_NO: headers.indexOf('ECN_NO'),
                TITLE: headers.indexOf('TITLE'),
                LIKELY_IMPL_DATE: headers.indexOf('LIKELY\nIMPL DATE'),
                ACT_IMPL_DATE: headers.indexOf('ACT. \nIMPL\n DATE')
            };

            // Log the relevant columns
            console.log('Relevant Columns:', relevantColumns);

            // Extract relevant data
            const filteredData = jsonData.slice(1).map(row => ({
                ECN_NO: row[relevantColumns.ECN_NO],
                TITLE: row[relevantColumns.TITLE],
                LIKELY_IMPL_DATE: row[relevantColumns.LIKELY_IMPL_DATE],
                ACT_IMPL_DATE: row[relevantColumns.ACT_IMPL_DATE]
            }));

            // Log the filtered data
            console.log('Filtered Data:', filteredData);

            setData(filteredData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <h2>ECN Table</h2>
            <input type="file" onChange={handleFileUpload} />
            <table border="1">
                <thead>
                    <tr>
                        <th>ECN_NO</th>
                        <th>TITLE</th>
                        <th>LIKELY_IMPL_DATE</th>
                        <th>ACT_IMPL_DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.ECN_NO}</td>
                            <td>{row.TITLE}</td>
                            <td>{row.LIKELY_IMPL_DATE}</td>
                            <td>{row.ACT_IMPL_DATE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ECNTable;

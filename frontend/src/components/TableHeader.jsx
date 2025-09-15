// TableHeader.jsx
const TableHeader = () => {
    const headers = [
      "Farm Name",
      "Activity Type",
      "Description",
      "Supervisor",
      "Area Covered",
      "Amount",
      "Duration",
      "Date",
      "Actions",
    ];
  
    return (
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  
  export default TableHeader;
  
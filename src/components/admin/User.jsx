import React, { useState, useEffect } from "react";

export default function Users() {
  // Dummy 50 users with first and last names
  const allUsers = Array.from({ length: 50 }, (_, i) => {
    const firstNames = ["Ali", "Ahmed", "Fatima", "Ayesha", "Usman", "Hassan", "Zainab", "Bilal", "Sana", "Omar"];
    const lastNames = ["Khan", "Ali", "Ahmed", "Hussain", "Malik", "Raza", "Shah", "Qureshi", "Baig", "Sheikh"];
    
    const firstName = firstNames[i % 10];
    const lastName = lastNames[i % 10];
    const username = `${firstName} ${lastName}`;
    
    return {
      id: i + 1,
      firstName,
      lastName,
      username,
      email: `user${i + 1}@example.com`,
      phone: `0300-${String(i + 1).padStart(7, '0')}`,
      cnic: `35202-${String(i + 1).padStart(7, '0')}-1`,
      city: i % 2 === 0 ? "Lahore" : "Karachi",
      employeeId: `EMP${1000 + i}`,
      address: `Street ${i + 1}, ${i % 2 === 0 ? "Lahore" : "Karachi"}`,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    username: true,
    email: true,
    phone: true,
    cnic: true,
    city: true,
    employeeId: true,
    address: true
  });
  const usersPerPage = 20;

  // Handle responsive column visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Define breakpoints and which columns to show/hide
      if (width < 640) { // Very small screens
        setVisibleColumns({
          username: true,
          email: false,
          phone: true,
          cnic: false,
          city: false,
          employeeId: false,
          address: false
        });
      } else if (width < 768) { // Small screens
        setVisibleColumns({
          username: true,
          email: true,
          phone: true,
          cnic: false,
          city: true,
          employeeId: false,
          address: false
        });
      } else if (width < 1024) { // Medium screens
        setVisibleColumns({
          username: true,
          email: true,
          phone: true,
          cnic: true,
          city: true,
          employeeId: false,
          address: true
        });
      } else if (width < 1280) { // Large screens
        setVisibleColumns({
          username: true,
          email: true,
          phone: true,
          cnic: true,
          city: true,
          employeeId: true,
          address: true
        });
      } else { // Extra large screens
        setVisibleColumns({
          username: true,
          email: true,
          phone: true,
          cnic: true,
          city: true,
          employeeId: true,
          address: true
        });
      }
    };

    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Users</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              {visibleColumns.username && <th className="p-2 md:p-3 text-left">Username</th>}
              {visibleColumns.email && <th className="p-2 md:p-3 text-left">Email</th>}
              {visibleColumns.phone && <th className="p-2 md:p-3 text-left">Phone</th>}
              {visibleColumns.cnic && <th className="p-2 md:p-3 text-left hidden lg:table-cell">CNIC</th>}
              {visibleColumns.city && <th className="p-2 md:p-3 text-left hidden md:table-cell">City</th>}
              {visibleColumns.employeeId && <th className="p-2 md:p-3 text-left hidden xl:table-cell">Employee ID</th>}
              {visibleColumns.address && <th className="p-2 md:p-3 text-left hidden md:table-cell">Address</th>}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-600"
              >
                {visibleColumns.username && <td className="p-2 md:p-3">{user.username}</td>}
                {visibleColumns.email && <td className="p-2 md:p-3 truncate max-w-[120px]">{user.email}</td>}
                {visibleColumns.phone && <td className="p-2 md:p-3">{user.phone}</td>}
                {visibleColumns.cnic && <td className="p-2 md:p-3 hidden lg:table-cell">{user.cnic}</td>}
                {visibleColumns.city && <td className="p-2 md:p-3 hidden md:table-cell">{user.city}</td>}
                {visibleColumns.employeeId && <td className="p-2 md:p-3 hidden xl:table-cell">{user.employeeId}</td>}
                {visibleColumns.address && <td className="p-2 md:p-3 hidden md:table-cell truncate max-w-[180px]">{user.address}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm md:text-base">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
        
        {/* Column visibility info for small screens */}
        <div className="mt-2 sm:mt-0 text-xs text-gray-400 text-center">
          {window.innerWidth < 640 && "Swipe to see more columns →"}
        </div>
      </div>
    </div>
  );
}
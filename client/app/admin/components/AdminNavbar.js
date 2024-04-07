
const AdminNavbar = () => {
    return (
        <nav className="bg-white bg-opacity-80 rounded-2xl flex justify-between items-center
        p-2 mb-10">
            <button className="bg-red-600 text-white px-4 py-2 rounded-full">Add Commerce</button>
            <input type="text" placeholder="Search" className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </nav>
    );
};

export default AdminNavbar;
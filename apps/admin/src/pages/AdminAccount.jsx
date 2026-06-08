

const AdminAccount = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Account</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-prime text-gold flex items-center justify-center text-4xl font-bold">
            A
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
            <p className="text-gray-500">admin@estatecore.com</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
          </div>
        </div>
        
        <form className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" defaultValue="admin@estatecore.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold outline-none transition-shadow" />
          </div>
          <div className="pt-4">
            <button type="button" className="bg-prime text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAccount;



const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
        {/* General Settings */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">General Settings</h2>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Site Name</h3>
                <p className="text-sm text-gray-500">The name of your application.</p>
              </div>
              <input type="text" defaultValue="EstateCore" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold outline-none w-64" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Contact Email</h3>
                <p className="text-sm text-gray-500">Public email address for support.</p>
              </div>
              <input type="email" defaultValue="support@estatecore.com" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold outline-none w-64" />
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Notifications</h2>
          <div className="space-y-4 max-w-2xl">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-gold rounded focus:ring-gold focus:ring-offset-0 border-gray-300" />
              <span className="text-gray-700 font-medium">Email alerts for new buy requests</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-gold rounded focus:ring-gold focus:ring-offset-0 border-gray-300" />
              <span className="text-gray-700 font-medium">Email alerts for new user registrations</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-gold rounded focus:ring-gold focus:ring-offset-0 border-gray-300" />
              <span className="text-gray-700 font-medium">Weekly summary reports</span>
            </label>
          </div>
        </section>

        <div className="pt-6">
          <button type="button" className="bg-prime text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

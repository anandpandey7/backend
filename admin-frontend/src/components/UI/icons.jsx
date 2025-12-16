import React, { useState } from 'react';

export default function IconsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left navbar links */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 rounded hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <a href="#" className="hidden md:block text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="hidden md:block text-gray-700 hover:text-gray-900">Contact</a>
            </div>

            {/* Right navbar links */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button className="p-2 text-gray-600 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Messages Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMessagesOpen(!messagesOpen)}
                  className="p-2 text-gray-600 rounded hover:bg-gray-100 relative"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
                </button>
                {messagesOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                      {[
                        { name: 'Brad Diesel', msg: 'Call me whenever you can...', time: '4 Hours Ago', starred: 'red' },
                        { name: 'John Pierce', msg: 'I got your message bro', time: '4 Hours Ago', starred: 'gray' },
                        { name: 'Nora Silvester', msg: 'The subject goes here', time: '4 Hours Ago', starred: 'yellow' }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <a href="#" className="flex gap-3 hover:bg-gray-50 p-2 rounded">
                            <img src="https://via.placeholder.com/50" alt="User" className="w-12 h-12 rounded-full" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm">{item.name}</h3>
                                <svg className={`w-4 h-4 text-${item.starred}-500`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                              <p className="text-xs text-gray-600">{item.msg}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                {item.time}
                              </p>
                            </div>
                          </a>
                          {idx < 2 && <hr className="my-2" />}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200">
                      <a href="#" className="block p-3 text-center text-sm text-gray-600 hover:bg-gray-50">See All Messages</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-600 rounded hover:bg-gray-100 relative"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full">15</span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200 font-semibold text-sm">15 Notifications</div>
                    <div className="p-2 space-y-1">
                      <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm">
                          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          4 new messages
                        </span>
                        <span className="text-xs text-gray-400">3 mins</span>
                      </a>
                      <hr />
                      <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm">
                          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          8 friend requests
                        </span>
                        <span className="text-xs text-gray-400">12 hours</span>
                      </a>
                      <hr />
                      <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm">
                          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          3 new reports
                        </span>
                        <span className="text-xs text-gray-400">2 days</span>
                      </a>
                    </div>
                    <div className="border-t border-gray-200">
                      <a href="#" className="block p-3 text-center text-sm text-gray-600 hover:bg-gray-50">See All Notifications</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button className="p-2 text-gray-600 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" />
                </svg>
              </button>

              {/* User Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-gray-100"
                >
                  <img src="https://via.placeholder.com/32" alt="User" className="w-8 h-8 rounded-full shadow" />
                  <span className="hidden md:inline text-sm font-medium">Alexander Pierce</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="bg-blue-600 text-white p-6 text-center rounded-t-lg">
                      <img src="https://via.placeholder.com/80" alt="User" className="w-20 h-20 rounded-full mx-auto mb-3 shadow" />
                      <p className="font-semibold">Alexander Pierce - Web Developer</p>
                      <small className="text-blue-100">Member since Nov. 2023</small>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <a href="#" className="text-sm hover:underline">Followers</a>
                        <a href="#" className="text-sm hover:underline">Sales</a>
                        <a href="#" className="text-sm hover:underline">Friends</a>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 p-3 flex justify-between">
                      <a href="#" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Profile</a>
                      <a href="#" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Sign out</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-20 w-64 h-screen pt-16 transition-transform bg-gray-800 border-r border-gray-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 pb-4 overflow-y-auto">
          {/* Brand */}
          <div className="py-4 border-b border-gray-700">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-lg font-light text-white">AdminLTE 4</span>
            </a>
          </div>

          {/* Menu */}
          <ul className="space-y-2 font-medium mt-4 text-sm">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-white bg-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="ml-3">UI Elements</span>
              </a>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    <span className="ml-2">General</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-white bg-blue-500 rounded-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    <span className="ml-2">Icons</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                    <span className="ml-2">Timeline</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="mt-4 mb-2 text-xs text-gray-500 uppercase">Examples</div>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                <span className="ml-3">Forms</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                <span className="ml-3">Tables</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-16 transition-all`}>
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Icons</h3>
            <nav className="text-sm text-gray-600">
              <a href="#" className="hover:underline">Home</a>
              <span className="mx-2">/</span>
              <span>Icons</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          <div className="col-12">
            <div className="bg-white rounded-lg shadow-sm border border-blue-200">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-blue-600">Icons</h3>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  You can use any font library you like with AdminLTE 4.
                </p>
                <strong className="text-gray-900">Recommendations</strong>
                <ul className="mt-2 ml-6 list-disc space-y-2 text-blue-600">
                  <li>
                    <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Font Awesome
                    </a>
                  </li>
                  <li>
                    <a href="https://useiconic.com/open/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Iconic Icons
                    </a>
                  </li>
                  <li>
                    <a href="https://ionicons.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Ion Icons
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`bg-white border-t border-gray-200 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-8 transition-all`}>
        <div className="px-4 py-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            <strong>Copyright &copy; 2014-2025 </strong>
            <a href="https://adminlte.io" className="text-blue-600 hover:underline">AdminLTE.io</a>.
            All rights reserved.
          </div>
          <div className="hidden sm:block">Anything you want</div>
        </div>
      </footer>
    </div>
  );
}
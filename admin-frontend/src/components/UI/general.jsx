import React, { useState, useEffect } from 'react';

export default function GeneralUIElements() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState('collapseOne');
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [toasts, setToasts] = useState({});

  useEffect(() => {
    // Initialize Bootstrap tooltips would go here
    // In a real implementation, you'd use Bootstrap's JS
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const showToast = (toastId) => {
    setToasts(prev => ({ ...prev, [toastId]: true }));
    setTimeout(() => {
      setToasts(prev => ({ ...prev, [toastId]: false }));
    }, 5000);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 rounded hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="ml-4 text-xl font-semibold hidden md:block">Home</span>
              <span className="ml-4 text-xl font-semibold hidden md:block">Contact</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 rounded hover:bg-gray-100 relative">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                  </svg>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://via.placeholder.com/32" alt="User" className="w-8 h-8 rounded-full" />
                <span className="hidden md:inline text-sm font-medium">Alexander Pierce</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-20 w-64 h-screen pt-16 transition-transform bg-gray-800 border-r border-gray-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <div className="py-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-lg font-light text-white">AdminLTE 4</span>
            </div>
          </div>
          <ul className="space-y-2 font-medium mt-4">
            <li>
              <a href="#" className="flex items-center p-2 text-white hover:bg-gray-700 rounded-lg">
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-white bg-blue-600 rounded-lg">
                <span className="ml-3">UI Elements</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-16 transition-all`}>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2">General UI Elements</h3>
          <nav className="text-sm text-gray-600">
            <a href="#" className="hover:underline">Home</a>
            <span className="mx-2">/</span>
            <span>General UI Elements</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Accordion */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-blue-600">Accordion</h4>
            <div className="space-y-2">
              {['One', 'Two', 'Three'].map((item, idx) => (
                <div key={item} className="border border-gray-200 rounded">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === `collapse${item}` ? '' : `collapse${item}`)}
                    className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50 flex justify-between items-center"
                  >
                    Accordion Item #{idx + 1}
                    <svg className={`w-5 h-5 transform transition-transform ${activeAccordion === `collapse${item}` ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeAccordion === `collapse${item}` && (
                    <div className="px-4 py-3 border-t border-gray-200">
                      <strong>This is the {item.toLowerCase()} item's accordion body.</strong> It contains example content demonstrating the accordion functionality.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-green-600">Alert</h4>
            <div className="space-y-3">
              {[
                { color: 'blue', label: 'primary' },
                { color: 'gray', label: 'secondary' },
                { color: 'green', label: 'success' },
                { color: 'red', label: 'danger' },
                { color: 'yellow', label: 'warning' },
                { color: 'blue', label: 'info' }
              ].map(({ color, label }) => (
                <div key={label} className={`p-4 rounded bg-${color}-100 text-${color}-800 border border-${color}-200`}>
                  A simple {label} alert with <a href="#" className="font-bold underline">an example link</a>. Give it a click if you like.
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-yellow-600">Badge</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl">Example heading <span className="px-2 py-1 text-sm bg-gray-500 text-white rounded">New</span></h1>
                <h2 className="text-3xl">Example heading <span className="px-2 py-1 text-xs bg-gray-500 text-white rounded">New</span></h2>
              </div>
              <hr />
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 relative">
                Notifications <span className="ml-2 px-2 py-1 text-xs bg-gray-500 rounded">4</span>
              </button>
              <hr />
              <div className="flex flex-wrap gap-2">
                {['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info'].map(color => (
                  <span key={color} className={`px-3 py-1 text-sm text-white rounded ${
                    color === 'Primary' ? 'bg-blue-600' :
                    color === 'Secondary' ? 'bg-gray-600' :
                    color === 'Success' ? 'bg-green-600' :
                    color === 'Danger' ? 'bg-red-600' :
                    color === 'Warning' ? 'bg-yellow-600' :
                    'bg-blue-400'
                  }`}>
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-red-600">Button</h4>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Primary</button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Secondary</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Success</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Danger</button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">Warning</button>
                <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500">Info</button>
              </div>
              <hr />
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50">Primary</button>
                <button className="px-4 py-2 border-2 border-gray-600 text-gray-600 rounded hover:bg-gray-50">Secondary</button>
                <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded hover:bg-green-50">Success</button>
              </div>
              <hr />
              <div className="flex gap-2 items-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg">Large button</button>
                <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">Small button</button>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-blue-600">Progress</h4>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-600 h-4 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-red-600 h-4 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* Spinners */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-green-600">Spinner</h4>
            <div className="flex flex-wrap gap-4">
              {['blue', 'gray', 'green', 'red', 'yellow', 'blue'].map((color, idx) => (
                <div key={idx} className={`w-8 h-8 border-4 border-${color}-600 border-t-transparent rounded-full animate-spin`}></div>
              ))}
            </div>
          </div>

          {/* List Group */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-yellow-600">List Group</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <a href="#" className="block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700">
                The current link item
              </a>
              <a href="#" className="block px-4 py-3 border-t border-gray-200 hover:bg-gray-50">
                A second link item
              </a>
              <a href="#" className="block px-4 py-3 border-t border-gray-200 hover:bg-gray-50">
                A third link item
              </a>
              <a href="#" className="block px-4 py-3 border-t border-gray-200 text-gray-400 cursor-not-allowed">
                A disabled link item
              </a>
            </div>
          </div>

          {/* Toast Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold mb-4 text-blue-600">Toast</h4>
            <div className="space-y-2">
              <button
                onClick={() => showToast('default')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              >
                Show toast
              </button>
              <button
                onClick={() => showToast('success')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
              >
                Show success toast
              </button>
              <button
                onClick={() => showToast('danger')}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
              >
                Show danger toast
              </button>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          {Object.entries(toasts).map(([id, show]) => show && (
            <div key={id} className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] animate-slide-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    id === 'success' ? 'bg-green-600' :
                    id === 'danger' ? 'bg-red-600' :
                    'bg-blue-600'
                  }`}></div>
                  <strong>Bootstrap</strong>
                  <small className="text-gray-500">11 mins ago</small>
                </div>
                <button
                  onClick={() => setToasts(prev => ({ ...prev, [id]: false }))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="mt-2 text-sm">Hello, world! This is a toast message.</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
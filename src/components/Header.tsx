import type React from "react";
import { useState } from "react";
import { Home, User, Menu, X } from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Header: React.FC= () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/' },
    { icon: <User size={20} />, label: 'Profile', href: '/profile' },
  ];

  return (
   <div className="relative">
      {/* Header */}
      <header style={{ backgroundColor: "#F4E5C0" }} className="shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-900">Logo</span>
          <h1 className="text-xl font-semibold text-gray-900">ArkTol</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {/*<div style={{backgroundColor: '#F4E5C0'}} className="flex flex-col justify-between p-4 m-3 border-gray-200 rounded-xl"> */}
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full shadow- transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? '-translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '280px', backgroundColor: '#C7B996' }}
      >
        
        <div style={{backgroundColor: '#F4E5C0'}} className="m-3 p-4 border-gray-1000 rounded-xl">
          <div  className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav style={{backgroundColor: '#F4E5C0'}} className="m-3 p-2 border-gray-1000 rounded-xl">
          <ul className="space-y-1 ">
            {sidebarItems.map((item, index) => (
              <li key={index}>
          <a
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              console.log(`Navigating to ${item.label}`);
            }}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </a>
              </li>
            ))}
          </ul>
        </nav>
            </div>


      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default Header;

import React from "react";

const NavBar = ({ activeTab, setActiveTab, saveDocumentAsHtml, exportToWord }) => {
  return (
    <div className="w-full bg-gray-200 p-2 shadow-lg flex flex-col md:flex-row justify-between">
      {/* Dynamic Tab Section */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab("home")}
          className={`${
            activeTab === "home" ? "bg-blue-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded hover:bg-blue-600`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("insert")}
          className={`${
            activeTab === "insert" ? "bg-blue-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded hover:bg-blue-600`}
        >
          Insert
        </button>
        <button
          onClick={() => setActiveTab("layout")}
          className={`${
            activeTab === "layout" ? "bg-blue-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded hover:bg-blue-600`}
        >
          Layout
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`${
            activeTab === "view" ? "bg-blue-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded hover:bg-blue-600`}
        >
          View
        </button>
      </div>

      {/* File Options */}
      <div className="flex space-x-4">
        <button
          onClick={saveDocumentAsHtml}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save as HTML
        </button>
        <button
          onClick={exportToWord}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export as .docx
        </button>
      </div>
    </div>
  );
};

export default NavBar;

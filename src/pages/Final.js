import { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import logo from "../images/logo.jpg";
import "../App.css"

function Final() {
    const [customerDetails, setCustomerDetails] = useState({
        customerName: '',
        customerLogo: null,
        projectName: '',
        projectType: '',
        sapVersion: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({
          ...customerDetails,
          [name]: value,
        });
      };
    
      const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        setCustomerDetails({
          ...customerDetails,
          customerLogo: file,
        });
      };
    
      const generateDocument = async () => {
        const selectedTemplate = localStorage.getItem('selectedTemplate'); // Get the selected template
    
        if (!selectedTemplate) {
            alert('No template selected');
            return;
        }
    
        const response = await fetch(selectedTemplate); // Fetch the selected template file
        const arrayBuffer = await response.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
    
        // Replace placeholders with user data
        doc.setData({
            CUSTOMER_NAME: customerDetails.customerName,
            PROJECT_NAME: customerDetails.projectName,
            PROJECT_TYPE: customerDetails.projectType,
            SAP_VERSION: customerDetails.sapVersion,
        });
    
        try {
            doc.render(); // Replace placeholders with data
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(out, 'Customer_Details_Document.docx'); // Download the file
        } catch (error) {
            console.error('Error generating document:', error);
        }
    };
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (
          customerDetails.customerName &&
          customerDetails.projectName &&
          customerDetails.projectType &&
          customerDetails.sapVersion
        ) {
          generateDocument();
        } else {
          alert('Please fill all fields before submitting');
        }
      };
  return (
    <div className=''>

    <div className='flex flex-col mt-10 justify-center items-center'>
      <div className="bg-white shadow-xl rounded-lg p-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Customer Details</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium text-gray-700 w-40">Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={customerDetails.customerName}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium text-gray-700 w-40">Customer Logo:</label>
            <input
              type="file"
              name="customerLogo"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium text-gray-700 w-40">Project Name:</label>
            <input
              type="text"
              name="projectName"
              value={customerDetails.projectName}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium text-gray-700 w-40">Project Type:</label>
            <input
              type="text"
              name="projectType"
              value={customerDetails.projectType}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project type"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-lg font-medium text-gray-700 w-40">SAP Version:</label>
            <input
              type="text"
              name="sapVersion"
              value={customerDetails.sapVersion}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter SAP version"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-lg"
          >
            Download document
          </button>
        </form>
      </div>
    </div>
    {/* <button className="flex align-middle justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-lg">
            <h1>Choose document format</h1>
          </button> */}
  </div>
  )
}

export default Final




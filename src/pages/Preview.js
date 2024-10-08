import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state

function Preview() {
    const location = useLocation(); // Access the passed state
    const { customerName, projectName, projectType, warehouseNumber, customerLogo, additionalDetails } = location.state || {};

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="bg-white shadow-xl rounded-lg p-10">
                <h2 className='text-2xl font-semibold text-center mb-4'>Document Preview</h2>
                {/* Display the document with placeholders replaced by user inputs */}
                <p><strong>Customer Name:</strong> {customerName}</p>
                <p><strong>Project Name:</strong> {projectName}</p>
                <p><strong>Project Type:</strong> {projectType}</p>
                <p><strong>Warehouse Number:</strong> {warehouseNumber}</p>
                <p><strong>Additional Details:</strong></p>
                <ul>
                    {additionalDetails && additionalDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                {customerLogo && <img src={URL.createObjectURL(customerLogo)} alt="Customer Logo" className="w-40 h-40 mt-4" />}
            </div>
        </div>
    );
}

export default Preview;

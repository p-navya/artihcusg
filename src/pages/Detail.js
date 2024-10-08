import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Detail() {
    const [customerName, setCustomerName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [warehouseNumber, setWarehouseNumber] = useState('');
    const [customerLogo, setCustomerLogo] = useState(null);
    const [additionalDetails, setAdditionalDetails] = useState(['']); // Array to hold additional detail fields

    const handleLogoChange = (event) => {
        setCustomerLogo(event.target.files[0]); // Store the uploaded file
    };

    const handleAddDetail = () => {
        setAdditionalDetails([...additionalDetails, '']); // Add a new empty string to the array for new input
    };

    const handleDetailChange = (index, value) => {
        const updatedDetails = [...additionalDetails];
        updatedDetails[index] = value; // Update the specific detail field
        setAdditionalDetails(updatedDetails);
    };

    const handlePreview = (e) => {
        e.preventDefault();
        // Handle preview logic here
        console.log({
            customerName,
            projectName,
            projectType,
            warehouseNumber,
            customerLogo,
            additionalDetails,
        });
    };

    return (
        <div>
            <div className='flex flex-col mt-10 justify-center items-center'>
                <div className="bg-white shadow-xl rounded-lg p-10">
                    <h2 className='text-2xl font-semibold text-center mb-4'>Customer Project Details</h2>
                    <form className='space-y-6'>
                        <div className='flex mb-4'>
                            <label className='block text-lg font-medium text-gray-700 w-40'>Customer Name:</label>
                            <input
                                type='text'
                                id='customerName'
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label className='block text-lg font-medium text-gray-700 w-40'>Project Name:</label>
                            <input
                                type='text'
                                id='projectName'
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label className='block text-lg font-medium text-gray-700 w-40'>Project Type:</label>
                            <input
                                type='text'
                                id='projectType'
                                value={projectType}
                                onChange={(e) => setProjectType(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label className='block text-lg font-medium text-gray-700 w-40'>Warehouse Number:</label>
                            <input
                                type='text'
                                id='warehouseNumber'
                                value={warehouseNumber}
                                onChange={(e) => setWarehouseNumber(e.target.value)}
                                className='border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                        <div className='flex mb-4'>
                            <label className='block text-lg font-medium text-gray-700 w-40'>Customer Logo</label>
                            <input
                                type='file'
                                id='customerLogo'
                                onChange={handleLogoChange}
                                className='border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                accept="image/*" // Accept only image files
                            />
                        </div>
                        {additionalDetails.map((detail, index) => (
                            <div key={index} className='flex items-center mb-4'>
                                <input
                                    type='text'
                                    value={detail}
                                    onChange={(e) => handleDetailChange(index, e.target.value)}
                                    placeholder={`Additional Detail ${index + 1}`}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <button
                                    type='button'
                                    onClick={handleAddDetail}
                                    className='ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                >
                                    +
                                </button>
                            </div>
                        ))}
                        <div className='flex justify-center mt-5'>
                           <Link to="/preview"> <button
                                // onClick={handlePreview}
                                className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
                            >
                                Preview
                            </button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Detail;

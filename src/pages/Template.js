import React, { useState } from 'react';
import "../App.css";
import template1 from "../images/template1.png"; // Importing the image for Template 1
import { Link } from 'react-router-dom';
// Sample data for document templates
const templates = [
    { id: 1, name: 'Template 1', image: template1 }, // Set the image for Template 1
    { id: 2, name: 'Template 2', image: template1 }, // Using the same image for demo purposes
    { id: 3, name: 'Template 3', image: template1 }, // Using the same image for demo purposes
];

function Template() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleTemplateSelect = (id) => {
        setSelectedTemplate(id);
    };

    const handleNext = () => {
        if (selectedTemplate) {
            console.log(`Selected Template ID: ${selectedTemplate}`);
        } else {
            alert('Please select a template.');
        }
    };

    return (
        <div>
            <div className='flex justify-center mt-14 gap-5'>
                {templates.map(template => (
                    <div 
                        key={template.id} 
                        className={`relative w-52 border rounded-lg overflow-hidden transition-transform duration-200 ease-in-out cursor-pointer border-gray-300 hover:scale-105 hover:shadow-lg ${selectedTemplate === template.id ? 'border-blue-600' : ''}`}
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                        {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2 text-2xl text-green-500">✔️</div>
                        )}
                        <img src={template.image} alt={template.name} className='w-full h-auto' />
                        <h3 className='text-center mt-2'>{template.name}</h3>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-5'>
                <Link to="/final"><button 
                    className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
                    onClick={handleNext}
                >
                    Next
                </button></Link>
            </div>
            <div className="mt-10 text-center">
                <h2 className='text-lg font-semibold'>Edit Your Own Template</h2>
                <p>Use the form below to create or modify your template.</p>
                <form className="mt-4">
                    <input type="text" placeholder="Template Name" className="mt-2 p-2 border rounded w-3/4 border-gray-300" />
                    <button type="submit" className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Save Template</button>
                </form>
            </div>
        </div>
    );
}

export default Template;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import template1 from "../images/template1.png"; 
import temp from "../images/temp.jpg"; // Existing image for template 4
import doc1 from "../Docs/doc1.docx";
import docu from "../Docs/docu.pdf";
import doc2 from "../Docs/doc2.docx"; 
import { HiTemplate } from "react-icons/hi";

// Sample data for document templates
const templates = [
    { },
    { id: 1, name: 'Template 1', image: template1, document: docu },
    { id: 2, name: 'Template 2', image: template1, document: doc2 },
    { id: 3, name: 'Template 3', image: template1, document: docu },
    { id: 4, name: 'Customize', image: temp, document: doc1 }, // Integrated Template 4
];

const documentStructure = [
    { 
        id: '1', title: 'Document Control', 
        subHeadings: [
            { id: '1.1', title: 'Customer', 
              subSubHeadings: [
                { id: '1.1.1', title: 'Logo', content: 'Logo' }, // Logo section
                { id: '1.1.2', title: 'Sign-off Authority', content: 'Customer sign-off authority content...' }
              ] 
            },
            { id: '1.2', title: 'Vendor', 
              subSubHeadings: [
                { id: '1.2.1', title: 'Logo', content: 'Vendor logo content...' },
                { id: '1.2.2', title: 'Sign-off Authority', content: 'Vendor sign-off authority content...' }
              ] 
            },
            { id: '1.3', title: 'Document Title', content: 'Document Title content...' },
            { id: '1.4', title: 'Project Identification', content: 'Project Identification content...' },
            { id: '1.5', title: 'Version', 
              subSubHeadings: [
                { id: '1.5.1', title: 'Generate Version', content: 'Generate Version content...' },
                { id: '1.5.2', title: 'Edit Document', content: 'Edit Document content...' }
              ] 
            },
        ]
    },
    { id: '2', title: 'Scope Items', content: 'Scope items content...' },
    { 
        id: '3', title: 'Table of contents', 
        subHeadings: [
            { id: '3.1', title: 'Introduction', content: 'Introduction content...' },
            { id: '3.2', title: 'Document Overview', content: 'Document Overview content...' },
            { id: '3.3', title: 'Purpose of this document', content: 'Purpose content...' },
            { id: '3.4', title: 'How to read document', content: 'How to read content...' },
            { id: '3.5', title: 'Glossary', content: 'Glossary content...' },
            { id: '3.6', title: 'Process area-1', 
              subSubHeadings: [
                { id: '3.6.1', title: 'Process definition', content: 'Process definition content...' },
                { id: '3.6.2', title: 'Process details', content: 'Process details content...' },
                { id: '3.6.3', title: 'Business benefits', content: 'Business benefits content...' },
                { id: '3.6.4', title: 'Key process flow', content: 'Key process flow content...' },
                { id: '3.6.5', title: 'Process flowchart', content: 'Process flowchart content...' },
                { id: '3.6.6', title: 'Process narrative', content: 'Process narrative content...' },
              ] 
            },
            { id: '3.7', title: 'Organizational structure', content: 'Organizational structure content...' },
            { id: '3.8', title: 'Master data considerations', content: 'Master data considerations content...' },
            { id: '3.9', title: 'Major business pain points', content: 'Pain points content...' },
            { id: '3.10', title: 'Reports', content: 'Reports content...' },
            { id: '3.11', title: 'Enhancements', content: 'Enhancements content...' },
            { id: '3.12', title: 'Conversions', content: 'Conversions content...' },
            { id: '3.13', title: 'Forms and Labels', content: 'Forms and Labels content...' },
            { id: '3.14', title: 'Interfaces', content: 'Interfaces content...' },
            { id: '3.15', title: 'Key integration points', content: 'Key integration points content...' },
            { id: '3.16', title: 'Gap analysis', content: 'Gap analysis content...' }
        ]
    }
];

function Template() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [previewDocument, setPreviewDocument] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [logo, setLogo] = useState(null); // State to store uploaded logo
    const navigate = useNavigate();

    // Handle template selection
    const handleTemplateSelect = (id) => {
        setSelectedTemplate(id);
        const selected = templates.find(template => template.id === id);
        if (selected) {
            const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(selected.document)}&embedded=true`;
            console.log('Viewer URL:', viewerUrl);
            setPreviewDocument(viewerUrl);

            // Automatically navigate to WordEditor if Template 4 is selected
            if (id === 4) {
                navigate('/editor', { state: { templateId: id } });
            }
        }
    };

    // Toggle section for showing sub-headings or sub-sub-headings
    const toggleSection = (id) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Handle click to display content in the center panel
    const handleContentSelect = (content) => {
        if (content === 'Logo') {
            setSelectedContent('Logo');
        } else {
            setSelectedContent(content);
        }
    };

    // Handle logo upload
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl); // Store the uploaded image URL
        }
    };

    return (
        <div className="flex h-screen w-auto mb-9">
            {/* Left Sidebar with scrolling */}
            <div className="w-auto bg-gray-100 p-4 space-y-5 border-r border-gray-300" style={{ maxHeight: '100vh' }}>
                <div className='flex items-center mb-6'>
                    <button className="bg-blue-600 text-white p-2 rounded">
                        <HiTemplate className="text-2xl" />
                    </button>
                    <h2 className="text-xl font-bold ml-4">Templates</h2>
                </div>

                {/* Template Icons */}
                <div className="space-y-4 flex flex-row gap-5">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`relative cursor-pointer p-2 rounded-md transition-transform duration-200 hover:scale-105 ${selectedTemplate === template.id ? 'bg-blue-100' : 'bg-white'}`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <img 
                                src={template.image} 
                                alt={template.name} 
                                className="w-9 h-8 object-contain mx-auto"
                            />
                            <p className="text-center mt-2 text-sm truncate">{template.name}</p>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2 text-2xl text-green-500">✔️</div>
                            )}
                        </div>
                    ))}
                    {/* Plus Symbol Template */}
                    {/* <div className="flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-md cursor-pointer">
                        <span className="text-2xl">+</span>
                    </div> */}
                </div>

                <button 
                    className="bg-blue-600 text-white py-2 px-4 mt-10 rounded hover:bg-blue-700 w-full"
                    onClick={() => navigate('/final')}
                >
                    Next
                </button>

                {/* Document Structure - Headings and Sub-headings */}
                <div className="mt-8 space-y-2 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                    {documentStructure.map(section => (
                        <div key={section.id}>
                            <h3 
                                className="font-bold text-lg cursor-pointer flex items-center" 
                                onClick={() => toggleSection(section.id)}
                            >
                                {openSections[section.id] ? '-' : '+'} {section.title}
                            </h3>
                            {openSections[section.id] && (
                                <div className="pl-4 space-y-1">
                                    {section.subHeadings && section.subHeadings.map(sub => (
                                        <div key={sub.id}>
                                            <h4 
                                                className="cursor-pointer text-blue-700"
                                                onClick={() => toggleSection(sub.id)}
                                            >
                                                {openSections[sub.id] ? '-' : '+'} {sub.title}
                                            </h4>
                                            {openSections[sub.id] && (
                                                <div className="pl-4">
                                                    {sub.subSubHeadings ? sub.subSubHeadings.map(subSub => (
                                                        <p
                                                            key={subSub.id}
                                                            className="cursor-pointer text-gray-600"
                                                            onClick={() => handleContentSelect(subSub.content)}
                                                        >
                                                            {subSub.title}
                                                        </p>
                                                    )) : (
                                                        <p 
                                                            className="cursor-pointer text-gray-600"
                                                            onClick={() => handleContentSelect(sub.content)}
                                                        >
                                                            {sub.title}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {section.content && (
                                        <p 
                                            className="cursor-pointer text-gray-600"
                                            onClick={() => handleContentSelect(section.content)}
                                        >
                                            {section.content}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Panel for Content Display */}
            <div className="flex-grow bg-gray-200 p-4">
                {selectedContent ? (
                    selectedContent === 'Logo' ? (
                        <div className="text-center">
                            {logo ? (
                                <img src={logo} alt="Logo" className="mx-auto mb-4" style={{ width: '100px' }} />
                            ) : (
                                <p>No logo uploaded</p>
                            )}
                            <input type="file" accept="image/*" onChange={handleLogoUpload} />
                        </div>
                    ) : (
                        <div className="p-4 bg-white rounded shadow">
                            <h2 className="text-xl font-semibold mb-4">Content</h2>
                            <p>{selectedContent}</p>
                        </div>
                    )
                ) : (
                    <p>Please select a section to view the content.</p>
                )}
            </div>

            {/* Preview Panel */}
            <div className="w-1/4 bg-gray-100 p-4">
                {previewDocument ? (
                    <iframe
                        src={previewDocument}
                        title="Document Preview"
                        style={{ width: '100%', height: '100%' }}
                    ></iframe>
                ) : (
                    <p>No document selected</p>
                )}
            </div>
        </div>
    );
}

export default Template;

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import "../App.css";

function WordEditor() {
    const [pages, setPages] = useState([{ id: 1, content: '<h2>Header for Page 1</h2><p>Start typing...</p>' }]);
    const [currentPage, setCurrentPage] = useState(0);

    const handleInput = (e) => {
        const newPages = [...pages];
        newPages[currentPage].content = e.target.innerHTML;
        setPages(newPages);
    };

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const addPage = () => {
        setPages([...pages, { id: pages.length + 1, content: '<h2>Header for Page ' + (pages.length + 1) + '</h2><p>Start typing...</p>' }]);
        setCurrentPage(pages.length); // Set the new page as the current page
    };

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const newPages = [...pages];
            const imgTag = `<img src="${reader.result}" alt="${file.name}" style="max-width: 100%;"/>`;
            newPages[currentPage].content += imgTag; // Append image to current page
            setPages(newPages);
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

    // Export as a DOCX file
    const exportToDocx = () => {
        const docContent = pages.map((page) => page.content).join('<br/><br/>'); // Join all pages' content
        const docxBlob = htmlDocx.asBlob(`<html><body>${docContent}</body></html>`);
        saveAs(docxBlob, 'document.docx');
    };

    // Export as an HTML file
    const exportToHTML = () => {
        const htmlContent = pages.map((page) => page.content).join('<br/><br/>');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        saveAs(blob, 'document.html');
    };
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-700 mb-6">Word Editor</h2>
            <div className="flex flex-wrap gap-4 mb-6">
                <button className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 transition duration-300" onClick={addPage}>Add Page</button>
                <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300" onClick={exportToDocx}>Export to DOCX</button>
                <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-300" onClick={exportToHTML}>Export to HTML</button>
            </div>

            {/* Toolbar */}
            <div className="toolbar flex flex-wrap gap-2 mb-4 bg-gray-100 p-4 rounded-md shadow">
                {/* Font Options */}
                <div className="font-options">
                    <label className="block text-gray-600">Font</label>
                    <select className="border border-gray-300 rounded p-2" onChange={(e) => formatText('fontName', e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
                {/* Font Size */}
                <div className="text-size-options">
                    <label className="block text-gray-600">Font Size</label>
                    <select className="border border-gray-300 rounded p-2" onChange={(e) => formatText('fontSize', e.target.value)}>
                        <option value="1">10pt</option>
                        <option value="2">12pt</option>
                        <option value="3">14pt</option>
                        <option value="4">16pt</option>
                    </select>
                </div>

                {/* Basic text formatting */}
                {[{ command: 'bold', label: 'B', style: 'font-bold' }, { command: 'italic', label: 'I', style: 'italic' }, { command: 'underline', label: 'U', style: 'underline' }].map(
                    ({ command, label, style }) => (
                        <button key={label} className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ${style}`} onClick={() => formatText(command)}>
                            {label}
                        </button>
                    )
                )}

                {/* Text alignment */}
                <div className="alignment-options ml-4">
                    <label className="block text-gray-600">Align</label>
                    <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400" onClick={() => formatText('justifyLeft')}>Left</button>
                    <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 mx-1" onClick={() => formatText('justifyCenter')}>Center</button>
                    <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400" onClick={() => formatText('justifyRight')}>Right</button>
                </div>

                {/* Lists */}
                <div className="list-options ml-4">
                    <label className="block text-gray-600">Lists</label>
                    <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400" onClick={() => formatText('insertUnorderedList')}>• Bullet</button>
                    <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 mx-1" onClick={() => formatText('insertOrderedList')}>1. Number</button>
                </div>
            </div>

            {/* Editor Area */}
            <div {...getRootProps()} className="border border-gray-300 bg-white p-6 rounded shadow-lg min-h-[300px] mb-6 flex flex-col justify-center">
                <input {...getInputProps()} />
                <h3 className="font-semibold text-xl text-gray-600 mb-2">Page {currentPage + 1}</h3>
                <div className="editor p-3 border-dashed border-2 border-gray-200 rounded" contentEditable="true" dangerouslySetInnerHTML={{ __html: pages[currentPage]?.content }} onInput={handleInput} style={{ fontSize: '16px', outline: 'none', minHeight: '200px' }}></div>
                <p className="text-center text-gray-500 mt-3">Drag and drop images here, or click to select files.</p>
            </div>

            {/* Page Navigation */}
            <div className="flex gap-2 justify-center">
                {pages.map((page, index) => (
                    <button
                        key={page.id}
                        className={`py-2 px-4 rounded shadow-md transition duration-300 ${currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                        onClick={() => setCurrentPage(index)}
                    >
                        Page {page.id}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WordEditor;

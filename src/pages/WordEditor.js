// src/pages/WordEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import styles for Quill
import htmlDocx from 'html-docx-js/dist/html-docx';
import './WordEditor.css'; // Import custom styles

const WordEditor = () => {
    const [editorHtml, setEditorHtml] = useState('<h1>Hello World</h1>'); // Initial HTML content

    const handleDownload = () => {
        const converted = htmlDocx.asBlob(editorHtml);
        const url = URL.createObjectURL(converted);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.docx'; // Name of the downloaded file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="word-editor-container">
            <h1 className="editor-header">Word Editor</h1>
            <ReactQuill
                value={editorHtml}
                onChange={setEditorHtml}
                modules={{
                    toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'], // Remove formatting button
                    ],
                }}
                theme="snow"
                className="quill-editor" // Custom class for styling
            />
            <button onClick={handleDownload} className="download-button">Download as DOCX</button>
        </div>
    );
};

export default WordEditor;

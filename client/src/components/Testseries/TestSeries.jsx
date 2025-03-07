import { useState } from "react";
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PDFViewer() {
    const [numPages, setNumPages] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const questionPaperUrl = "https://res.cloudinary.com/detx89uqg/image/upload/v1741163080/answer_sheets/vr9qtdoa84aidb8lrfyh.pdf";

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle Upload to Cloudinary
    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a PDF to upload!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset");

        setUploading(true);

        try {
            const response = await fetch("http://localhost:3001/api/uploads", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            toast.success("✅ PDF Uploaded Successfully!");
            console.log("Uploaded file URL:", data.secure_url);
        } catch (error) {
            toast.error("Upload failed! Try again.");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="pdf-viewer-container">
            <h2>Question Paper</h2>

            {/* PDF Viewer */}
            <div className="pdf-container">
                <Document
                    file={questionPaperUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>

            {/* Answer Upload */}
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Submit Answer"}
            </button>
        </div>
    );
}

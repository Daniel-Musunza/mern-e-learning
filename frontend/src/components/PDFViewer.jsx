import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber <= 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber >= numPages}
      >
        Next
      </button>
    </div>
  );
}

export default PDFViewer;

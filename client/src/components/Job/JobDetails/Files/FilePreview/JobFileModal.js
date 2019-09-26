import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import FileDownloader from "./FileDownloader";

// import { Document, Page } from "react-pdf";
import "./JobFileModal.css";

// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const JobFileModal = ({ file, showPreviewModal, setModalFlag }) => {
  const fileUrlArray = file.fileURL.split(".");
  const imageFileTypes = ["jpeg.", "jpg", "png", "svg", "gif"];
  const docFileTypes = ["docx", "doc", "xlsx", "pdf"];
  let fileType = "";
  // if (fileUrlArray[fileUrlArray.length - 1] === "pdf") {
  //     fileType = fileUrlArray[fileUrlArray.length - 1];
  // }

  if (
    imageFileTypes.includes(fileUrlArray[fileUrlArray.length - 1].toLowerCase())
  ) {
    fileType = "image";
  }

  if (
    docFileTypes.includes(fileUrlArray[fileUrlArray.length - 1].toLowerCase())
  ) {
    fileType = "doc";
  }

  let [pageTotal, setPageTotal] = useState(0);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageTotal(numPages);
  };

  let [activePage, setActivePage] = useState(1);

  const goToNextPage = e => {
    if (activePage < pageTotal) setActivePage(++activePage);
  };

  const goToPreviousPage = e => {
    if (activePage > 0) setActivePage(--activePage);
  };

  return (
    <Fragment>
      <Modal
        show={showPreviewModal}
        onHide={() => setModalFlag(false)}
        dialogClassName="modal-90w file-preview-modal"
      >
        <ModalBody>
          <div>
            <div
              className="back-icon-container d-flex align-items-center"
              onClick={() => setModalFlag(false)}
            >
              <i className="material-icons">arrow_back</i> {file.filename}
            </div>
            <div className="download-icon-container">
              <FileDownloader files={file}>Download</FileDownloader>
            </div>
            <div className="clearfix" />
          </div>
          <div className="preview-container">
            {/* {fileType === "pdf" && (
                            <Fragment>
                                <Document
                                    file={file.fileURL}
                                    noData={<h4>Preview not Available</h4>}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    {pageTotal && (
                                        <Page pageNumber={activePage} />
                                    )}
                                </Document>
                                <div className="preview-pagination-container">
                                    {activePage > 1 && (
                                        <i
                                            className="material-icons"
                                            onClick={() => goToPreviousPage()}
                                        >
                                            arrow_back_ios
                                        </i>
                                    )}
                                    {`${activePage} of ${pageTotal}`}
                                    {activePage < pageTotal && (
                                        <i
                                            className="material-icons"
                                            onClick={() => goToNextPage()}
                                        >
                                            arrow_forward_ios
                                        </i>
                                    )}
                                </div>
                            </Fragment>
                        )} */}

            {fileType === "image" && (
              <img src={file.fileURL} alt={file.filename} />
            )}

            {fileType === "doc" && (
              <iframe
                title="document preview"
                className="document-container"
                src={`https://docs.google.com/viewer?url=${file.fileURL}&embedded=true`}
              ></iframe>
            )}

            {fileType === "" && <h5>Preview not available</h5>}
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default JobFileModal;

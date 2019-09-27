import React, { Fragment } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const FileDownloader = ({ files, children }) => {
  const downloadSelectedFiles = e => {
    e.stopPropagation();
    if (files.length > 0) {
      axios
        .post(
          `/api/job_files/files/download`,
          {
            jobFileUrls: files
          },
          { responseType: "arraybuffer" }
        )
        .then(res => {
          let blob = new Blob([res.data], {
            type: "application/zip"
          });

          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "document.zip";
          document.body.appendChild(a);
          a.click();
          a.remove();
        })
        .catch(err => {
          console.log(err.error);
        });
    } else if (Object.keys(files).length > 0) {
      window.open(files.fileURL, "_blank");
    }
  };

  return (
    <Fragment>
      {(files.length > 0 || Object.keys(files).length > 0) && (
        <span
          className="file-downloader-container"
          onClick={e => downloadSelectedFiles(e)}
        >
          <FontAwesomeIcon icon={faDownload} /> {children}
        </span>
      )}
    </Fragment>
  );
};

export default FileDownloader;

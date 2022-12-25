import React, { Fragment, useEffect, useState } from 'react'
import { fileUploadService } from '../../../services';
import IFile from '../../../types/File';

export const FileUpload = () => {

  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

  useEffect(() => {
    fileUploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  })

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
  }

  const upload = () => {
    setProgress(0);
    if(!currentFile) return;
    fileUploadService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setMessage(response.data.message);
      return fileUploadService.getFiles();
    }).then((files) => {
      setFileInfos(files.data);
    }).catch((err) => {
      setProgress(0);
      if(err.response && err.response.data && err.response.data.message){
        setMessage(err.response.data.message)
      } else {
        setMessage("Could not upload the file!");
      }
      setCurrentFile(undefined);
    });
  };

  return (
    <Fragment>
      <div className='container' style={{width: "600px", float: 'left'}}>
      <h4>React Typescript File Upload - Made By MRJ</h4>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" onChange={selectFile} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={upload}
            >
              Upload
            </button>
          </div>
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
    </div>
    </Fragment>
    
  )
}

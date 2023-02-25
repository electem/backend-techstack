import React, { Component } from "react";
import UploadService from "../services/fileupload";
import { RouteComponentProps } from "react-router-dom";

interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentFile: string | Blob;
  previewImage: string;
  progress: number;
  message: string;
  imageInfos: [];
};
export default class UploadImages extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      currentFile: "",
      previewImage: "",
      progress: 0,
      message: "",

      imageInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles(this.props.match.params.id).then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  selectFile(event: any) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
    });
  }

  upload() {
    this.setState({
      progress: 0,
    });

    UploadService.upload(
      this.state.currentFile,
      (event: { loaded: number; total: number }) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles(response.data);
      })
      .then((files) => {
        this.setState({
          imageInfos: files.data,
        });
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: "",
        });
      });
  }

  render() {
    const { currentFile, previewImage, message, imageInfos } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => this.selectFile(event)}
              />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>
          </div>
        </div>

        {/* {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )} */}

        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}

        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  {/* <a href={img.url}>{img.name}</a> */}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

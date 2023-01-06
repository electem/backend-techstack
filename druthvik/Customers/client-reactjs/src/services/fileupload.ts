import http from "../http-common";

class FileUploadService {
  upload(file: string | Blob, onUploadProgress: any) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(id: any) {
    return http.get(`/file/${id}`);
  }
}

export default new FileUploadService();

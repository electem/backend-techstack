/**
 * 
 */
package com.example.onetoonemapping.models;

/**
 * @author Cybertech1
 *
 */
public class UploadFileResponse {
	/**
	 * UploadFileResponse fileName
	 */
	private String fileName;
	/**
	 * UploadFileResponse fileDownloadUri
	 */
	private String fileDownloadUri;
	/**
	 * UploadFileResponse fileType
	 */
	private String fileType;
	/**
	 * UploadFileResponse size
	 */
	private long size;

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName
	 *            the fileName to set
	 */
	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the fileDownloadUri
	 */
	public String getFileDownloadUri() {
		return fileDownloadUri;
	}

	/**
	 * @param fileDownloadUri
	 *            the fileDownloadUri to set
	 */
	public void setFileDownloadUri(final String fileDownloadUri) {
		this.fileDownloadUri = fileDownloadUri;
	}

	/**
	 * @return the fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType
	 *            the fileType to set
	 */
	public void setFileType(final String fileType) {
		this.fileType = fileType;
	}

	/**
	 * @return the size
	 */
	public long getSize() {
		return size;
	}

	/**
	 * @param size
	 *            the size to set
	 */
	public void setSize(final long size) {
		this.size = size;
	}

	/**
	 * @param fileName
	 * @param fileDownloadUri
	 * @param fileType
	 * @param size
	 */
	public UploadFileResponse(final String fileName, final String fileDownloadUri, final String fileType,
			final long size) {
		super();
		this.fileName = fileName;
		this.fileDownloadUri = fileDownloadUri;
		this.fileType = fileType;
		this.size = size;
	}

	/**
	 * UploadFileResponse
	 */
	public UploadFileResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "UploadFileResponse [fileName=" + fileName + ", fileDownloadUri=" + fileDownloadUri + ", fileType="
				+ fileType + ", size=" + size + "]";
	}

}

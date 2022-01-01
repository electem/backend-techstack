/**
 * 
 */
package com.example.postgresdemo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Cybertech1
 *
 */
@Entity
@Table(name = "files")
public class DBFile {

	/**
	 * fileId
	 */
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    private String fileId;

	/**
	 * fileName
	 */
	private String fileName;

	/**
	 * fileType
	 */
	private String fileType;

	/**
	 * data
	 */
	@Lob
	private byte[] data;

	/**
	 * @return the id
	 */
	public String getId() {
		return fileId;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final String fileId) {
		this.fileId = fileId;
	}

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType the fileType to set
	 */
	public void setFileType(final String fileType) {
		this.fileType = fileType;
	}

	/**
	 * @return the data
	 */
	public byte[] getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData( byte[] data) {
		this.data = data;
	}

	/**
	 * @param fileName
	 * @param fileType
	 * @param data
	 */
	public DBFile(final String fileName,final String fileType, byte[] data) {
		super();
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;
	}

	
}

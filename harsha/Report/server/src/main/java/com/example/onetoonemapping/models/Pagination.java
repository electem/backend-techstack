package com.example.onetoonemapping.models;

public class Pagination {

	private int startPoint;
	private int pageLength;

	public Pagination(int startPoint, int pageLength) {
		this.startPoint = startPoint;
		this.pageLength = pageLength;
	}

	public int getStartPoint() {
		return startPoint;
	}

	public void setStartPoint(int startPoint) {
		this.startPoint = startPoint;
	}

	public int getPageLength() {
		return pageLength;
	}

	public void setPageLength(int pageLength) {
		this.pageLength = pageLength;
	}
}

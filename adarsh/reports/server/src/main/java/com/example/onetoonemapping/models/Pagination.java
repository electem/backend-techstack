package com.example.onetoonemapping.models;

public class Pagination {
	private int length;

	private int start;

	public Pagination(int length, int start) {
		super();
		this.length = length;
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}
}
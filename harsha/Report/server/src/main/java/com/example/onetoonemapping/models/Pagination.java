package com.example.onetoonemapping.models;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Pagination {

	private int startPoint;
	private int pageLength;
}

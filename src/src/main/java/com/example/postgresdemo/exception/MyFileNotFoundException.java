/**
 * @author elect
 */
package com.example.postgresdemo.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class MyFileNotFoundException extends Exception {
	 public MyFileNotFoundException(String message) {
	        super(message);
	    }

	    public MyFileNotFoundException(final String message,final Throwable cause) {
	        super(message, cause);
	    }
}

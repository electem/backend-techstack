/**
 * 
 */
package net.guides.springboot.todomanagement.exception;
import java.io.IOException;
import java.time.LocalDateTime;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * @author elect
 *
 */
@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(RoleNotFountExcpetion.class)
    public ResponseEntity<Object> handleExceptions( RoleNotFountExcpetion exception, WebRequest webRequest) {
        ResponseEntity<Object> entity = new ResponseEntity<>("Role not found",HttpStatus.NOT_FOUND);
        return entity;
    }
	 @ExceptionHandler(StudentNotFoundException.class)
	 public ResponseEntity<Object> handleExceptions( StudentNotFoundException exception, WebRequest webRequest) {
       
        ResponseEntity<Object> entity = new ResponseEntity<>("Student not found ",HttpStatus.NOT_FOUND);
        return entity;
    }
	 @ExceptionHandler(IOException.class)
	 public ResponseEntity<Object> handleIoExceptions( IOException exception, WebRequest webRequest) {
        ResponseEntity<Object> entity = new ResponseEntity<>("File not exits",HttpStatus.NOT_FOUND);
        return entity;
    }
	 @ExceptionHandler(ConstraintViolationException.class)
	  public final ResponseEntity<Object> handleConstraintViolationExceptions(
	      ConstraintViolationException ex) {
	    String exceptionResponse = String.format("Invalid input parameters: %s\n", ex.getMessage());
	    return new ResponseEntity<Object>(exceptionResponse, HttpStatus.BAD_REQUEST);
	  }
}

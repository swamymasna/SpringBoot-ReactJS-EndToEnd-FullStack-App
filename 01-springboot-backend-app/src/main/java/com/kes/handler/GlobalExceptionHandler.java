package com.kes.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.kes.dto.ErrorMessage;
import com.kes.exception.EmployeeServiceBusinessException;
import com.kes.exception.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorMessage> handleResourceNotFoundException(ResourceNotFoundException exception,
			WebRequest webRequest) {

		ErrorMessage errorMessage = ErrorMessage.builder().message(exception.getMessage()).status(HttpStatus.NOT_FOUND)
				.statusCode(HttpStatus.NOT_FOUND.value()).path(webRequest.getDescription(false)).build();

		return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(EmployeeServiceBusinessException.class)
	public ResponseEntity<ErrorMessage> handleEmployeeServiceBusinessException(
			EmployeeServiceBusinessException exception, WebRequest webRequest) {

		ErrorMessage errorMessage = ErrorMessage.builder().message(exception.getMessage())
				.status(HttpStatus.BAD_REQUEST).statusCode(HttpStatus.BAD_REQUEST.value())
				.path(webRequest.getDescription(false)).build();

		return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorMessage> handleExceptions(Exception exception, WebRequest webRequest) {

		ErrorMessage errorMessage = ErrorMessage.builder().message(exception.getMessage())
				.status(HttpStatus.INTERNAL_SERVER_ERROR).statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
				.path(webRequest.getDescription(false)).build();

		return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

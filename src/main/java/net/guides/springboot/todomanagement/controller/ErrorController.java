package net.guides.springboot.todomanagement.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author elect
 *
 */
@RestController("error")
public class ErrorController {

	/**
	 * @param request
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	public ModelAndView handleException(final HttpServletRequest request, Exception ex) {
		final ModelAndView mv = new ModelAndView();
		mv.addObject("exception", ex.getLocalizedMessage());
		mv.addObject("url", request.getRequestURL());
		mv.setViewName("error");
		return mv;
	}

}

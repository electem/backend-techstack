package com.example.manytomanymapping.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.manytomanymapping.config.JwtUtils;
import com.example.manytomanymapping.models.CustomErrorType;
import com.example.manytomanymapping.models.JwtResponse;
import com.example.manytomanymapping.models.User;
import com.example.manytomanymapping.repository.UserRepository;
import com.example.manytomanymapping.service.UserDetailsImpl;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	/**
	 * Logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	// This block of code is used to authenticate a username and password with DB
	// and generate a token.
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user) {
		LOG.info("Start of AuthController :: authenticateUser");
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		LOG.info("End of AuthController :: authenticateUser");
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername()));
	}

	// This block of code is used to save a user in the DB.
	@PostMapping("/register")
	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
		LOG.info("Start of AuthController :: createUser");
		if (userRepository.existsByUsername(user.getUsername())) {
			return ResponseEntity.badRequest().body(new CustomErrorType("Error: Username is already taken!"));
		}
		user.setPassword(encoder.encode(user.getPassword()));
		LOG.info("End of AuthController :: createUser");
		return new ResponseEntity<User>(userRepository.save(user), HttpStatus.CREATED);
	}
}
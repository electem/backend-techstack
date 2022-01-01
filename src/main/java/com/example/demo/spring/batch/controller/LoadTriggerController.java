/**
 * 
 */
package com.example.demo.spring.batch.controller;

import java.util.logging.Logger;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Cybertech1
 *
 */
@RestController
public class LoadTriggerController {
	/**
	 * Logger
	 */
	private final static Logger log = Logger.getLogger(LoadTriggerController.class.getName());
	/**
	 * job
	 */
	@Autowired
	private Job job;
	/**
	 * JobLauncher
	 */
	@Autowired
	private JobLauncher launcher;

	/**
	 * @return home trigger load data
	 */
	@GetMapping
	public String home() {
		return "to trigger load data, please move to /load";
	}

	/**
	 * @return status
	 * @throws Exception
	 */
	@GetMapping("/load")
	public BatchStatus load() throws Exception {
		final JobParameters parameters = new JobParameters();
		final JobExecution jobExecution = launcher.run(job, parameters);
		log.info("JobExecution: " + jobExecution.getStatus());
		while (jobExecution.isRunning()) {
			log.info(".");
		}
		return jobExecution.getStatus();
	}
}

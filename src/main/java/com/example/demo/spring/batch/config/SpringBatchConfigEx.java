/**
 * 
 */
package com.example.demo.spring.batch.config;

import java.sql.ResultSet;

import javax.batch.api.chunk.ItemReader;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.batch.MyCustomReader;
import com.example.demo.batch.MyCustomWriter;
import com.example.demo.spring.batch.model.Employee;
import com.example.demo.spring.batch.model.User;

/**
 * @author Cybertech1
 *
 */
/*@Configuration
@EnableBatchProcessing*/
public class SpringBatchConfigEx {
	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;

	@Autowired
	MyCustomReader myCustomReader;

	@Autowired
	MyCustomWriter myCustomWriter;

	@Bean
	public Job createJob() {
		return jobBuilderFactory.get("MyJob").incrementer(new RunIdIncrementer()).flow(createStep()).end().build();
	}

	@Bean
	public Step createStep() {
		return stepBuilderFactory.get("MyStep").<Employee, Employee>chunk(1).reader(myCustomReader)
				.writer(myCustomWriter).build();
	}
}

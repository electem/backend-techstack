/**
 * 
 */
package com.example.demo.batch;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.demo.spring.batch.model.Employee;

/**
 * @author Cybertech1
 *
 */
@Component
public class MyCustomReader  extends JdbcCursorItemReader<Employee> implements ItemReader<Employee> {

	public MyCustomReader(@Autowired DataSource dataSource) {
		setDataSource(dataSource);
		setSql("SELECT id, name, salary FROM User");
		setFetchSize(100);
		setRowMapper(new EmployeeRowMapper());
	}
	
	public class EmployeeRowMapper implements RowMapper<Employee> {
		@Override
		public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
			Employee employee  = new Employee();
			employee.setId(rs.getLong("id"));
			employee.setName(rs.getString("name"));
			employee.setSalary(rs.getInt("salary"));
			System.out.println("complete rowmapper");
			return employee;
		}

	
	}

}

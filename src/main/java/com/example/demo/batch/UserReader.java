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

import com.example.demo.spring.batch.model.WriteUser;

/**
 * @author Cybertech1
 *
 */
@Component
public class UserReader extends JdbcCursorItemReader<WriteUser> implements ItemReader<WriteUser> {

	/**
	 * @param dataSource
	 */
	public UserReader(@Autowired final DataSource dataSource) {
		setDataSource(dataSource);
		setSql("SELECT id, name, salary,dept FROM user");
		setFetchSize(100);
		setRowMapper(new UserRowMapper());
	}

	/**
	 * @author elect
	 *
	 */
	public class UserRowMapper implements RowMapper<WriteUser> {
		@Override
		public WriteUser mapRow(final ResultSet rs, final int rowNum) throws SQLException {
			WriteUser userWriter = new WriteUser();
			userWriter.setId(rs.getLong("id"));
			userWriter.setName(rs.getString("name"));
			userWriter.setSalary(rs.getInt("salary"));
			userWriter.setDept(rs.getString("dept"));
			return userWriter;
		}
	}
}

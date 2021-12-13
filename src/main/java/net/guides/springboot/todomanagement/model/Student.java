/**
 * 
 */
package net.guides.springboot.todomanagement.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * @author elect
 *
 */
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor 
@Entity
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long studentId;
	/**
	 * student Name
	 */
	@NotBlank @Size(max = 100)
	private String studentName;
	/**
	 * student Email 
	 */
	@NotBlank(message = "Email is mandatory")
    @Email
	private String studentEmail;
	/**
	 * status 
	 */
	private String status="REGISTER";
}

package net.guides.springboot.todomanagement.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.guides.springboot.todomanagement.repository.RoleRepository;
/**
 * @author elect
 *
 */
@Service
public class RoleService {
	/**
	 * logger
	 */
	final private Logger logger = LoggerFactory.getLogger(RoleService.class);
	/**
	 * Inject roleRepository
	 */
	@Autowired
	private RoleRepository roleRepository;
	/**
	 * Get the Rolename
	 * @param roleId
	 * @return
	 */
	public String getRoleName(final Long roleId) {
		logger.info("start of RoleService :: getRoleName ");
		String roleName = null;
		if (roleId != 0) {
			roleName = roleRepository.getRoleName(roleId);
		}
		logger.info("End of RoleService :: getRoleName " + roleName);
		return roleName;
	}
}

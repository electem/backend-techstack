/**
 * 
 */
package net;

import java.net.InetAddress;

import lombok.extern.slf4j.Slf4j;

/**
 * @author elect
 *
 */
@Slf4j
public class InetDemo {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try{  
			InetAddress ip=InetAddress.getByName("www.google.com");  
			log.info("Host Name: "+ip.getHostName());  
			log.info("IP Address: "+ip.getHostAddress());  
			}catch(Exception e){
				log.error("error"+e);
				}  
			}  
}

/**
 * 
 */
package net;

import java.net.URL;

import lombok.extern.slf4j.Slf4j;

/**
 * @author elect
 *
 */
@Slf4j
public class URLDemo {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			URL url = new URL("http://www.javatpoint.com/java-tutorial");
			log.info("Protocol: " + url.getProtocol());
			log.info("Host Name: " + url.getHost());
			log.info("Port Number: " + url.getPort());
			log.info("File Name: " + url.getFile());
		} catch (Exception e) {
			log.error("Error " + e);
		}
	}
}

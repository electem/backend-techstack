package net;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class UrlConnection {
	public static void main(String[] args) {
		try {
			URL url = new URL("http://www.google.com");
			URLConnection urlcon = url.openConnection();
			InputStream stream = urlcon.getInputStream();
			int i;
			while ((i = stream.read()) != -1) {
				log.info(" " + (char) i);
			}
		} catch (Exception e) {
			log.error("Error" + e);
		}
	}
}

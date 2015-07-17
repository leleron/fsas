package com.flyco.fsas;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import android.content.Context;

public class MyProperUtil {

	public static Properties getProperties(Context context) throws IOException {

		Properties props = new Properties();
		InputStream in = null;

		try {
			in = context.getAssets().open("appConfig.properties");
			props.load(in);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null)
				in.close();
		}
		
		return props;
	}
}
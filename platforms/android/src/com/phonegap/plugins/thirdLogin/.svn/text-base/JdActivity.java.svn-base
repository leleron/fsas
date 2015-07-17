
package com.phonegap.plugins.thirdLogin;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.jd.open.sdk.android.Constants;
import com.jd.open.sdk.android.JdAndroidClient;
import com.jd.open.sdk.android.JdException;
import com.jd.open.sdk.android.JdListener;
import com.jd.open.sdk.android.auth.DialogError;


public class JdActivity extends Activity {

    public String TAG = getClass().getSimpleName();

    protected JdAndroidClient client = JdAndroidClient.getInstance();
    
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        client.setSandBoxEnv(false);

        client.setAppKey("");
        client.setAppSecret("");

        client.authorize(JdActivity.this, null, new JdListener.DialogListener() {
        	public void onComplete(Bundle values) {
        		
        		// set SharedPreferences
                SharedPreferences sp = getSharedPreferences("authorize",
                        Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sp.edit();
                // access_token
                editor.putString(Constants.TOKEN, values.getString(Constants.TOKEN));
                // refresh_token
                editor.putString(Constants.REFRESH_TOKEN,
                        values.getString(Constants.REFRESH_TOKEN));
                // time
                editor.putString(Constants.EXPIRES_TIME,
                        values.getString(Constants.EXPIRES_TIME));
                // expires_in
                editor.putString(Constants.EXPIRES_IN,
                        values.getString(Constants.EXPIRES_IN));
                editor.commit();

                // get accessToken
                Toast.makeText(JdActivity.this,
                        "access_token is: " + sp.getString(Constants.TOKEN, null),
                        Toast.LENGTH_SHORT).show();
                // set intent
                Intent intent = new Intent();
                intent.putExtra("ACCESSTOKEN", sp.getString(Constants.TOKEN, null));
                intent.putExtra("UID", sp.getString("uid", null));
                setResult(RESULT_OK, intent);
                finish();
                
        	}
        	public void onCancel() {
        		Log.i(TAG, "authoring has being canceled");
        	}
        	public void onError(DialogError e) {
        		Log.e(TAG, e.getMessage());
                showMessage(e.getMessage());
        	}
        	public void onJdError(JdException e) {
        		Log.e(TAG, e.getMessage());
                showMessage(e.getMessage());
        	}
        });
            
    }

    protected void showMessage(Object object) {
        Toast.makeText(this, object.toString(), Toast.LENGTH_LONG).show();
    }
}

package com.phonegap.plugins.thirdLogin;



import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.tencent.tauth.IUiListener;
import com.tencent.tauth.Tencent;
import com.tencent.tauth.UiError;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;



/**
 * This class echoes a string called from JavaScript.
 */
public class ThirdLogin extends CordovaPlugin {
	//
	public static final String APPID ="222222"; 
    private Tencent mTencent = null;
   
	public static final int REQUEST_CODE = 0x0ba7c0de;

    private static final String QQLOGIN_INTENT = "com.phonegap.plugins.thirdLogin.QQLOGIN";
	private static final String WXLOGIN_INTENT = "com.phonegap.plugins.thirdLogin.WXLOGIN";
	private static final String JDLOGIN_INTENT = "com.phonegap.plugins.thirdLogin.JDLOGIN";
	private static final String TOKEN = "accesstoken";
	private static final String UID = "uid";
	
    private CallbackContext callbackContext;

    /**
     * Constructor.
     */
    public ThirdLogin() {
    }
	
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	this.callbackContext = callbackContext;
        if (action.equals("qqLogin")) {
        	//qq();
        	ssoLogin();
            return true;
        }
        if (action.equals("wxLogin")) {
        	wx();
            return true;
        }
        if (action.equals("jdLogin")) {
        	jd();
            return true;
        }
        return false;
    }

    public void qq() {
        Intent intentLogin = new Intent(QQLOGIN_INTENT);
        intentLogin.addCategory(Intent.CATEGORY_DEFAULT);
        // avoid calling other phonegap apps
        intentLogin.setPackage(this.cordova.getActivity().getApplicationContext().getPackageName());

        this.cordova.startActivityForResult((CordovaPlugin) this, intentLogin, REQUEST_CODE);
    }
	public void wx() {
        Intent intentLogin = new Intent(WXLOGIN_INTENT);
        intentLogin.addCategory(Intent.CATEGORY_DEFAULT);
        // avoid calling other phonegap apps
        intentLogin.setPackage(this.cordova.getActivity().getApplicationContext().getPackageName());
        this.cordova.startActivityForResult((CordovaPlugin) this, intentLogin, REQUEST_CODE);
    }
	public void jd() {
        Intent intentLogin = new Intent(JDLOGIN_INTENT);
        intentLogin.addCategory(Intent.CATEGORY_DEFAULT);
        // avoid calling other phonegap apps
        intentLogin.setPackage(this.cordova.getActivity().getApplicationContext().getPackageName());

        this.cordova.startActivityForResult((CordovaPlugin) this, intentLogin, REQUEST_CODE);
    }
	

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                JSONObject obj = new JSONObject();
                try {
                    obj.put(TOKEN, intent.getStringExtra("ACCESSTOKEN"));
                    obj.put(UID, intent.getStringExtra("UID"));
                } catch (JSONException e) {
                	this.callbackContext.error("JSONException error");
                }
                this.callbackContext.success(obj);
            } else if (resultCode == Activity.RESULT_CANCELED) {
                JSONObject obj = new JSONObject();
                this.callbackContext.success(obj);
            } else {
                this.callbackContext.error("Unexpected error");
            }
        }
    }
    //
    public void ssoLogin(){
    	
		final Activity activity = this.cordova.getActivity();

		Context context = this.cordova.getActivity().getApplicationContext();
		mTencent = Tencent.createInstance(APPID, context);
		
		final IUiListener listener = new BaseUiListener() {
			@Override
			protected void doComplete(JSONObject values) {
				

			}
			
		};
		
		this.cordova.getActivity().runOnUiThread(new Runnable() {
	        @Override
	        public void run() {

	        	mTencent.login(activity, "all", listener);
	        }
	    });
		
		
	}
    //
    private class BaseUiListener implements IUiListener {

		@Override
		public void onComplete(Object response) {
			String uid=mTencent.getOpenId();
            String token=mTencent.getAccessToken();
        	

            JSONObject res=new JSONObject();
            try {
       
                res.put("uid", uid);
				res.put("accesstoken", token);
				callbackContext.success(res);

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				callbackContext.error(0);
				e.printStackTrace();
			}

		}

		protected void doComplete(JSONObject values) {


		}

		@Override
		public void onError(UiError e) {
			callbackContext.error(0);


		}

		@Override
		public void onCancel() {
			
			callbackContext.error(0);

		}

		
	}
   
}
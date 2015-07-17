package com.phonegap.plugins.isFirst;



import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;



/**
 * This class echoes a string called from JavaScript.
 */
public class IsFirst extends CordovaPlugin {

	public static final int REQUEST_CODE = 0x0ba7c0de;
	private static final String RESULT = "result";

	private static final String ISFIRST_INTENT = "com.phonegap.plugins.isFirst.ISFIRST";

    private CallbackContext callbackContext;
    

    /**
     * Constructor.
     */
    public IsFirst() {
    }
	
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	this.callbackContext = callbackContext;
        if (action.equals("isfirst")) {
        	isfirst();
            return true;
        }
        return false;
    }

	public void isfirst() {
        Intent intentisfirst = new Intent(ISFIRST_INTENT);
        intentisfirst.addCategory(Intent.CATEGORY_DEFAULT);
        // avoid calling other phonegap apps
        intentisfirst.setPackage(this.cordova.getActivity().getApplicationContext().getPackageName());

        this.cordova.startActivityForResult((CordovaPlugin) this, intentisfirst, REQUEST_CODE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    	
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                JSONObject obj = new JSONObject();
                try {
                    obj.put(RESULT, intent.getStringExtra("ISFIRST"));
                } catch (JSONException e) {
                	this.callbackContext.error("JSONException error");
                }
                this.callbackContext.success(obj);
            }else {
                this.callbackContext.error("Unexpected error");
            }
        }
        
    }
    
}
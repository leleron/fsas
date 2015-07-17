package com.phonegap.plugins.smartLinkConnect;

import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Date;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import com.example.smartlinklib.ModuleInfo;
import com.example.smartlinklib.SmartLinkManipulator;
import com.example.smartlinklib.SmartLinkManipulator.ConnectCallBack;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;


/**
 * This class echoes a string called from JavaScript.
 */
public class SmartLinkConnect extends CordovaPlugin {
	
	private static final String MAC = "mac";
    private static final String IP = "ip";
    
	SmartLinkManipulator sm;
	CallbackContext cbc;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getssid")) {
        	callbackContext.success(getSSid());
            return true;
        }
        if (action.equals("push2dvc")) {
        	Push2Dvc(args,callbackContext);
            return true;
        }
        
        return false;
    }
    
    private void Push2Dvc(JSONArray args,CallbackContext callbackContext) throws JSONException {
    	

    	cbc = callbackContext;
    	
    	String ss = args.getString(0);
    	String ps = args.getString(1);
    	Context ctx = this.cordova.getActivity().getApplicationContext();
    	//try ESP first, because it is more quickly

    	try
    	{

			final Date dtOne = new Date();
        		
        	sm = SmartLinkManipulator.getInstence();
            	
        	try {
        			
        		sm.setConnection(ss, ps, ctx);
        	} catch (SocketException e) {
        		callbackContext.success(e.getLocalizedMessage());
        	} catch (UnknownHostException e) {
        		callbackContext.success(e.getLocalizedMessage());
        	}

        	sm.Startconnection(new ConnectCallBack(){
        		public void onConnectTimeOut() {
        			cbc.success("timeout!");			
        		}
        			
        		public void onConnect(final ModuleInfo mi) {

        			Date dtEnd = new Date();
                	long iSecond = (dtEnd.getTime() - dtOne.getTime()) / 1000;
        			//String msg = "find hf  "+mi.getMid()+" mac "+ mi.getMac()+" IP "+mi.getModuleIP() + " spend " + iSecond + " seconds";
        			//cbc.success(msg);
        			//
        			JSONObject obj = new JSONObject();
        			try {
                        obj.put(MAC, mi.getMac());
                        obj.put(IP, mi.getModuleIP());
                    } catch (JSONException e) {
                        
                    }
        			cbc.success(obj);
        		}

        		public void onConnectOk() {
        			cbc.success("connected.");				
        		}	
        	});
        	
    	}
    	catch(Exception e )
    	{
    		cbc.success(e.getMessage());
    	}
    	
		
	}    	
	
	private String getSSid(){
    	Context ctx = this.cordova.getActivity().getApplicationContext();
		
		WifiManager  wm=(WifiManager)ctx.getSystemService(Context.WIFI_SERVICE);
		if(wm != null){
			WifiInfo wi = wm.getConnectionInfo();
			if(wi != null){
				String s = wi.getSSID();
				if(s.length()>2&&s.charAt(0) == '"'&&s.charAt(s.length() -1) == '"'){
					return s.substring(1,s.length()-1);
				}else{
					return s;
				}
			}
		}
		return "";
	}
}
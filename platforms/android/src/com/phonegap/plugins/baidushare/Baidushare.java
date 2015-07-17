package com.phonegap.plugins.baidushare;

import java.io.File;
import java.net.URISyntaxException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.baidu.cloudsdk.BaiduException;
import com.baidu.cloudsdk.IBaiduListener;
import com.baidu.cloudsdk.social.core.MediaType;
import com.baidu.cloudsdk.social.oauth.SocialConfig;
import com.baidu.cloudsdk.social.share.ShareContent;
import com.baidu.cloudsdk.social.share.SocialShare;
import com.baidu.cloudsdk.social.share.SocialShare.UIWidgetStyle; 

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebSettings.RenderPriority;
import android.widget.CompoundButton;
import android.widget.Toast;

/**
 *  
 */
public class Baidushare extends CordovaPlugin  {
    private static final String pgbaidumapljdh = "pgbaidumapljdh"; 
   
    private static final String bdshare = "bdshare"; 
    
    private static final String TITLE = "title";     
    private static final String CONTENT = "content";    
    private static final String URL = "url";
    private static final String IMAGE = "imageurl";
    
    
	final Handler handler = new Handler(Looper.getMainLooper());
 
	private ShareContent mShareContent;
	private String mClientId;
    public String callback;
    
    /**  * Constructor.*/


    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        
        if (action.equals(bdshare)) {
        	  
        	 JSONObject sharect = args.optJSONObject(0);
        	 String title = sharect.optString(TITLE);
	  		 String content = sharect.optString(CONTENT); 
	  		 String url = sharect.optString(URL);
	  		 String imageurl = sharect.optString(IMAGE);  
			  
	  		mClientId = SocialConfig.getInstance(this.cordova.getActivity()).getClientId(MediaType.BAIDU);
	  		
	  		if("".equals(imageurl) || imageurl==null){
	  			mShareContent = new ShareContent(title,content,url,Uri.EMPTY);
	  		}else{
	  			mShareContent = new ShareContent(title,content,url,Uri.parse(imageurl));
	  		}
	
	  		
    		    		
     		page_share_box_style(webView); 
    	 
            
        }else if (action.equals(pgbaidumapljdh)) { 
          
        	
        }else {
        	callbackContext.error("Invalid Action");
            return false;
        }
        
        return true;
    }

 
  
    public void page_share_box_style(CordovaWebView v) {
    	 
		 this.cordova.getActivity().runOnUiThread(new Runnable()    
	        {    
	            public void run()    
	            {    
	            	SocialShare.getInstance(cordova.getActivity(), mClientId).show(	            			
	            			cordova.getActivity().getWindow().getDecorView(), mShareContent,
	    					UIWidgetStyle.IOS_LIKE, new IBaiduListener() {
	    						@Override
	    						public void onError(BaiduException baiduexception) {
	    							Toast.makeText(cordova.getActivity(),
	    									baiduexception.toString(),
	    									Toast.LENGTH_SHORT).show();
	    						}

	    						@Override
	    						public void onComplete(JSONArray jsonarray) {
	    							Toast.makeText(cordova.getActivity(), "share success",
	    									Toast.LENGTH_SHORT).show();
	    						}

	    						@Override
	    						public void onComplete(JSONObject jsonobject) {
	    							Toast.makeText(cordova.getActivity(), "share success",
	    									Toast.LENGTH_SHORT).show();
	    						}

	    						@Override
	    						public void onComplete() {
	    							Toast.makeText(cordova.getActivity(), "share success",
	    									Toast.LENGTH_SHORT).show();
	    						}

	    						@Override
	    						public void onCancel() {
	    							Toast.makeText(cordova.getActivity(), "share cancel",
	    									Toast.LENGTH_SHORT).show();
	    						}
	    					});
	            }    
	    
	        });
		
	}
 
 
	 
	 
}

 


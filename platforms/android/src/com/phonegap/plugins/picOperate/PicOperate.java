package com.phonegap.plugins.picOperate;



import java.io.ByteArrayOutputStream;
import java.io.File;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;



/**
 * This class echoes a string called from JavaScript.
 */
public class PicOperate extends CordovaPlugin {
	
	public static final int NONE = 0;
	
    private static final int PHOTO_GRAPH = 1;
   
    private static final int PHOTO_ZOOM = 2;
   
    private static final int PHOTO_RESOULT = 3;
    
    private static final String IMAGE_UNSPECIFIED = "image/*";
    private static final String PHOTO = "imgdata";
    
    private CallbackContext callbackContext;

    
    /**
     * Constructor.
     */
    public PicOperate() {
    }
	
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	this.callbackContext = callbackContext;
    	if (action.equals("takePhoto")) {
        	Intent intent = new Intent(Intent.ACTION_PICK, null);
        	intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, IMAGE_UNSPECIFIED);
        	this.cordova.startActivityForResult((CordovaPlugin) this, intent, PHOTO_ZOOM);
            return true;
        }
        if (action.equals("takeCamra")) {
        	Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        	intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(new File(Environment.getExternalStorageDirectory(),"temp.jpg")));
        	this.cordova.startActivityForResult((CordovaPlugin) this, intent, PHOTO_GRAPH);	
            return true;
        }
        return false;
    }
    
    public void startPhotoZoom(Uri uri) {
    	
    	Intent intent = new Intent("com.android.camera.action.CROP");
    	
    	intent.setDataAndType(uri, IMAGE_UNSPECIFIED);
    	
    	intent.putExtra("crop", "true");
    	
    	intent.putExtra("aspectX", 1);
    	
    	intent.putExtra("aspectY", 1);
    	
    	intent.putExtra("outputX", 100);
    	
    	intent.putExtra("outputY", 100);
    	
    	intent.putExtra("return-data", true);
    	
    	this.cordova.startActivityForResult((CordovaPlugin) this, intent, PHOTO_RESOULT);
    	
    }
    
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
    	
    	if (resultCode == NONE)
            return;
    	
    	if (requestCode == PHOTO_GRAPH) {
    		
    		File picture = new File(Environment.getExternalStorageDirectory()+ "/temp.jpg");
    		startPhotoZoom(Uri.fromFile(picture));
    	}
    	
    	if (data == null)
            return;
    	
    	if (requestCode == PHOTO_ZOOM) {
    		startPhotoZoom(data.getData());
    	}
    	
    	if (requestCode == PHOTO_RESOULT) {
    		
    		Bundle extras = data.getExtras();
    		if (extras != null) {
    			Bitmap photo = extras.getParcelable("data");
    			ByteArrayOutputStream stream = new ByteArrayOutputStream();
    			photo.compress(Bitmap.CompressFormat.JPEG, 75, stream);
    			
    			byte[] code = stream.toByteArray();
                byte[] output = Base64.encode(code, Base64.NO_WRAP);
    			
    			this.callbackContext.success(new String(output));
    			
    		}else{
    			this.callbackContext.success();
    		}
    		
    	}
    	
    	
    }

    
}
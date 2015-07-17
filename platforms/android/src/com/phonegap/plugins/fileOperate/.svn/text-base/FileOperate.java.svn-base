package com.phonegap.plugins.fileOperate;



import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap.CompressFormat;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;



/**
 * This class echoes a string called from JavaScript.
 */
public class FileOperate extends CordovaPlugin {
    
    /**
     * Constructor.
     */
    public FileOperate() {
    }
	
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

    	String tp = args.getString(0);
    	
    	Bitmap bitmap = null;
    	byte[] bitmapArray;
    	String[] btp = tp.split(",");
        bitmapArray = Base64.decode(btp[1], Base64.DEFAULT);  
        bitmap =  BitmapFactory.decodeByteArray(bitmapArray, 0,bitmapArray.length);
        
        if (action.equals("savepng")) {
        	saveImageToGallery(this.cordova.getActivity().getApplicationContext(),bitmap);
        	callbackContext.success();
            return true;
        }
        return false;
    }
    
    public static void saveImageToGallery(Context context, Bitmap bmp) {
        
        File appDir = new File(Environment.getExternalStorageDirectory(), "flyco");
        if (!appDir.exists()) {
            appDir.mkdir();
        }
        String fileName = System.currentTimeMillis() + ".png";
        File file = new File(appDir, fileName);
        
        try {
            FileOutputStream fos = new FileOutputStream(file);
            bmp.compress(CompressFormat.PNG, 100, fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
    	}
        
        
        try {
            MediaStore.Images.Media.insertImage(context.getContentResolver(),
    				file.getAbsolutePath(), fileName, null);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + file.getAbsolutePath())));
       
    }
    
}
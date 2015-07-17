package com.phonegap.plugins.isFirst;



import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;


public class IsFirstActivity extends Activity {

	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = new Intent();
        String isFirst="";
        SharedPreferences setting = getSharedPreferences("fsas", Activity.MODE_PRIVATE);  
        Boolean user_first = setting.getBoolean("FIRST",true);  
        if(user_first){
            setting.edit().putBoolean("FIRST", false).commit();  
            isFirst = "YES";
        }else{
        	
        	isFirst = "NO";
        }
        intent.putExtra("ISFIRST", isFirst);
        
        setResult(RESULT_OK, intent);
        finish();
    }
}

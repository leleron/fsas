
package com.phonegap.plugins.thirdLogin;



import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;





import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tencent.mm.sdk.modelmsg.SendAuth;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

@SuppressLint("ShowToast")
public class WxActivity extends Activity {
    

	public static String WX_APP_ID = "wx9571790e7c31bf08";

	public static String WX_SECRET = "278aa8d3c90965945384145ce4dd6d11";
	
	public static String WX_CODE ="";
	
	public static String UID ="";
	public static String ACCESSTOKEN ="";

	
	public static IWXAPI wxApi;
	public static boolean isWXLogin = false;

	private Handler handler = new Handler() {  
        public void handleMessage(Message msg) {  
            switch (msg.what) {  
            case 0:  
                System.out.println("test");  
                Intent intent = new Intent();
                intent.putExtra("ACCESSTOKEN", ACCESSTOKEN);
                intent.putExtra("UID", UID);
                setResult(RESULT_OK, intent);
                finish();
                break;  
            }  

        };  
    };

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		wxApi = WXAPIFactory.createWXAPI(this, WX_APP_ID, true);
		wxApi.registerApp(WX_APP_ID);

		SendAuth.Req req = new SendAuth.Req();
		req.scope = "snsapi_userinfo";
		req.state = "wechat_sdk_demo";
		wxApi.sendReq(req);
				
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		if (isWXLogin) {
			loadWXUserInfo();
		}
	}
	
	private void loadWXUserInfo() {
		
		new Thread() {  
            @Override  
            public void run() {  
                // TODO Auto-generated method stub  
                super.run();  
                
                String accessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + WX_APP_ID + "&secret=" + WX_SECRET + "&code=" + WX_CODE + "&grant_type=authorization_code";
				String tokenResult = HttpUtil.httpsGet(accessTokenUrl);
				
				if (null != tokenResult) {
					JSONObject tokenObj = JSON.parseObject(tokenResult);
					String accessToken = tokenObj.getString("access_token");
					String openId = tokenObj.getString("openid");
					UID = openId;
					ACCESSTOKEN = accessToken;
				}
				
                Message msg = handler.obtainMessage();  
                msg.what = 0;  
                handler.sendMessage(msg);  
            }  
        }.start(); 
		isWXLogin = false;
	}
		
              
		
}
	

	
	


	
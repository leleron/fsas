//
//  LoginViewController.m
//  飞科智能
//
//  Created by leron on 15/6/8.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "LoginViewController.h"
#import "AppDelegate.h"
#import "TencentOAuth.h"
#import "WeiboSDK.h"
#import "WXApi.h"
#import "RegisterViewController.h"
#import "loginMock.h"
#import "UserInfo.h"
#import "forgetPswViewController.h"
#import "ModifyUserInfoViewController.h"
#import "WXAccessTokenMock.h"
#import "WXUserInfoMock.h"
#import "WXUpdateTokenMock.h"
#import "thirdLoginMock.h"
#import "updateUserInfoMock.h"
#import "forgetCodeMock.h"
#import "identifyCodeMock.h"
#import "codeLoginMock.h"
@interface LoginViewController ()<TencentSessionDelegate,WBHttpRequestDelegate,WXApiDelegate,WeiboSDKDelegate>
@property (weak, nonatomic) IBOutlet UIButton *btnLoginQQ;
@property (weak, nonatomic) IBOutlet UIButton *btnLoginWeChat;
@property (weak, nonatomic) IBOutlet UIButton *btnLoginWeibo;
@property (weak, nonatomic) IBOutlet UIButton *btnRegister;
@property (weak, nonatomic) IBOutlet UIButton *btnLogin;
@property (weak, nonatomic) IBOutlet UITextField *textPhoneNum;

@property (weak, nonatomic) IBOutlet UITextField *textPsw;
@property (weak, nonatomic) IBOutlet UIButton *btnFogetPsw;

@property (weak, nonatomic) IBOutlet UIButton *btnRegisterLogin; //注册用户登录按钮

@property (weak, nonatomic) IBOutlet UIButton *btnCodeLogin;   //验证码登录按钮
@property (weak, nonatomic) IBOutlet UIButton *btnGetCode;   //获取验证码

@property(strong,nonatomic)TencentOAuth* tencentOAuth;
@property(strong,nonatomic)NSArray* permissions;
@property(strong,nonatomic)WBAuthorizeRequest* request;
@property(strong,nonatomic)loginMock* myLoginMock;
@property(strong,nonatomic)loginParam* myLoginParam;
@property(strong,nonatomic)WXAccessTokenMock* myWXTokenMock;    //获取微信token
@property(strong,nonatomic)WXUserInfoMock* myWXUserInfoMock;   //获取微信用户信息
@property(strong,nonatomic)WXUpdateTokenMock* myWXupdateMock;  //刷新微信token
@property(strong,nonatomic)thirdLoginMock* myThirdLoginMock;   //第三方登陆
@property(strong,nonatomic)updateUserInfoMock* myUpdateInfoMock;  //获取用户信息
@property(strong,nonatomic)forgetCodeMock* myGetCodeMock;      //获取验证码
@property(strong,nonatomic)identifyCodeMock* myIdentifyCodeMock;   //验证验证码
@property(strong,nonatomic)codeLoginMock* myCodeLoginMock;       //验证码登陆
@property(strong,nonatomic)NSString* phoneNum;      //保存的手机号
@property(assign,getter=isRegisterLogin)BOOL isRegisterLogin;       //是否为注册用户登录
@property(assign,nonatomic)NSInteger counter;     //倒计时
@end

@implementation LoginViewController

- (void)viewDidLoad {
    self.navigationBarTitle = @"登陆";
    [super viewDidLoad];
    self.navigationController.navigationBar.hidden = NO;
    [self.btnLoginQQ addTarget:self action:@selector(loginWithQQ) forControlEvents:UIControlEventTouchUpInside];
    [self.btnLoginWeChat addTarget:self action:@selector(loginWithWX) forControlEvents:UIControlEventTouchUpInside];
    [self.btnLoginWeibo addTarget:self action:@selector(loginWithWeibo) forControlEvents:UIControlEventTouchUpInside];
    [self.btnRegister addTarget:self action:@selector(gotoRegister) forControlEvents:UIControlEventTouchUpInside];
    [self.btnLogin addTarget:self action:@selector(gotoLogin) forControlEvents:UIControlEventTouchUpInside];
    [self.btnFogetPsw addTarget:self action:@selector(gotoForgetPsw) forControlEvents:UIControlEventTouchUpInside];
    [self.btnRegisterLogin addTarget:self action:@selector(selectRegisterLogin) forControlEvents:UIControlEventTouchUpInside];
    [self.btnCodeLogin addTarget:self action:@selector(selectCodeLogin) forControlEvents:UIControlEventTouchUpInside];
    [self.btnGetCode addTarget:self action:@selector(gotoGetCode) forControlEvents:UIControlEventTouchUpInside];
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(postWeiboUserInfo) name:LOGIN_WB_SUCCESS object:nil];
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(getWXUserInfo) name:LOGIN_WX_SUCCESS object:nil];
    // Do any additional setup after loading the view.
    self.textPsw.secureTextEntry = YES;
}

-(void)initQuickUI{
    self.textPsw.delegate = self;
    self.textPhoneNum.delegate = self;
}
-(void)initQuickMock{
    self.myLoginMock = [loginMock mock];
    self.myLoginMock.delegate = self;
    self.myThirdLoginMock = [thirdLoginMock mock];
    self.myThirdLoginMock.delegate = self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)selectRegisterLogin{
    self.btnGetCode.hidden = YES;
    [self.btnRegisterLogin setBackgroundColor:Color_BarItem];
    [self.btnCodeLogin setBackgroundColor:[UIColor grayColor]];
    self.isRegisterLogin = true;
    self.textPhoneNum.placeholder = @"邮箱/手机号";
    self.textPsw.placeholder = @"密码";
}

-(void)selectCodeLogin{
    self.btnGetCode.hidden = NO;
    [self.btnRegisterLogin setBackgroundColor:[UIColor grayColor]];
    [self.btnCodeLogin setBackgroundColor:Color_BarItem];
    self.isRegisterLogin = false;
    self.textPhoneNum.placeholder = @"手机号码";
    self.textPsw.placeholder = @"验证码";
}

-(void)gotoRegister{
    RegisterViewController* controller = [[RegisterViewController alloc]initWithNibName:@"RegisterViewController" bundle:nil];
    [self.navigationController pushViewController:controller animated:YES];
}

-(void)gotoLogin{
    if (self.isRegisterLogin == true) {
        
        if (self.textPhoneNum.text != nil && self.textPsw.text!= nil) {
            self.myLoginParam= [loginParam param];
            self.myLoginParam.sendMethod = @"POST";
            self.myLoginParam.LOGINID = self.textPhoneNum.text;
            self.myLoginParam.PASSWORD = self.textPsw.text;
            self.phoneNum = self.myLoginParam.LOGINID;
            //        param.LOGINID = @"15021631445";
            //        param.PASSWORD = @"85314248";
            [self.myLoginMock run:self.myLoginParam];
            [[ViewControllerManager sharedManager]showWaitView:self.view];
        }
    }else{
        if (self.textPhoneNum.text != nil && self.textPsw.text != nil) {
            self.myIdentifyCodeMock = [identifyCodeMock mock];
            self.myIdentifyCodeMock.delegate = self;
            identifyCodeParam* param = [identifyCodeParam param];
            param.MOBILE = self.textPhoneNum.text;
            param.IDENTIFY_CODE = self.textPsw.text;
            [self.myIdentifyCodeMock run:param];
        }
    }
    
}

-(void)gotoGetCode{
    self.counter = 60;
    self.myGetCodeMock = [forgetCodeMock mock];
    self.myGetCodeMock.delegate = self;
    self.myGetCodeMock.operationType = [NSString stringWithFormat:@"/user/check/%@",self.textPhoneNum.text];
    forgetCodeParam* param = [forgetCodeParam param];
    param.sendMethod = @"GET";
    [self.myGetCodeMock run:param];
    self.btnGetCode.enabled = NO;
    [self.btnGetCode setBackgroundColor:[UIColor grayColor]];
//    [self.btnGetCode setTitleColor:[UIColor colorWithRed:148/255.f green:148/255.5 blue:148/255.f alpha:1.0] forState:UIControlStateNormal];
    [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(showTime:) userInfo:nil repeats:YES];

}

-(void)gotoForgetPsw{
    forgetPswViewController* controller = [[forgetPswViewController alloc]initWithNibName:@"forgetPswViewController" bundle:nil];
    [self.navigationController pushViewController:controller animated:YES];
}


-(void)loginWithQQ{
    AppDelegate* delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    delegate.login_type = LOGIN_QQ;
    _tencentOAuth = [[TencentOAuth alloc] initWithAppId:@"1104692486"andDelegate:self];
    _permissions =  [NSArray arrayWithObjects:@"get_user_info", @"get_simple_userinfo", @"add_t", nil];
    [_tencentOAuth authorize:_permissions inSafari:NO];
}

-(void)loginWithWX{
    AppDelegate* delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
    delegate.login_type = LOGIN_WECHAT;
    SendAuthReq* req = [[SendAuthReq alloc]init];
    req.scope = @"snsapi_userinfo" ;
    req.state = @"123" ;
    //第三方向微信终端发送一个SendAuthReq消息结构
    [WXApi sendReq:req];
}

-(void)loginWithWeibo{
    AppDelegate* delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
    delegate.login_type = LOGIN_WEIBO;
    self.request = [[WBAuthorizeRequest alloc]init];
    self.request.redirectURI = SinaRedirectURI;
    self.request.scope = @"all";
//    request.userInfo = @{@"SSO_From":@"SendMessageToWeiboViewController",}
    [WeiboSDK sendRequest:self.request];
}

-(void)postWeiboUserInfo{
    UserInfo* myUserInfo = [UserInfo restore];
    NSNumber *userID = [NSNumber numberWithInteger:[myUserInfo.wbUserID integerValue]];
    NSString* user = [NSString stringWithFormat:@"%@",userID];
    NSDictionary* param = @{@"access_token":myUserInfo.wbTokenID,@"uid":user};
    NSString* url = @"https://api.weibo.com/2/users/show.json";
//   [WBHttpRequest requestWithAccessToken:myUserInfo.wbTokenID url:url httpMethod:@"GET" params:param delegate:self withTag:nil];
    NSString* sendMethod = @"GET";
    [WBHttpRequest requestWithURL:url httpMethod:sendMethod params:param delegate:self withTag:nil];
}



-(void)getWXUserInfo{
    self.myWXTokenMock = [WXAccessTokenMock mock];
    self.myWXTokenMock.delegate = self;
    WXAccessTokenParam* param = [WXAccessTokenParam param];
    param.sendMethod = @"GET";
    [self.myWXTokenMock run:param];
}

-(void)thirdLogin{
    thirdLoginParam* param = [thirdLoginParam param];
    UserInfo* myUserInfo = [UserInfo restore];
    if ([myUserInfo.userLoginType isEqualToString:LOGIN_QQ]) {
        param.LOGINTYPE = @"QQ";
        param.UID = myUserInfo.qqUserID;
        param.ACCESSTOKEN = myUserInfo.qqTokenID;
    }
    if ([myUserInfo.userLoginType isEqualToString:LOGIN_WECHAT]) {
        param.LOGINTYPE = @"WEIXIN";
        param.UID = myUserInfo.wxUserID;
        param.ACCESSTOKEN = myUserInfo.wxTokenID;
    }
    [self.myThirdLoginMock run:param];
}


#pragma mark QQ登陆delelgate
- (void)tencentDidLogin
{
//    _labelTitle.text = @"登录完成";
    
    if (_tencentOAuth.accessToken && 0 != [_tencentOAuth.accessToken length])
    {
        //  记录登录用户的OpenID、Token以及过期时间
//        _labelAccessToken.text = _tencentOAuth.accessToken;
        NSLog(@"%@",_tencentOAuth.accessToken);
        UserInfo* myUserInfo = [[UserInfo alloc]init];
        myUserInfo.qqTokenID = _tencentOAuth.accessToken;
        myUserInfo.qqUserID = _tencentOAuth.openId;
        [myUserInfo store];
        [[ViewControllerManager sharedManager]showWaitView:self.view];
        [_tencentOAuth getUserInfo];
        
    }
    else
    {
//        _labelAccessToken.text = @"登录不成功 没有获取accesstoken";
        NSLog(@"登录不成功 没有获取accesstoken");
    }
}
- (void)getUserInfoResponse:(APIResponse*) response{
    
    [[ViewControllerManager sharedManager]hideWaitView];
    UserInfo *myUserInfo = [UserInfo restore];
    myUserInfo.nickName = [response.jsonResponse objectForKey:@"nickname"];
    myUserInfo.headImg = [response.jsonResponse objectForKey:@"figureurl_qq_2"];
    myUserInfo.userLoginType = LOGIN_QQ;
    [myUserInfo store];
    [self thirdLogin];   
//    self.myUserInfo.headImg = [UIIm]
}



-(void)tencentDidNotLogin:(BOOL)cancelled
{
    if (cancelled)
    {
//        _labelTitle.text = @"用户取消登录";
        NSLog(@"用户取消登陆");
    }
    else
    {
//        _labelTitle.text = @"登录失败";
        NSLog(@"登陆失败");
    }
}

-(void)tencentDidNotNetWork
{
//    _labelTitle.text=@"无网络连接，请设置网络";
    NSLog(@"无网络连接 请设置网络");
}

#pragma mark 微博delegate


-(void)request:(WBHttpRequest *)request didReceiveResponse:(NSURLResponse *)response{

//    NSDictionary* dict = [[request responseData] objectFromJSONData];
}

-(void)request:(WBHttpRequest *)request didFinishLoadingWithResult:(NSString *)result{
    NSString* title = nil;
    UIAlertView* alert = nil;
    title = @"收到网络回调";
    NSLog(@"lirong:%@",request);
    alert = [[UIAlertView alloc]initWithTitle:title message:result delegate:self cancelButtonTitle:@"确定" otherButtonTitles: nil];
    [alert show];
}


-(void)request:(WBHttpRequest *)request didFailWithError:(NSError *)error{
    NSString* title = @"请求异常";
    UIAlertView* alert = [[UIAlertView alloc]initWithTitle:title message:[NSString stringWithFormat:@"%@",error] delegate:self cancelButtonTitle:@"确定" otherButtonTitles:nil];
    [alert show];
}

#pragma mark 更新用户信息
-(void)getUserInfo{
    self.myUpdateInfoMock = [updateUserInfoMock mock];
    self.myUpdateInfoMock.delegate = self;
    updateUserInfoParam* param = [updateUserInfoParam param];
    param.sendMethod = @"GET";
    [self.myUpdateInfoMock run:param];
}


#pragma mark QUMockDelegate
-(void)QUMock:(QUMock *)mock entity:(QUEntity *)entity{
    if ([mock isKindOfClass:[loginMock class]]) {
        loginEntity* e = (loginEntity*)entity;
        if ([e.status isEqualToString:RESULT_SUCCESS]) {
            UserInfo* myUserInfo = [[UserInfo alloc]init];
            myUserInfo.phoneNum = self.phoneNum;
            myUserInfo.tokenID = e.tokenId;
            NSLog(@"tokenId:%@",e.tokenId);
            myUserInfo.userLoginType = LOGIN_PHONE;
            [myUserInfo store];
            [self getUserInfo];
            [self.navigationController popViewControllerAnimated:YES];
        }
    }
    if ([mock isKindOfClass:[updateUserInfoMock class]]) {
        updateUserInfoEntity* e = (updateUserInfoEntity*)entity;
        NSDictionary* result = e.result;
        NSString* img = [result objectForKey:@"IMAGE"];
        NSString* imgUrl = [NSString stringWithFormat:@"http://121.40.104.203:8080%@",img];
        NSURL* url = [NSURL URLWithString:imgUrl];
        NSData* data = [NSData dataWithContentsOfURL:url];
        UIImage* headImg = [UIImage imageWithData:data];
        if (headImg) {
            [[WHGlobalHelper shareGlobalHelper]put:headImg key:USER_TOUXIANG];
        }
    }
    
    if ([mock isKindOfClass:[WXAccessTokenMock class]]) {
        WXAccessTokenEntity* e = (WXAccessTokenEntity*)entity;
        UserInfo* myUserInfo = [[UserInfo alloc]init];
        myUserInfo.wxTokenID = e.access_token;
        myUserInfo.wxUserID = e.openid;
        myUserInfo.wxRefreshTokenID = e.refresh_token;
        [myUserInfo store];
        //重新刷新token时间
        self.myWXupdateMock = [WXUpdateTokenMock mock];
        self.myWXupdateMock.delegate = self;
        WXUpdateTokenParma* param = [WXUpdateTokenParma param];
        param.sendMethod = @"GET";
        [self.myWXupdateMock run:param];
    }
    
    if ([mock isKindOfClass:[WXUpdateTokenMock class]]) {
        WXAccessTokenEntity* e = (WXAccessTokenEntity*)entity;
        UserInfo* myUserInfo = [[UserInfo alloc]init];
        myUserInfo.wxTokenID = e.access_token;
        myUserInfo.wxUserID = e.openid;
        myUserInfo.wxRefreshTokenID = e.refresh_token;
        [myUserInfo store];
        self.myWXUserInfoMock = [WXUserInfoMock mock];
        self.myWXUserInfoMock.delegate = self;
        WXUserInfoParam* param = [WXUserInfoParam param];
        param.sendMethod = @"GET";
        [[ViewControllerManager sharedManager]showWaitView:self.view];
        [self.myWXUserInfoMock run:param];


    }
    if ([mock isKindOfClass:[WXUserInfoMock class]]) {
        WXUserInfoEntity* e = (WXUserInfoEntity*)entity;
//        NSData* userHeadData = [NSData dataWithContentsOfURL:[NSURL URLWithString:e.headimgurl]];
        UserInfo* myUserInfo = [[UserInfo alloc]init];
        UserInfo* oldUserInfo = [UserInfo restore];
        [myUserInfo copy:oldUserInfo];
        myUserInfo.headImg = e.headimgurl;
        myUserInfo.userLoginType = LOGIN_WECHAT;
        myUserInfo.nickName = e.nickname;
        [myUserInfo store];
        [self thirdLogin];
    }
    
    if ([mock isKindOfClass:[thirdLoginMock class]]) {
        loginEntity* e = (loginEntity*)entity;
        if ([e.status isEqualToString:RESULT_SUCCESS]) {
            UserInfo* myUserInfo = [UserInfo restore];
            myUserInfo.tokenID = e.tokenId;
            [myUserInfo store];
            [self.navigationController popToRootViewControllerAnimated:YES];
        }
    }
    //得到验证Code
    if ([mock isKindOfClass:[forgetCodeMock class]]) {
        
    }
    if ([mock isKindOfClass:[identifyCodeMock class]]) {
        self.myCodeLoginMock = [codeLoginMock mock];
        self.myCodeLoginMock.delegate = self;
        codeLoginParam* param = [codeLoginParam param];
        param.MOBILE = self.textPhoneNum.text;
        [self.myCodeLoginMock run:param];
    }
    
    if ([mock isKindOfClass:[codeLoginMock class]]) {
        loginEntity* e = (loginEntity*)entity;
        UserInfo* myUserInfo = [[UserInfo alloc]init];
        myUserInfo.tokenID = e.tokenId;
        [myUserInfo store];
    }
}

-(void)showTime:(NSTimer*)time{
    if (self.counter == 0) {
        [time invalidate];
        [self.btnGetCode setTitle:@"重新获取" forState:UIControlStateNormal];
//        [self.btnGetCode setBackgroundImage:[UIImage imageNamed:@"submit"] forState:UIControlStateNormal];
        [self.btnGetCode setBackgroundColor:Color_BarItem];
        self.btnGetCode.enabled = YES;
    }else{
        self.counter--;
        self.btnGetCode.titleLabel.text = [NSString stringWithFormat:@"%ld秒",(long)self.counter];
        [self.btnGetCode setTitle:[NSString stringWithFormat:@"%ld秒",(long)self.counter] forState:UIControlStateDisabled];
        
    }
}


//-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
//    [self.textPhoneNum resignFirstResponder];
//    [self.textPsw resignFirstResponder]
//}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end

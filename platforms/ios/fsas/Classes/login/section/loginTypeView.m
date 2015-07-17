//
//  loginTypeView.m
//  Empty
//
//  Created by leron on 15/6/18.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "loginTypeView.h"
#import "TencentOAuth.h"
#import "WeiboSDK.h"
#import "WXApi.h"
#import "loginMock.h"

@implementation loginTypeView
@end
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/
@interface viewThirdLogin()<TencentSessionDelegate,WBHttpRequestDelegate,WXApiDelegate>
@property (strong,nonatomic)TencentOAuth* tencentOAuth;
@end

@interface viewBindFlycoCount()<QUMockDelegate>
@property (strong, nonatomic) IBOutlet UIButton *btnBind;
@property (strong,nonatomic)loginMock* myLoginMock;
@property (assign,nonatomic)BOOL bindSuccess;
@end

@implementation viewBindFlycoCount

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        
        
    }
    return self;
}


-(void)awakeFromNib{
    [super awakeFromNib];
    self.bindSuccess = false;
    [self.btnBind addTarget:self action:@selector(bindFlycoCount) forControlEvents:UIControlEventTouchUpInside];
    self.myLoginMock = [loginMock mock];
    self.myLoginMock.delegate = self;
}
-(void)bindFlycoCount{
    if(self.textPhoneNum.text && self.textPsw.text){
        loginParam* param = [loginParam param];
        param.LOGINID = self.textPhoneNum.text;
        param.PASSWORD = self.textPsw.text;
        [self.myLoginMock run:param];
        [[ViewControllerManager sharedManager]showWaitView:self];
    }
}

-(void)QUMock:(QUMock *)mock entity:(QUEntity *)entity{
    if ([mock isKindOfClass:[loginMock class]]) {
        loginEntity* e = (loginEntity*)entity;
        if ([e.status isEqualToString:RESULT_SUCCESS]) {
            UserInfo* myUserInfo =[UserInfo restore];
            myUserInfo.phoneNum = self.textPhoneNum.text;
            myUserInfo.password = self.textPsw.text;
            [myUserInfo store];
            self.bindSuccess = true;
            [[NSNotificationCenter defaultCenter]postNotificationName:LOGIN_PHONE_SUCCESS object:nil];
        }
    }
}


-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
    [self.textPhoneNum resignFirstResponder];
    [self.textPsw resignFirstResponder];
}
@end

@implementation viewThirdLogin

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        
        
    }
    return self;
}


-(void)awakeFromNib{
    [super awakeFromNib];
    [self.btnAddQQ addTarget:self action:@selector(gotoAddQQ) forControlEvents:UIControlEventTouchUpInside];
    [self.btnAddWechat addTarget:self action:@selector(gotoAddWeChat) forControlEvents:UIControlEventTouchUpInside];
    [self.btnAddWeibo addTarget:self action:@selector(gotoAddWeibo) forControlEvents:UIControlEventTouchUpInside];
    UserInfo* myUserInfo = [UserInfo restore];
    if (myUserInfo.qqTokenID) {
        self.btnAddQQ.titleLabel.text = @"删除";
    }
    if(myUserInfo.wbTokenID){
        self.btnAddWeibo.titleLabel.text = @"删除";
    }
    if (myUserInfo.wxTokenID) {
        self.btnAddWechat.titleLabel.text = @"删除";
    }

}
-(void)gotoAddQQ{
    if ([self.btnAddQQ.titleLabel.text isEqualToString:@"删除"]) {
        UserInfo* myUserInfo = [UserInfo restore];
        myUserInfo.qqTokenID = nil;
        myUserInfo.qqUserID = nil;
        [myUserInfo store];
    }else{
        self.tencentOAuth = [[TencentOAuth alloc] initWithAppId:@"1104692486"andDelegate:self];
        NSArray* permissions =  [NSArray arrayWithObjects:@"get_user_info", @"get_simple_userinfo", @"add_t", nil];
        AppDelegate* delegate = [UIApplication sharedApplication].delegate;
        delegate.login_type = LOGIN_QQ;
        [_tencentOAuth authorize:permissions inSafari:NO];
    }
    
}

-(void)deleteQQ{
    [self.btnAddQQ setTitle:@"绑定" forState:UIControlStateNormal];
    [self.btnAddQQ addTarget:self action:@selector(gotoAddQQ) forControlEvents:UIControlEventTouchUpInside];
}

-(void)deleteWX{
    [self.btnAddWechat setTitle:@"绑定" forState:UIControlStateNormal];
    [self.btnAddWechat addTarget:self action:@selector(gotoAddWeChat) forControlEvents:UIControlEventTouchUpInside];
}
-(void)gotoAddWeChat{
    if ([self.btnAddWechat.titleLabel.text isEqualToString:@"删除"]) {
        UserInfo* myUserInfo = [UserInfo restore];
        myUserInfo.wxTokenID = nil;
        myUserInfo.wxUserID = nil;
        myUserInfo.wxRefreshTokenID = nil;
    }else{
        AppDelegate* delegate = [UIApplication sharedApplication].delegate;
        delegate.login_type = LOGIN_WECHAT;
    SendAuthReq* req = [[SendAuthReq alloc]init];
    req.scope = @"snsapi_userinfo" ;
    req.state = @"123" ;
    //第三方向微信终端发送一个SendAuthReq消息结构
    [WXApi sendReq:req];
    }
}

-(void)gotoAddWeibo{
    WBAuthorizeRequest* request = [[WBAuthorizeRequest alloc]init];
    request.redirectURI = SinaRedirectURI;
    request.scope = @"all";
    //    request.userInfo = @{@"SSO_From":@"SendMessageToWeiboViewController",}
    [WeiboSDK sendRequest:request];
}


#pragma mark QQ登陆delelgate
- (void)tencentDidLogin
{
    //    _labelTitle.text = @"登录完成";
    
    if (_tencentOAuth.accessToken && 0 != [_tencentOAuth.accessToken length])
    {
        
        [self.btnAddQQ setTitle:@"删除" forState:UIControlStateNormal];
        [self.btnAddQQ addTarget:self action:@selector(deleteQQ) forControlEvents:UIControlEventTouchUpInside];

        //  记录登录用户的OpenID、Token以及过期时间
        //        _labelAccessToken.text = _tencentOAuth.accessToken;
        UserInfo* myUserInfo = [UserInfo restore];
        myUserInfo.qqTokenID = _tencentOAuth.accessToken;
        [myUserInfo store];
        NSLog(@"%@",_tencentOAuth.accessToken);
        
    }
    else
    {
        //        _labelAccessToken.text = @"登录不成功 没有获取accesstoken";
        NSLog(@"登录不成功 没有获取accesstoken");
    }
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


-(void) onResp:(BaseResp*)resp{
    if ([resp isKindOfClass:[SendAuthResp class]]) {
        SendAuthResp* request = (SendAuthResp*)resp;
        NSString* code = request.code;
        [[NSUserDefaults standardUserDefaults]setObject:code forKey:WXCode];
//        [[NSNotificationCenter defaultCenter]postNotificationName:LOGIN_WX_SUCCESS object:nil];
        [[NSNotificationCenter defaultCenter]postNotificationName:@"login_wx_success" object:nil];

//        ASIFormDataRequest* request = [[ASIFormDataRequest alloc] initWithURL:nil];


    }
}



-(void)loginWX{
    [self.btnAddWechat setTitle:@"删除" forState:UIControlStateNormal];
    [self.btnAddWechat addTarget:self action:@selector(deleteWX) forControlEvents:UIControlEventTouchUpInside];
    
}


@end




//
//  iOSPlugins.m
//  飞科智能家电
//
//  Created by duye on 15/5/26.
//
//

#import "iOSPlugins.h"
#import "Reachability.h"
#import <SystemConfiguration/CaptiveNetwork.h>
//#import "cooee.h"
#include <ifaddrs.h>
#include <arpa/inet.h>
#import "FMDatabaseAdditions.h"

@interface iOSPlugins()
{
    BOOL Send;
    NSString* _wifiName;
    unsigned int ip;
    const char *SSID;
    const char *PWD;
    const char *KEY;
    NSTimer *Send_cooee;
    NSMutableArray *_searchResultArray;
    NSInteger timecount;
    NSTimer*  _timer;
}

@end

@implementation iOSPlugins

- (MainViewController *)getMainViewController{
    if (!mainViewController) {
        UIWindow *window = [[UIApplication sharedApplication].windows objectAtIndex:0];
        mainViewController = (MainViewController*)window.rootViewController;
    }
    return mainViewController;
}

//【获取当前连接WiFi的SSID】 插件名：getssid 入参：无 出参：当前连接WiFi的SSID ---------------------
- (void)getssid:(CDVInvokedUrlCommand*)command
{
    
    CDVPluginResult* pluginResult = nil;
    NSDictionary *dic2 = [NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:[self fetchSsid], nil] forKeys:[NSArray arrayWithObjects:@"SSID", nil]];
    NSDictionary *dic = [NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:dic2, nil] forKeys:[NSArray arrayWithObjects:@"lan", nil]];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSString *)fetchSsid
{
    NSDictionary *ssidInfo = [self fetchSSIDInfo];
    return [ssidInfo objectForKey:@"SSID"];
}

- (NSDictionary *)fetchSSIDInfo
{
    NSArray *interfaceNames = CFBridgingRelease(CNCopySupportedInterfaces());
    NSDictionary *SSIDInfo;
    for (NSString *interfaceName in interfaceNames) {
        SSIDInfo = CFBridgingRelease(CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName));
        BOOL isNotEmpty = (SSIDInfo.count > 0);
        if (isNotEmpty) {
            break;
        }
    }
    return SSIDInfo;
}
//【乐鑫WiFi配网】---------------------------------------------------------------------------

//【汉枫WiFi配网】 插件名：hangFeng 入参：ssid,password 出参：汉枫mac地址 ------------------------
#pragma mark - HanFeng
//- (void)hanFeng:(CDVInvokedUrlCommand*)command
//{
//    times = 0;
//    findTimes = 0;
//    HFcommand = command;
//    count = 0;
//    //从页面获取password
//    HanFengpassword = [command.arguments objectAtIndex:0];
//    smtlk=[[HFSmtlkV30 alloc] initWithDelegate:self];
//    // start to do smtlk
//    [self startSmartLink];
//}
//
//- (void)SmtlkTimeOut
//{
//    if (!isfinding)
//    {
//        [self stopSmartLink];
//        [self showTimeout];
//        return;
//    }
//    
//    [smtlk SendSmtlkFind];
//    [NSTimer scheduledTimerWithTimeInterval:1.0f target:self selector:@selector(SmtlkTimeOut) userInfo:nil repeats:NO];
//}
//
//- (void)showTimeout
//{
//    NSLog(@"showTimeouting");
//    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"{\"message\":\"ERROR\",\"status\":\"FAILURE\"}"];
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:HFcommand.callbackId];
//}
//
//// do smartLink
//- (void)startSmartLink
//{
//    [smtlk SmtlkV30StartWithKey:HanFengpassword];
//}
//
//- (void)stopSmartLink
//{
//    [smtlk SmtlkV30Stop];
//}
//
////代理方法
//- (void)SmtlkV30Finished
//{
//    if (times < 2)
//    {
//        NSLog(@"smtlk second start");
//        times++;
//        [self startSmartLink];
//        findTimes= 0;
//        isfinding = YES;
//        [NSTimer scheduledTimerWithTimeInterval:3.0f target:self selector:@selector(SmtlkTimeOut) userInfo:nil repeats:NO];
//    }else{
//        isfinding = NO;
//        [self stopSmartLink];
//    }
//}
//
//- (void)SmtlkV30ReceivedRspMAC:(NSString *)mac fromHost:(NSString *)host
//{
//    NSLog(@"Receive MAC:%@",mac);
//    NSLog(@"Receive IP:%@",host);
//    macAddress = mac;
//    if (count == 0) {
//        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:macAddress];
//        [self.commandDelegate sendPluginResult:pluginResult callbackId:HFcommand.callbackId];
//    }
//    count++;
//}
//【汉枫WiFi配网】---------------------------------------------------------------------------

//【识别相册二维码】 插件名：scanqRcodePicture 入参：无 出参：二维码值 ----------------------------
//- (void)scanqRcodePicture:(CDVInvokedUrlCommand*)command
//{
//    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
//    picker.allowsEditing = YES;
//    picker.delegate = self;
//    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
//    [[self getMainViewController] presentViewController:picker animated:YES completion:^{}];
//}
//
//-(void)getURLWithImage:(UIImage *)img{
//    
//    UIImage *loadImage= img;
//    CGImageRef imageToDecode = loadImage.CGImage;
//    
//    ZXLuminanceSource *source = [[ZXCGImageLuminanceSource alloc] initWithCGImage:imageToDecode];
//    ZXBinaryBitmap *bitmap = [ZXBinaryBitmap binaryBitmapWithBinarizer:[ZXHybridBinarizer binarizerWithSource:source]];
//    
//    NSError *error = nil;
//    
//    ZXDecodeHints *hints = [ZXDecodeHints hints];
//    
//    ZXMultiFormatReader *reader = [ZXMultiFormatReader reader];
//    ZXResult *result = [reader decode:bitmap
//                                hints:hints
//                                error:&error];
//    if (result) {
//        // The coded result as a string. The raw data can be accessed with
//        // result.rawBytes and result.length.
//        NSString *contents = result.text;
//        NSLog(@"contents =%@",contents);
//        UIAlertView *alter = [[UIAlertView alloc] initWithTitle:@"解析成功" message:contents delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
//        [alter show];
//        
//    } else {
//        UIAlertView *alter1 = [[UIAlertView alloc] initWithTitle:@"解析失败" message:nil delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
//        [alter1 show];
//    }
//}
//
//#pragma mark - UIImagePickerControllerDelegate
//- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
//{
//    UIImage *image = [info objectForKey:@"UIImagePickerControllerEditedImage"];
//    [[self getMainViewController] dismissViewControllerAnimated:YES completion:^{
//        [self getURLWithImage:image];
//    }
//     ];
//    
//}

-(void)getURLWithImage:(UIImage *)img{
    
    UIImage *loadImage= img;
    CGImageRef imageToDecode = loadImage.CGImage;
    
    ZXLuminanceSource *source = [[ZXCGImageLuminanceSource alloc] initWithCGImage:imageToDecode];
    ZXBinaryBitmap *bitmap = [ZXBinaryBitmap binaryBitmapWithBinarizer:[ZXHybridBinarizer binarizerWithSource:source]];
    
    NSError *error = nil;
    
    ZXDecodeHints *hints = [ZXDecodeHints hints];
    
    ZXMultiFormatReader *reader = [ZXMultiFormatReader reader];
    ZXResult *result = [reader decode:bitmap
                                hints:hints
                                error:&error];
    if (result) {
        // The coded result as a string. The raw data can be accessed with
        // result.rawBytes and result.length.
        NSString *contents = result.text;
        NSLog(@"contents =%@",contents);
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:contents,@"text", nil];
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:getQRCodeCommand.callbackId];
        
    } else {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"读取失败"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:getQRCodeCommand.callbackId];
    }
}

#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    UIImage *image = [info objectForKey:@"UIImagePickerControllerEditedImage"];
    [[self getMainViewController] dismissViewControllerAnimated:YES completion:^{
        [self getURLWithImage:image];
    }
     ];
    
}

//【扫一扫二维码】-----------------------------------------------------------------------------

//【微信登录】 插件名：wxLogin 入参：无 出参：username,usid,accessToken,iconURL ----------------------------
- (void)wxLogin:(CDVInvokedUrlCommand*)command
{
    UMSocialSnsPlatform *WechatsnsPlatform = [UMSocialSnsPlatformManager getSocialPlatformWithName:UMShareToWechatSession];
    WechatsnsPlatform.loginClickHandler([self getMainViewController],[UMSocialControllerService defaultControllerService],YES,^(UMSocialResponseEntity *response){
        
        if (response.responseCode == UMSResponseCodeSuccess) {
            
            UMSocialAccountEntity *snsAccount = [[UMSocialAccountManager socialAccountDictionary]valueForKey:UMShareToWechatSession];
            
            NSLog(@"username is %@, uid is %@, token is %@ url is %@",snsAccount.userName,snsAccount.usid,snsAccount.accessToken,snsAccount.iconURL);
            NSDictionary *dic = [NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:snsAccount.userName,snsAccount.usid,snsAccount.accessToken,snsAccount.iconURL, nil] forKeys:[NSArray arrayWithObjects:@"userName",@"uid",@"accesstoken",@"iconURL", nil]];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    });
    [[UMSocialDataService defaultDataService] requestSnsInformation:UMShareToWechatSession  completion:^(UMSocialResponseEntity *response){
        NSLog(@"SnsInformation is %@",response.data);
    }];
}
//【微信登录】--------------------------------------------------------------------------------

//【QQ登录】 插件名：qqLogin 入参：无 出参：username,usid,accessToken,iconURL ---------------------------
- (void)qqLogin:(CDVInvokedUrlCommand*)command
{
    UMSocialSnsPlatform *snsPlatform = [UMSocialSnsPlatformManager getSocialPlatformWithName:UMShareToQQ];
    snsPlatform.loginClickHandler([self getMainViewController],[UMSocialControllerService defaultControllerService],YES,^(UMSocialResponseEntity *response){
        //QQ用户信息获取接口
        if (response.responseCode == UMSResponseCodeSuccess) {
            UMSocialAccountEntity *snsAccount = [[UMSocialAccountManager socialAccountDictionary] valueForKey:UMShareToQQ];
            NSLog(@"username is %@, uid is %@, token is %@ url is %@",snsAccount.userName,snsAccount.usid,snsAccount.accessToken,snsAccount.iconURL);
            NSDictionary *dic = [NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:snsAccount.userName,snsAccount.usid,snsAccount.accessToken,snsAccount.iconURL, nil] forKeys:[NSArray arrayWithObjects:@"userName",@"uid",@"accesstoken",@"iconURL", nil]];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }});
    [[UMSocialDataService defaultDataService] requestSnsInformation:UMShareToQQ  completion:^(UMSocialResponseEntity *response){
        NSLog(@"SnsInformation is %@",response.data);
    }];
}
//【QQ登录】------------------------------------------------------------------------------------------

//【京东登录】 插件名：jdLogin 入参：无 出参：username,usid,accessToken ---------------------------------
- (void)jdLogin:(CDVInvokedUrlCommand*)command
{
    id<JD_JOS_SDK> jos = [JD_JOS_SDK manager];
    NSDictionary *dict = @{JDOptionAppKey:@"E0CCA2FDFC3408B9AB9BE2F1D52BC7C0",
                           JDOptionAppSecret:@"e39a2478713647f09c29ed585214eafa",
                           JDOptionNavbarColor:[UIColor redColor],
                           JDOptionAppRedirectUri:@"http://www.baidu.com"};
    [jos SetOption:dict];
    [jos Login:[self getMainViewController] Block:^(JDUserInfo *userInfo) {
        //京东用户信息获取接口
        NSLog(@"%@" ,[NSString stringWithFormat:@"user:%@,uid:%@",userInfo.user_nick,userInfo.uid]);
        NSDictionary *dic = [NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:userInfo.user_nick,userInfo.uid,userInfo.access_token, nil] forKeys:[NSArray arrayWithObjects:@"user_nick",@"uid",@"accesstoken", nil]];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    }];
}
//【京东登录】----------------------------------------------------------------------------------------

//【社会化分享】 插件名：share 入参：无 出参：无 ---------------------------------
- (void)share:(CDVInvokedUrlCommand*)command
{
    NSString *title = [command.arguments objectAtIndex:0];
    NSString *content = [command.arguments objectAtIndex:1];
//    NSString *shareimageurl = [command.arguments objectAtIndex:2];
    //微信qq用的跳转目标地址
    NSString *targeturl = [command.arguments objectAtIndex:3];
    //二维码的base64的值
    NSString *barcodeImageurl= [command.arguments objectAtIndex:4];
    UIImage *barcodeimage = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:barcodeImageurl]]];
    
//    NSURL *url = [NSURL URLWithString:shareimageurl];
//    UIImage *shareimage = [UIImage imageWithData:[NSData dataWithContentsOfURL:url]];
    
    //------------微信好友分享设置-------------------
    //设置title
    [UMSocialData defaultData].extConfig.wechatSessionData.title = title;
    //设置点击后跳转地址
    [UMSocialData defaultData].extConfig.wechatSessionData.url = targeturl;
    //------------微信好友分享设置-------------------
    
    
    //------------微信朋友圈分享设置-------------------
    //设置title
    [UMSocialData defaultData].extConfig.wechatTimelineData.title = title;
    //设置点击后跳转地址
    [UMSocialData defaultData].extConfig.wechatTimelineData.url = targeturl;
    //------------微信朋友圈分享设置-------------------
    
    //------------QQ好友及群分享设置-------------------
    //设置title
    [UMSocialData defaultData].extConfig.qqData.title = title;
    //设置点击后跳转地址
    [UMSocialData defaultData].extConfig.qqData.url = targeturl;
    //------------QQ好友及群分享设置-------------------
    
    //------------QQ空间分享设置-------------------
    //设置title
    [UMSocialData defaultData].extConfig.qzoneData.title = title;
    //设置点击后跳转地址
    [UMSocialData defaultData].extConfig.qzoneData.url = targeturl;
    //------------QQ空间分享设置-------------------
    
    //------------新浪微博分享设置-------------------
    //设置图片
//    [[UMSocialControllerService defaultControllerService] setShareText:@"分享内嵌文字" shareImage:targetimage socialUIDelegate:[self getMainViewController]];        //设置分享内容和回调对象
//    [UMSocialSnsPlatformManager getSocialPlatformWithName:UMShareToSina].snsClickHandler([self getMainViewController],[UMSocialControllerService defaultControllerService],YES);
    //------------新浪微博分享设置-------------------
    
    

//    [UMSocialData defaultData].extConfig.wxMessageType = UMSocialWXMessageTypeApp;
    [UMSocialSnsService presentSnsIconSheetView:[self getMainViewController]
                                         appKey:@"5534c91e67e58e33d8000c54"
                                      shareText:content
                                     shareImage:barcodeimage
                                shareToSnsNames:@[UMShareToWechatSession,UMShareToWechatTimeline,UMShareToWechatFavorite,UMShareToQQ,UMShareToQzone,UMShareToSina]
                                       delegate:[self getMainViewController]];
}
//【社会化分享】----------------------------------------------------------------------------------------

//【支付宝支付】 插件名：alipay 入参：subject,body,price,tradeNo 出参：success.result ------------------
- (void)alipay:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        iOSPlugins *product = [[iOSPlugins alloc] init];
        product.subject = [command.arguments objectAtIndex:0];
        product.body = [command.arguments objectAtIndex:1];
        product.price = [[command.arguments objectAtIndex:2] floatValue];
        product.tNo = [command.arguments objectAtIndex:3];
        
        /*============================================================================*/
        /*=======================需要填写商户app申请的===================================*/
        /*============================================================================*/
        NSString *partner = @"2088701048088053";
        NSString *seller = @"ec@flyco.com";
        NSString *privateKey = @"MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJjjw9HL4TMhnhExvPZPMSmhK1TM+4lk4CeINeUNs7o1tLCNcBRntls6shxFDeM9dh7ZmtWJhT4j7PANORqDVkdFhz/Wo8OyzaZX6OJeU7imFTSWZZZyON5MD+3cEXlLdKNOoafuH70f67Ewh+HTUDn2WPtzx/FUiw9DEVJLY52jAgMBAAECgYAaC+uHaWFzUY3ZRgz4NWOdwPxd1RIhRRM/COCNpjjxR0cCMQZgI48YmbZQRJ9qEEV4WgAb0vLlND+gYdBRqQBgnpURfXuu5sT+TjVWikIBq345lkmgn//BJ6qdSSozRBkZTDT9rom9k3ue26zTXR5WGTs4esSmaj8c+fSyZnPvWQJBAMqkHobIE68H7uKE/YrQSG8i0izck6atbLh/s4h+vy/f2fdlFxnxGPKlfMBklgw0bzNIHOEyJ8F1GcHF5qDRSVUCQQDBJfFmqxe2F4w7r8VgjxCc777rDhd2ZsEJuIPLnf+BoP+bMN/l612YzkeH7BsCbqbXq+uqSl7SCUBX0uvtMesXAkAsK1vQCxpnQ3Zpf414TXAMcW2Yg7fXU+Pnz0YF0YLA3602BJ3ldKz4buPjV8lw/Zjjd6t71p/dxjWIDCf6E8RFAkEAoBZByhW+9mb4DTR3hLuvSlQPyqUIX1N1Zggv/KE8+AUoNknBGcEF97PpZ8gS7uYllRZiouc3RiDy2pfwgc1hCwJAHWF3Jvmt5qUH8RFd0/QWohmvCIT1+V8ip0EP91JCCYCRZ2VnHR+lw+gyj02PQ7QYy9rGwT7m1UXaWoYe3Q6gug==";
        /*============================================================================*/
        /*============================================================================*/
        /*============================================================================*/
        
        //partner和seller获取失败,提示
        if ([partner length] == 0 ||
            [seller length] == 0 ||
            [privateKey length] == 0) {
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示"
                                                            message:@"缺少partner或者seller或者私钥。"
                                                           delegate:self
                                                  cancelButtonTitle:@"确定"
                                                  otherButtonTitles:nil];
            [alert show];
            return;
        }
        
        /*
         *生成订单信息及签名
         */
        //将商品信息赋予AlixPayOrder的成员变量
        Order *order = [[Order alloc] init];
        order.partner = partner;
        order.seller = seller;
        order.tradeNO = product.tNo; //订单ID（由商家自行制定）
        order.productName = product.subject; //商品标题
        order.productDescription = product.body; //商品描述
        order.amount = [NSString stringWithFormat:@"%.2f",product.price]; //商品价格
        order.notifyURL =  @"http://www.xxx.com"; //回调URL
        
        order.service = @"mobile.securitypay.pay";
        order.paymentType = @"1";
        order.inputCharset = @"utf-8";
        order.itBPay = @"30m";
        order.showUrl = @"m.alipay.com";
        
        //应用注册scheme,在AlixPayDemo-Info.plist定义URL types
        NSString *appScheme = @"alisdkdemo";
        
        //将商品信息拼接成字符串
        NSString *orderSpec = [order description];
        NSLog(@"orderSpec = %@",orderSpec);
        
        //获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
        id<DataSigner> signer = CreateRSADataSigner(privateKey);
        NSString *signedString = [signer signString:orderSpec];
        
        //将签名成功字符串格式化为订单字符串,请严格按照该格式
        NSString *orderString = nil;
        if (signedString != nil) {
            orderString = [NSString stringWithFormat:@"%@&sign=\"%@\"&sign_type=\"%@\"",
                           orderSpec, signedString, @"RSA"];
            
            [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
                NSLog(@"reslut = %@",resultDic);
                NSString* resultStatus = [resultDic objectForKey:@"resultStatus"];
                NSString* result;
                if ([resultStatus isEqualToString:@"9000"]) {
                    result = @"OK";
                }
                if ([resultStatus isEqualToString:@"8000"]) {
                    result = @"WAITING";
                }
                if ([resultStatus isEqualToString:@"4000"]) {
                    result = @"NG";
                }
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:[NSDictionary dictionaryWithObjects:[NSArray arrayWithObjects:result, nil] forKeys:[NSArray arrayWithObjects:@"result", nil]]];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }];
        }
    }];
}
//【支付宝支付】----------------------------------------------------------------------------------------

//-(void)configNetWork:(CDVInvokedUrlCommand *)command{
//    NSLog(@"fuck");
//}

//换头像
//- (void)getPicture:(CDVInvokedUrlCommand*)command{
//    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
//    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
//    picker.delegate = self;
//    [[self getMainViewController] presentViewController:picker animated:YES completion:^{
//        getPicCommand = command;
//    }];
//}

//- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
////    [self.commandDelegate runInBackground:^{
//        UIImage* image = [info objectForKey:@"UIImagePickerControllerOriginalImage"];
//        NSData *data = UIImageJPEGRepresentation(image, 1.0f);
//        NSString *encodedImageStr = [data base64Encoding];
////        NSLog(@"===Encoded image:\n%@", encodedImageStr);
//        [picker dismissViewControllerAnimated:YES completion:^{
//            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encodedImageStr];
//            [self.commandDelegate sendPluginResult:pluginResult callbackId:getPicCommand.callbackId];
//        }];
//}

//图片保存至本地
- (void)savePicture:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        savPicCommand = command;
        NSString *encodedImageStr = [command.arguments objectAtIndex:0];
        NSURL *url = [NSURL URLWithString: encodedImageStr];
        NSData *data = [NSData dataWithContentsOfURL: url];
        UIImage* image = [UIImage imageWithData:data];
        UIImageWriteToSavedPhotosAlbum(image, self, @selector(imageSavedToPhotosAlbum:didFinishSavingWithError:contextInfo:), nil);
    }];
}

- (void)imageSavedToPhotosAlbum:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo
{
    CDVPluginResult* pluginResult;
    if (!error) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"成功保存到相册"];
    }else
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error description]];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:savPicCommand.callbackId];
}



@end












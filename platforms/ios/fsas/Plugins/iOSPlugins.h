//
//  iOSPlugins.h
//  飞科智能家电
//
//  Created by duye on 15/5/26.
//
//

#import <Cordova/CDV.h>

#import <Foundation/Foundation.h>
#import <SystemConfiguration/CaptiveNetwork.h> //fetchssid用
#import <AVFoundation/AVFoundation.h> //扫描二维码用

#import "MainViewController.h"
//乐鑫用头文件-------------------------------------
//#import "ESP_ByteUtil.h"
//#import "ESP_CRC8.h"
//#import "ESPDataCode.h"
//#import "ESPMagicCode.h"
//#import "ESPPrefixCode.h"
//#import "ESPDataCode.h"
//#import "ESPDatumCode.h"
//#import "ESPTouchGenerator.h"
//#import "ESPUDPSocketClient.h"
//#import "ESPUDPSocketServer.h"
//#import "ESPTouchTask.h"
//#import "ESPTouchResult.h"
////乐鑫用头文件-------------------------------------
//
////扫一扫二维码用头文件-------------------------------------
//#import "SYQRCodeViewController.h"
//扫一扫二维码用头文件-------------------------------------

//识别相册二维码用头文件-------------------------------------
#import "ZXingObjC.h"
//识别相册二维码用头文件-------------------------------------

//支付宝支付用头文件-------------------------------------
#import "Order.h"
#import "DataSigner.h"
#import <AlipaySDK/AlipaySDK.h>
#import "APAuthV2Info.h"
//支付宝支付用头文件-------------------------------------

#import "UMSocial.h"
#import "JD_JOS_SDK.h"

//#import "HFSmtlkV30.h"
//#import "localSave.h"

@interface iOSPlugins : CDVPlugin <UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIImagePickerControllerDelegate> {
    MainViewController *mainViewController;
    //乐鑫用属性-------------------------------------
    NSString *ESPpassword;
    NSString *ESPssid;
    //乐鑫用属性-------------------------------------
    
    //汉枫用属性-------------------------------------
//    int smtlkState;
//    localSave *save;
//    int showKey;
//    HFSmtlkV30 *smtlk;
//    NSInteger times;
//    NSInteger findTimes;
//    BOOL isfinding;
//    NSString *HanFengpassword;
//    NSMutableArray *macArray;
//    CDVInvokedUrlCommand *HFcommand;
//    NSString *macAddress;
//    int count;
    //汉枫用属性-------------------------------------
    
    //社会化分享用属性-------------------------------------
//    NSString *shareimageurl;
//    NSString *sharetext;
    //社会化分享用属性-------------------------------------
    
    //支付宝支付用-------------------------------------
@private
    float _price;
    NSString *_subject;
    NSString *_body;
    NSString *_orderId;
    NSString *_tNo;
    //支付宝支付用-------------------------------------
    
    CDVInvokedUrlCommand *getPicCommand;
    CDVInvokedUrlCommand *savPicCommand;
    CDVInvokedUrlCommand *getQRCodeCommand;
    
    
//    SYQRCodeViewController *qrcodevc;
}

//@property (atomic, strong) ESPTouchResult *esptouchResult;
//// to cancel ESPTouchTask when
//@property (atomic, strong) ESPTouchTask *_esptouchTask;
// the state of the confirm/cancel button
@property (nonatomic, assign) BOOL _isConfirmState;
// whether the task is canceled by user
@property (atomic, assign) BOOL _isCanceled;

//支付宝支付用-------------------------------------
@property (nonatomic, assign) float price;
@property (nonatomic, copy) NSString *subject;
@property (nonatomic, copy) NSString *body;
@property (nonatomic, copy) NSString *orderId;
@property (nonatomic, copy) NSString *tNo;
@property (nonatomic, strong)NSMutableArray *productList;
//支付宝支付用-------------------------------------

- (void)getssid:(CDVInvokedUrlCommand*)command;

- (void)espconfirmMethod:(CDVInvokedUrlCommand*)command;

//- (void)scanqRcodePicture:(CDVInvokedUrlCommand*)command;

- (void)qRcodeScanner:(CDVInvokedUrlCommand*)command;

//- (void)hanFeng:(CDVInvokedUrlCommand*)command;

- (void)wxLogin:(CDVInvokedUrlCommand*)command;

- (void)qqLogin:(CDVInvokedUrlCommand*)command;

- (void)jdLogin:(CDVInvokedUrlCommand*)command;

- (void)share:(CDVInvokedUrlCommand*)command;

- (void)configNetWork:(CDVInvokedUrlCommand*)command;
- (void)pushVideoController:(CDVInvokedUrlCommand*)command;

-(void)easyLinkConfigNetWork:(CDVInvokedUrlCommand*)command;

- (void)getPicture:(CDVInvokedUrlCommand*)command;

- (void)savePicture:(CDVInvokedUrlCommand*)command;

- (void)alipay:(CDVInvokedUrlCommand*)command;

@end


//@interface KV8NetConfigPlugin : CDVPlugin
//- (void)configNetWork:(CDVInvokedUrlCommand*)command;
//-(void)searchDevices;
//@end


//@interface KV8Plugin : CDVPlugin
//- (void)pushVideoController:(CDVInvokedUrlCommand*)command;
//@end







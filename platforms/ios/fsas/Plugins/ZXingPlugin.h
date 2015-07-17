//
//  ZXingPlugin.h
//  fsas
//
//  Created by shaggon on 15/6/16.
//
//

#import <Cordova/CDV.h>
#import "MainViewController.h"
#import <ZXingObjC.h>

@interface ZXingPlugin : CDVPlugin<UIImagePickerControllerDelegate,UINavigationControllerDelegate>{
    MainViewController *mainViewController;
    CDVInvokedUrlCommand* getQRCodeCommand;
}

- (void)getQRCodeFromAlbum:(CDVInvokedUrlCommand*)command;

@end

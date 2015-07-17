//
//  GetPicture.h
//  fsas
//
//  Created by shaggon on 15/6/17.
//
//

#import <Cordova/CDV.h>
#import "MainViewController.h"

@interface GetPicture : CDVPlugin<UIImagePickerControllerDelegate,UINavigationControllerDelegate>{
    CDVInvokedUrlCommand *getPicCommand;
    MainViewController *mainViewController;
}

- (void)getPicture:(CDVInvokedUrlCommand*)command;


@end

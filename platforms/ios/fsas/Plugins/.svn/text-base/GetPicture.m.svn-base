//
//  GetPicture.m
//  fsas
//
//  Created by shaggon on 15/6/17.
//
//

#import "GetPicture.h"

@implementation GetPicture

- (MainViewController *)getMainViewController{
    if (!mainViewController) {
        UIWindow *window = [[UIApplication sharedApplication].windows objectAtIndex:0];
        mainViewController = (MainViewController*)window.rootViewController;
    }
    return mainViewController;
}

//换头像
- (void)getPicture:(CDVInvokedUrlCommand*)command{
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    
    NSString *str = [command.arguments objectAtIndex:0];
    if ([str isEqualToString:@"Album"]) {
        picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    } else if ([str isEqualToString:@"Camera"]){
        picker.sourceType = UIImagePickerControllerSourceTypeCamera;
    }
    
    picker.allowsEditing = YES;
    picker.delegate = self;
    [[self getMainViewController] presentViewController:picker animated:YES completion:^{
        getPicCommand = command;
    }];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
//    [self.commandDelegate runInBackground:^{
        UIImage* image = [info objectForKey:@"UIImagePickerControllerEditedImage"];
        NSData *data = UIImageJPEGRepresentation(image, 1.0f);
        NSString *encodedImageStr = [data base64Encoding];
//        NSLog(@"===Encoded image:\n%@", encodedImageStr);
        [picker dismissViewControllerAnimated:YES completion:^{
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:encodedImageStr];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:getPicCommand.callbackId];
        }];
}

@end

//
//  ZXingPlugin.m
//  fsas
//
//  Created by shaggon on 15/6/16.
//
//

#import "ZXingPlugin.h"

@implementation ZXingPlugin

- (MainViewController *)getMainViewController{
    if (!mainViewController) {
        UIWindow *window = [[UIApplication sharedApplication].windows objectAtIndex:0];
        mainViewController = (MainViewController*)window.rootViewController;
    }
    return mainViewController;
}

- (void)getQRCodeFromAlbum:(CDVInvokedUrlCommand*)command{
    getQRCodeCommand = command;
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    picker.allowsEditing = YES;
    picker.delegate = self;
    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    
    [[self getMainViewController] presentViewController:picker animated:YES completion:^{}];
}

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

@end

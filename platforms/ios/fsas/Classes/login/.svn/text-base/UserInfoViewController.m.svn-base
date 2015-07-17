//
//  UserInfoViewController.m
//  Empty
//
//  Created by leron on 15/6/16.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "UserInfoViewController.h"
#import "UserInfo.h"
#import "AppDelegate.h"
#import "loginTypeView.h"
#import "UserExitMock.h"
#import "updateUserInfoMock.h"
@interface UserInfoViewController ()<UITextFieldDelegate,UIImagePickerControllerDelegate>
@property (weak, nonatomic) IBOutlet UILabel *lblName;
@property (weak, nonatomic) IBOutlet UILabel *lblPhoneNum;
@property (weak, nonatomic) IBOutlet UIButton *btnDelete;
@property (weak, nonatomic) IBOutlet UIView *viewFlycoAccount;
@property (weak, nonatomic) IBOutlet UIButton *btnName;
@property (weak, nonatomic) IBOutlet UIButton *btnHead;
@property (weak, nonatomic) IBOutlet UIButton *btnExit;
@property (strong,nonatomic)viewBindFlycoCount* bindFlycoCount;
@property(strong,nonatomic)viewThirdLogin* thirdLogin;
@property (weak, nonatomic) IBOutlet UILabel *lblTitle;
@property (strong,nonatomic)UserExitMock* myExitMock;
@property (strong,nonatomic)updateUserInfoMock* myUpdateMock;

@end



@implementation UserInfoViewController

- (void)viewDidLoad {
    self.navigationBarTitle = @"修改个人信息";
    self.navigationController.navigationBar.hidden = NO;
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    self.bindFlycoCount =[QUNibHelper loadNibNamed:@"loginTypeView" ofClass:[viewBindFlycoCount class]];
    self.bindFlycoCount.frame = CGRectMake(0, self.viewFlycoAccount.frame.origin.y, SCREEN_WIDTH, 150);
    [self.view addSubview:self.bindFlycoCount];
    self.bindFlycoCount.textPhoneNum.delegate = self;
    self.bindFlycoCount.textPsw.delegate = self;
    self.bindFlycoCount.hidden = YES;
    [self.btnExit addTarget:self action:@selector(exitCount) forControlEvents:UIControlEventTouchUpInside];
    //设置圆形头像
    [WpCommonFunction setView:self.btnHead cornerRadius:25];
    
    //接受手机绑定成功的通知
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bindFlycoAccount) name:LOGIN_PHONE_SUCCESS object:nil];
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(bindWX) name:LOGIN_WX_SUCCESS object:nil];
    //根据用户信息，显示不同的绑定信息
    UserInfo* myUserInfo = [UserInfo restore];
    [self.btnHead setImage:[UIImage imageNamed:@"defaultuser"] forState:UIControlStateNormal];
    UIImage* img = [[WHGlobalHelper shareGlobalHelper]get:USER_TOUXIANG];
    if (img) {
        [self.btnHead setImage:img forState:UIControlStateNormal];
    }
    if (myUserInfo) {
        if (myUserInfo.headImg) {
            NSData* userData = [NSData dataWithContentsOfURL:[NSURL URLWithString:myUserInfo.headImg]];
            UIImage* headImg = [UIImage imageWithData:userData];
            [self.btnHead setImage:headImg forState:UIControlStateNormal];         [self.btnName setTitle:myUserInfo.phoneNum forState:UIControlStateNormal];
        }
        if (myUserInfo.nickName) {
            [self.btnName setTitle:myUserInfo.nickName forState:UIControlStateNormal];
        }else{
            [self.btnName setTitle:myUserInfo.phoneNum forState:UIControlStateNormal];
        }
        
    if ([myUserInfo.userLoginType isEqualToString: LOGIN_PHONE]) {
        self.viewFlycoAccount.hidden = YES;
        self.lblTitle.text = @"绑定的第三方账号";
        self.thirdLogin = [QUNibHelper loadNibNamed:@"loginTypeView" ofClass:[viewThirdLogin class]];
        self.thirdLogin.frame = CGRectMake(0, self.viewFlycoAccount.frame.origin.y, SCREEN_WIDTH, 202);
        [self.view addSubview:self.thirdLogin];
    }else{
        if (!myUserInfo.phoneNum) {
            self.viewFlycoAccount.hidden = YES;
            self.bindFlycoCount.hidden = NO;
        }else{
            [self.btnDelete addTarget:self action:@selector(deleteFlycoCount) forControlEvents:UIControlEventTouchUpInside];
            self.lblPhoneNum.text = myUserInfo.phoneNum;
        }
    }
        //只有在用手机登陆的时候才能修改头像
        if ([myUserInfo.userLoginType isEqualToString:LOGIN_PHONE]) {
            [self.btnHead addTarget:self action:@selector(pickHeadImg) forControlEvents:UIControlEventTouchUpInside];
        }
    }
    
}
//绑定手机成功
-(void)bindFlycoAccount{
    self.bindFlycoCount.hidden = YES;
    self.viewFlycoAccount.hidden = NO;
    UserInfo* myUserInfo = [UserInfo restore];
    self.lblPhoneNum.text = myUserInfo.phoneNum;
}

-(void)bindWX{
    if (self.thirdLogin) {
        self.thirdLogin.btnAddWechat.titleLabel.text = @"删除";
        [self.thirdLogin.btnAddWechat addTarget:self.thirdLogin action:@selector(deleteWX) forControlEvents:UIControlEventTouchUpInside];
    }
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



#pragma mark 删除绑定的账号
-(void)deleteFlycoCount{
    UserInfo* myUserInfo = [UserInfo restore];
    myUserInfo.phoneNum = nil;
    myUserInfo.tokenID = nil;
    self.viewFlycoAccount.hidden = YES;
    self.bindFlycoCount.hidden = NO;
}
-(void)deleteWX{
    UserInfo* myUserInfo = [UserInfo restore];
    myUserInfo.wxRefreshTokenID = nil;
    myUserInfo.wxTokenID = nil;
    myUserInfo.wxUserID = nil;
}

-(void)pickHeadImg{
    UIAlertController* controller = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    UIAlertAction* action1 = [UIAlertAction actionWithTitle:@"拍照" style:UIAlertActionStyleDefault handler:^(UIAlertAction* action){
       
        UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
        UIImagePickerController *picker = [[UIImagePickerController alloc] init];//初始化
        picker.delegate = self;
        picker.allowsEditing = YES;//设置可编辑
        picker.sourceType = sourceType;
        [self presentViewController:picker animated:YES completion:nil];//进入照相界面
    
    }];
    UIAlertAction* action2 = [UIAlertAction actionWithTitle:@"选择相册" style:UIAlertActionStyleDefault handler:^(UIAlertAction* action){
        UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeSavedPhotosAlbum;
        UIImagePickerController *picker = [[UIImagePickerController alloc] init];//初始化
        picker.delegate = self;
        picker.allowsEditing = YES;//设置可编辑
        picker.sourceType = sourceType;
        [self presentViewController:picker animated:YES completion:nil];//进入相册
        
    }];
    UIAlertAction* action3 = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction* action){
        [controller dismissViewControllerAnimated:YES completion:nil];
    }];
    [controller addAction:action1];
    [controller addAction:action2];
    [controller addAction:action3];
    [self presentViewController:controller animated:YES completion:nil];
}

//上传用户信息
-(void)updateHeadImg{
    self.myUpdateMock = [updateUserInfoMock mock];
    self.myUpdateMock.delegate = self;
    updateUserInfoParam* param = [updateUserInfoParam param];
    NSData *mydata=UIImageJPEGRepresentation(self.btnHead.imageView.image , 0.4);
//    NSString *pictureDataString=[mydata base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    NSString* pictureDataString = [mydata base64Encoding];
    param.IMAGE = pictureDataString;
    param.sendMethod = @"PUT";
    [self.myUpdateMock run:param];
    
}

-(void)exitCount{
    self.myExitMock = [UserExitMock mock];
    self.myExitMock.delegate = self;
    UserExitParam* param = [UserExitParam param];
    UserInfo* myUserInfo = [UserInfo restore];
    param.TOKENID = myUserInfo.tokenID;
    [self.myExitMock run:param];
    [[NSUserDefaults standardUserDefaults]removeObjectForKey:USER_INFO];
}

#pragma  mark QUMockDelegate
-(void)QUMock:(QUMock *)mock entity:(QUEntity *)entity{
    if ([mock isKindOfClass:[UserExitMock class]]) {
        identifyEntity* e = (identifyEntity*)entity;
        if ([e.status isEqualToString:RESULT_SUCCESS]) {
            [self.navigationController popToRootViewControllerAnimated:YES];
        }
    }
    if ([mock isKindOfClass:[updateUserInfoMock class]]) {
        
    }
}

#pragma mark UIImagePickerDelegate
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
        [self.btnHead setImage:[info objectForKey:@"UIImagePickerControllerEditedImage"] forState:UIControlStateNormal];
    [[WHGlobalHelper shareGlobalHelper]put:self.btnHead.imageView.image key:USER_TOUXIANG];
    [self updateHeadImg];
    [picker dismissViewControllerAnimated:YES completion:nil];
}

-(void)imagePickerControllerDidCancel:(UIImagePickerController *)picker{
    [picker dismissViewControllerAnimated:YES completion:nil];
}
#pragma mark textFieldDelegate
-(void)textFieldDidBeginEditing:(UITextField *)textField{
    [self animateTextField:textField up:YES];
}

-(void)textFieldDidEndEditing:(UITextField *)textField{
    [self animateTextField:textField up:NO];
}

//屏幕上下移动
- (void) animateTextField: (UITextField*) textField up: (BOOL) up

{
    
    const int movementDistance = 80; // tweak as needed
    
    const float movementDuration = 0.3f; // tweak as needed
    
    
    
    int movement = (up ? -movementDistance : movementDistance);
    
    
    //
    [UIView beginAnimations: @"anim" context: nil];
    
    [UIView setAnimationBeginsFromCurrentState: YES];
    
    [UIView setAnimationDuration: movementDuration];
    
    self.view.frame = CGRectOffset(self.view.frame, 0, movement);
    
    [UIView commitAnimations];
    
    
}

 - (NSString*)encodeURL:(NSString *)string
 {
       NSString *newString = (NSString *)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes( kCFAllocatorDefault, (CFStringRef)string, NULL, CFSTR(":/?#[]@!$ &'()*+,;=\"<>%{}|\\^~`"),kCFStringEncodingUTF8));
        if (newString) {
                return newString;
            }
        return @"";
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end

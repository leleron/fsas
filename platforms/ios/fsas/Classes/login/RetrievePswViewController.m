//
//  retrievePswViewController.m
//  FLycoStore
//
//  Created by leron on 15/7/14.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "RetrievePswViewController.h"
#import "forgetPswViewController.h"

@interface RetrievePswViewController ()
@property (weak, nonatomic) IBOutlet UITextField* textPhoneOrMail;
@property (weak, nonatomic) IBOutlet UITextField *textVerifyCode;
@property (weak, nonatomic) IBOutlet UIImageView *imgVerifyCode;
@property (weak, nonatomic) IBOutlet UIButton *btnNextStep;

@property (strong, nonatomic) NSString* strPhoneOrMail;
@property (strong, nonatomic) NSString* strVerifyCode;

@end

@implementation RetrievePswViewController

- (void)viewDidLoad {
    self.navigationBarTitle = @"找回密码";
    [super viewDidLoad];
    self.textPhoneOrMail.keyboardType = UIKeyboardTypeEmailAddress;
    self.textVerifyCode.keyboardType = UIKeyboardTypeAlphabet;
    self.textPhoneOrMail.delegate = self;
    self.textVerifyCode.delegate = self;
    self.imgVerifyCode.image = nil;
    [self refreshVerifyCode];
    self.imgVerifyCode.userInteractionEnabled = true;
    UITapGestureRecognizer* singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(refreshVerifyCode)];
    [self.imgVerifyCode addGestureRecognizer:singleTap];
    [self.btnNextStep addTarget:self action:@selector(nextStep) forControlEvents:UIControlEventTouchUpInside];
    
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL)textFieldShouldReturn:(UITextField*)textField {
    [textField resignFirstResponder];
    return true;
}
- (void)textFieldDidEndEditing:(UITextField*)textField {
    if (textField == self.textPhoneOrMail) {
        self.strPhoneOrMail = textField.text;
    } else if (textField == self.textVerifyCode) {
        self.strVerifyCode = textField.text;
    }
}

- (void)refreshVerifyCode {
    //To refresh verification code...
    static BOOL isChange = NO;
    if (isChange == NO) {
        self.imgVerifyCode.image = [UIImage imageNamed:@"star"];
    } else {
        self.imgVerifyCode.image = [UIImage imageNamed:@"lock"];
    }
    isChange = !isChange;
}
- (void)nextStep {
    //Go to verify SMS code...
    forgetPswViewController* controller = [[forgetPswViewController alloc]initWithNibName:@"forgetPswViewController" bundle:nil];
    [self.navigationController pushViewController:controller animated:YES];
}


@end
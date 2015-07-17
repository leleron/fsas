//
//  ModifyUserInfoViewController.m
//  FLycoStore
//
//  Created by 李荣 on 15/7/14.
//  Copyright © 2015年 李荣. All rights reserved.
//

#import "ModifyUserInfoViewController.h"
#import "ModifyUserInfoSection.h"

@interface ModifyUserInfoViewController ()
@end

@implementation ModifyUserInfoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)initQuickUI{
    self.pAdaptor = [QUFlatAdaptor adaptorWithTableView:self.pTableView nibArray:@[@"ModifyUserInfoSection"] delegate:self];
    [self.pAdaptor.pSources addEntity:[QUFlatEntity entity] withSection:[ModifyUserInfoSection class]];
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

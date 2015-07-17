//
//  UserViewController.m
//  Empty
//
//  Created by 李荣 on 15/5/12.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "UserViewController.h"
#import "ItemListSection.h"
#import "listEntity.h"
#import "RegisterViewController.h"
#import "LoginViewController.h"
#import "UserInfo.h"
#import "UserInfoViewController.h"
#import "ModifyUserInfoViewController.h"
@interface UserViewController ()
@property (weak, nonatomic) IBOutlet UIButton *btnLogin;   //头像点击按钮
@property (weak, nonatomic) IBOutlet UILabel *labName;
@property (weak, nonatomic) IBOutlet UIImageView *imgUserHeadImg;

@end

@implementation UserViewController

- (void)viewDidLoad {
    self.navigationBarTitle = @"用户中心";
    [super viewDidLoad];
    self.pAdaptor = [QUFlatAdaptor adaptorWithTableView:self.pTableView nibArray:@[@"ItemListSection"] delegate:self];
    [WpCommonFunction setView:self.imgUserHeadImg cornerRadius:35];
    listEntity* e1 = [listEntity entity];
    e1.image = [UIImage imageNamed:@"myOrder"];
    e1.title = @"我的订单";
    e1.tag = 1;
    e1.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e1.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e1 withSection:[ItemListSection class]];
    listEntity* e2 = [listEntity entity];
    e2.image = [UIImage imageNamed:@"waitToPay"];
    e2.title = @"代付款订单";
    e2.tag = 2;
    e2.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e2.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e2 withSection:[ItemListSection class]];

    listEntity* e3 = [listEntity entity];
    e3.image = [UIImage imageNamed:@"logistics"];
    e3.title = @"物流信息";
    e3.tag = 3;
    e3.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e3.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e3 withSection:[ItemListSection class]];
    
    listEntity* e4 = [listEntity entity];
    e4.image = [UIImage imageNamed:@"location"];
    e4.title = @"收货地址";
    e4.tag = 4;
    e4.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e4.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e4 withSection:[ItemListSection class]];
    
    QUFlatEntity* empty1 = [QUFlatEntity entityWithLine:QU_FLAT_COLOR_LINE];
    [self.pAdaptor.pSources addEntity:empty1 withSection:[QUFlatEmptySection class]];
    
    listEntity* e5 = [listEntity entity];
    e5.image = [UIImage imageNamed:@"afterSale"];
    e5.title = @"售后服务单";
    e5.tag = 5;
    e5.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e5.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e5 withSection:[ItemListSection class]];

    listEntity* e6 = [listEntity entity];
    e6.image = [UIImage imageNamed:@"evaluate"];
    e6.title = @"商品评价";
    e6.tag = 6;
    e6.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e6.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e6 withSection:[ItemListSection class]];
    
    listEntity* e7 = [listEntity entity];
    e7.image = [UIImage imageNamed:@"myCollection"];
    e7.title = @"我的收藏";
    e7.tag = 7;
    e7.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e7.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e7 withSection:[ItemListSection class]];
    
    listEntity* e8 = [listEntity entity];
    e8.image = [UIImage imageNamed:@"integration"];
    e8.title = @"我的积分";
    e8.tag = 8;
    e8.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e8.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e8 withSection:[ItemListSection class]];

    listEntity* e9 = [listEntity entity];
    e9.image = [UIImage imageNamed:@"signIn"];
    e9.title = @"签到";
    e9.tag = 9;
    e9.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e9.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e9 withSection:[ItemListSection class]];
    
    listEntity* e10 = [listEntity entity];
    e10.image = [UIImage imageNamed:@"integration"];
    e10.title = @"我的积分";
    e10.tag = 10;
    e10.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e10.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e10 withSection:[ItemListSection class]];
    
    
    listEntity* e11 = [listEntity entity];
    e11.image = [UIImage imageNamed:@"signIn"];
    e11.title = @"签到";
    e11.tag = 11;
    e11.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e11.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e11 withSection:[ItemListSection class]];
    
    QUFlatEntity* empty2 = [QUFlatEntity entityWithLine:QU_FLAT_COLOR_LINE];
    [self.pAdaptor.pSources addEntity:empty2 withSection:[QUFlatEmptySection class]];
    
    
    listEntity* e12 = [listEntity entity];
    e12.image = [UIImage imageNamed:@"onlineService"];
    e12.title = @"在线客服";
    e12.tag = 12;
    e12.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e12.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e12 withSection:[ItemListSection class]];

    listEntity* e13 = [listEntity entity];
    e13.image = [UIImage imageNamed:@"serviceNetPoint"];
    e13.title = @"服务网点";
    e13.tag = 13;
    e13.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e13.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e13 withSection:[ItemListSection class]];

    listEntity* e14 = [listEntity entity];
    e14.image = [UIImage imageNamed:@"afterSalePolicy"];
    e14.title = @"售后政策";
    e14.tag = 14;
    e14.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e14.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e14 withSection:[ItemListSection class]];

    listEntity* e15 = [listEntity entity];
    e15.image = [UIImage imageNamed:@"userInfo"];
    e15.title = @"我的资料";
    e15.tag = 15;
    e15.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e15.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e15 withSection:[ItemListSection class]];
    
    listEntity* e16 = [listEntity entity];
    e16.image = [UIImage imageNamed:@"modifyPsw"];
    e16.title = @"修改密码";
    e16.tag = 16;
    e16.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e16.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e16 withSection:[ItemListSection class]];
    
    listEntity* e17 = [listEntity entity];
    e17.image = [UIImage imageNamed:@"noticeUS"];
    e17.title = @"关注我们";
    e17.tag = 17;
    e17.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    e17.lineBottomColor = QU_FLAT_COLOR_LINE;
    [self.pAdaptor.pSources addEntity:e17 withSection:[ItemListSection class]];

    
    
    [self.pAdaptor notifyChanged];
    
    
    [self.btnLogin addTarget:self action:@selector(clickHead) forControlEvents:UIControlEventTouchUpInside];
    // Do any additional setup after loading the view from its nib.
}


-(void)viewWillAppear:(BOOL)animated{
//    self.navigationController.navigationBar.hidden = YES;
//    [self.btnLogin setImage:[UIImage imageNamed:@"defaultuser"] forState:UIControlStateNormal];
//    UserInfo* myUserInfo = [UserInfo restore];
//    if (myUserInfo) {
//        if ([myUserInfo.userLoginType isEqualToString:LOGIN_PHONE]) {
//            UIImage* headImg = [[WHGlobalHelper shareGlobalHelper]get:USER_TOUXIANG];
//            if (headImg) {
////                [self.btnLogin setImage:headImg forState:UIControlStateNormal];
//            }else
//                [self.btnLogin setImage:[UIImage imageNamed:@"defaultuser"] forState:UIControlStateNormal];
//        }
//        if (myUserInfo.headImg) {
//            NSData* userData = [NSData dataWithContentsOfURL:[NSURL URLWithString:myUserInfo.headImg]];
//            [self.btnLogin setImage:[UIImage imageWithData:userData] forState:UIControlStateNormal];
//        }
//        if (myUserInfo.nickName) {
//            self.labName.text = myUserInfo.nickName;
//        }else
//            self.labName.text = myUserInfo.phoneNum;
//    }else{
//        [self.btnLogin setImage:[UIImage imageNamed:@"defaultuser"] forState:UIControlStateNormal];
//        self.labName.text = nil;
//    }
//    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)QUAdaptor:(QUAdaptor *)adaptor forSection:(QUSection *)section forEntity:(QUEntity *)entity{
    if ([entity isKindOfClass:[listEntity class]]) {
        listEntity* e = (listEntity*)entity;
        ItemListSection* s = (ItemListSection*)section;
        s.imgIcon.image = e.image;
        s.lblTitle.text = e.title;
    }
}

-(void)clickHead{
    
    UserInfo* myUserInfo = [UserInfo restore];
    if (myUserInfo) {
        UserInfoViewController* controller = [[UserInfoViewController alloc]initWithNibName:@"UserInfoViewController" bundle:nil];
        controller.hidesBottomBarWhenPushed = YES;
        [self.navigationController pushViewController:controller animated:YES];
    }else{
    LoginViewController* controller = [[LoginViewController alloc]initWithNibName:@"LoginViewController" bundle:nil];
        controller.hidesBottomBarWhenPushed = YES;
    [self.navigationController pushViewController:controller animated:YES];
    }
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

//
//  updateUserInfoMock.h
//  Empty
//
//  Created by 李荣 on 15/7/9.
//  Copyright © 2015年 李荣. All rights reserved.
//

#import "QUMock.h"
#import "updateUserInfoEntity.h"
@interface updateUserInfoParam : QUMockParam
@property(strong,nonatomic)NSString* USER_NAME;
@property(strong,nonatomic)NSString* IMAGE;
@end
@interface updateUserInfoMock : QUMock

@end

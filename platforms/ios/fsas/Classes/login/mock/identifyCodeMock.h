//
//  identifyCodeMock.h
//  Empty
//
//  Created by leron on 15/6/10.
//  Copyright (c) 2015年 李荣. All rights reserved.
//

#import "QUMock.h"
#import "identifyEntity.h"
@interface identifyCodeParam : QUMockParam
@property(strong,nonatomic)NSString* MOBILE;
@property(strong,nonatomic)NSString* IDENTIFY_CODE;
@end
@interface identifyCodeMock : QUMock

@end

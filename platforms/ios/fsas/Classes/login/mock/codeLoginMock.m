//
//  codeLoginMock.m
//  fsas
//
//  Created by leron on 15/7/16.
//
//

#import "codeLoginMock.h"
@implementation codeLoginParam
@end
@implementation codeLoginMock

-(NSString*)getOperatorType{
    return @"/user/codeLoginIn";
}

-(Class)getEntityClass{
    return [loginEntity class];
}

@end

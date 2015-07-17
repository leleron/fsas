/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  飞科智能家电
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>

#import "UMSocial.h"
//#import "UMSocialWechathandler.h"
//#import "UMSocialQQHandler.h"
//#import "UMSocialSinaSSOHandler.h"
#import "ShopViewController.h"
#import "SortViewController.h"
#import "ShopCartViewController.h"
#import "UserViewController.h"


@implementation AppDelegate

@synthesize window, viewController;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
#if __has_feature(objc_arc)
        NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
#else
        NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
#endif
    [NSURLCache setSharedURLCache:sharedCache];

    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];

#if __has_feature(objc_arc)
        self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
        self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
    self.window.autoresizesSubviews = YES;

//#if __has_feature(objc_arc)
//    
//        self.viewController = [[MainViewController alloc] init];
//    UINavigationController* controller = [[UINavigationController alloc]initWithRootViewController:self.viewController];
//
//#else
//        self.viewController = [[[MainViewController alloc] init] autorelease];
//#endif
    NSMutableArray* itemViewControllers = [NSMutableArray arrayWithCapacity:4];
    ShopViewController* controller1 = [[ShopViewController alloc]initWithNibName:@"ShopViewController" bundle:nil];
    [itemViewControllers addObject:controller1];
    SortViewController* controller2 = [[SortViewController alloc]initWithNibName:@"SortViewController" bundle:nil];
    [itemViewControllers addObject:controller2];
    ShopCartViewController* controller3 = [[ShopCartViewController alloc]initWithNibName:@"ShopCartViewController" bundle:nil];
    [itemViewControllers addObject:controller3];
    UITabBarController* tabBarController = [[UITabBarController alloc]init];
    
    
    UserViewController* controller4 = [[UserViewController alloc]initWithNibName:@"UserViewController" bundle:nil];
    UINavigationController* nav = [[UINavigationController alloc]initWithRootViewController:controller4];
    [itemViewControllers addObject:nav];
    
    tabBarController.viewControllers = itemViewControllers;
    UITabBarItem* item1 = [tabBarController.tabBar.items objectAtIndex:0];
    item1.image = [UIImage imageNamed:@"home"];
    UIImage* selecetedImg = [UIImage imageNamed:@"home_hover"];
    selecetedImg =[selecetedImg imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    [item1 setSelectedImage:selecetedImg];
    item1.title = @"首页";
    NSMutableDictionary *textAttrs=[NSMutableDictionary dictionary];
    textAttrs[NSForegroundColorAttributeName]= Color_BarItem;
    [item1 setTitleTextAttributes:textAttrs forState:UIControlStateHighlighted];
    
    UITabBarItem* item2 = [tabBarController.tabBar.items objectAtIndex:1];
    item2.image = [UIImage imageNamed:@"kind"];
    UIImage* selecetedImg2 = [UIImage imageNamed:@"kind_hover"];
    selecetedImg2 =[selecetedImg2 imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    [item2 setSelectedImage:selecetedImg2];
    item2.title = @"分类";
    [item2 setTitleTextAttributes:textAttrs forState:UIControlStateHighlighted];
    
    UITabBarItem* item3 = [tabBarController.tabBar.items objectAtIndex:2];
    item3.image = [UIImage imageNamed:@"cart"];
    UIImage* selecetedImg3 = [UIImage imageNamed:@"cart_hover"];
    selecetedImg3 =[selecetedImg3 imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    [item3 setSelectedImage:selecetedImg3];
    item3.title = @"购物车";
    [item3 setTitleTextAttributes:textAttrs forState:UIControlStateHighlighted];
    UITabBarItem* item4 = [tabBarController.tabBar.items objectAtIndex:3];
    item4.image = [UIImage imageNamed:@"user"];
    UIImage* selecetedImg4 = [UIImage imageNamed:@"user_hover"];
    selecetedImg4 =[selecetedImg4 imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    [item4 setSelectedImage:selecetedImg4];
    
    item4.title = @"用户中心";
    [item4 setTitleTextAttributes:textAttrs forState:UIControlStateHighlighted];

    
    
    // Set your app's start page by setting the <content src='foo.html' /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    // self.viewController.startPage = @"index.html";

    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.

    self.window.rootViewController = tabBarController;
    [self.window makeKeyAndVisible];

    [UMSocialData setAppKey:@"5534c91e67e58e33d8000c54"];
//    [UMSocialWechatHandler setWXAppId:@"wx9e9d6375f2ba3bc8" appSecret:@"df2d8cc3da47241d845c0054c4f3eec6" url:@"http://www.baidu.com"];
//    [UMSocialQQHandler setQQWithAppId:@"1104495467" appKey:@"FPhzWU0OilvP3wdm" url:@"http://www.baidu.com"];
//    [UMSocialSinaSSOHandler openNewSinaSSOWithRedirectURL:@"http://www.baidu.com"];
    
    return YES;
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if 飞科智能家电-Info.plist specifies a protocol to handle
- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation
{
    if (!url) {
        return NO;
    }

    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];

    return  [UMSocialSnsService handleOpenURL:url];
}

// repost all remote and local notification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}

#ifndef DISABLE_PUSH_NOTIFICATIONS

    - (void)                                 application:(UIApplication*)application
        didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
    {
        // re-post ( broadcast )
        NSString* token = [[[[deviceToken description]
            stringByReplacingOccurrencesOfString:@"<" withString:@""]
            stringByReplacingOccurrencesOfString:@">" withString:@""]
            stringByReplacingOccurrencesOfString:@" " withString:@""];

        [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotification object:token];
    }

    - (void)                                 application:(UIApplication*)application
        didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
    {
        // re-post ( broadcast )
        [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotificationError object:error];
    }
#endif

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);

    return supportedInterfaceOrientations;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    return  [UMSocialSnsService handleOpenURL:url];
}
@end

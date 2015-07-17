
                //向数据模型内设定用于检索的search_key
                devlsPM.set('search_key', devicename);

                var devlsV = new deviceListPageView({model: devlsPM});
                devlsPM.getDeviceList(
                    {
                        onSuccess: function (deviceList) {
                            _this.changePage(devlsV);
                        },
                        onFailure: function () {
                            _this.changePage(devlsV);
                        }
                    }
                );
                _this.changePage(devlsV);
            },

            //小窍门详情
            showHintsDetailPage: function () {
                var _this = this;
                var hintsDetailPM = new hintsDetailPageModel();
                var hintsDetailV = new hintsDetailPageView({model: hintsDetailPM});
                hintsDetailPM.getTipsList({
                    onSuccess: function () {
                        _this.changePage(hintsDetailV);
                    },
                    onFailure: function () {
                        _this.changePage(hintsDetailV);
                    }
                });
                _this.changePage(hintsDetailV);
            },
            //维护小常识
            showtipsPage: function () {
                var _this = this;
                var tipsPM = new tipsPageModel();
                var tipsV = new tipsPageView({model: tipsPM});
                _this.changePage(tipsV);
            },
            //我的设备
            showMyDevicePage: function () {
                var _this = this;
                var myDevicePM = new myDevicePageModel();
                var myDeviceV = new myDevicePageView({model: myDevicePM});
                myDevicePM.getMyDeviceInfo({
                    onSuccess: function () {
                        _this.changePage(myDeviceV);
                    },
                    onFailure: function (msg) {
                    	alert(msg);
                        _this.changePage(myDeviceV);
                    }
                });
                _this.changePage(myDeviceV);
            },

            //设备主页
            showDeviceIndexPage: function () {
                var _this = this;
                var deviceIndexPM = new deviceIndexPageModel();
                var deviceIndexV = new deviceIndexPageView({model: deviceIndexPM});
                _this.changePage(deviceIndexV);
            },

            //设备权限
            showDeviceAuthorityPage: function (ownerId) {
                var _this = this;
                var deviceAuthorityPM = new deviceAuthorityPageModel();
                var deviceAuthorityV = new deviceAuthorityPageView({model: deviceAuthorityPM});
                deviceAuthorityPM.getdeviceOwners(ownerId,{
                    onSuccess: function () {
                        _this.changePage(deviceAuthorityV);
                    },
                    onFailure: function (msg) {
                    	alert(msg);
                        _this.changePage(deviceAuthorityV);
                    }
                });
                _this.changePage(deviceAuthorityV);
            },

          //设备粉丝
            showDeviceFansPage: function () {
                var _this = this;
                var deviceFansPM = new deviceFansPageModel();
                var deviceFansV = new deviceFansPageView({model: deviceFansPM});
                deviceFansPM.getFansInfo({
                    onSuccess: function (data) {
                        var tokenId = localStorage.getItem("tokenId");
                        if (!tokenId || tokenId.length == 0) {
                            window.AppRouter.showLoginPage();
                            return;
                        }
                        _this.changePage(deviceFansV);
                    },
                    onFailure: function (msg) {
                        alert(msg);
                    }
                });
                _this.changePage(deviceFansV);
            },

            //设备日志
            showDeviceLogPage: function (handlerId,source,date) {
                var _this = this;
                var deviceLogPM = new deviceLogPageModel();
                var deviceLogV = new deviceLogPageView({model: deviceLogPM});
                deviceLogPM.getdeviceLogs(handlerId,source,date,{
                    onSuccess: function () {                    	
                        deviceLogPM.getDeviceHandler({
                            onSuccess: function () {
                                _this.changePage(deviceLogV);
                            },
                            onFailure: function () {                            	
                                _this.changePage(deviceLogV);
                            }
                        })
                    },
                    onFailure: function (msg) {                    	
                        _this.changePage(deviceLogV);
                    }
                });
                _this.changePage(deviceLogV);
            },

            //设备故障列表
            showDeviceErrorListPage: function () {
                var _this = this;
                var deviceErrorListPM = new deviceErrorListPageModel();
                var deviceErrorListV = new deviceErrorListPageView({model: deviceErrorListPM});
                _this.changePage(deviceErrorListV);
            },

            //设备故障详情
            showDeviceErrorDetailPage: function () {
                var _this = this;
                var deviceErrorDetailPM = new deviceErrorDetailPageModel();
                var deviceErrorDetailV = new deviceErrorDetailPageView({model: deviceErrorDetailPM});
                _this.changePage(deviceErrorDetailV);
            },
            //设备设置
            showDeviceSettingPage: function () {
                var _this = this;
                var deviceSettingPM = new deviceSettingPageModel();
                var deviceSettingV = new deviceSettingPageView({model: deviceSettingPM});
                deviceSettingPM.getDeviceSettingSwitch({
                    onSuccess: function (data) {
                    	var tokenId = localStorage.getItem("tokenId");
                    	if (!tokenId || tokenId.length == 0) {
                    		window.AppRouter.showLoginPage();
                    		return;
                    	}
                    	_this.changePage(deviceSettingV);
                    },
                    onFailure: function (msg) {
                        alert(msg);
                    }
                });
                _this.changePage(deviceSettingV);
            },
            //设备设置开关
            setDeviceSettingPage: function (type, status) {
                var _this = this;
                var deviceSettingPM = new deviceSettingPageModel();
                var deviceSettingV = new deviceSettingPageView({model: deviceSettingPM});
                switch(type) {
                    case 0:
                        deviceSettingPM.deviceTiming(status);
                        break;
                    case 1:
                        deviceSettingPM.deviceControl(status);
                        break;
                    case 2:
                        deviceSettingPM.deviceShare(status);
                        break;
                    default:
                        break;
                }
            },
            //关于设备
            showAboutDevicePage: function () {
                var _this = this;
                var aboutDevicePM = new aboutDevicePageModel();
                var aboutDeviceV = new aboutDevicePageView({model: aboutDevicePM});
                aboutDevicePM.getMyDeviceDtl();
                _this.changePage(aboutDeviceV);
            },
            //关注度排名
            showFollowRankPage: function () {
                var _this = this;
                var followRankPM = new followRankPageModel();
                var followRankV = new followRankPageView({model: followRankPM});
                _this.changePage(followRankV);
            },

            showChatHelpPage: function () {
                var _this = this;
                var chatHelpPM = new chatHelpPageModel();
                var chatHelpV = new chatHelpPageView({model: chatHelpPM});
                _this.changePage(chatHelpV);
            },

            //百宝箱
            showMiscellaneousPage: function () {
                var _this = this;
                var miscellaneousPM = new miscellaneousPageModel();
                var miscellaneousV = new miscellaneousPageView({model: miscellaneousPM});
                miscellaneousPM.getServicePhone({
                    onSuccess: function () {
                        _this.changePage(miscellaneousV);
                    },
                    onFailure: function () {
                        _this.changePage(miscellaneousV);
                    }
                });
                _this.changePage(miscellaneousV);
            },
            //附近网点
            showSpotsNearbyPage: function () {
                var _this = this;
                var spotsNearbyPM = new spotsNearbyPageModel();
                var spotsNearbyV = new spotsNearbyPageView({model: spotsNearbyPM});
                spotsNearbyPM.getSpots({
                    onSuccess: function(){
                        _this.changePage(spotsNearbyV);
                    },
                    onFailure: function(){
                        _this.changePage(spotsNearbyV);
                    }
                });
                _this.changePage(spotsNearbyV);
            },
            showMyPage: function () {
                var _this = this;
                if (localStorage.getItem("tokenId") != null) {
                var myPM = new myPageModel();
                var nextV = new myPageView({model: myPM});
                _this.changePage(nextV);
                } else {
                    localStorage.setItem("flipSwitch", "off");
                    if (localStorage.getItem("flipSwitch") == "on") {
                        localStorage.setItem("parent", "mySettings");
                        window.location.href = "#gesturePW";
                    } else {
                        //登录成功后继续跳转到“我的”页面去
                        localStorage.setItem("next_page", "my");
                        window.location.href = "#login";
                    }
                }
            },
            //手势密码
            showGesturePWPage: function () {
                var _this = this;
                var gesturePWPM = new gesturePWPageModel();
                var gesturePWV = new gesturePWPageView({model: gesturePWPM});
                _this.changePage(gesturePWV);
            },
            //“我的”积分
            showMyPointsPage: function () {
                var _this = this;
                var myPointsPM = new myPointsPageModel();
                var myPointsV = new myPointsPageView({model: myPointsPM});
                _this.changePage(myPointsV);
            },
            //“我的”设置
            showMySettingsPage: function () {
                var _this = this;
                var mySettingsPM = new mySettingsPageModel();
                var mySettingsV = new mySettingsPageView({model: mySettingsPM});
                _this.changePage(mySettingsV);
            },
            showUserMessage: function () {
                var _this = this;
                var userMessagePM = new userMessagePageModel();
                var userMessageV = new userMessagePageView({model: userMessagePM});
                _this.changePage(userMessageV);
            },
            showUserMessageDetail: function () {
                var _this = this;
                var userMessageDetailPM = new userMessageDetailPageModel();
                var userMessageDetailV = new userMessageDetailPageView({model: userMessageDetailPM});
                _this.changePage(userMessageDetailV);
            },
            //关于我们
            showAboutUsPage: function () {
                var _this = this;
                var aboutUsPM = new aboutUsPageModel();
                var aboutUsV = new aboutUsPageView({model: aboutUsPM});
                _this.changePage(aboutUsV);
            },
            //意见反馈
            showFeedBackPage: function () {
                var _this = this;
                var feedbackPM = new feedbackPageModel();
                var feedbackV = new feedbackPageView({model: feedbackPM});
                _this.changePage(feedbackV);
            },
            //意见反馈check
            feedbackSubmitCheck: function () {
                var _this = this;
                var fBackPM = new feedbackPageModel();
                var fBackV = new feedbackPageView({model: fBackPM});
                fBackPM.submitButton(

                );
            },
            showMyInfoPage: function () {
                var _this = this;
                var myInfoPM = new myInfoPageModel();
                var myInfoV = new myInfoPageView({model: myInfoPM});
                myInfoPM.set('tokenId', localStorage.getItem('tokenId'));
                myInfoPM.getMyInfo({
                    onSuccess: function () {
                        _this.changePage(myInfoV);
                    },
                    onFailure: function (msg) {
                        alert(msg);
                //用户不存在的情况下，迁移至登录页面要求重新登录
                window.location.href = "#login";
                    }
                });
                _this.changePage(myInfoV);
            },
            showMyInfoEditNamePage: function () {
                var _this = this;
                var myInfoEditNamePM = new myInfoEditNamePageModel();
                var myInfoEditNameV = new myInfoEditNamePageView({model: myInfoEditNamePM});
                _this.changePage(myInfoEditNameV);
            },
            showMysettingPage: function () {
                var _this = this;
                alert('router::showMysettingPage()');
                //TODO:
            },

            showUpdatePage: function () {
                var _this = this;
                alert('router::showUpdatePage()');
                //TODO:
            },
            //忘记密码
            showForgetPasswordPage: function () {
                var _this = this;
                var forgetPasswordPM = new forgetPasswordPageModel();
                var forgetPasswordV = new forgetPasswordPageView({model: forgetPasswordPM});
                _this.changePage(forgetPasswordV);
            },
            //注册
            showRegistPage: function () {
                var _this = this;
                var registPM = new registPageModel();
                var registV = new registPageView({model: registPM});
                _this.changePage(registV);
            },

            //验证码确认
            showVericodeConfirmPage: function () {
                var _this = this;
                var vericodeConfirmPM = new vericodeConfirmPageModel();
                var vericodeConfirmV = new vericodeConfirmPageView({model: vericodeConfirmPM});
                _this.changePage(vericodeConfirmV);
            },



            /**********************************华丽的分割线*****************************************/
            //请在上面添加，这个方法请放在最后面
            changePage: function (page) {
                if ($(".swiper-container").length == 1) {
                    $(".swiper-container").parent().remove();
                }
                var footview = new footerPublickPageView();
                page.render();

                var footview = new footerPublickPageView();
                page.render();
                var footerArr=["loginPageModel","mainPageModel","findPageModel","myDevicePageModel"];
                for(var i in footerArr){
                    if (page.model.modelName == footerArr[i]) {
                        footview.render();
                    }
                }
                var islogin = $(page.el).find('#loginPage_id');
                var isforgetpsw = $(page.el).find('#forgetpsw');
                if (!islogin || !isforgetpsw || islogin.length <= 0) {
                    $(page.el).append($(footview.el).html());
                }
                var existingPage = $(page.el).find('[data-role="page"]');
                if (!existingPage || existingPage.length <= 0) {
                    $(page.el).attr('data-role', 'page');
                    $(page.el).css('background', '#fff');
                    existingPage = $(page.el);
                }


                $('#AppBody').append(existingPage);

                var transition = $.mobile.defaultPageTransition;
                $.mobile.changePage(existingPage, {changeHash: false, transition: transition});
                //history.go(-1);//返回上一页
            }
        });

        return Router;
    });
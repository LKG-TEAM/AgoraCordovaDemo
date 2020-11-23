/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

let appId = "1b895e0d415d42c0bc673f05ec83f26b";
let token = "0061b895e0d415d42c0bc673f05ec83f26bIACubNY2ZrG246kXpRT+iQLIekY5ktbVMvFDzIVuwNIDiKiNhRAAAAAAEABVr+wwIG28XwEAAQAfbbxf";
let channelId = "channel_test_sh";
let uid = "1";

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    document.getElementById("agora_direct").addEventListener('click', function() {
        console.log("agora_direct clicked");
        /*
         Agora初始化设置
         */
        YogaAgoraRTC.setUp({
            "appId": appId,
            "token": token,
            "channelId": channelId,
            "uid": uid,
        });
        YogaAgoraRTC.setVideoFrameRate(30);
        
        YogaAgoraRTC.show();
        
        /*
         切换需要设置视图约束的方法--开始设置'接收视频视图'的约束
         (原本想法在该方法的成功回调方法内，写布局约束代码，实测发现，cordova插件的回调方法是异步的，所以在需在该方法后直接调用布局约束代码)
         */
        YogaAgoraRTC.setRemoteVideoViewLayout();
        YogaAgoraRTC.setMargin(50, 5, 50, 5);
        YogaAgoraRTC.setHeight(300);
        
        
        /*
         切换需要设置视图约束的方法--开始设置'发送视频视图'的约束
         (原本想法在该方法的成功回调方法内，写布局约束代码，实测发现，cordova插件的回调方法是异步的，所以在需在该方法后直接调用布局约束代码)
         */
        YogaAgoraRTC.setLocalVideoViewLayout();
        
        /*
         YogaAgora.setMarginLeft(50);
         YogaAgora.setMarginRight(0);
         YogaAgora.setMarginBottom(50);
         YogaAgora.setMarginTop(50);
         */
        
        /*
         1.margin，我们设置的规则是：从左至右，从上至下.
         2.即左边距优先级>右边距，上边距优先级>下边距.
         3.插件内默认上下左右边距都是-0.01，所以想要视图居右(下)，只要设置右(下)>=0即可
         4.想要已经设置了右(下)的视图，再居左(上)，只需设置右(下)<0即可
         5.我们定义margin的四个值在0-1之间为百分比约束
         */
        YogaAgoraRTC.setMargin(50, 0, 0.5, 0);//上、左、下、右

        YogaAgoraRTC.setHeight(300);
        YogaAgoraRTC.setWidth(-1);
    });
    
    document.getElementById("agora_sample_teacher").addEventListener('click', function() {
        console.log("agora_sample_teacher clicked");
        /*
         Agora初始化设置
         */
        YogaAgoraRTC.setUp({
            "appId": appId,
            "token": token,
            "channelId": channelId,
            "uid": uid,
        });
        YogaAgoraRTC.setVideoFrameRate(30);//设置fps
        YogaAgoraRTC.setVideoDimension(320, 240);//设置分辨率
        
        YogaAgoraRTC.setLocalVideoViewLayout();
        YogaAgoraRTC.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
        YogaAgoraRTC.setRemoteVideoViewLayout();
        YogaAgoraRTC.setMargin(50, 10, 0.5, 10);//上、左、下、右
        
        /*
         学生视图滑动方向，true-->横向，false-->竖向
         */
        YogaAgoraRTC.setRemoteViewScrollDirection(true);
        /*
         每个学生视图的尺寸
         */
        YogaAgoraRTC.setRemoteViewItemSize(1.0, 1.0);
        
        YogaAgoraRTC.showWithSheet(function(msg) {});// Sample启动
        
        YogaAgoraRTC.setLocalTitle("我是老师");
        YogaAgoraRTC.viewClean(false);
    });
    
    document.getElementById("agora_sample_student").addEventListener('click', function() {
        console.log("agora_sample_student clicked");
        /*
         Agora初始化设置
         */
        YogaAgoraRTC.setUp({
            "appId": appId,
            "token": token,
            "channelId": channelId,
            "uid": uid,
        });
        YogaAgoraRTC.setVideoFrameRate(30);//设置fps
        YogaAgoraRTC.setVideoDimension(320, 240);//设置分辨率
        
        YogaAgoraRTC.setLocalVideoViewLayout();
        YogaAgoraRTC.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
        YogaAgoraRTC.setRemoteVideoViewLayout();
        YogaAgoraRTC.setMargin(50, 10, 0.5, 10);//上、左、下、右
        
        /*
         学生视图滑动方向，true-->横向，false-->竖向
         */
        YogaAgoraRTC.setRemoteViewScrollDirection(true);
        /*
         每个学生视图的尺寸
         */
        YogaAgoraRTC.setRemoteViewItemSize(0.5, 1);
        
        YogaAgoraRTC.setLocalTitle("我是学生");
        YogaAgoraRTC.viewClean(true);
        
        YogaAgoraRTC.showWithSheet(function(msg) {});// Sample启动
    });
    
    document.getElementById("agora_close").addEventListener('click', function() {
        console.log("agora_close clicked");
        YogaAgoraRTC.removeLocalView();
        YogaAgoraRTC.removeRemoteView();
    });
    
    document.getElementById("agora_leave").addEventListener('click', function() {
        console.log("agora_leave clicked");
        YogaAgoraRTC.leave();
    });
    
    var count = 100;
    document.getElementById("agora_add_one_user").addEventListener('click', function() {
        console.log("agora_add_one_user clicked");
        count++;
        YogaAgoraRTC.addRemoteUserView(count, "我是学生demo");;
    });
}

/** 0: The local audio is in the initial state. */
/** 1: The recording device starts successfully.  */
/** 2: The first audio frame encodes successfully. */
/** 3: The local audio fails to start. */
function yogaAgoraRTCAudio(status) {
    console.log("[Native call js](本地音频)");
    if (status == 0) {
        console.log("本地音频处于静态状态");
    }else if (status == 1) {
        console.log("采集本地音频设备准备就绪");
    }else if (status == 2) {
        console.log("本地音频第一个字节编码成功");
    }else if (status == 3) {
        console.log("本地音频启动失败");
    }
}

/** 0: The remote video is in the default state, probably due to AgoraVideoRemoteStateReasonLocalMuted(3), AgoraVideoRemoteStateReasonRemoteMuted(5), or AgoraVideoRemoteStateReasonRemoteOffline(7). */
/** 1: The first remote video packet is received. */
/** 2: The remote video stream is decoded and plays normally, probably due to AgoraVideoRemoteStateReasonNetworkRecovery(2), AgoraVideoRemoteStateReasonLocalUnmuted(4), AgoraVideoRemoteStateReasonRemoteUnmuted(6), or AgoraVideoRemoteStateReasonAudioFallbackRecovery(9). */
/** 3: The remote video is frozen, probably due to AgoraVideoRemoteStateReasonNetworkCongestion(1) or AgoraVideoRemoteStateReasonAudioFallback(8).*/
/** 4: The remote video fails to start, probably due to AgoraVideoRemoteStateReasonInternal(0). */
function yogaAgoraRTCRemoteVideo(uid, status) {
    console.log("[Native call js](远程视频)");
    if (status == 0) {
        console.log("远程视频处于静态状态");
    }else if (status == 1) {
        console.log("收到远程视频第一个字节包");
    }else if (status == 2) {
        console.log("解码远程视频第一个字节包");
    }else if (status == 3) {
        console.log("远程视频frozen了");
    }else if (status == 4) {
        console.log("远程视频启动失败");
    }
}

/*
 远端用户/主播加入回调
 uid      新加入频道的远端用户/主播 ID。如果 joinChannelByToken 中指定了 uid，则此处返回该 ID；否则使用 Agora 服务器自动分配的 ID。
 elapsed  从本地用户加入频道 joinChannelByToken 或 joinChannelByUserAccount 开始到发生此事件过去的时间（ms）。
 */
function yogaAgoraRTCDidJoinedOfUidAndElapsed(uid, elapsed) {
    console.log("[Native call js](有用户加入)");
    console.log("uid: "+uid);
//    YogaAgoraRTC.muteRemoteAudioStream(uid, true);// 开启或关闭新加入用户的音频流(默认是开启的，不需要调用)
//    YogaAgoraRTC.muteRemoteVideoStream(uid, true);// 开启或关闭新加入用户的视频流(默认是开启的，不需要调用)
    YogaAgoraRTC.addRemoteUserView(uid, "我是学生1");// 将新加入用户的视频view显示出来
    
    /*
     我们可以在这里处理老师或学生的情况
     以下是一段为代码逻辑:
     if (self.uid == 'teacherUid') {
        //本人是老师，那么其他人都将是学生，此时需要任一新加入学生，都要显示其视频view、接收其音视频流
         YogaAgoraRTC.addRemoteUserView(uid);
     }else {
        //本人是学生，那么需要依据uid来判断是同学还是老师
        if (uid == 'teacherUid') {
            //需要接收老师的音视频
            YogaAgoraRTC.addRemoteUserView(uid);
        }else {
            //屏蔽同学的音视频
            YogaAgoraRTC.muteRemoteAudioStream(uid, true);
            YogaAgoraRTC.muteRemoteVideoStream(uid, true);
            YogaAgoraRTC.addRemoteUserView(uid);
        }
     }
     */
}

function yogaAgoraRTCDidOfflineOfUidAndReason(uid, reason) {
//    YogaAgoraRTC.removeRemoteView();
}

/*
 UIDeviceOrientationUnknown,
 UIDeviceOrientationPortrait,            // Device oriented vertically, home button on the bottom
 UIDeviceOrientationPortraitUpsideDown,  // Device oriented vertically, home button on the top
 UIDeviceOrientationLandscapeLeft,       // Device oriented horizontally, home button on the right
 UIDeviceOrientationLandscapeRight,      // Device oriented horizontally, home button on the left
 UIDeviceOrientationFaceUp,              // Device oriented flat, face up
 UIDeviceOrientationFaceDown             // Device oriented flat, face down
 */
function yogaAgoraRTCDeviceOrientation(orientation) {
    console.log("[Native call js](屏幕方向变化)");
    console.log(orientation);
    if (orientation == 3 || orientation == 4) {
        YogaAgoraRTC.setLocalVideoViewLayout();
        YogaAgoraRTC.setMargin(20, 0, 20, 0.25);//上、左、下、右
        YogaAgoraRTC.setRemoteVideoViewLayout();
        YogaAgoraRTC.setMargin(20, 0.75, -1, 0);//上、左、下、右
        YogaAgoraRTC.setRemoteViewScrollDirection(false);// 垂直滚动
        YogaAgoraRTC.setRemoteViewItemSize(0.5, 0.5);
    }else {
        YogaAgoraRTC.setLocalVideoViewLayout();
        YogaAgoraRTC.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
        YogaAgoraRTC.setRemoteVideoViewLayout();
        YogaAgoraRTC.setMargin(50, 10, 0.5, 10);//上、左、下、右
        YogaAgoraRTC.setRemoteViewScrollDirection(true);// 水平滚动
        YogaAgoraRTC.setRemoteViewItemSize(1, 1);
    }
}

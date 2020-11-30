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
let token = "0061b895e0d415d42c0bc673f05ec83f26bIACg1FQdVpYfIWJ2/SEvY+pBCNLEA82q70zTrHjNdI3vl6iNhRAAAAAAEABVr+wwoSi+XwEAAQChKL5f";
let channelId = "channel_test_sh";
let uid = "1";

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    AgoraRTC_IOS.NSLog('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    AgoraRTC_IOS.NSLog("浏览器信息: "+navigator.userAgent.toLowerCase());
}

function test_direct() {
    AgoraRTC_IOS.NSLog("agora_direct clicked");
    /*
     Agora初始化设置
     */
    AgoraRTC_IOS.init({
        "appId": appId,
        "token": token,
        "channelId": channelId,
        "uid": uid,
        "enableVideo": false,
        "enableAudio": false
    });
    
    AgoraRTC_IOS.setVideoFrameRate(30);//设置fps
    AgoraRTC_IOS.setVideoDimension(320, 240);//设置分辨率
    
    AgoraRTC_IOS.setLocalVideoViewLayout();
    AgoraRTC_IOS.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
    AgoraRTC_IOS.setRemoteVideoViewLayout();
    AgoraRTC_IOS.setMargin(50, 10, 0.5, 10);//上、左、下、右
    
    /*
     学生视图滑动方向，true-->横向，false-->竖向
     */
    AgoraRTC_IOS.setRemoteViewScrollDirection(true);
    /*
     每个学生视图的尺寸
     */
    AgoraRTC_IOS.setRemoteViewItemSize(1.0, 1.0);
    
    AgoraRTC_IOS.join();// Sample启动
    
    AgoraRTC_IOS.setLocalTitle("我是老师");
    AgoraRTC_IOS.viewClean(false);
    
    AgoraRTC_IOS.on("localAudioStateChange", function(evt){
        AgoraRTC_IOS.NSLog("[localAudioStateChange]的回调");
        AgoraRTC_IOS.NSLog(evt);
    });
    AgoraRTC_IOS.on("localVideoStateChange", function(evt){
        AgoraRTC_IOS.NSLog("[localVideoStateChange]的回调");
        AgoraRTC_IOS.NSLog(evt);
    });
    AgoraRTC_IOS.on("stream-added", function(evt) {
        AgoraRTC_IOS.NSLog("[stream-added]的回调");
        AgoraRTC_IOS.NSLog(evt);
        AgoraRTC_IOS.NSLog("[Native call js](有用户加入)");
        let uid = evt["uid"];
        AgoraRTC_IOS.NSLog("uid: "+evt["uid"]);
        if(uid == 2) {
            AgoraRTC_IOS.muteRemoteAudioStream(uid, false);// 开启或关闭新加入用户的音频流(默认是开启的，不需要调用)
            AgoraRTC_IOS.muteRemoteVideoStream(uid, false);// 开启或关闭新加入用户的视频流(默认是开启的，不需要调用)
            AgoraRTC_IOS.addRemoteUserView(uid, "我是学生2");// 将新加入用户的视频view显示出来
        }else {
            AgoraRTC_IOS.muteRemoteAudioStream(uid, true);// 开启或关闭新加入用户的音频流(默认是开启的，不需要调用)
            AgoraRTC_IOS.muteRemoteVideoStream(uid, true);// 开启或关闭新加入用户的视频流(默认是开启的，不需要调用)
        }
        
        /*
         我们可以在这里处理老师或学生的情况
         以下是一段为代码逻辑:
         if (self.uid == 'teacherUid') {
            //本人是老师，那么其他人都将是学生，此时需要任一新加入学生，都要显示其视频view、接收其音视频流
             AgoraRTC_IOS.addRemoteUserView(uid);
         }else {
            //本人是学生，那么需要依据uid来判断是同学还是老师
            if (uid == 'teacherUid') {
                //需要接收老师的音视频
                AgoraRTC_IOS.addRemoteUserView(uid);
            }else {
                //屏蔽同学的音视频
                AgoraRTC_IOS.muteRemoteAudioStream(uid, true);
                AgoraRTC_IOS.muteRemoteVideoStream(uid, true);
            }
         }
         */
    });
    
    AgoraRTC_IOS.muteLocalVideo(false);
    AgoraRTC_IOS.muteLocalAudio(false);
}

function test_teacher() {
    AgoraRTC_IOS.NSLog("agora_sample_teacher clicked");
    /*
     Agora初始化设置
     */
    AgoraRTC_IOS.init({
        "appId": appId,
        "token": token,
        "channelId": channelId,
        "uid": uid,
    });
    
    AgoraRTC_IOS.setVideoFrameRate(30);//设置fps
    AgoraRTC_IOS.setVideoDimension(320, 240);//设置分辨率
    
    AgoraRTC_IOS.setLocalVideoViewLayout();
    AgoraRTC_IOS.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
    AgoraRTC_IOS.setRemoteVideoViewLayout();
    AgoraRTC_IOS.setMargin(50, 10, 0.5, 10);//上、左、下、右
    
    /*
     学生视图滑动方向，true-->横向，false-->竖向
     */
    AgoraRTC_IOS.setRemoteViewScrollDirection(true);
    /*
     每个学生视图的尺寸
     */
    AgoraRTC_IOS.setRemoteViewItemSize(1.0, 1.0);
    
    AgoraRTC_IOS.joinWithSheet();// Sample启动
    
    AgoraRTC_IOS.setLocalTitle("我是老师");
    AgoraRTC_IOS.viewClean(false);
}

function test_student() {
    AgoraRTC_IOS.NSLog("agora_sample_student clicked");
    /*
     Agora初始化设置
     */
    AgoraRTC_IOS.init({
        "appId": appId,
        "token": token,
        "channelId": channelId,
        "uid": uid,
    });
    AgoraRTC_IOS.setVideoFrameRate(30);//设置fps
    AgoraRTC_IOS.setVideoDimension(320, 240);//设置分辨率
    
    AgoraRTC_IOS.setLocalVideoViewLayout();
    AgoraRTC_IOS.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
    AgoraRTC_IOS.setRemoteVideoViewLayout();
    AgoraRTC_IOS.setMargin(50, 10, 0.5, 10);//上、左、下、右
    
    /*
     学生视图滑动方向，true-->横向，false-->竖向
     */
    AgoraRTC_IOS.setRemoteViewScrollDirection(true);
    /*
     每个学生视图的尺寸
     */
    AgoraRTC_IOS.setRemoteViewItemSize(0.5, 1);
    
    AgoraRTC_IOS.setLocalTitle("我是学生");
    AgoraRTC_IOS.viewClean(true);
    
    AgoraRTC_IOS.joinWithSheet(function(msg) {});// Sample启动
}

function test_leave() {
    AgoraRTC_IOS.NSLog("agora_leave clicked");
    AgoraRTC_IOS.leave();
}

function test_close() {
    AgoraRTC_IOS.NSLog("agora_close clicked");
    AgoraRTC_IOS.removeLocalView();
    AgoraRTC_IOS.removeRemoteView();
}

function test_share() {
    AgoraRTC_IOS.NSLog("agora_share clicked");
    AgoraRTC_IOS.share("https://zipyoga.jp");
}

function test_xmlhttprequest() {
    AgoraRTC_IOS.NSLog("agora_xmlhttprequest clicked");
    AgoraRTC_IOS.safari("http://192.168.80.46:8000/test3.html");
}

function test_scheme() {
    AgoraRTC_IOS.NSLog("agora_scheme clicked");
    AgoraRTC_IOS.on("safari-back", function() {
        alert("监听到原生的SFSafariViewController已dismiss");
    });
    AgoraRTC_IOS.safari("http://192.168.80.46:8000/test1.html");
}

function test_add_one_user() {
    
}



































































/** 0: The local audio is in the initial state. */
/** 1: The recording device starts successfully.  */
/** 2: The first audio frame encodes successfully. */
/** 3: The local audio fails to start. */
function yogaAgoraRTCAudio(status) {
    AgoraRTC_IOS.NSLog("[Native call js](本地音频)");
    if (status == 0) {
        AgoraRTC_IOS.NSLog("本地音频处于静态状态");
    }else if (status == 1) {
        AgoraRTC_IOS.NSLog("采集本地音频设备准备就绪");
    }else if (status == 2) {
        AgoraRTC_IOS.NSLog("本地音频第一个字节编码成功");
    }else if (status == 3) {
        AgoraRTC_IOS.NSLog("本地音频启动失败");
    }
}

/** 0: The remote video is in the default state, probably due to AgoraVideoRemoteStateReasonLocalMuted(3), AgoraVideoRemoteStateReasonRemoteMuted(5), or AgoraVideoRemoteStateReasonRemoteOffline(7). */
/** 1: The first remote video packet is received. */
/** 2: The remote video stream is decoded and plays normally, probably due to AgoraVideoRemoteStateReasonNetworkRecovery(2), AgoraVideoRemoteStateReasonLocalUnmuted(4), AgoraVideoRemoteStateReasonRemoteUnmuted(6), or AgoraVideoRemoteStateReasonAudioFallbackRecovery(9). */
/** 3: The remote video is frozen, probably due to AgoraVideoRemoteStateReasonNetworkCongestion(1) or AgoraVideoRemoteStateReasonAudioFallback(8).*/
/** 4: The remote video fails to start, probably due to AgoraVideoRemoteStateReasonInternal(0). */
function yogaAgoraRTCRemoteVideo(uid, status) {
    AgoraRTC_IOS.NSLog("[Native call js](远程视频)");
    if (status == 0) {
        AgoraRTC_IOS.NSLog("远程视频处于静态状态");
    }else if (status == 1) {
        AgoraRTC_IOS.NSLog("收到远程视频第一个字节包");
    }else if (status == 2) {
        AgoraRTC_IOS.NSLog("解码远程视频第一个字节包");
    }else if (status == 3) {
        AgoraRTC_IOS.NSLog("远程视频frozen了");
    }else if (status == 4) {
        AgoraRTC_IOS.NSLog("远程视频启动失败");
    }
}

/*
 远端用户/主播加入回调
 uid      新加入频道的远端用户/主播 ID。如果 joinChannelByToken 中指定了 uid，则此处返回该 ID；否则使用 Agora 服务器自动分配的 ID。
 elapsed  从本地用户加入频道 joinChannelByToken 或 joinChannelByUserAccount 开始到发生此事件过去的时间（ms）。
 */
function yogaAgoraRTCDidJoinedOfUidAndElapsed(uid, elapsed) {
    AgoraRTC_IOS.NSLog("[Native call js](有用户加入)");
    AgoraRTC_IOS.NSLog("uid: "+uid);
//    AgoraRTC_IOS.muteRemoteAudioStream(uid, true);// 开启或关闭新加入用户的音频流(默认是开启的，不需要调用)
//    AgoraRTC_IOS.muteRemoteVideoStream(uid, true);// 开启或关闭新加入用户的视频流(默认是开启的，不需要调用)
//    AgoraRTC_IOS.addRemoteUserView(uid, "我是学生1");// 将新加入用户的视频view显示出来
    
    /*
     我们可以在这里处理老师或学生的情况
     以下是一段为代码逻辑:
     if (self.uid == 'teacherUid') {
        //本人是老师，那么其他人都将是学生，此时需要任一新加入学生，都要显示其视频view、接收其音视频流
         AgoraRTC_IOS.addRemoteUserView(uid);
     }else {
        //本人是学生，那么需要依据uid来判断是同学还是老师
        if (uid == 'teacherUid') {
            //需要接收老师的音视频
            AgoraRTC_IOS.addRemoteUserView(uid);
        }else {
            //屏蔽同学的音视频
            AgoraRTC_IOS.muteRemoteAudioStream(uid, true);
            AgoraRTC_IOS.muteRemoteVideoStream(uid, true);
        }
     }
     */
}

function yogaAgoraRTCDidOfflineOfUidAndReason(uid, reason) {
//    AgoraRTC_IOS.removeRemoteView();
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
    AgoraRTC_IOS.NSLog("[Native call js](屏幕方向变化)");
    AgoraRTC_IOS.NSLog(orientation);
    if (orientation == 3 || orientation == 4) {
        AgoraRTC_IOS.setLocalVideoViewLayout();
        AgoraRTC_IOS.setMargin(20, 0, 20, 0.25);//上、左、下、右
        AgoraRTC_IOS.setRemoteVideoViewLayout();
        AgoraRTC_IOS.setMargin(20, 0.75, -1, 0);//上、左、下、右
        AgoraRTC_IOS.setRemoteViewScrollDirection(false);// 垂直滚动
        AgoraRTC_IOS.setRemoteViewItemSize(0.5, 0.5);
    }else {
        AgoraRTC_IOS.setLocalVideoViewLayout();
        AgoraRTC_IOS.setMargin(0.55, 10, 0.25, 0.5);//上、左、下、右
        AgoraRTC_IOS.setRemoteVideoViewLayout();
        AgoraRTC_IOS.setMargin(50, 10, 0.5, 10);//上、左、下、右
        AgoraRTC_IOS.setRemoteViewScrollDirection(true);// 水平滚动
        AgoraRTC_IOS.setRemoteViewItemSize(1, 1);
    }
}

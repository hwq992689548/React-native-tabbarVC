/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Video from 'react-native-video'


export default class ShowVideo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
        };
        this.loadStart = this.loadStart.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.setTime = this.setTime.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.videoError = this.videoError.bind(this);

    }


    loadStart() {
        console.log('视频开始加载');
    }
    setDuration() {
        console.log('视频加载完成，即将播放');

    }
    setTime() {
        console.log('setTime');

    }
    onEnd() {
        console.log('视频播放完成');

    }
    videoError() {
        console.log('视频播放出错');

    }


    render() {
        return (
            <View style={this.props.style}>
                <Video
                style={{margin: 10}}
                    source={{uri: this.props.videoUrl}} // 视频的URL地址，或者本地地址，都可以.
                    ref='player'
                    rate={this.state.isPlay ? 1 : 0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    muted={false}                // true代表静音，默认为false.
                    paused={false}               // true代表暂停，默认为false
                    resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                    repeat={false}                // 是否重复播放
                    playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                    playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                    onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                    onLoad={this.setDuration}    // 当视频加载完毕时的回调函数
                    onProgress={this.setTime}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                    onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                    style={styles.backgroundVideo}
                />


                <TouchableOpacity style={styles.button}
                    onPress={() => {

                        this.setState({
                            isPlay: !this.state.isPlay,
                        })

                        //this.refs.player.seek(20);//播放前进到第20秒
                        //this.refs.player.presentFullscreenPlayer();//iOS调用系统的播放器

                    }}>

                    <Text>暂停/播放</Text>

                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    backgroundVideo:
    {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 30,
        right: 0,
    },

    button: {
        position: 'absolute',
        left: 0,
        bottom: 20,
        right: 0,
        alignItems: 'center'
    }
});


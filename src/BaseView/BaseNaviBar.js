
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    Dimensions,
    Image,
    View,
    TouchableOpacity,
    Button,
} from 'react-native';

const kScreen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

const NaviBarObj = {
    height: Dimensions.get('window').height > 812 ? 98 : 74
}


export default class BaseNaviBar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    
    // 默认返回
    leftBtnAction = () => {
        this.props.myProps.navigation.goBack();
    }


    render() {
        const defaultStyle = {
            width: kScreen.width,
            height: NaviBarObj.height,
            backgroundColor: 'width',
            marginBottom: 1,

        }
        return (
            <View style={this.props.style === undefined ? defaultStyle : this.props.style}>
                <View style={{ height: NaviBarObj.height, backgroundColor: 'white', alignItems: 'auto', flexDirection: 'row' }}>
                    {/* 返回按钮 */}

                    {
                        this.props.showBackBtnFlag ?

                            <TouchableOpacity style={styles.leftItemViewStyle} title='' onPress={this.props.leftBtnAction === null ? this.leftBtnAction.bind(this) : this.props.leftBtnAction}>
                                <Image source={require('../../ImageSources/icon_nav_b_back.png')} style={styles.backIconStyle}>
                                </Image>
                            </TouchableOpacity> : <View style={{ width: 50 }} />

                    }


                    {/* 标题 */}
                    <View style={styles.titleViewStyle}>
                        <Text style={{ fontSize: 22, color: '#000', fontWeight: "bold" }}>{this.props.title}</Text>
                    </View>

                    {/* 右侧按钮 */}
                    {
                        this.props.showRightBtnFlag ?
                            <TouchableOpacity style={styles.rightItemStyle} title=''>
                                <Image source={require('../../ImageSources/icon_online_kefu.png')} style={styles.rightIconStyle}>
                                </Image>
                            </TouchableOpacity> : <View style={{ width: 50 }} />
                    }


                </View>
                {/* 底部线条 */}
                <View style={{ width: defaultStyle.width, height: 1, backgroundColor: '#eeeeee', marginBottom: 1 }}></View>
                {/* 底部线条 */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'red',
    },

    leftItemViewStyle: {
        tintColor: 'black',
        marginTop: NaviBarObj.height > 65 ? 64 : 24,
        width: 50,
        height: 44,
        marginLeft: 0,

    },

    backIconStyle: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },

    rightItemStyle: {
        tintColor: 'black',
        marginTop: NaviBarObj.height > 65 ? 64 : 24,
        width: 50,
        height: 44,
        marginLeft: 0,
    },

    rightIconStyle: {
        width: 30,
        height: 30,
        marginLeft: 0,
    },

    titleViewStyle: {
        flex: 1,  //自动适应宽度
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 64,
        height: 36,
    },


});


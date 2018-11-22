
import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Easing,
    Image,
    I18nManager,
    Animated,
    Dimensions,
 } from 'react-native';

 import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import HomeView from '../PageViews/HomeView';
import HotView from '../PageViews/HotView';
import MoreView from '../PageViews/MoreView'; 
import TestView from '../PageViews/TestView'; 

import { Button, Icon} from 'native-base';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const { width, height } = dimensions.get('window');

export class TabBarItem extends Component {
    render() {
        return (
            <Text></Text>
        );
    }
}

const MyTabbarView = TabNavigator({
    HomeView: {
        headerBackTitle: '返回',
        screen: HomeView,
        navigationOptions: ({ navigation }) => ({
            key: 'Home',
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                // <TabBarItem
                //     tintColor={tintColor}
                //     focused={focused}
                // />
                <Icon name='home'></Icon>      
            ),
        }),
    },
    HotView: {
        headerBackTitle: '返回',
        screen: HotView,
        navigationOptions: ({ navigation }) => ({
            key: 'Mine',
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                // <TabBarItem
                //     tintColor={tintColor}
                //     focused={focused}
                // />
                <Icon name='film'></Icon>
            )
        }),
    },

    MoreView: {
        headerBackTitle: '返回',
        screen: MoreView,
        navigationOptions: ({ navigation }) => ({
            key: 'Mine',
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                // <TabBarItem
                //     tintColor={tintColor}
                //     focused={focused}
                // />
                <Icon name='person'></Icon>      
            )
        }),
    },

}, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#06c1ae',
            inactiveTintColor: 'black',
            style: { backgroundColor: '#ffffff', },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
            showIcon: true,
        }
    },
   

);



//路由
const MyNavigator = StackNavigator({
    MyTabbarView: { screen: MyTabbarView },  //这里是tabbarViewController
    TestView: { screen: TestView},
},
    {
        navigationOptions: {
            swipeEnabled: true,
            animationEnabled: false,
        },
        headerMode: 'none',
        mode: 'card',
  
        transitionConfig: TransitionConfiguration,
    }
);




//实现定义某个页面的动画效果
const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 240,
            easing: Easing.linear(),
            timing: Animated.timing,
        },
        screenInterpolator: (sceneProps) => {
            const { scene } = sceneProps;
            const { route, index } = scene;
            const params = route.params || {};
            const transition = params.transition || 'pushStyle';
            switch (transition) {
                case 'model':
                    return actionSheetStyle(sceneProps);
                    break;
                case 'push':
                    return pushStyle(sceneProps);
                    break;
                default:
                    return pushStyle(sceneProps); //CardStackStyleInterpolator[transition](sceneProps);
            }
        },
    
    };
};


/*
* 从下至上动画
* */
const actionSheetStyle = (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const index = scene.index;
    const height = layout.initHeight;
    const width = layout.initWidth;

    console.log('index', index);
    console.log('position', position);
    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ]),
        outputRange: ([1, 1, 1, 0.85, 0]),  //透明度
    });
    const translateX = 0;
    const translateY = position.interpolate({
        inputRange: ([index, index + 1, index + 1]),
        outputRange: ([0, -height, -height])
    })

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };

};

/*
* 默认返回动画 pop
* */
const pushStyle = (sceneProps) => {
    const { layout, position, scene } = sceneProps;

    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];

    const width = layout.initWidth;
    const outputRange = I18nManager.isRTL
        ? ([width, 0, -width * 0])
        : ([width, 0, width * 0]);

    const opacity = position.interpolate({
        inputRange: ([
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ]),
        outputRange: ([0, 1, 1, 0.85, 0]),
    });

    const translateY = 0;
    const translateX = position.interpolate({
        inputRange,
        outputRange,
    });

    return {
        opacity,
        transform: [{ translateX }, { translateY }],
    };
};




export default class BaseNavigationView extends Component {
    render() {
        return (
            <MyNavigator>
            </MyNavigator>
        );
    }
}


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
// });

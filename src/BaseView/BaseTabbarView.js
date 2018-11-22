import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Form } from 'native-base';
import { StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

import HomeView from '../PageViews/HomeView';
import HotView from '../PageViews/HotView';
import MoreView from '../PageViews/MoreView';


export class TabBarItem extends Component {
    render() {
        return (
            // <Image source="http://www.baidu.com" style={{tintColor: 'green'}}> </Image>
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
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                />
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
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                />
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
                fontSize: 20, // 文字大小
            },
        }
    }

);


export default class BaseTabbarView extends Component {
    render() {

        return (
            <MyTabbarView>
            </MyTabbarView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

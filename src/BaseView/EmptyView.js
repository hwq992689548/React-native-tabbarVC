import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class EmptyView extends Component {
    render() {
        return (
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                    暂无列表数据，下啦刷新
                </Text>
            </View>
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

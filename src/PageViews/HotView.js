import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class HotView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HotView</Text>
            </View>        );
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

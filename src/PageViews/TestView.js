import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, WebView } from 'react-native';

import { Button, Icon, Form, Header, Content, Footer, Container, Left, Body, Title, Right } from 'native-base';
const KScreen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}
const NaviBarObj = {
    height: Dimensions.get('window').height > 812 ? 98 : 64,
    width: Dimensions.get('window').width
}
export default class TestView extends Component {
    render() {
        // alert(this.props.navigation.state.params.url);
        var url = "http://www.xiantian365.com";
        if(this.props.navigation.state.params !== null) {
            url = this.props.navigation.state.params.url;
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Image source={require('../../ImageSources/icon_nav_b_back.png')} style={styles.backIconStyle}>
                            </Image>
                        </Button>
                    </Left>
                    <Body>
                        <Title>详情页</Title>
                    </Body>
                    <Right />
                </Header>
                <Body>
                    <WebView 
                        style={{ width: KScreen.width, height: KScreen.height - NaviBarObj.height, backgroundColor: '#eeeeee' }}
                        source={{
                            uri: url,
                            method: 'GET' 
                        }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={false}
                                        >
                    
                    </WebView>
                </Body>
                <Footer style = {{height:0}}></Footer>
            </Container>
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
    headerStyle: {
        position: 'absolute',
        alignContent: 'flex-start'
    },
    backIconStyle: {
        width: 20,
        height: 20,
        marginLeft: 0,
    },

});

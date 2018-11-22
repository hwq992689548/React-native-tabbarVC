import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class MHImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true ,
        }
    }
    
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '', width: this.props.mhStyle.width, height: this.props.mhStyle.height, overflow: true}}>
                <Image
                    style={{ width: this.props.mhStyle.width, height: this.props.mhStyle.height, position: 'absolute'}}
                    source={{ uri: this.props.source}}
                    onLoad={() => this.setState({ loading: false })} />
                {
                    this.state.loading ? <Image style={{ width: this.props.mhStyle.width, height: this.props.mhStyle.height, position: 'absolute' }} resizeMode='stretch' source={this.props.placeholderSource} /> : null
                }

                
            </View>
        );
    }
}
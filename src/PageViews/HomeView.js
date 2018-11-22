import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    FlatList, 
    Dimensions,
    Image,
    ListView,
} from 'react-native';
import BaseNaviBar from '../BaseView/BaseNaviBar';
import { Button, Icon, Form, Header, Content, Footer, Container, Left, Body, Title, Right } from 'native-base';import Video from 'react-native-video';

import ShowVideo from '../Others/ShowVideo';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import MHImage from '../Others/MHImage';
import EmptyView from '../BaseView/EmptyView';
const NaviBarObj = {
    height: Dimensions.get('window').height > 812 ? 98 : 64,
    width: Dimensions.get('window').width
}

const KScreen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}
const url = 'https://www.jianshu.com/asimov/collections/slug/V2CqjW/public_notes';

var RefreashHeader = null;
var RefreashFooter = null;
export default class HomeView extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            page: 1,
            data: [],
            isRefresh: false,
            isLoadMore: false,
            showLoadMoreFlag: 0,
            dataSource: ds.cloneWithRows([]),

        }
    }

    componentWillMount(){
        this.fetchGetData(null, false,'added_at');
    }

    /**
     * 获取数据
     * isMore: 上拉标识
     */
    fetchGetData(RefreashVC, isMore, orderBy) {
        var pageNo = 1
        if (this.page !== 1) {
            pageNo = this.state.data.length % 10 === 0 ? (this.state.data.length / 10 + 1) : (this.state.data.length / 10 + 2);
        }
        var pageSize = 10;
        var tempUrl = url + '?page=' + pageNo + '&count=' + pageSize + '&order_by=' + orderBy;
        fetch(tempUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                if ( isMore === false && RefreashVC !== null) {
                    RefreashVC.onRefreshEnd();
                }
                if (isMore === true && RefreashVC !== null) {
                    // RefreashVC.onLoadMoreEnd(); //如果没有更多数据时显示没有更多
                    // RefreashVC.onLoadMore()//重置
                }

                var tempShowFlag = 0 ;
                if (responseJson.length >= 10) {
                    tempShowFlag = 1; 
                }
                if (isMore == false) {
                    this.setState({
                        data: [],
                    });
                }
                var tempData = this.state.data;
                if (responseJson.length > 0) {
                    tempData.push.apply(tempData, responseJson)
                }
                this.setState({
                    data: tempData,
                    dataSource: ds.cloneWithRows(tempData),
                    isRefresh: false,
                    showLoadMoreFlag: tempShowFlag,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

   
    /**
     * 没有数据时的空布局
     */
    createEmptyView() {
        return (
            <EmptyView/>
        );
    }

    /**
     * 下拉刷新
     * @private
     */
    onRefresh = (PullRefresh) => {
        if (!this.state.isRefresh) {
            this.page = 1
            RefreashHeader = PullRefresh;
            this.fetchGetData(PullRefresh, false ,'added_at'); 
        }
    };

    /**
     * 加载更多
     * @private
     */
    onLoadMore(PullRefresh) {
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0) {
            this.page = this.page + 1
            RefreashFooter = PullRefresh;
            this.fetchGetData(PullRefresh, true, 'added_at'); 
        }
    }

    /**
     * item点击事件
     */
    onItemClick(item) {
        var tempUrl = "https://www.jianshu.com/p/" + item.object.data.slug
        this.props.navigation.navigate('TestView', { transition: 'pushStyle', url: tempUrl});

    }

    /**
     *  时间处理
     */
    getTimeByString(param){
        var tempParam = param.replace('T', ' ');
        var paramArray = tempParam.split('.');
        return paramArray[0];
    }


    render(){
        return(
            <Container>
                <Header style={{ height: NaviBarObj.height > 65 ? 88 : 64}}>
                    <Left></Left>
                    <Body>
                        <Title>主页</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Body>
                    <ListView
                        style={{ flex: 1, width: KScreen.width, height: KScreen.height, backgroundColor: '#eeeeee'}}
                        renderScrollComponent={(props) => 
                        <PullRefreshScrollView 
                            style={{ flex: 1, width: KScreen.width, height: KScreen.height }}
                            onRefresh={(PullRefresh) => this.onRefresh(PullRefresh)} 
                            onLoadMore={(PullRefresh) => this.onLoadMore(PullRefresh)} 
                            useLoadMore={1}{...props} />}
                            isRefresh={this.state.isRefresh}

                        dataSource={this.state.dataSource}
                        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                        renderRow={(rowData) => 
                            <TouchableOpacity style={styles.rowItemStyle}
                                activeOpacity = {1}
                                onPress={()=>{
                                  
                                  this.onItemClick(rowData);
                                }}
                            >
                           
                                <View style={{ backgroundColor: '#eeeeee', height: 40, alignContent: 'center', alignSelf: 'center', width: KScreen.width, overflow: true}}>
                                    <View style={{ textAlign: 'center', backgroundColor: '#ccc', alignSelf: 'center', padding: 6, borderRadius: 2, overflow: true}}>
                                        <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                                            {this.getTimeByString(rowData.object.data.first_shared_at)}
                                        </Text>
                                    </View>
                                </View>
                                <MHImage  
                                    mhStyle={{width: KScreen.width-20, height: 200}}
                                    source={rowData.object.data.list_image_url}
                                    placeholderSource={require('../../ImageSources/icon_asset_header.png')}                                  
                                ></MHImage>
                                
                                <View style={{padding:15}}>
                                    <Text>{rowData.object.data.public_abbr}</Text>
                                </View>
                       
                            </TouchableOpacity>
                            }
                    />



                </Body>
                <Footer style={{height: 0, backgroundColor: ''}}></Footer>
            </Container>
            
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        width: NaviBarObj.width + 100,
        backgroundColor: 'red',
        marginTop: 10
    },

    headView: {
        width: NaviBarObj.width,
        height: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        width: BaseNaviBar.width,
        height: 100,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImages: {
        width: KScreen.width,
        height: 250,
        resizeMode: 'stretch'
    },
    rowItemStyle: {
        flex: 1,
        margin: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
    }
});
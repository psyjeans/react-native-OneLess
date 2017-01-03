/**
 * Created by mifind on 2017/1/2.
 */
import React, {Component} from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Image,
    Text,
    ScrollView,
    ListView,
    StyleSheet
} from 'react-native';
import {fetchReadingImageDetail} from './Fun'
import resource from '../../common/commonResources'
const scaleWH = 2.21;
export default class ReadCarouselDetail extends Component {
    constructor() {
        super();
        this.state = {
            details: [],
        };
    }

    componentWillMount() {
        fetchReadingImageDetail(this.props.carouselId, this)
    }


    _renderRow(rowData: string, sectionID: number, rowID: number) {
        return (
            <View
                style={styles.carousel}>
                <Text style={styles.carousel_num}>{Number(rowID) + 1}  </Text>
                <View>
                    <Text style={{color:'white',fontSize:16}}>{rowData.title}</Text>
                    <Text style={{color:'white',fontSize:12,marginTop:10}}>{rowData.author}</Text>
                    <Text style={{color:'white',fontSize:13,marginTop:10}}>{rowData.introduction}</Text>
                </View>
            </View>
        )
    }

    _onScroll(event) {
        let dy = event.nativeEvent.contentOffset.y - resource.screen.screenHeight;
        let scale = 1;
        if (dy >= 0) {
            scale = dy / 10;
        } else {
            scale = 1;
        }
        console.log('_onScroll', scale)
    }

    render() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <ScrollView
                    onScroll={this._onScroll.bind(this)}
                    showsVerticalScrollIndicator={false}
                    style={[{backgroundColor:this.props.bgcolor?this.props.bgcolor:'pink'},styles.container]}
                >
                    <Text style={styles.title}>{this.props.carouselTitle}</Text>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.details)}
                        renderRow={this._renderRow.bind(this)}
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                    />
                    <View style={{height:400,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ fontSize: 16,color: 'white'}}>{this.props.bottom_text}</Text>
                    </View>
                    <Image style={{
                         width: resource.screen.screenWidth ,
                         height: resource.screen.screenWidth / scaleWH,
                    }} resizeMode={'cover'} source={{uri:this.props.bottom_image}}/>
                </ScrollView>
                <View style={styles.close}>
                    <TouchableWithoutFeedback onPress={()=>this.props.navigator.pop()}>
                        <Image style={{width:28,height:28}}
                               source={require('../../images/close.png')}
                               resizeMode={'cover'}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    close: {
        position: 'absolute',
        top: 40,
        bottom: resource.screen.screenHeight,
        left: 10,
        right: 0,
    },
    title: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginTop: 55
    },
    carousel: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    carousel_num: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

});
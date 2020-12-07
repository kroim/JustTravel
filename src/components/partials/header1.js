import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

class Header1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const avatar_icon = require('../../assets/images/avatar.jpg');
        return (
            <View style={styles.header}>
                <View style={styles.logo_view}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name={'arrow-left'} color={'#364F6B'} size={24}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.header_right}>
                    <View style={styles.coins_view}>
                        <Text style={{color: 'black', paddingRight: 5}}>Anton</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={avatar_icon} style={{width: 40, height: 40, borderRadius: 20}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#a2cfef',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#00f49c'
    },
    logo_view: {
        paddingLeft: 15,
        width: '20%',
        alignItems: 'flex-start',
    },
    header_right: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 12,
    },
    coins_view: {
        // flexDirection: 'row',
        paddingRight: 10,
    },
});
const mapStateToProps = (state) => ({
    authStore: state.authReducer || 'Please Wait...',
});
export default connect(mapStateToProps)(Header1);

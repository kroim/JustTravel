import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import {getAllFlights, getFilterFlights} from '../navigation/serverApi';
import {setFlights} from '../redux/actions';

const splash_logo = require("../assets/images/splash.png");

class SplashScreen extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = async () => {
        let that = this;
        let flights = [];
        let filters = this.props.homeStore.searchItems;
        if (filters.origin && filters.destination && filters.from && filters.to) {
            flights = await getFilterFlights({from: filters.origin, to: filters.destination, departure: filters.from, arrival: filters.to});
        } else {
            flights = await getAllFlights();
        }
        await this.props.setFlights(flights);
        setTimeout(async function () {
            that.props.navigation.navigate("Home");
        }, 3000);

    };

    render(){
        return (
            <View style={styles.container}>
                <Image source={splash_logo} style={styles.container_img}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#a2cfef",
        alignItems:"center",
        justifyContent:"center",
        height: "100%",
        width: "100%",
    },
    container_img:{
        width: 250,
        height: 200,
        resizeMode: 'contain'
    },
});
const mapStateToProps = (state) => ({
    homeStore: state.homeReducer || "Please Wait...",
});
const mapDispatchToProps = (dispatch) => {
    return {
        setFlights: (data) => {
            dispatch(setFlights(data))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {ThemeProvider, Input, CheckBox, Button, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {getFlightItem, submitBooking} from '../../navigation/serverApi';
import Header1 from '../partials/header1';
import Spinner from 'react-native-loading-spinner-overlay';
class BookingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            flightId: this.props.route.params.flightId,
            flight: null
        }
    }

    componentDidMount = async () => {
        let flight = await getFlightItem(this.state.flightId);
        this.setState({flight: flight, loading: false});
    };
    submitBook = async () => {
        this.setState({loading: true});
        let data = {
            flightId: this.state.flight.flightId,
            userId: "Anton"
        };
        let subRes = await submitBooking(data);
        this.setState({loading: false});
        if (subRes && subRes.msg) {
            alert(subRes.msg);
        }
    };
    render(){
        const {flight, loading} = this.state;
        const btwIcon = require('../../assets/images/btw.png');
        return (
            <ThemeProvider>
                <Header1 {...this.props}/>
                {
                    flight && !loading?(
                        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "#f2f2f2"}}>
                            <View style={styles.viewItem}>
                                <View style={styles.detailItem}>
                                    <View style={styles.timePanel}>
                                        <Text style={styles.timeText}>{flight.departure.substr(11, 5)}</Text>
                                        <Text style={styles.addressText}>{flight.destinationAirportName}</Text>
                                    </View>
                                    <View style={styles.btwPanel}>
                                        <Image source={btwIcon} style={{width: 70, height: 50, resizeMode: "contain"}}/>
                                    </View>
                                    <View style={styles.timePanel}>
                                        <Text style={styles.timeText}>{flight.arrival.substr(11, 5)}</Text>
                                        <Text style={styles.addressText}>{flight.takeoffAirportName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{height: 70, justifyContent: "center", alignItems: "center"}}>
                                <View style={{backgroundColor: "#ef463b", width: 250, height: 70, borderRadius: 35, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: 'white', fontSize: 20, fontWeight: "bold"}}>Price: ${flight.price}</Text>
                                </View>
                            </View>
                            <View style={{padding: 10}}>
                                <Button title={'Book Now'} onPress={this.submitBook}/>
                            </View>
                        </ScrollView>
                    ):(
                        <Spinner visible={this.state.loading} color={'#6638ff'} overlayColor={'rgba(162,207,239,0.9)'}/>
                    )
                }
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    viewItem: {
        height: 120,
        marginTop: 7,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
        padding: 10
    },
    detailItem: {
        height: "100%",
        width: "100%",
        borderRadius: 5,
        marginRight: 1.5,
        backgroundColor: "#fff",
        flexDirection: "row",
    },
    timePanel: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    addressText: {
        color: "gray",
        fontSize: 12,
    },
    btwPanel: {
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: "10%",
    },
});
const mapStateToProps = (state) => ({
    authStore: state.authReducer || "Please Wait...",
    homeStore: state.homeReducer || "Please Wait...",
});
const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);

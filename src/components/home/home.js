import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {ThemeProvider, Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getFilterFlights, getAllFlights} from '../../navigation/serverApi';
import {setSearchItems, setFlights} from '../../redux/actions';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../partials/header';
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModal: false,
            isRoundTrip: true,
            isOneWay: false,
            filter: this.props.homeStore.searchItems,
            origins: [{label: 'Denmark', value: "Denmark"}, {label: 'England', value: "England"},
                {label: 'Australia', value: "Australia"}],
            destinations: [{label: 'Copenhagen', value: "Copenhagen"}, {label: 'Kolding', value: "Kolding"},
                {label: 'Horsens', value: "Horsens"}, {label: 'Herning', value: "Herning"}]
        }
    }
    changeOrigin = (origin) => {
        let filter = this.state.filter;
        filter['origin'] = origin;
        this.setState({filter: filter});
    };
    changeDestination = (destination) => {
        let filter = this.state.filter;
        filter['destination'] = destination;
        this.setState({filter: filter});
    };
    changeFrom = (from) => {
        let filter = this.state.filter;
        filter['from'] = from;
        this.setState({filter: filter});
    };
    changeTo = (to) => {
        let filter = this.state.filter;
        filter['to'] = to;
        this.setState({filter: filter});
    };
    filterFlights = async () => {
        let origin = this.state.filter.origin || this.state.origins[0].value;
        let destination = this.state.filter.destination || this.state.destinations[0].value;
        let filter = {
            origin: origin,
            destination: destination,
            from: this.state.filter.from,
            to: this.state.filter.to,
        };
        this.setState({filter: filter});
        this.props.setSearchItems(filter);
        let flights = await getFilterFlights({
            from: this.state.filter.origin,
            to: this.state.filter.destination,
            departure: this.state.filter.from,
            arrival: this.state.filter.to,
        });
        await this.props.setFlights(flights);
        this.toggleModal();
    };
    allFlights = async () => {
        this.setState({
            filter: {
                origin: '', destination: '', from: '', to: ''
            }
        });
        this.props.setSearchItems({origin: '', destination: '', from: '', to: ''});
        let flights = await getAllFlights();
        await this.props.setFlights(flights);
        this.toggleModal();
    };
    toggleModal = () => {
        this.setState({isModal: !this.state.isModal});
    };
    toggleSearchPanel = (type) => {
        if (type === 1) {
            this.setState({
                isRoundTrip: true,
                isOneWay: false,
            })
        } else {
            this.setState({
                isRoundTrip: false,
                isOneWay: true,
            })
        }
    };
    render(){
        const {flights} = this.props.homeStore;
        const searchItems = this.state.filter;
        const btwIcon = require('../../assets/images/btw.png');
        return (
            <ThemeProvider>
                <Header/>
                <Modal isVisible={this.state.isModal}
                       animationIn={'slideInDown'}
                       style={{
                           justifyContent: 'flex-start',
                           margin: 0,
                       }}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalContentHeader}>
                            <TouchableOpacity
                                style={[styles.modalContentHeaderButton1, this.state.isRoundTrip?{backgroundColor: "#1273de"}:{}]}
                                onPress={()=>this.toggleSearchPanel(1)}
                            >
                                <Text style={[this.state.isRoundTrip?{color: "#fff"}:{color: "#1273de"}]}>Round trip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalContentHeaderButton2, this.state.isOneWay?{backgroundColor: "#1273de"}:{}]}
                                onPress={()=>this.toggleSearchPanel(2)}
                            >
                                <Text style={[this.state.isOneWay?{color: "#fff"}:{color: "#1273de"}]}>One way</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingRight: 20, paddingLeft: 20}}>
                            <View style={styles.filterItem}>
                                <View style={styles.filterLeft}><Text>Origin</Text></View>
                                <View style={styles.filterRight}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        style={{
                                            inputIOS: {
                                                color: '#000000',
                                                height: 30,
                                                textAlign: "center",
                                            },
                                            inputAndroid: {
                                                color: '#364F6B',
                                                height: 40,
                                                textAlign: "center",
                                            }
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => this.changeOrigin(value)}
                                        value={searchItems.origin?searchItems.origin:''}
                                        items={this.state.origins}
                                    />
                                </View>
                            </View>
                            <View style={styles.filterItem}>
                                <View style={styles.filterLeft}><Text>Destination</Text></View>
                                <View style={styles.filterRight}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        style={{
                                            inputIOS: {
                                                color: '#000000',
                                                height: 30,
                                                textAlign: "center",
                                            },
                                            inputAndroid: {
                                                color: '#364F6B',
                                                height: 40,
                                                textAlign: "center",
                                            }
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value) => this.changeDestination(value)}
                                        value={searchItems.destination?searchItems.destination:''}
                                        items={this.state.destinations}
                                    />
                                </View>
                            </View>
                            <View style={styles.filterItem}>
                                <View style={styles.filterLeft}><Text>Leaving</Text></View>
                                <View style={styles.filterRight}>
                                    <Input
                                        placeholder='2020/12/05 15:30'
                                        inputStyle={{textAlign: "center", fontSize: 16}}
                                        inputContainerStyle={{borderBottomWidth: 0}}
                                        value={searchItems.from}
                                        onChangeText={(from) => this.changeFrom(from)}
                                    />
                                </View>
                            </View>
                            <View style={styles.filterItem}>
                                <View style={styles.filterLeft}><Text>Returning</Text></View>
                                <View style={styles.filterRight}>
                                    <Input
                                        placeholder='2020/12/05 17:30'
                                        inputStyle={{textAlign: "center", fontSize: 16}}
                                        inputContainerStyle={{borderBottomWidth: 0}}
                                        value={searchItems.to}
                                        onChangeText={(to) => this.changeTo(to)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{padding: 10, flexDirection: "row"}}>
                            <View style={{width: "50%", padding: 5}}>
                                <Button type={'outline'}
                                        buttonStyle={{borderWidth: 2, borderColor: "orange"}}
                                        titleStyle={{color: "orange"}}
                                        onPress={this.allFlights} title="All Flights" />
                            </View>
                            <View style={{width: "50%", padding: 5}}>
                                <Button type={'outline'}  buttonStyle={{borderWidth: 2}} onPress={this.filterFlights} title="Find Flights" />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "#f2f2f2"}}>
                    <View style={styles.searchHeader}>
                        <View style={styles.searchText}>
                            {
                                searchItems.origin && searchItems.destination?(
                                    <View>
                                        <Text style={{color: 'white', fontWeight: "bold", fontSize: 18}}>{searchItems.origin} - {searchItems.destination}</Text>
                                        <Text style={{color: "white", fontSize: 14}}>{searchItems.from} - {searchItems.to}</Text>
                                    </View>
                                ):(
                                    <Text style={{color: 'white', fontSize: 20, fontWeight: "bold"}}>All Flights</Text>
                                )
                            }
                        </View>
                        <View style={styles.searchIcon}>
                            <TouchableOpacity onPress={this.toggleModal}>
                                <Icon name="buffer" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingBottom: 7, paddingLeft: 10, paddingRight: 12}}>
                        {
                            flights.map((flight, i) => (
                                <TouchableOpacity key={i} style={styles.viewItem}
                                                  onPress={()=>this.props.navigation.navigate('Booking', {flightId: flight.flightId})}>
                                    <View style={styles.detailItem}>
                                        <View style={styles.timePanel}>
                                            <Text style={styles.timeText}>{flight.departure.substr(11, 5)}</Text>
                                            <Text style={styles.addressText}>{flight.destinationAirportName}</Text>
                                        </View>
                                        <View style={styles.btwPanel}>
                                            <Image source={btwIcon} style={{width: 50, height: 50, resizeMode: "contain"}}/>
                                        </View>
                                        <View style={styles.timePanel}>
                                            <Text style={styles.timeText}>{flight.arrival.substr(11, 5)}</Text>
                                            <Text style={styles.addressText}>{flight.takeoffAirportName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceItem}>
                                        <Text style={{color: 'red', fontSize: 16, fontWeight: "bold"}}>${flight.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    viewItem: {
        height: 100,
        marginTop: 7,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
        flexDirection: 'row',
    },
    detailItem: {
        height: "100%",
        width: "75%",
        borderRadius: 5,
        marginRight: 1.5,
        backgroundColor: "white",
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
    priceItem: {
        height: "100%",
        width: "25%",
        borderRadius: 5,
        marginLeft: 1.5,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchHeader: {
        backgroundColor: "#1273de",
        height: 50,
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    searchText: {
        width: "90%",
        padding: 5,
        alignItems: "center",
    },
    searchIcon: {
        width: "10%",
        paddingRight: 10,
        alignItems: "flex-end"
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: 10,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.74)',
    },
    modalContentHeader: {
        flexDirection: "row", padding: 10,
    },
    modalContentHeaderButton1: {
        height: 40, borderWidth: 2, width: "50%",
        borderRightWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#1273de",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    modalContentHeaderButton2: {
        height: 40, borderWidth: 2, width: "50%",
        borderLeftWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderColor: "#1273de",
    },
    filterItem: {
        height: 40,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },
    filterLeft: {
        width: "35%",
        justifyContent: "center",
    },
    filterRight: {
        width: "65%",
    },
});
const mapStateToProps = (state) => ({
    homeStore: state.homeReducer || "Please Wait...",
});
const mapDispatchToProps = (dispatch) => {
    return {
        setSearchItems: (items) => {
            dispatch(setSearchItems(items))
        },
        setFlights: (flights) => {
            dispatch(setFlights(flights))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

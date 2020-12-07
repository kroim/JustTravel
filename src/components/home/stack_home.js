import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import HomeScreen from './home';
import BookingScreen from './booking';

const Stack = createStackNavigator();

class HomeStack extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Booking" component={BookingScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        );
    }
}

const mapStateToProps = (state) => ({
    authStore: state.authReducer,
});
export default connect(mapStateToProps)(HomeStack);

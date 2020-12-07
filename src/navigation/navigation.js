import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './home_navigation';
import SplashScreen from '../components/splash';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Home" component={HomeNavigator} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    authStore: state.authReducer,
});
export default connect(mapStateToProps)(AppNavigator);

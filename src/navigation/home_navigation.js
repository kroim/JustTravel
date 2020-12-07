import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../components/home/stack_home';
import ProfileScreen from '../components/home/profile';
const BottomTab = createBottomTabNavigator();

class HomeNavigator extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <BottomTab.Navigator initialRouteName="HomeStack"
                                 tabBarOptions={{
                                     activeTintColor: "#6639ff",
                                     style: {
                                         borderTopWidth: 1,
                                         backgroundColor: "#ffffff",
                                         height: 50,
                                     }
                                 }}
                                 shifting={true}
                                 sceneAnimationEnabled={false}>
                <BottomTab.Screen name="Home" component={HomeStack}
                                  options={{
                                      tabBarLabel: "Home",
                                      tabBarIcon: ({color}) => (<Icon name="home" size={24} color={color} />)
                                  }}
                />
                <BottomTab.Screen name="Profile" component={ProfileScreen}
                                  options={{
                                      tabBarLabel: "Profile",
                                      tabBarIcon: ({color}) => (<Icon name="account" size={24} color={color} />)
                                  }}
                />
            </BottomTab.Navigator>
        );
    }
}

export default HomeNavigator;

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, ScrollView} from 'react-native';
import {ThemeProvider, Input, CheckBox, Button, Card} from 'react-native-elements';
import {connect} from 'react-redux';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = async () => {
    };

    render(){
        return (
            <ThemeProvider>
                <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "#ffffff"}}>
                    <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 24}}>Profile Page</Text>
                    <Text>Coming soon...</Text>
                </ScrollView>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({

});
const mapStateToProps = (state) => ({
    authStore: state.authReducer || "Please Wait...",
    homeStore: state.homeReducer || "Please Wait...",
});
const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

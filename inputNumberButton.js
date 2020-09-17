import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
//import { TouchableOpacity } from 'react-native-web';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import Button from "react-uwp/Button";

export default class InputNumberButton extends Component {
    renderOptionalComponent(icon, value, fontSize){
        if(icon){
            return icon;
        }else{
            return <Text style={styles.text}>{value}</Text>;
        }
        
    }

    render() {
        const { value, handleOnPress, specialColor, icon, style, fontSize } = this.props;
        return (
            <UWPThemeProvider
                theme={getTheme({
                    themeName: "dark", // set custom theme
                    accent: "#0078D7", // set accent color
                    useFluentDesign: true, // sure you want use new fluent design.
                    //desktopBackgroundImage: "http://127.0.0.1:8092/staticimages/jennifer-bailey-10753.jpg" // set global desktop background image
                })}
            >
                <Button
                    //style={styles.container}
                    style={styles.container, style?style:{ width: '100%', height: '100%', borderWidth: 1, borderColor: '#28292B', backgroundColor: specialColor?specialColor:'#222120'}}
                    onClick={() => handleOnPress(value)}
                    >
                    {this.renderOptionalComponent(icon,value, fontSize)}
                </Button>
            </UWPThemeProvider>
            // <TouchableOpacity 
            // style={styles.container}
            // onPress={()=> handleOnPress(value)}>
            //     <Text style={styles.text}>{value}</Text>
            // </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
        backgroundColor: '#464446',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1
    },
    text: {
        color: 'white',
        fontSize: 16
    }
});

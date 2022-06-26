import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { color } from '../models/colors'
import { Styles } from '../models/styles'


export default props => {

    buttonStyle = [styles.container]

    if (props.color) {
        const cBack = StyleSheet.create({ colorB: { backgroundColor: props.color } })
        buttonStyle.push(cBack.colorB)
    }

    textStyle = [styles.textButton]

    if ( props.iconWhite ) {             
        colorIcon = styles.colorWhite.color
        textStyle.push(styles.colorWhite)
    } else {
        colorIcon = styles.colorBlack.color
        textStyle.push(styles.colorBlack)
    }

    let type = 'material'
    if (props.type) { type = props.type }

    return (
        <TouchableOpacity style={buttonStyle} onPress={() => props.onClick(props.title)}>
            <View>
                { props.icon ?
                    <View style={styles.iconView}>
                        <Icon style={styles.icon}
                            size={styles.icon.fontSize}
                            color={colorIcon}
                            name={props.icon}
                            type={type}
                        /> 
                        { props.name ? 
                            <Text style={[textStyle, {marginLeft: 10}]}>
                                {props.name}
                            </Text>
                            : null 
                        }
                    </View>
                :   
                    <Text style={textStyle}>
                        {props.title}
                    </Text>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.app_Back,
        margin: 4,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: color.button_Border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        color: color.button_TextBlack,
        fontSize: 26,
        fontWeight: 'bold',
    },

    icon: {
        fontSize: 24,
        justifyContent: 'center',  
        alignItems: 'center', 
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',  
        alignItems: 'center', 
    },

    colorWhite: {
        color: color.button_TextWhite,
    },
    colorBlack: {
        color: color.button_TextBlack,
    },
})

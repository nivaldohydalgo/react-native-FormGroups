/*=================================================================
Component:   EXIBIÇÃO DE BUTTON SIMPLES
                      ****** PRONTO ******
==================================================================*/

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements'

export default props => {

    colorIcon = styles.buttonBlack.color
    if (props.color) {
        colorIcon = props.color
    }

    let size = 36
    if (props.size) { size = props.size }

    let type = 'material'
    if (props.type) { type = props.type }

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onClick(props.title)}>
            <View>
                <View style={styles.iconView}>
                    { props.raised 
                    ? 
                        <Icon style={styles.icon}
                            raised
                            size={size}
                            type={type}
                            color={colorIcon}
                            name={props.icon}
                        /> 
                    : 
                        <Icon style={styles.icon}
                            size={size}
                            type={type}
                            color={colorIcon}
                            name={props.icon}
                        /> 
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        margin: 2,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonBlack: {
        color: '#000000',
    },

    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',  
        alignItems: 'center', 
    },

    icon: {
        justifyContent: 'center',  
        alignItems: 'center', 
    },
})

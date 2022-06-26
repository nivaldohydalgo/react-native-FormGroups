import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import { Icon } from 'react-native-elements'

export default props => {

    return (
        <View style={styles.container}>
            { props.type === 0 || props.type === 1
                ?
                <Icon style={styles.iconMargin}
                    name={'male'}
                    type={'font-awesome'}
                    size={20}
                    color={'#1976D2'}
                />
                :
                null
            }
            { props.type === 0 
                ? <View style={styles.divider}></View> 
                : null
            }
            { props.type === 0 || props.type === 2
                ?
                <Icon style={styles.iconMargin}
                    name={'female'}
                    type={'font-awesome'}
                    size={20}
                    color={'#FF1493'}
                />
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconMargin: {
        marginHorizontal: 3,
    },

    divider: {
        width: 8,
    }
})

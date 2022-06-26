/*==================================================================================
/* Object:  EXIBIÇÃO DA LISTA DE GRUPOS GERADA E COMPARTILHAMENTO   **** PRONTO ****                        
/*----------------------------------------------------------------------------------
/* VRS001-12/07/2019-NIVALDO-Implantacao                           
==================================================================================*/

import React, { Component } from 'react';
import { Share, StyleSheet, ScrollView, Text, View, TouchableOpacity, Linking } from 'react-native';

import { Icon } from 'react-native-elements'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5'

import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'
import { Styles } from './models/styles'

const ws = {
    lang: langBR,
}

class ViewListScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('viewListHeaderTitle', ''),
        };
    };

    constructor(props) {
        super(props);

        this.state = { 
            textAll: '...', 
            textWatts: '...',
        }
    }

    componentDidMount() { 
        const { navigation } = this.props
        this.setState({ 
            textAll:   navigation.getParam('textAll', '...'), 
            textWatts: navigation.getParam('textWatts', '...'),
        })

        const language = navigation.getParam('language', 'us')
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ viewListHeaderTitle: ws.lang.viewList_Header })
            }
        )        
    }    

    pressShareWatts = () => {
        this.shareToWhatsApp(this.state.textWatts)
    }

    shareToWhatsApp = (text) => {
        Linking.openURL(`whatsapp://send?text=${text}`);
    }

    onShareAll = async () => {
        try {
            const result = await Share.share({
                message: this.state.textAll
            });
            // if (result.action === Share.sharedAction) {
            //     if (result.activityType) {
            //     // shared with activity type of result.activityType
            //     } else {
            //     // shared
            //     }
            // } else if (result.action === Share.dismissedAction) {
            //     // dismissed
            // }
        } catch (error) {
            alert(error.message);
        }
    }    

    render() {
        return (
            <View style={Styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.text}>{this.state.textAll}</Text>
                    </View>
                    <View style={{ height: 100 }}>
                    </View>
                </ScrollView>

                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onPress={this.onShareAll} 
                    style={[ Styles.TouchableOpacityStyleLeft, { backgroundColor: color.button_Help, } ]}
                >
                    <Icon name='share' 
                        size={30} 
                        color={color.app_Back} 
                    />    
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onPress={this.pressShareWatts} 
                    style={[ Styles.TouchableOpacityStyleRight, { backgroundColor: color.button_Execute, } ]}
                >
                    <IconFontAwesome name='whatsapp' 
                        type='font-awesome'
                        size={30} 
                        color={color.app_Back} 
                    />     
                </TouchableOpacity>

            </View>
        );
    }
}

export default ViewListScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'left',
        margin: 8,
    },

});

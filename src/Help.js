import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux'

import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
}

class HelpScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('helpHeaderTitle', ''),
        };
    };

    constructor(props) {
        super(props)

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ helpHeaderTitle: ws.lang.helpTitleNavigation })
            }
        )        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    { ws.lang.helpMadeBy }
                </Text>
                <Text style={styles.nameProducer}>
                    NHsoftware
                </Text>
                <Text>
                    { ws.lang.helpCityCountry }
                </Text>
                <Text>
                    nhsoftware.com.br
                </Text>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    language: store.appStore.language
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HelpScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.app_Back,
    },
    nameProducer: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
    },
});

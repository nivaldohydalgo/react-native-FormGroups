import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux'

import { color } from './models/colors'
import { Styles } from './models/styles'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

import Button from './components/Button'

const ws = {
    lang: langBR,
}

class MenuGroupScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('menuGroupHeaderTitle', ''),
        };
    };

    constructor(props) {
        super(props);

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                if ( this.props.appStore.language === 'us' ) {
                    ws.lang = langUS
                } else {
                    ws.lang = langBR
                }
                this.props.navigation.setParams({ menuGroupHeaderTitle: ws.lang.menuGroup_Header })
            }
        )        
    }

    render() {
      return (
        <View style={Styles.container}>
            <View style={styles.boxSeparator}>
            </View>

            <View style={styles.boxNameGroup}>

                <Text style={styles.textNameGroup}>
                    {this.props.appStore.groups[this.props.appStore.indGroup].nameGroup}
                </Text>

                <Text style={styles.textDetail}>
                    { this.props.appStore.groups[this.props.appStore.indGroup].qtRecords }
                    { this.props.appStore.language === 'us' 
                        ? langUS.recordsOf 
                        : langBR.recordsOf }
                    { this.props.appStore.groups[this.props.appStore.indGroup].qtMembers + ' ' } 
                    { this.props.appStore.groups[this.props.appStore.indGroup].pluralName }
                </Text>
                <Text style={styles.textDetail}>
                    { this.props.appStore.groups[this.props.appStore.indGroup].qtActive }
                    { this.props.appStore.language === 'us' 
                        ? langUS.active 
                        : langBR.active }
                </Text>

            </View>

            <View style={styles.boxSeparator}>
            </View>

            <View style={styles.boxHome}>
                <Button title='Lista' 
                    icon='list-alt' 
                    type='font-awesome'
                    name={ ws.lang.menuGroup_ListOf + this.props.appStore.groups[this.props.appStore.indGroup].pluralName }
                    color={color.color_Yellow}
                    onClick={() => this.props.navigation.navigate('ListMembers')} 
                />
            </View>

            <View style={styles.boxHome}>
                <Button title='Forma' 
                    icon='users' 
                    type='font-awesome'
                    name={ ws.lang.menuGroup_Forming }
                    color={color.color_Green}
                    onClick={() => this.props.navigation.navigate('FormGroup')} 
                />
            </View>

            <View style={styles.boxSeparator}>
            </View>

        </View>
      );
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuGroupScreen)

const styles = StyleSheet.create({
    boxSeparator: {
        flex: 1,
    },

    boxNameGroup: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxHome: {
        flex: 2,
        justifyContent: 'space-between',
        margin: 14,
    },

    textNameGroup: {
        fontSize: 30,
        fontWeight: 'bold',
        color: color.edit_LabelText,        
    },

    textDetail: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.edit_LabelNote,
    },
});

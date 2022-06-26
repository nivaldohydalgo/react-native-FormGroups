import React, { Component } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'
import { groupSelected } from './actions/actions'

import Icon from 'react-native-vector-icons/FontAwesome5';

import Button from './components/Button'
import { color } from './models/colors'
import { langBR } from './models/languageBR'
import { langUS } from './models/languageUS'

const ws = {
    lang: langBR,
}

class ListGroupsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('listGroupsHeaderTitle', ''),
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
                this.props.navigation.setParams({ listGroupsHeaderTitle: ws.lang.listGroups_Header })
            }
        )        
    }

    componentDidMount() { 
        console.log('ListGroups.js> Executando componentDidMount() *** VRS001 ***')
        console.log('ListGroups.js> this.props.appStore.groups.length: ' + this.props.appStore.groups.length)

        this.props.appStore.groups
    }

    pressSelect = (id) => {
        this.props.groupSelected( id )
        this.props.navigation.navigate('MenuGroup')
    }

    pressNewGroup = () => {
        this.props.groupSelected( 0 )
        this.props.navigation.navigate('EditGroup', {
            title: ws.lang.listGroups_NewGroup,
            typeEdit: 'I'
        })
    }

    pressEdit = (id) => {
        this.props.groupSelected( id )
        this.props.navigation.navigate('EditGroup', {
            title: ws.lang.listGroups_EditGroup,
            typeEdit: 'E',

        })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.boxList}>
                    <SafeAreaView>
                        <FlatList 
                            data={this.props.appStore.groups}
                            extraData={this.state}
                            keyExtractor={item => String(item.id)}
                            renderItem={( {item} ) => {
                                return (
                                    <View style={styles.boxItem}>
                                        <View style={styles.boxMember}>
                                            <TouchableOpacity style={styles.viewMember}
                                                onPress={() => this.pressSelect(item.id)}>
                                                <View style={styles.viewName}>
                                                    <Text style={styles.nameGroup}>
                                                        {item.nameGroup}
                                                    </Text>
                                                </View>
                                                <View style={styles.viewDetail}>
                                                    <Text style={styles.textDetail}>
                                                        { item.qtRecords }    
                                                        { this.props.appStore.language === 'us' 
                                                            ? langUS.recordsOf 
                                                            : langBR.recordsOf }
                                                        { item.qtMembers + ' ' }
                                                        { item.pluralName }
                                                        { ' (' + item.qtActive }
                                                        { this.props.appStore.language === 'us' 
                                                            ? langUS.active + ')' 
                                                            : langBR.active + ')'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.viewButtons}>
                                                <Icon name='edit' 
                                                    size={26} 
                                                    color={color.icon_Blue} 
                                                    regular
                                                    onPress={() => this.pressEdit(item.id)} 
                                                />   
                                                <View style={{ margin: 8 }}></View> 
                                            </View>
                                        </View>
                                        <View style={styles.divider}></View>
                                    </View>  
                                )
                            }}
                        />
                    </SafeAreaView>
                </View>

                <View style={styles.boxButton}>
                    <Button title={ws.lang.listGroups_ButtonNew}  
                            icon='users'
                            type='font-awesome' 
                            name={ws.lang.listGroups_ButtonNew} 
                            color={color.color_Blue} 
                            onClick={() => this.pressNewGroup()} 
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = store => ({
    appStore: store.appStore,    
});

const mapDispatchToProps = {
    groupSelected,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListGroupsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.app_Back,
    },

    boxList: {
        flex: 80,
        margin: 3,
        marginVertical: 12,
        backgroundColor: color.app_Back,
    },

    boxButton: {
        flex: 12,
        backgroundColor: color.app_Back,
    },

    boxItem: {
        margin: 2,
        justifyContent: 'space-between',  
    },

    boxMember: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',  
    },

    divider: {
        height: 1,
        backgroundColor: color.color_Divider,
        justifyContent: 'space-between',         
    },

    viewMember: {
        margin: 4,
        justifyContent: 'flex-start'
    },

    viewButtons: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 8,
    },

    viewName: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    nameGroup: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color.button_TextBlack,
    },

    viewDetail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    textDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelNote,
    },

})
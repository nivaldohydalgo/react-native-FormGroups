import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { connect } from 'react-redux'
import { updateFormAddNumber, 
    updateFormSubtractNumber, 
    updateFormShowResponsible,
    updateFormDescriptionType, } from './actions/actions'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { CheckBox } from 'react-native-elements'

import Button from './components/Button'
import { color } from './models/colors'
import { Styles } from './models/styles'

class FormGroupScreen extends Component {
    static navigationOptions = {
        title: 'Formação dos Grupos',
    }; 

    constructor(props) {
        super(props)
        this.state = { 
            primeGroup: '',
        };

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.setState({ 
                    primeGroup: this.props.appStore.groups[this.props.appStore.indGroup].freeDescription[0].name 
                })
            }
        )        
    }


    componentDidMount() { 
    }

    /*-- Funções para edição do Titulo dos Grupos --*/
    /*----------------------------------------------*/

    pressEditTitle = () => {
        console.debug('FormGroups.js> Executando pressEditTitle')
        this.props.navigation.navigate('TitleGroups')
    }

    /*-- Funções da edição da quantidade de grupos --*/
    /*-----------------------------------------------*/

    addNumberGroup = () => {
        console.debug('FormGroups.js> addNumberGroup')
        this.props.updateFormAddNumber()
    }

    subtractNumberGroup = () => {
        console.debug('FormGroups.js> subtractNumberGroup')
        this.props.updateFormSubtractNumber()
    }

    /*-- Funções de seleção do mostra responsável --*/
    /*----------------------------------------------*/

    selectShowResponsible = () => {
        console.debug('FormGroups.js> selectShowResponsible')
        this.props.updateFormShowResponsible()
    }

    /*-- Funções de seleção do tipo de descrição --*/
    /*---------------------------------------------*/

    selectDescriptionType = (t) => {
        console.debug('FormGroups.js> selectDescriptionType: ' + t)
        if ( this.props.appStore.groups[this.props.appStore.indGroup].typeForm != t ) {
            this.props.updateFormDescriptionType(t)
            this.setState({ 
                primeGroup: this.props.appStore.groups[this.props.appStore.indGroup].freeDescription[0].name 
            })
        }
    }

    /*-- Funções para edição das Descrições --*/
    /*----------------------------------------*/

    pressEditDescription = () => {
        console.debug('FormGroups.js> Executando pressEditDescription')
        if ( this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 4 ) {
            this.props.navigation.navigate('DescriptionFree')
        } else {
            this.props.navigation.navigate('InitialDate')
        }
    }

    /*-- Funções para Executar o SORTEIO --*/
    /*-------------------------------------*/

    pressExecute = () => {
      console.debug('FormGroups.js> Executando pressExecute')
        this.props.navigation.navigate('ListForm')
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.boxPage}>
                    <ScrollView>

                        {/*-- Exibir e botão de Editar - TITULO DOS GRUPOS --*/}
                        <View style={[Styles.viewItem, { marginTop: 2,} ]}>
                            <Text style={Styles.inputLabel}>TITULO DOS GRUPOS</Text>
                            <View style={Styles.flexDirectionRow}>
                                <View style={Styles.flexUm}>
                                    <Text style={Styles.showText}>
                                        {this.props.appStore.groups[this.props.appStore.indGroup].titleForm}
                                    </Text>
                                </View>
                                <View style={Styles.viewIconRight}>
                                    <Icon name='edit' 
                                        size={30} 
                                        color={color.icon_Blue} 
                                        regular
                                        onPress={() => this.pressEditTitle()} 
                                    />    
                                </View>
                            </View>
                        </View>

                        {/*-- Exibir e botões de Editar - QUANTIDADE DE GRUPOS --*/}
                        <View style={[Styles.viewItem, { marginTop: 2,} ]}>
                            <View style={Styles.viewTitle}>
                                <Text style={Styles.inputLabel}>QUANTIDADE DE GRUPOS</Text>
                            </View>
                            <View style={Styles.viewShowNumber}>
                                <View style={Styles.viewButtonNumberLeft}>
                                    <Icon name='minus-circle' 
                                        size={32} 
                                        color={color.icon_Red} 
                                        onPress={() => this.subtractNumberGroup()} 
                                    />    
                                </View>
                                <View style={Styles.viewValueNoEditable}>
                                    <Text style={Styles.textValueNumber}>
                                        {this.props.appStore.groups[this.props.appStore.indGroup].numberForm}
                                    </Text>
                                </View>
                                <View style={Styles.viewButtonNumberRight}>
                                    <Icon name='plus-circle'
                                        size={32} 
                                        color={color.icon_Blue} 
                                        onPress={() => this.addNumberGroup()} 
                                    />    
                                </View>
                            </View>
                        </View>

                        {/*-- Exibir e checkbox para alterar - RESPONSÁVEL PELO GRUPO --*/}
                        <View style={[Styles.viewItem, { marginTop: 2,} ]}>
                            <View style={Styles.viewTitle}>
                                <Text style={Styles.inputLabel}>RESPONSÁVEL PELO GRUPO</Text>
                            </View>
                            <View>
                                <CheckBox
                                    center
                                    size={24}
                                    title='Marcar responsável'
                                    containerStyle={styles.styleCheckBox}
                                    textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                    checked={this.props.appStore.groups[this.props.appStore.indGroup].showResponsible}
                                    onPress={() => this.selectShowResponsible()}
                                />
                            </View>
                        </View>






                        {/*-- Exibir e checkboxs para alterar - DESCRIÇÃO ADICIONAL --*/}
                        <View style={[Styles.viewItem, { marginTop: 2,} ]}>
                            <View style={Styles.viewTitle}>
                                <Text style={Styles.inputLabel}>DESCRIÇÃO ADICIONAL DO GRUPO</Text>
                            </View>
                            <View style={styles.viewValueDescription}>
                                <View style={{ justifyContent: 'center', }}>
                                    <CheckBox
                                        title='Sem descrição'
                                        containerStyle={styles.styleCheckBox}
                                        textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                        checked={(this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 0)}
                                        onPress={() => this.selectDescriptionType(0)}
                                    />
                                    <CheckBox
                                        title='Descrição livre'
                                        containerStyle={styles.styleCheckBox}
                                        textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                        checked={(this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 4)}
                                        onPress={() => this.selectDescriptionType(4)}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <CheckBox
                                        title='Diário'
                                        containerStyle={styles.styleCheckBox}
                                        textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                        checked={(this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 1)}
                                        onPress={() => this.selectDescriptionType(1)}
                                    />
                                    <CheckBox
                                        title='Semanal'
                                        containerStyle={styles.styleCheckBox}
                                        textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                        checked={(this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 2)}
                                        onPress={() => this.selectDescriptionType(2)}
                                    />
                                    <CheckBox
                                        title='Mensal'
                                        containerStyle={styles.styleCheckBox}
                                        textStyle={{ fontSize: 16, color: color.edit_LabelNote }}
                                        checked={(this.props.appStore.groups[this.props.appStore.indGroup].typeForm == 3)}
                                        onPress={() => this.selectDescriptionType(3)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/*-- Exibir o primeiro grupo e Icon  para alterar - DESCRIÇÃO ADICIONAL --*/}
                        { this.props.appStore.groups[this.props.appStore.indGroup].typeForm > 0
                            ? 
                                <View style={styles.viewFirstGroup}>
                                    <View style={Styles.viewTitle}>
                                        <Text style={Styles.inputLabel}>PRIMEIRO GRUPO</Text>
                                    </View>
                                    <View style={styles.viewShowTitle}>
                                        <View style={styles.viewValueTitle}>
                                            <Text style={styles.textValueTitle}>
                                                {this.state.primeGroup}
                                            </Text>
                                        </View>
                                        <View style={styles.viewButtonTitle}>
                                            <Icon name='edit' 
                                                size={30} 
                                                color={color.icon_Blue} 
                                                regular
                                                onPress={() => this.pressEditDescription()} 
                                            />    
                                        </View>
                                    </View>
                                </View>
                            : null 
                        }

                    </ScrollView>
                </View>

                <View style={Styles.boxFooter}>
                    <Button title='Sortear' 
                        icon='users'
                        type='font-awesome' 
                        name='Sortear' 
                        color={color.color_Yellow} 
                        onClick={this.pressExecute} 
                    />
                </View>

            </View>
        );
    }
}

/*

            <View style={Styles.container}>
                <View style={Styles.boxPage}>
                    <ScrollView>

                        <View style={Styles.viewItem}>
                            <View style={ }>
                                <Text style={Styles.inputLabel}>TITULO DOS GRUPOS</Text>
                            </View>
                            <View style={styles.flexDirectionRow}>
                                <View style={styles.viewValueTitle}>
                                    <Text style={styles.textValueTitle}>
                                        {this.props.appStore.titleGroups}
                                    </Text>
                                </View>
                                <View style={styles.viewButtonTitle}>
                                    <Icon name='edit' 
                                        size={30} 
                                        color={color.color_Blue} 
                                        regular
                                        onPress={() => this.pressEditTitle()} 
                                    />    
                                </View>
                            </View>
                        </View>

                        <View style={Styles.viewItem}>
                            <View style={styles.viewTitle}>
                                <Text style={styles.textTitle}>QUANTIDADE DE GRUPOS</Text>
                            </View>
                            <View style={styles.viewShowNumber}>
                                <View style={styles.viewButtonNumberLeft}>
                                    <Icon name='minus-circle' 
                                        size={32} 
                                        color={color.color_Red} 
                                        onPress={() => this.subtractNumberGroup()} 
                                    />    
                                </View>
                                <View style={styles.viewValueNumber}>
                                    <Text style={styles.textValueNumber}>
                                        {this.props.appStore.numberGroups}
                                    </Text>
                                </View>
                                <View style={styles.viewButtonNumberRight}>
                                    <Icon name='plus-circle'
                                        size={32} 
                                        color={color.color_Blue} 
                                        onPress={() => this.addNumberGroup()} 
                                    />    
                                </View>
                            </View>
                        </View>

                        <View style={Styles.viewItem}>
                            <View style={styles.viewTitle}>
                                <Text style={styles.textTitle}>RESPONSÁVEL PELO GRUPO</Text>
                            </View>
                            <View>
                                <CheckBox
                                    center
                                    size={24}
                                    title='Marcar responsável'
                                    containerStyle={styles.styleCheckBox}
                                    textStyle={{ fontSize: 16 }}
                                    checked={this.props.appStore.showResponsible}
                                    onPress={() => this.selectShowResponsible()}
                                />
                            </View>
                        </View>

                        <View style={Styles.viewItem}>
                            <View style={styles.viewTitle}>
                                <Text style={styles.textTitle}>DESCRIÇÃO ADICIONAL DO GRUPO</Text>
                            </View>
                            <View style={styles.viewValueDescription}>
                                <View style={{ justifyContent: 'center', }}>
                                    <CheckBox
                                        title='Sem descrição'
                                        containerStyle={styles.styleCheckBox}
                                        checked={(this.props.appStore.descriptionType == 0)}
                                        onPress={() => this.selectDescriptionType(0)}
                                    />
                                    <CheckBox
                                        title='Descrição livre'
                                        containerStyle={styles.styleCheckBox}
                                        checked={(this.props.appStore.descriptionType == 4)}
                                        onPress={() => this.selectDescriptionType(4)}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <CheckBox
                                        title='Diário'
                                        containerStyle={styles.styleCheckBox}
                                        checked={(this.props.appStore.descriptionType == 1)}
                                        onPress={() => this.selectDescriptionType(1)}
                                    />
                                    <CheckBox
                                        title='Semanal'
                                        containerStyle={styles.styleCheckBox}
                                        checked={(this.props.appStore.descriptionType == 2)}
                                        onPress={() => this.selectDescriptionType(2)}
                                    />
                                    <CheckBox
                                        title='Mensal'
                                        containerStyle={styles.styleCheckBox}
                                        checked={(this.props.appStore.descriptionType == 3)}
                                        onPress={() => this.selectDescriptionType(3)}
                                    />
                                </View>
                            </View>
                        </View>

                        { this.props.appStore.descriptionType > 0
                            ? 
                                <View style={styles.viewFirstGroup}>
                                    <View style={styles.viewTitle}>
                                        <Text style={styles.textTitleFirstGroup}>PRIMEIRO GRUPO</Text>
                                    </View>
                                    <View style={styles.viewShowTitle}>
                                        <View style={styles.viewValueTitle}>
                                            <Text style={styles.textValueTitle}>
                                                {this.state.primeGroup}
                                            </Text>
                                        </View>
                                        <View style={styles.viewButtonTitle}>
                                            <Icon name='edit' 
                                                size={30} 
                                                color={color.color_Blue} 
                                                regular
                                                onPress={() => this.pressEditDescription()} 
                                            />    
                                        </View>
                                    </View>
                                </View>
                            : null 
                        }

                    </ScrollView>
                </View>

                <View style={Styles.boxFooter}>
                    <Button title='Sortear' 
                        icon='users'
                        type='font-awesome' 
                        name='Sortear' 
                        color={color.color_Yellow} 
                        onClick={this.pressExecute} 
                    />
                </View>

            </View>


*/

const mapStateToProps = store => ({
    appStore: store.appStore
});

const mapDispatchToProps = {
    updateFormAddNumber, 
    updateFormSubtractNumber, 
    updateFormShowResponsible,
    updateFormDescriptionType,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormGroupScreen)

const styles = StyleSheet.create({



    viewFirstGroup: {
        marginTop: 2,
        marginHorizontal: 26,
    },

    viewShowTitle: {
        flexDirection: 'row',
    },

    viewValueTitle: { 
        flex: 1,  
        justifyContent: 'center',
        padding: 6,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: color.edit_BackNoEditable,
    },

    viewButtonTitle: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 10, 
    },

    textValueTitle: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    viewShowNumber: {
        flexDirection: 'row',
    },

    viewValueNumber: { 
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 6, 
        borderColor: '#AAAAAA',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
    },

    viewButtonNumberLeft: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginHorizontal: 14, 
    },

    viewButtonNumberRight: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginHorizontal: 14, 
    },

    textValueNumber: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },

    viewValueDescription: { 
        flexDirection: 'row',
        justifyContent: 'center',
    },

    textTitleFirstGroup: {
        fontSize: 13,
        color: '#999999',
        fontWeight: 'bold',
        textAlign: 'left',
    },

    styleCheckBox: {
        margin: 0, 
        padding: 0, 
        borderWidth: 0,
        paddingBottom: 2,
        backgroundColor: color.app_Back,
    }

});

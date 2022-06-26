/*==================================================================
Component: SELEÇÃO DE ITENS
Autor....: Nivaldo
Data.....: 20/06/2019
--------------------------------------------------------------------
V001-20/06/2019-Nivaldo-Implantação
--------------------------------------------------------------------
Importar:
        import SelectList from './components/SelectList'
Exemplo de execução:
        <SelectList 
            title='TESTE' 
            options={[
                { id: 0, name: 'Casal' },
                { id: 1, name: 'Homem' },
                { id: 2, name: 'Mulher' },
            ]}
            selected={this.state.typeState} 
            onClick={this.selectTypeMember}
        />
Parametros obrigatórios:
        options
        selected
        onClick
Parametros opcionais:
        title
Obs.: Na função callback retorna o id selecionado.
==================================================================*/

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

import { Icon } from 'react-native-elements'

export default props => {

    return (
        <View style={styles.container}>
            
            { props.title 
                ? 
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{props.title}</Text>
                </View>
            : null 
            }

            <View>
                <SafeAreaView>
                    <FlatList 
                        data={props.options}
                        keyExtractor={item => String(item.id)}
                        renderItem={( {item} ) => {
                            return (
                                <TouchableOpacity style={styles.viewTouch} onPress={() => props.onClick(item.id)}>

                                    { props.selected == item.id 
                                    ? 
                                        <Icon size={18}
                                            color='#008B00'
                                            name='radio-button-checked'
                                        /> 
                                    : 
                                        <Icon size={18}
                                            color='#B0bec5'
                                            name='radio-button-unchecked'
                                        /> 
                                    }

                                    <View style={styles.viewName}>
                                        { props.selected == item.id 
                                            ? <Text style={styles.textSelected}>{item.name}</Text> 
                                            : <Text style={styles.textDefault}>{item.name}</Text> 
                                        }
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
 //       justifyContent: 'center',
 //       backgroundColor: '#FFFF00'
    },

    viewTitle: {
 //       justifyContent: 'center',
        marginBottom: 2,
    },

    textTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    viewTouch: {
        marginVertical: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    viewName: {
        marginLeft: 6,
    },

    textSelected: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    textDefault: {
        fontSize: 18,
    },

})
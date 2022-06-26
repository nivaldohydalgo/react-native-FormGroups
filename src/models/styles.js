import { StyleSheet } from 'react-native';

import { color } from './colors'

export const Styles = StyleSheet.create({

    /*-----------------------------------------
    /*           STYLES DE PAGINA
    /*---------------------------------------*/

    container: {
        flex: 1,
        backgroundColor: color.app_Back,
    },

    boxPage: {
        flex: 80,
        justifyContent: 'flex-start',
        marginBottom: 14,
    },

    boxFooter: {
        flex: 12,
        margin: 4,
        flexDirection: 'row',
    },

    /*-----------------------------------------
    /*           STYLES DE ICONES
    /*---------------------------------------*/










    /*==============================================================================================*/



    /*-- Estilos de Text e Input --*/
    /*-----------------------------*/

    inputLabel: {
        marginTop: 10,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.edit_LabelText,
    },

    inputText: {
        justifyContent: 'space-between',
        fontSize: 20,
        marginHorizontal: 7,
        paddingHorizontal: 12,
        color: color.edit_LabelText,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: color.edit_BackEditable,
    },

    inputNote: {
        marginTop: 2,
        marginLeft: 8,
        marginBottom: 2,
        fontSize: 12,
        fontWeight: 'bold',
        color: color.edit_LabelNote,
    },

    showText: {
        fontWeight: 'bold',
        justifyContent: 'space-between',
        padding: 10,
        fontSize: 20,
        marginHorizontal: 7,
        paddingHorizontal: 12,
        color: color.edit_LabelText,
        borderColor: color.edit_Border,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: color.edit_BackNoEditable,
    },

    /*-- Estilos do FlatList --*/
    /*-------------------------*/

    boxItemFlat: {
        margin: 2,
        justifyContent: 'space-between',  
    },

    itemFlatList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',  
    },

    dividerFlat: {
        height: 1,
        backgroundColor: color.color_Divider,
        justifyContent: 'space-between',         
    },

    viewDataFlat: {
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 8,
        marginRight: 4,
    },

    viewTitleFlat: {
        marginTop: 3,
    },

    textTitleFlat: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    viewDetailFlat: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },

    viewIconLeft: {
        marginLeft: 10,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewIconRight: {
        marginLeft: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /*-- Estilos do - N + --*/
    /*----------------------*/

    viewItem: {
        marginTop: 6,
        marginHorizontal: 6,
    },

    viewTitle: {
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewShowNumber: {
        flexDirection: 'row',
    },

    viewValueNumber: { 
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 6, 
        borderColor: color.button_Border,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: color.edit_BackEditable,
    },

    viewValueNoEditable: { 
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 6, 
        borderColor: color.button_Border,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: color.edit_BackNoEditable,
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
        color: color.edit_LabelText,
        fontSize: 20,
        fontWeight: 'bold',
    },

    /*-- Estilos Diversos --*/
    /*----------------------*/

    flexDirectionRow: {
        flexDirection: 'row',
    },

    flexUm: {
        flex: 1,
    }, 

    /*-- Buttons Flutuantes Esquerda e Direita --*/
    /*-------------------------------------------*/

    TouchableOpacityStyleLeft:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: color.button_Basic,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 20,
    },
     
    TouchableOpacityStyleRight:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: color.button_Basic,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
    },

})
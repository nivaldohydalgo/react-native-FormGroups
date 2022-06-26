import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from "react-navigation";

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-community/async-storage'

import HomeScreen from './Home'
import HelpScreen from './Help'
import ConfigAppScreen from './ConfigApp'

import ListGroupsScreen from './ListGroups'
import EditGroupScreen from './EditGroup'
import MenuGroupScreen from './MenuGroup'

import ListMembersScreen from './ListMembers'

/*----------------------------------------------------------*/

import FormGroupScreen from './FormGroup'
// import ConfigGroupScreen from './ConfigGroup'
import EditMemberScreen from './EditMember'
import ListFormScreen from './ListForm'
import ViewListScreen from './ViewList'
import TitleGroupsScreen from './TitleGroups'
import InitialDateScreen from './InitialDate'
import DescriptionFreeScreen from './DescriptionFree'
import EditDescriptionScreen from './EditDescription'

import reducers from './reducers/reducers'

const persistConfig = {
    key: 'naah-formgroups',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer( persistConfig, reducers )

const store = createStore( persistedReducer ) 
const persistor = persistStore(store)

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Help: HelpScreen,
        ConfigApp: ConfigAppScreen,  

        ListGroups: ListGroupsScreen,
        EditGroup: EditGroupScreen,


        
        ListForm: ListFormScreen,
        FormGroup: FormGroupScreen,
        ListMembers: ListMembersScreen,
        // ConfigGroup: ConfigGroupScreen,
        EditMember: EditMemberScreen,
        ViewList: ViewListScreen,
        TitleGroups: TitleGroupsScreen,
        InitialDate: InitialDateScreen,
        DescriptionFree: DescriptionFreeScreen,
        EditDescription: EditDescriptionScreen,
        MenuGroup: MenuGroupScreen,
    },
    {
        initialRouteName: "Home"
    }
);
  
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        );
    }
}

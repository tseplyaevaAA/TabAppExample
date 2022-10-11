import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './tae_app/screens/ProfileScreen';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userDataReducer from './redux/userDataReducer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimationScreen from './tae_app/screens/AnimationScreen';
import NewsScreen from './tae_app/screens/NewsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKGROUND_COLOR, TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR } from './tae_app/styles/color';
import { StyleSheet } from 'react-native';
import { ANIMATION_TAB, NEWS_TAB, PROFILE_TAB } from './tae_app/utility/strings';
import { USER_DATA, USER_DATA_DEFAULT } from './tae_app/utility/constants';
import { setUserData } from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const AppWrapper = () => {
  const rootReducer = combineReducers({ userDataReducer });
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getUserData()
  },[]);

  async function getUserData() {
    let userData = await AsyncStorage.getItem(USER_DATA)
    if (userData !== null){
      dispatch(setUserData(JSON.parse(userData)))
    } else {
      dispatch(setUserData(USER_DATA_DEFAULT))
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={PROFILE_TAB}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon:
            ({ focused, color, size }) => {
              let iconColor = focused ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR
              let iconSize = 30
              if (route.name === PROFILE_TAB) {
                return <Ionicons name={'person-circle-outline'} size={iconSize} color={iconColor} />;
              }
              if (route.name === ANIMATION_TAB) {
                return <Ionicons name={'rocket-outline'} size={iconSize} color={iconColor} />;
              }
              if (route.name === NEWS_TAB) {
                return <Ionicons name={'newspaper-outline'} size={iconSize} color={iconColor} />;
              }
            },
          tabBarActiveTintColor: TAB_ACTIVE_COLOR,
          tabBarInactiveTintColor: TAB_INACTIVE_COLOR,
          tabBarLabelStyle: styles.tabTextStyle,
          tabBarStyle: styles.tabBarStyle
        })} >
        <Tab.Screen name={PROFILE_TAB} component={ProfileScreen} />
        <Tab.Screen name={ANIMATION_TAB} component={AnimationScreen} />
        <Tab.Screen name={NEWS_TAB} component={NewsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  tabTextStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: '4%'
  },
  tabBarStyle: {
    height: '8%',
    paddingVertical: '1%',
    backgroundColor: BACKGROUND_COLOR
  }

});

export default AppWrapper;

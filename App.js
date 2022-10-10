import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './tae_app/screens/ProfileScreen';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import taskTypeReducer from './redux/taskTypeReducer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimationScreen from './tae_app/screens/AnimationScreen';
import NewsScreen from './tae_app/screens/NewsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR } from './tae_app/styles/color';
import { StyleSheet } from 'react-native';
import { ANIMATION_TAB, NEWS_TAB, PROFILE_TAB } from './tae_app/utility/strings';

//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppWrapper = () => {
  const rootReducer = combineReducers({ taskTypeReducer });
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
  });

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
    backgroundColor: '#e2f4ff'
  }

});

export default AppWrapper;

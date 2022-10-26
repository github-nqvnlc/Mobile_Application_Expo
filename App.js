import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Intro from './app/screens/intro';
import Trip from './app/screens/Trips/Trips';
import TripDetail from './app/screens/Trips/TripDetail';
import TripProvider from './app/contexts/TripProvider';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  }

  useEffect(() => {
    // findUser();
    AsyncStorage.clear();
  }, [])

  const Render_trip = (props) => <Trip {...props} user={user} />
  const RenderExpenses = (props) => <Expenses {...props} />
  if (!user.name) return <Intro onfinish={findUser} />;
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="All trips" component={Render_trip} />
          <Stack.Screen name="Trip Detail" component={TripDetail} />
          
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

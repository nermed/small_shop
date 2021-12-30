/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import * as React from 'react';
 import { Button, View, StyleSheet } from 'react-native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import { NavigationContainer } from '@react-navigation/native';
 
 function HomeScreen({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button
         onPress={() => navigation.navigate('Notifications')}
         title="Go to notifications"
       />
     </View>
   );
 }
 
 function NotificationsScreen({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button onPress={() => navigation.goBack()} title="Go back home" />
     </View>
   );
 }
 
 const Drawer = createDrawerNavigator();
 
function App() {
   return (
     <NavigationContainer>
       <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={HomeScreen} />
         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
       </Drawer.Navigator>
     </NavigationContainer>
   );
 }

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

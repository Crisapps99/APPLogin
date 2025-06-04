import { StatusBar} from "expo-status-bar"; 
import {Button, StyleSheet, Text, View} from "react-native";
import { AuthProvider, useAuth } from './assets/App/context/authContext';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Home from './assets/App/screens/Home';
import Login from './assets/App/screens/Login';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
export const Layout =() =>{
  const{authState, onLogout} = useAuth();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ?(
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) =>({
              headerRight:()=>(
                <Button
                onPress={async()=>{
                  await onLogout?.();
                  navigation.reset({
                    index:0,
                    routes:[{name:'Login'}],
                  });
                }}title="Sign Out"
                />
              ),
            })}
            />
        ):(
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};


import {View, Text, ScrollView,} from "react-native";
import REact,{useEffect, useState} from "react";
import axios from "axios";
import { API_URL } from "../context/authContext";
import { useAuth } from "../context/authContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";

//definimos los nomrbes y sus parametros
type RootStackParamList={
    Login: undefined;
    Home: undefined;
}

const Home =() =>{
    const [users, setUsers] = useState<any[]>([]);
    const {authState, onLogout} = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    //autenticacion de usuario para ingresar al home 
    useEffect(()=>{
        if(!authState?.authenticated){
            //si no esta autenticado me redirije al login 
            navigation.reset({
                index:0,
                routes: [{ name:"Login"}],
            });
        }
    },[authState])


    useEffect(() =>{
        const loadUser = async () =>{
            try{
                const result = await axios.get(`${API_URL}/users`);
                setUsers(result.data);
            }catch(e: any){
                alert(e.message);
            }
        };
        if(authState?.authenticated){
            loadUser();
        }
    },[authState]);

    return (
        <ScrollView>
            {users.map((user)=>(
                <Text key={user._id}>{user._id}</Text>
            ))}
        </ScrollView>
    );
};
export default Home;


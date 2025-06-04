import {View, Image,Button,StyleSheet,TextInput,Text} from 'react-native';
import React,{useEffect,useState} from 'react';
import { API_URL, useAuth } from '../context/authContext';
import axios from "axios";

const Login = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const {onLogin, onRegister} = useAuth();

    const login = async () =>{
        const result = await onLogin!(email, password);
        if(result && result.error){
            alert(result.msg);
        }
    };

    //llamamos automaticamente el login despues del registro exitoso

    const register = async () =>{
        const result = await onRegister!(email, password);
        if(result&& result.error){
            alert(result.msg);
        }else{
            login();
        }
    };

    return(
        <View style={styles.container}>
            <Image source={
               {uri: 'https://webhistorico.epn.edu.ec/wp-content/ploads/2022/08/log-epn-vertical-png'}
                } style={styles.image}/>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Correo'
                    onChangeText={(text: string)=> setEmail(text)} value={email}/>
                <TextInput style={styles.input} placeholder='Contraseñasss'
                    secureTextEntry={true}
                    onChangeText={(text: string)=> setPassword(text)} value={password}/>
                <Button onPress={login} title='Iniciar Sesión'/>
                <Button onPress={register} title="Crear una cuenta"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image:{
        width:'50%',
        height: '50%',
        resizeMode:'contain',
    },
    form:{
        gap:10,
        width:'60%',
    },
    input:{
        height:44,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
    },
    container:{
        alignItems: 'center',
        width:'100%',
    }
});
export default Login;

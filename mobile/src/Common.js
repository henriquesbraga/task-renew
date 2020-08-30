import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios'
                        ? 'http://localhost:3333'
                        : 'http://192.168.1.70:3333'

function showError(err){
    if(err.response && err.response.data){
        Alert.alert('Ocorreu um erro: ', `Mensagem: ${err.response.data}`)
    }
    else {
        Alert.alert('Ocorreu um erro: ', `Mensagem: ${err}`)
    }
}


function showSucces(msg){
    Alert.alert( `Sucesso: ${msg}`)
}

export { server, showError, showSucces}
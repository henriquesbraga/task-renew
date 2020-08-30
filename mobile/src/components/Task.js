import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import commonStyles from '../CommonStyles';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-gesture-handler/Swipeable';



const Task = (props) => {

    const [doneOrNotStyle, setDoneOrNotStyle] = useState(props.doneAt != null ?
                                                {textDecorationLine: 'line-through'} : {})
    
    const [date, setDate] = useState(props.doneAt ? props.doneAt : props.estimateAt)
    const [formattedDate, setFormattedDate] = useState( moment(date).locale('pt-br').format('ddd, D [de] MMMM'))


    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF'/>
            </TouchableOpacity>
        )
    }

    
    const getLeftContent = () => {
        return (
            <TouchableOpacity style={styles.left}>
                <Icon name="trash" size={20} color='#FFF' style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </TouchableOpacity>
        )
    }



    return(
        <Swipeable renderRightActions={getRightContent}
                    renderLeftActions={getLeftContent}
                    onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>

            <View style={styles.container}>
                
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)/*Função vinda por parametro recebendo id e jogando de volta para quem chamou*/}> 
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

            </View>
        </Swipeable>
        
    );
}

function getCheckView(doneAt){

    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name='check'
                    size={20}
                    color='#fff'></Icon>
            </View>
        ); 
    }
    else {
        return(
            <View style={styles.pending}>
                
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: '#AAA',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        marginVertical: 1,
        marginHorizontal: 1
    },
    checkContainer:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center', //alinha no eixo principal
        justifyContent: 'center', //alinha no eixo secundário
        borderColor: '#000',
        borderWidth: 1
    },
    desc:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 1,
        marginHorizontal: 1
    },
    left:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 1,
        marginHorizontal: 1
    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    excludeIcon:{
        marginLeft: 10
    }
})

export default Task;
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Header from "../../components/header";
import {Calendar} from 'react-native-calendars';
import { heightToDP, widthToDP } from "../../../services/utils";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { updateLayOff } from "../../../services/setters";
import { AppContext } from "../../../services/appContext";
import { getStudent } from "../../../services/getters";



const LayOffScreen = ({route}) => {
    const { player } = route.params;
    const [ student, setStudent] = useState();
    const [ startDate, setStartDate ] = useState(new Date());
    const [ noOfLayOff, setNoOfLayOff ] = useState(0);
    const [ layOffApplied, setLayOffApplied] = useState(false);
    const currentDate = new Date().getFullYear()+'-'+('0' + (new Date().getMonth()+1)).slice(-2)+'-'+('0' + (new Date().getDate())).slice(-2);
    const maxDate = new Date().getFullYear()+50+'-'+('0' + (new Date().getMonth())).slice(-2)+'-'+('0' + (new Date().getDate())).slice(-2);


    const fetchStudent = async () => {
        await getStudent(player.academy.id, player.uid).then(student => {
            console.log('student',student);
            if(student.isLayOff){
                setLayOffApplied(true);
            }
            setStudent(student);
        })
    }

    useEffect(() => {
        fetchStudent();
    },[]);


    const checkDate = (current) => {
        console.log('Checking date.....');
        console.log(moment(current).day());
        if(moment(current).day()===0){
            alert('LayOffs can\'t be availed from Sundays.');
            const prevDate = new Date(current);
            prevDate.setDate(prevDate.getDate()-1);
            setStartDate(prevDate);
        }
        else{
            setStartDate(current);
        }
    }  

    const checkAvailableLayoffs = () => {
        console.log('currentValue',noOfLayOff);
        const availableLayOffs = student.layOffAvailable - student.layOffAvailed;
        console.log('availableLayOffs',availableLayOffs);
        if(noOfLayOff===0){
            alert('Kindly enter the number of layoffs to be availed.');
            setNoOfLayOff(0);
            return;
        }
        if(noOfLayOff > (availableLayOffs)){
            alert(`You can only avail at most ${availableLayOffs} layoff(s).`);
            setNoOfLayOff(0);
            return;
        }
            const data = {
                layOffStartDate: startDate,
                noOfLayOff: noOfLayOff
            }
            updateLayOff(player.academy.id, player.uid,data).then(async () => {
                await fetchStudent();
                setLayOffApplied(true);
                alert("Done!!!!");
            })
    }
    

    return (
        <View style={styles.container}>
        <Header text={'LayOff'} />
    <View style={styles.layOffContainer}>
        <Text style={styles.layOffText}>LayOff Availed: {student ? student.layOffAvailed : '...'}</Text>
        <Text style={styles.layOffText}>LayOff Available: {student ? student.layOffAvailable : '...'}</Text>
    </View>
    { (layOffApplied) ? null : <View style={styles.layOffSubContainer}>
        <Text style={styles.layOffText}>Select the start date: </Text>
        <View style={styles.subCategory}>
        <DatePicker 
            date={startDate} 
            mode='date'
            textColor='black'
//            disabledDate={disabledDate}
            onDateChange={checkDate} 
            minDate={currentDate}
            maxDate={maxDate}
            />
            </View>            
    </View>}
    { (layOffApplied) ? null : <View style={styles.layOffSubContainer}>
        <Text style={styles.layOffText}>Number of Layoffs needs to be availed: </Text>
        <View style={styles.subCategory}>
        <TextInput
        style={styles.inputBox}
        value={noOfLayOff}
        onChangeText={e => setNoOfLayOff(e)}
        placeholder="0" 
        keyboardType="numeric"/>
        </View>
    </View>}
    {(layOffApplied) ? null : <View style={styles.layOffSubContainer}>
        <Button title="Apply" onPress={checkAvailableLayoffs}/>
    </View>}
    { (!layOffApplied) ? null : <View style={{alignItems: 'center'}}>
        <Text>You are already under layoff period.</Text>
    </View>}
        </View>
      );
}

export default LayOffScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242, 242, 242, 1)',
      },
      inputBox: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
    subCategory: {
        marginTop: 10
    },
      layOffText: {
        fontSize: 18
      },
      layOffContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 100
      },    
      layOffSubContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 30
      },
      calendarItem: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        paddingTop: heightToDP('8%'),
      },
    
})


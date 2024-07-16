import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useEffect, useState } from 'react'

import { Participant } from '../../components/Participant'

export default function Home() {

    const [participants, setParticipants] = useState<string[]>([])
    const [newParticipant, setNewParticipant] = useState('')
    const [currentDate, setCurrentDate] = useState('');

    const monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
    ];
    const dayNames = [
        "Domingo", "Segunda-feira", "Terça-feira",
        "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    useEffect(() => {
        var dayNow = dayNames[new Date().getDay()]
        var dateNow = new Date().getDate();
        var nameOfMonthNow = monthNames[new Date().getMonth()];
        var yearNow = new Date().getFullYear();
        setCurrentDate(
            dayNow + ', ' + dateNow + ' de ' + nameOfMonthNow + ' de ' + yearNow
        );
    });

    const handleParticipantAdd = () => {
        if (participants.includes(newParticipant)) {
            Alert.alert('Esse participante já foi adicionado')
            
        }
        else {
            setParticipants([...participants, newParticipant])
            setNewParticipant('')
        }
    }

    const handleParticipantRemove = (name: string) => {
        setParticipants(oldParticipants => oldParticipants.filter(participant => participant !== name))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                {currentDate}
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Nome do participante'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={setNewParticipant}
                    value={newParticipant}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                keyExtractor={participant => participant}
                data={participants}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyList}>Ninguém chegou no evento ainda? Adicione algum participante na sua lista de presença</Text>
                )}
            />


        </View>

    )
}
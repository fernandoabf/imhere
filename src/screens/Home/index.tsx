import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useState } from 'react'

import { Participant } from '../../components/Participant'



export default function Home() {

    const [participants, setParticipants] = useState<string[]>([])
    const [newParticipant, setNewParticipant] = useState('')


    const handleParticipantAdd = () => {
        if (participants.includes(newParticipant)) {
            Alert.alert('Esse participante já foi adicionado')
        }
        else {
            setParticipants([...participants, newParticipant])
            setNewParticipant('')
        }
    }

    const handleParticipantRemove = (item: string) => {
        setParticipants(participants.filter(participant => participant !== item))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 12 de Julho de 2024.
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
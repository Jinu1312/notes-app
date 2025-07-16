import AddNoteModel from "@/components/AddNoteModel";
import NoteList from "@/components/NoteList";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotesScreen = () => {

    const [notes, setNotes] = useState([]);

    const [modelVisible, setModelVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setEroor] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, [])

    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes();

        if (response.error) {
            setEroor(response.error);
            Alert.alert('Error', response.error);
        }
        else {
            setNotes(response.data);
            setEroor(null);
        }
        setLoading(false);
    }

    const addNote = async () => {
        if (newNote.trim() == '') return;

        const response = await noteService.createNote(newNote);
        if (response.error) {
            Alert.alert('Error', response.error);
        }
        else {
            setNotes([...notes, response.data]);
        }

        setNewNote('');
        setModelVisible(false);
    }

    const deleteNote = async (id) => {
        Alert.alert('Delete Note', 'Are yoiu sure you want to delete this note?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const response = await noteService.deleteNote(id);
                    if (response.error) {
                        Alert.alert('Error', response.error);
                    }
                    else {
                        setNotes(notes.filter((note) => note.$id !== id));
                    }
                }
            }
        ])
    }

    return <View style={styles.container}>

        {/*Note List */}
        {
            loading ?
                (
                    <ActivityIndicator size={'large'}
                        color={'#007bff'} />
                ) : (
                    <>
                        {error && <Text style={styles.errorText}>console.error(); </Text>}
                        <NoteList notes={notes} onDelete={deleteNote} />
                    </>
                )
        }

        <TouchableOpacity style={styles.addButton} onPress={() => {
            setModelVisible(true)
        }}>
            <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>

        <AddNoteModel modelVisible={modelVisible} addNote={addNote} newNote={newNote} setModelVisible={setModelVisible} setNewNote={setNewNote} />

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    modelOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    modelTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15
    },
    modelButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#333'
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center'
    },
    saveButtonText: {
        fontSize: 16,
        color: '#fff'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16
    }
})

export default NotesScreen;
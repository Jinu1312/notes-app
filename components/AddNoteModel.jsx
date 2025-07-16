import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNoteModel = ({ modelVisible, setModelVisible, newNote, setNewNote, addNote }) => {
    return <View>
        <Modal visible={modelVisible}
            animationType='slide'
            transparent
            onRequestClose={() => {
                setModelVisible(false)
            }}>
            <View style={styles.modelOverlay}>
                <View style={styles.modelContent}>
                    <Text style={styles.modelTitle}>Add a new note</Text>
                    <TextInput style={styles.input}
                        placeholder='Enter Note'
                        placeholderTextColor='#aaa'
                        value={newNote}
                        onChangeText={setNewNote}
                    ></TextInput>
                    <View style={styles.modelButtons}>
                        <TouchableOpacity style={styles.cancelButton}
                            onPress={() => {
                                setModelVisible(false)
                            }}>
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton}
                            onPress={() => {
                                addNote()
                            }}>
                            <Text style={styles.saveButtonText}>
                                Save
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
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
})

export default AddNoteModel;
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { Alert } from 'react-native';
import Fallback from './components/Fallback';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoScreen = () => {

    // Init local states
    const [todo, setTodo] = useState("");
    const [toDoList, setToDoList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        loadTodos();
    }, []);
    
    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('toDoList');
            if (storedTodos) {
                setToDoList(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error("Failed to load to-do list:", error);
        }
    };

    useEffect(() => {
        saveTodos();
    }, [toDoList]);
    
    const saveTodos = async () => {
        try {
            await AsyncStorage.setItem('toDoList', JSON.stringify(toDoList));
        } catch (error) {
            console.error("Failed to save to-do list:", error);
        }
    };
    
    

    // Handle Add ToDo
    const handleAddToDo = () => {
        if (todo.trim() === "") {  // Check if title is empty or whitespace
            Alert.alert("Error", "Empty Task Cannot Be added");  // Show alert if empty
            setTodo("");
            return;  // Exit the function, so it doesn’t add an empty item
        }

        setToDoList([...toDoList, { id: Date.now().toString(), title: todo, completed: false, created_at: new Date().toISOString() }]);
        setTodo("");
    };

    const handleDelete = (id) => {
        const updatedToDoList = toDoList.filter((todo) => todo.id !== id);
        setToDoList(updatedToDoList);
    };

    // Handle opening the edit modal and setting the item to be edited
    const openEditModal = (item) => {
        setCurrentEditItem(item);
        setEditText(item.title);
        setIsModalVisible(true);
    };

    // Handle saving the edited todo
    const handleSaveEdit = () => {
        setToDoList(toDoList.map(todo => 
            todo.id === currentEditItem.id ? { ...todo, title: editText } : todo
        ));
        setIsModalVisible(false);
        setCurrentEditItem(null);
        setEditText("");
    };
    const handleCheck = (id) => {
        setToDoList(
            toDoList.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const renderToDos = ({ item }) => {
        return (
            <View style={{
                backgroundColor: "#133337",
                borderRadius: 6,
                paddingHorizontal: 6,
                paddingVertical: 12,
                marginTop: 6,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: .8,
                shadowRadius: 3,
            }}>
                <View style={[
                    styles.statusSquare,
                    { backgroundColor: item.completed ? 'green' : 'red' }
                ]}>
                    <Text style={styles.statusText}>{item.completed ? 'Done' : 'In Progress'}</Text>
                </View>
                <Text>
                <Text style= {styles.taskTitle}> {item.title } </Text>
                {'\n'}
                <Text style={styles.dateText}>Created on: {new Date(item.created_at).toLocaleDateString()}</Text>
                </Text>
                <IconButton icon="pencil" iconColor='#fff' onPress={() => openEditModal(item)} />
                <IconButton icon="trash-can" iconColor='#fff' onPress={() => handleDelete(item.id)} />
                <IconButton icon="check" iconColor='#fff' onPress={() => handleCheck(item.id)} />
            </View>
        );
    };

    return (
        <View style={{ marginHorizontal: 16 }}>
            <Text style={{ textAlign: "center", fontSize: 30, marginTop: 20, fontWeight: "bold" }}>Add Tasks</Text>
            <TextInput style={{
                borderWidth: 2,
                marginTop: 40,
                borderColor: "#000000",
                borderRadius: 6,
                paddingVertical: 12,
                paddingHorizontal: 16,
            }}
                placeholder='Add Your Next Task'
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            <TouchableOpacity style={{
                backgroundColor: "#000000",
                borderRadius: 6,
                paddingVertical: 8,
                marginVertical: 24,
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1
            }}
                onPress={() => handleAddToDo()}
            >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Add</Text>
            </TouchableOpacity>

            <FlatList data={toDoList} renderItem={renderToDos} keyExtractor={item => item.id} />

            <Modal
                animationType='fade'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Task Title:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Edit Task Title"
                            value={editText}
                            onChangeText={(text) => setEditText(text)}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {
                toDoList.length <= 0 && <Fallback />
            }
        </View>
    );
};

export default ToDoScreen;

const styles = StyleSheet.create({
    dateText: {
        color: "#ccc",
        fontSize: 12,
        marginTop: 4,
    },
    taskTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '100%',
        marginBottom: 20
    },
    saveButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    statusSquare: {
        width: 90,
        height: 20,
        borderRadius: 4,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});

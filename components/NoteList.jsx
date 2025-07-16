import { FlatList, View } from "react-native";
import NoteItem from './NoteItem';

const NoteList = ({ notes, onDelete }) => {
    return (
        <View>
            <FlatList
                data={notes}
                keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
                renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} />}
            />
        </View>
    )
}

export default NoteList;
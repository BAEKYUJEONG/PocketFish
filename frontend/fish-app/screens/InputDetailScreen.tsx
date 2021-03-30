
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function InputDetailScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>123</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        fontSize:20
    }
});
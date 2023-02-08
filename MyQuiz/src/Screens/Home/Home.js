import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../../Constants/constants";

export default function Home({ navigation }) {
    return (
        <View style={styles.homeGlobal_container}>
            <Text style={styles.title}>MyQuiz</Text>
            <Image
                source={require("../../../assets/Images/brain.png")}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.quizButton}
                onPress={() => navigation.navigate("Quiz")}
            >
                <Text style={styles.quizButton_text}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    homeGlobal_container: {
        backgroundColor: COLORS.primary,
        flex: 1,
        width: SIZES.width,
        paddingVertical: 40,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 60,
        fontWeight: "600",
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    quizButton: {
        backgroundColor: COLORS.secondary,
        borderWidth: 3,
        borderColor: COLORS.tertiary,
        borderRadius: 5,
        height: 60,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
    quizButton_text: {
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 2,
        color: "white",
    },
});

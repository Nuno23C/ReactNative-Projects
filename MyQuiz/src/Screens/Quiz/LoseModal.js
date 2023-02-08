import { StyleSheet, Modal, View, Text, Pressable, Image } from "react-native";
import { COLORS, SIZES } from "../../Constants/constants";

export default function LoseModal(props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.showLoseModal}
        >
            <View style={styles.modalGlobal_container}>
                <View style={styles.modal_container}>
                    <Text style={styles.modal_text1}>Perdeste</Text>
                    <Image
                        source={require("../../../assets/Images/sad.png")}
                        style={styles.image}
                    />
                    <Text style={styles.modal_text2}>
                        Pontuação: {props.score}
                    </Text>
                    <View style={styles.modalButtons_container}>
                        <Pressable
                            onPress={props.home}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtons_text}>Home</Text>
                        </Pressable>
                        <Pressable
                            onPress={props.restartQuiz}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtons_text}>
                                Recomeçar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalGlobal_container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    modal_container: {
        backgroundColor: COLORS.secondary,
        height: 300,
        width: SIZES.width - "40",
        borderRadius: 16,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
        alignItems: "center",
        justifyContent: "center",
    },
    modal_text1: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 2,
    },
    modal_text2: {
        fontSize: 20,
        color: "white",
        letterSpacing: 2,
    },
    image: {
        width: 80,
        height: 80,
        marginVertical: 16,
    },
    modalButtons_container: {
        marginTop: 10,
        flexDirection: "row",
    },
    modalButton: {
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: COLORS.tertiary,
        borderRadius: 5,
        height: 50,
        width: 150,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    modalButtons_text: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 2,
    },
});

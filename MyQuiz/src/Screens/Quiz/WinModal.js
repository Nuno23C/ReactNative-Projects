import { StyleSheet, Modal, View, Text, Pressable, Image } from "react-native";
import { COLORS, SIZES } from "../../Constants/constants";

// import "../../../assets/Images";

export default function WinModal(props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.showWinModal}
        >
            <View style={styles.modalGlobal_container}>
                <View style={styles.modal_container}>
                    <Text style={styles.modal_text}>
                        Parabéns, concluíste o Quiz!
                    </Text>
                    <Image
                        source={require("../../../assets/Images/congrats.png")}
                        style={styles.image}
                    />
                    <Text
                        style={[
                            styles.modal_text,
                            { fontSize: 20, letterSpacing: 2 },
                        ]}
                    >
                        Pontuação: {props.score}
                    </Text>
                    <View style={styles.modalButtons_container}>
                        <Pressable
                            onPress={props.home}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtons_text}>Home</Text>
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
        height: 400,
        width: SIZES.width - "40",
        borderRadius: 16,
        borderWidth: 5,
        borderColor: COLORS.tertiary,
        alignItems: "center",
        justifyContent: "center",
    },
    modal_text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 1,
    },
    image: {
        width: 120,
        height: 120,
        marginVertical: 16,
    },
    modalButtons_container: {
        marginTop: 20,
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
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 2,
    },
});

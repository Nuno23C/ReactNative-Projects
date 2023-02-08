import { useRef, useEffect, useState } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";
import { COLORS } from "../../Constants/constants";

export default function TimeBar(props) {
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1500)).current;
    const reactive = useRef(new Animated.Value(-1500)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * props.step) / props.steps);
    }, [props.step, width]);

    return (
        <>
            <View style={styles.timeCount_container}>
                <Text style={styles.timeCount_text}>
                    {props.steps - props.step}
                </Text>
            </View>
            <View
                onLayout={(e) => {
                    const newWidth = e.nativeEvent.layout.width;

                    setWidth(newWidth);
                }}
                style={styles.progress1}
            >
                <Animated.View
                    style={[
                        styles.progress2,
                        {
                            transform: [
                                {
                                    translateX: animatedValue,
                                },
                            ],
                        },
                    ]}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    timeCount_container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 8,
    },
    timeCount_text: {
        fontSize: 26,
        fontWeight: "bold",
    },
    progress1: {
        height: 30,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 30,
        overflow: "hidden",
    },
    progress2: {
        height: 30,
        width: "100%",
        borderRadius: 30,
        backgroundColor: COLORS.secondary,
        position: "relative",
        left: 0,
        top: 0,
    },
});

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useFonts } from "expo-font";

import Quiz from "./src/Screens/Quiz/Quiz";
import Home from "./src/Screens/Home/Home";

const Stack = createNativeStackNavigator();

export default function App() {
    // const [fontsLoaded] = useFonts({
    //     RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
    //     RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    //     Bernier1: require("../../../assets/fonts/BERNIERDistressed-Regular.ttf"),
    //     Bernier2: require("../../../assets/fonts/BERNIERRegular-Regular.ttf"),
    //     Bernier3: require("../../../assets/fonts/BERNIERShade-Regular.ttf"),
    // });

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Quiz"
                    component={Quiz}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    global_container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

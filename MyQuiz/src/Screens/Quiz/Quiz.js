import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { COLORS, SIZES } from "../../Constants/constants";

import TimeBar from "./TimeBar";
import LoseModal from "./LoseModal";
import WinModal from "./WinModal";

import data from "../../Data/QuizData.json";

export default function Quiz({ navigation }) {
    let allQuestions = data;

    function randomList() {
        let list = [];

        for (let i = 0; i < data.length; i++) {
            list[i] = i;
        }

        for (
            var j, x, i = list.length;
            i;
            j = parseInt(Math.random() * i),
                x = list[--i],
                list[i] = list[j],
                list[j] = x
        );

        return list;
    }

    const [list, setList] = useState(randomList());
    const [currentListIndex, setCurrentListIndex] = useState(0);

    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [time, setTime] = useState(0);
    const [stop, setStop] = useState(false);
    const [score, setScore] = useState(0);

    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [currentCorrectOption, setCurrentCorrectOption] = useState(null);

    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showLoseModal, setShowLoseModal] = useState(false);
    const [showWinModal, setShowWinModal] = useState(false);

    // Função que valida a resposta
    function validateAnswer(selectedOption) {
        setCurrentOptionSelected(selectedOption);

        let correctOption = allQuestions[list[currentListIndex]].CorrectAnswer;
        setCurrentCorrectOption(correctOption);

        if (selectedOption == correctOption) {
            setShowNextButton(true);
            setScore(score + 1);
            setStop(true);
        } else {
            setShowLoseModal(true);
            setStop(true);
        }

        setIsOptionsDisabled(true);
    }

    // Função para avançar de pergunta
    function nextQuestionHandling() {
        if (currentQuestionNumber == list.length) {
            setStop(true);
            setShowWinModal(true);
        } else {
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            setCurrentListIndex(currentListIndex + 1);
            setCurrentOptionSelected(null);
            setCurrentCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
            setStop(false);
            setTime(0);
        }
    }

    // Função para recomeçar o Quiz
    function restartQuiz() {
        setList(randomList());
        setCurrentListIndex(0);
        setCurrentQuestionNumber(1);
        setScore(0);
        setCurrentOptionSelected(null);
        setCurrentCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        setShowLoseModal(false);
        setShowWinModal(false);
        setTime(0);
        setStop(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (stop == false && time == 15) {
                setTime(15);
                setShowLoseModal(true);
            } else if (stop == true) {
                setTime(time);
            } else {
                setTime(time + 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <View style={styles.global_container}>
            {/* QUESTION NUMBER */}
            <View style={styles.questionNumber_container}>
                <Text style={styles.questionNumber_text}>
                    Pergunta {currentQuestionNumber}
                </Text>
            </View>

            {/* TIMER  */}
            <TimeBar step={time} steps={15} />

            {/* QUESTION */}
            <View style={styles.question_container}>
                <Text style={styles.question_text}>
                    {allQuestions[list[currentListIndex]].Question}
                </Text>
            </View>

            {/* OPTIONS */}
            <View style={styles.options_global_container}>
                {allQuestions[list[currentListIndex]].Options.map((option) => (
                    <Pressable
                        key={option}
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        style={[
                            styles.option_container,
                            {
                                backgroundColor:
                                    currentOptionSelected ==
                                        currentCorrectOption &&
                                    option == currentOptionSelected
                                        ? COLORS.green
                                        : currentOptionSelected !=
                                              currentCorrectOption &&
                                          option == currentOptionSelected
                                        ? COLORS.red
                                        : COLORS.secondary,
                                borderColor:
                                    currentOptionSelected ==
                                        currentCorrectOption &&
                                    option == currentOptionSelected
                                        ? COLORS.green + "50"
                                        : currentOptionSelected !=
                                              currentCorrectOption &&
                                          option == currentOptionSelected
                                        ? COLORS.red + "50"
                                        : COLORS.tertiary,
                            },
                        ]}
                    >
                        <Text style={styles.option_text}>{option}</Text>
                    </Pressable>
                ))}
            </View>

            {/* NEXT BUTTON */}
            <View style={styles.nextQuestion_container}>
                {(showNextButton && (
                    <Pressable
                        onPress={nextQuestionHandling}
                        style={styles.nextQuestion_True}
                    >
                        <Text style={styles.nextQuestion_text}>NEXT</Text>
                    </Pressable>
                )) || (
                    <Pressable
                        style={styles.nextQuestion_False}
                        disabled={true}
                    >
                        <Text style={styles.nextQuestion_text}>NEXT</Text>
                    </Pressable>
                )}
            </View>

            {/* LOSE MODAL */}
            <LoseModal
                showLoseModal={showLoseModal}
                score={score}
                home={() => navigation.navigate("Home")}
                restartQuiz={restartQuiz}
            />

            {/* WIN MODAL */}
            <WinModal
                showWinModal={showWinModal}
                score={score}
                home={() => navigation.navigate("Home")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    global_container: {
        backgroundColor: COLORS.primary,
        flex: 1,
        width: SIZES.width,
        paddingVertical: 40,
        paddingHorizontal: 16,
    },

    questionNumber_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    questionNumber_text: {
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },

    question_container: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    question_text: {
        fontSize: 32,
        fontWeight: "600",
        letterSpacing: 0.5,
    },

    options_global_container: {
        flex: 5,
    },
    option_container: {
        backgroundColor: COLORS.secondary,
        borderWidth: 3,
        borderColor: COLORS.tertiary,
        borderRadius: 5,
        height: 60,
        width: SIZES.width - "30",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    option_text: {
        fontSize: 20,
        letterSpacing: 0.5,
        color: "white",
    },

    nextQuestion_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    nextQuestion_True: {
        backgroundColor: COLORS.secondary,
        borderWidth: 3,
        borderColor: COLORS.tertiary,
        borderRadius: 5,
        height: 50,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    nextQuestion_False: {
        backgroundColor: COLORS.secondary,
        borderWidth: 3,
        borderColor: COLORS.tertiary,
        borderRadius: 5,
        height: 50,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.6,
    },
    nextQuestion_text: {
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 2,
        color: "white",
    },
});

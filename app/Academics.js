import { Animated } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import DrawerMenu from "./components/DrawerMenu";
import Header from "./components/Header";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Academics() {

    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState("2020-09-18");
    const [activeTab, setActiveTab] = useState("timetable");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useState(new Animated.Value(-300))[0];

    const student = {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    };

    const assignments = [
        {
            title: "Today’s assignment",
            subject: "Crypto currency",
            submit: "Today | 5:00 PM",
            duration: "4h"
        },
        {
            title: "Upcoming assignment",
            subject: "Data Structures",
            submit: "Tomorrow | 11:00 AM",
            duration: "6h"
        }
    ];

    const exams = [
        { subject: "Data Structure", date: "02 Sept 2026", time: "9:30 to 11:00" },
        { subject: "Theory Of Computation", date: "04 Sept 2026", time: "9:30 to 11:00" },
        { subject: "Cryptography", date: "07 Sept 2026", time: "9:30 to 11:00" },
        { subject: "System Programming", date: "12 Sept 2026", time: "9:30 to 11:00" },
        { subject: "DBMS", date: "15 Sept 2026", time: "9:30 to 11:00" }
    ];

    const openDrawer = () => {
        setDrawerOpen(true);
        Animated.timing(drawerAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnim, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setDrawerOpen(false));
    };

    return (

        <View style={{ flex: 1 }}>

            <ScrollView style={styles.container}>

                <Header openDrawer={openDrawer} />


                <Text style={styles.title}>Academics</Text>

                <Text style={styles.back}>← Back</Text>

                {/* Tabs */}
                <View style={styles.tabs}>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "timetable" && styles.activeTab]}
                        onPress={() => setActiveTab("timetable")}
                    >
                        <Text style={[styles.tabText, activeTab === "timetable" && styles.activeText]}>
                            Time Table
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "syllabus" && styles.activeTab]}
                        onPress={() => setActiveTab("syllabus")}
                    >
                        <Text style={[styles.tabText, activeTab === "syllabus" && styles.activeText]}>
                            Syllabus
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "exams" && styles.activeTab]}
                        onPress={() => setActiveTab("exams")}
                    >
                        <Text style={[styles.tabText, activeTab === "exams" && styles.activeText]}>
                            Exams
                        </Text>
                    </TouchableOpacity>

                </View>

                {activeTab === "timetable" && (
                    <>
                        {/* Calendar Card */}
                        <View style={styles.calendarCard}>

                            <Calendar
                                onDayPress={(day) => setSelectedDate(day.dateString)}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: "#4A63F5" }
                                }}
                                theme={{
                                    todayTextColor: "#4A63F5",
                                    arrowColor: "#4A63F5"
                                }}
                            />

                            <View style={styles.divider} />


                            <Text style={styles.dateTitle}>September 18, 2020</Text>
                            <Text style={styles.scheduleTitle}>Day’s Schedule</Text>

                            {/* Class List */}

                            <View style={styles.classCard}>
                                <View style={[styles.bar, { backgroundColor: "#C06CF3" }]} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.className}>Data Structures</Text>
                                    <Text style={styles.teacher}>Mrs Malathi</Text>
                                </View>
                                <Text style={styles.time}>9:00 to 10:00</Text>
                            </View>

                            <View style={styles.classCard}>
                                <View style={[styles.bar, { backgroundColor: "#4A63F5" }]} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.className}>Theory of Computation</Text>
                                    <Text style={styles.teacher}>Mrs Helaria</Text>
                                </View>
                                <Text style={styles.time}>10:00 to 11:00</Text>
                            </View>

                            <View style={styles.classCard}>
                                <View style={[styles.bar, { backgroundColor: "#4A63F5" }]} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.className}>System Programming</Text>
                                    <Text style={styles.teacher}>Mr Manjunath</Text>
                                </View>
                                <Text style={styles.time}>11:00 to 12:00</Text>
                            </View>

                        </View>
                    </>
                )}

                {/* syllabus */}
                {activeTab === "syllabus" && (

                    <View>

                        <Text style={styles.sectionTitle}>Syllabus</Text>

                        <View style={styles.syllabusCard}>
                            <View>
                                <Text style={styles.subject}>Data Structures</Text>
                                <Text style={styles.subjectCode}>C301  4 Credits</Text>
                            </View>
                            <View style={styles.downloadIcon}>
                                <Feather name="download" size={22} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.syllabusCard}>
                            <View>
                                <Text style={styles.subject}>Theory of Computation</Text>
                                <Text style={styles.subjectCode}>C302  6 Credits</Text>
                            </View>
                            <View style={styles.downloadIcon}>
                                <Feather name="download" size={22} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.syllabusCard}>
                            <View>
                                <Text style={styles.subject}>Cryptography</Text>
                                <Text style={styles.subjectCode}>C303  7 Credits</Text>
                            </View>
                            <View style={styles.downloadIcon}>
                                <Feather name="download" size={22} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.syllabusCard}>
                            <View>
                                <Text style={styles.subject}>System Programming</Text>
                                <Text style={styles.subjectCode}>C304  9 Credits</Text>
                            </View>
                            <View style={styles.downloadIcon}>
                                <Feather name="download" size={22} color="#22C55E" />
                            </View>
                        </View>

                        <View style={styles.syllabusCard}>
                            <View>
                                <Text style={styles.subject}>Data Base Management</Text>
                                <Text style={styles.subjectCode}>C305  3 Credits</Text>
                            </View>
                            <View style={styles.downloadIcon}>
                                <Feather name="download" size={22} color="#22C55E" />
                            </View>
                        </View>

                        {/* assignment card */}
                        <View style={styles.assignmentHeader}>
                            <Text style={styles.sectionTitle}>Assignments</Text>

                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View all →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                            {assignments.map((item, index) => (
                                <View key={index} style={styles.assignmentCard}>

                                    <View style={styles.assignmentBar} />

                                    <View style={{ flex: 1 }}>

                                        <Text style={styles.assignmentTitle}>{item.title}</Text>

                                        <Text style={styles.assignmentSubject}>{item.subject}</Text>

                                        <Text style={styles.submitText}>Submit by</Text>

                                        <Text style={styles.submitDate}>{item.submit}</Text>

                                    </View>

                                    <View style={{ alignItems: "flex-end" }}>

                                        <TouchableOpacity style={styles.viewBtn}>
                                            <Text style={{ color: "#fff" }}>View</Text>
                                        </TouchableOpacity>

                                        <View style={styles.timeBadge}>
                                            <Feather name="clock" size={14} color="#555" />
                                            <Text style={{ marginLeft: 5 }}>{item.duration}</Text>
                                        </View>

                                    </View>

                                </View>
                            ))}

                        </ScrollView>

                    </View>




                )}

                {/* exams */}
                {activeTab === "exams" && (

                    <View style={styles.examCard}>

                        {/* Header */}
                        <View style={styles.examHeader}>
                            <Text style={styles.examHeaderText}>Subject</Text>
                            <Text style={styles.examHeaderText}>Date</Text>
                            <Text style={styles.examHeaderText}>Time</Text>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* Exam Rows */}
                            {exams.map((item, index) => (
                                <View key={index} style={styles.examRow}>

                                    <Text style={styles.examSubject}>{item.subject}</Text>

                                    <Text style={styles.examDate}>{item.date}</Text>

                                    <Text style={styles.examTime}>{item.time}</Text>

                                </View>
                            ))}

                        </ScrollView>

                    </View>

                )}
            </ScrollView>

            <DrawerMenu
                drawerOpen={drawerOpen}
                closeDrawer={closeDrawer}
                drawerAnim={drawerAnim}
            />

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        padding: 16,
        marginTop: -35
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: -12
    },

    back: {
        color: "#4A63F5",
        marginVertical: 10
    },
    downloadIcon: {
        width: 35,
        height: 35,
        backgroundColor: "#DCFCE7",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },

    tabs: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 6,
        marginVertical: 15,
        alignSelf: "center",
        width: "100%",
        elevation: 2
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 14
    },

    activeTab: {
        backgroundColor: "#4A63F5"
    },

    activeText: {
        color: "#fff",
        fontWeight: "600"
    },

    tabText: {
        color: "#4A63F5",
        fontWeight: "500"
    },

    calendarCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: wp('3%')
    },

    divider: {
        height: 0.1,
        backgroundColor: "#E5E7EB",
        marginVertical: 10,
        marginHorizontal: -15
    },

    dateTitle: {
        marginTop: 20,
        fontWeight: "600"
    },

    scheduleTitle: {
        marginTop: 6,
        marginBottom: 10,
        color: "#555"
    },

    classCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF1FF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10
    },

    bar: {
        width: 4,
        height: 40,
        borderRadius: 2,
        marginRight: 10
    },

    className: {
        fontWeight: "600"
    },

    teacher: {
        color: "#777",
        fontSize: 12
    },

    time: {
        fontSize: 12,
        color: "#444"
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 15
    },

    syllabusCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        marginBottom: 12
    },

    subject: {
        fontWeight: "600",
        fontSize: 15
    },

    subjectCode: {
        color: "#777",
        fontSize: 12,
        marginTop: 3
    },
    assignmentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },

    viewAll: {
        color: "#4A63F5"
    },

    assignmentCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 18,
        marginRight: 12,
        width: wp('78%'),
        alignItems: "center"
    },

    assignmentBar: {
        width: 4,
        height: 60,
        backgroundColor: "#ff93f1",
        borderRadius: 2,
        marginRight: 10
    },

    assignmentTitle: {
        fontWeight: "600"
    },

    assignmentSubject: {
        fontSize: 16,
        marginVertical: 3
    },

    submitText: {
        color: "#777",
        fontSize: 12
    },

    submitDate: {
        fontSize: 12
    },

    viewBtn: {
        backgroundColor: "#4A63F5",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 10,
        marginBottom: 8
    },

    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF1FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10
    }, examCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        marginTop: 15
    },

    examHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#4A63F5",
        paddingVertical: 15,
        paddingHorizontal: 20
    },

    examHeaderText: {
        color: "#fff",
        fontWeight: "600",
        width: "33%",
        marginLeft: 3
    },

    examRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF1FF",
        backgroundColor: "#F8FAFF"
    },
    examSubject: {
        width: "33%",
        fontSize: 10
    },

    examDate: {
        width: "33%",
        fontSize: 10
    },

    examTime: {
        width: "33%",
        fontSize: 10
    }

});
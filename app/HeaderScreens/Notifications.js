import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useRouter } from "expo-router";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

export default function Notifications() {

    const [activeTab, setActiveTab] = useState("all");
    const router = useRouter();

    const notifications = [
        {
            id: 1,
            icon: "book-open-variant",
            color: "#4259FA",
            bg: "rgba(66,89,250,0.22)",
            title: "New Assignment Posted",
            desc: "Data Structures - Assignment 3 is now available",
            time: "6h ago",
            unread: true
        },
        {
            id: 2,
            icon: "calendar",
            color: "#C23EFF",
            bg: "rgba(194,62,255,0.22)",
            title: "Upcoming Sem Exam",
            desc: "Database Systems final exam scheduled for Dec 15",
            time: "5h ago",
            unread: true
        },
        {
            id: 3,
            icon: "alarm",
            color: "#FF5B2E",
            bg: "rgba(255,91,46,0.22)",
            title: "Fee Payment Reminder",
            desc: "Semester fee payment due by November 30",
            time: "12h ago",
            unread: true
        },
        {
            id: 4,
            icon: "medal-outline",
            color: "#F2B705",
            bg: "rgba(242,183,5,0.22)",
            title: "Scholarship Approved",
            desc: "Your Merit Scholarship application has been approved",
            time: "2days ago",
            unread: false
        },
        {
            id: 5,
            icon: "credit-card-outline",
            color: "#4DA6FF",
            bg: "rgba(77,166,255,0.22)",
            title: "Payment Confirmed",
            desc: "Your tuition fee payment of ₹45,000 has been received",
            time: "3days ago",
            unread: false
        }
    ];

    const filtered =
        activeTab === "all"
            ? notifications
            : notifications.filter(n => n.unread);

    return (

        <View style={styles.screen}>

            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="x" size={hp("3%")} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabOuter}>
                    <View style={styles.tabCard}>
                        <View style={styles.tabContainer}>

                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === "all" && styles.activeTab
                                ]}
                                onPress={() => setActiveTab("all")}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === "all" && styles.activeText
                                    ]}
                                >
                                    All(5)
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === "unread" && styles.activeTab
                                ]}
                                onPress={() => setActiveTab("unread")}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === "unread" && styles.activeText
                                    ]}
                                >
                                    Unread(3)
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                {/* Mark all read */}
                <TouchableOpacity>
                    <Text style={styles.markRead}>Mark all as read</Text>
                </TouchableOpacity>

                {/* Notification List */}
                <ScrollView showsVerticalScrollIndicator={false}>

                    {filtered.map(item => (

                        <View key={item.id} style={[
                            styles.card,
                            { backgroundColor: item.unread ? "#EEF0FF" : "#FFFFFF" }
                        ]}>

                            <View
                                style={[
                                    styles.iconBox,
                                    { backgroundColor: item.bg }
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={hp("2.6%")}
                                    color={item.color}
                                />
                            </View>

                            <View style={{ flex: 1 }}>

                                <View style={styles.titleRow}>
                                    <Text style={styles.title}>{item.title}</Text>

                                    {item.unread && <View style={styles.dot} />}

                                </View>

                                <Text style={styles.desc}>{item.desc}</Text>

                                <Text style={styles.time}>{item.time}</Text>

                            </View>

                        </View>

                    ))}

                </ScrollView>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Clear all */}
                <TouchableOpacity style={styles.clearBtn}>
                    <Feather name="trash-2" size={hp("2%")} color="#FF3B30" />
                    <Text style={styles.clearText}>Clear All Notification</Text>
                </TouchableOpacity>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: "#e9edf7",
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        width: wp("92%"),
        height: hp("92%"),
        backgroundColor: "#fff",
        borderRadius: wp("6%"),
        padding: wp("5%")
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    headerTitle: {
        fontSize: hp("3%"),
        fontWeight: "500",
        color: "#111"
    },

    tabOuter: {
        alignItems: "center",
        marginTop: hp("2%"),
    },

    /* White shadow card */
    tabCard: {
        width: wp("85%"),
        height: hp("7%"),
        backgroundColor: "#fff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#0D0A2C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 5
    },

    /* Light blue container */
    tabContainer: {
        width: wp("78%"),
        height: hp("4.8%"),
        backgroundColor: "#EEF0FF",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 6
    },

    /* Buttons */
    tabButton: {
        width: wp("30%"),
        height: hp("3.8%"),
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginStart: 8,
        marginEnd: 8
    },

    activeTab: {
        backgroundColor: "#4259FA"
    },

    tabText: {
        color: "#4259FA",
        fontSize: hp("1.8%"),
        fontWeight: "600"
    },

    activeText: {
        color: "#fff"
    },

    markRead: {
        textAlign: "center",
        color: "#4259FA",
        fontWeight: "400",
        marginTop: hp("2%"),
        marginBottom: hp("2%")
    },

    card: {
        flexDirection: "row",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("4%"),
        borderRadius: wp("3%"),
        marginBottom: hp("1.5%"),
        borderWidth: 1,
        borderColor: "#E4E6E8"
    },

    iconBox: {
        width: wp("10%"),
        height: wp("10%"),
        borderRadius: wp("2%"),
        justifyContent: "center",
        alignItems: "center",
        marginRight: wp("3%")
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center"
    },

    title: {
        fontWeight: "700",
        fontSize: hp("2%"),
        color: "#111"
    },

    desc: {
        fontSize: hp("1.7%"),
        color: "#555",
        marginTop: hp("0.3%")
    },

    time: {
        fontSize: hp("1.6%"),
        color: "#888",
        marginTop: hp("0.5%")
    },

    dot: {
        width: wp("1.5%"),
        height: wp("1.5%"),
        borderRadius: 50,
        backgroundColor: "#4259FA",
        marginLeft: wp("1.5%")
    },

    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#E4E6E8",
        marginTop: hp("1%")
    },

    clearBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("1.5%")
    },

    clearText: {
        color: "#FF3B30",
        marginLeft: wp("2%"),
        fontWeight: "600"
    }

});
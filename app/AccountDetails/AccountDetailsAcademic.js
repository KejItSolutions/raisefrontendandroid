import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function AccountDetailsScreen() {

    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(-260)).current;
    const [activeTab, setActiveTab] = useState("overall");

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
            toValue: -260,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setDrawerOpen(false));
    };

    const [student] = useState({
        name: "Evan Yates",
        email: "evanyates@gmail.com",
        birthday: "Apr 12, 1995",
        registerNo: "R2012567",
        stream: "BCA",
        mobile: "6286597412",
        father: "John David",
        fatherMobile: "6287857875",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    });

    const overallFees = [
        {
            title: "Tuition fee",
            sub: "(2025-26)",
            amount: "₹7,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Hostel Fee",
            sub: "(A345)",
            amount: "₹12,000",
            status: "Due",
            date: "17 Sep 2023",
            time: "By 10:34 AM",
        },
        {
            title: "Transport fee",
            sub: "(Monthly)",
            amount: "₹4,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Supplementary Fee",
            sub: "Exam (Backlog)",
            amount: "₹3,000",
            status: "Due",
            date: "17 Sep 2023",
            time: "By 10:34 AM",
        },
        {
            title: "Certificate fee",
            sub: "Semester 01",
            amount: "₹4,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
        {
            title: "Regular fee",
            sub: "Semester 01",
            amount: "₹80,000",
            status: "Paid",
            date: "17 Sep 2023",
            time: "10:34 AM",
        },
    ];

    const historyFees = [
        { title: "Regular fee", sub: "Semester 01", amount: "₹80,000", date: "17 Sep 2023" },
        { title: "Transport fee", sub: "Monthly", amount: "₹4,000", date: "17 Sep 2023" },
        { title: "Certificate fee", sub: "Semester 01", amount: "₹4,000", date: "17 Sep 2023" },
        { title: "Tuition fee", sub: "Semester 01", amount: "₹80,000", date: "17 Sep 2023" },
    ];

    // const menuItems = [
    //     { name: "Dashboard", icon: "grid" },
    //     { name: "Academics", icon: "book-open" },
    //     { name: "Maps", icon: "map-pin" },
    //     { name: "Careers", icon: "target" },
    //     { name: "Events", icon: "award" },
    //     { name: "Sports & Athletics", icon: "activity" },
    //     { name: "Feedback", icon: "message-square" },
    // ];

    return (

        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                {/* NAVBAR */}
                <View style={styles.headerCard}>

                    <TouchableOpacity onPress={openDrawer}>
                        <Image
                            source={require("../../assets/images/Logo.png")}
                            style={{ width: 50, height: 50 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <Feather name="bell" size={24} color="#444" />

                        <Image
                            source={{ uri: student.avatar }}
                            style={styles.headerAvatar}
                        />

                        <Feather name="more-vertical" size={26} color="#444" />
                    </View>

                </View>

                <Text style={styles.title}>Account Details</Text>

                <Text style={styles.back}>← Back to Dashboard</Text>

                <View style={styles.cardWrapper}>

                    {/* Blue shadow */}
                    <BlurView intensity={60} tint="light" style={styles.cardShadow} />
                    <LinearGradient
                        colors={["#B9B7F3", "#9AA4F5", "#8FA7FF"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.card}
                    >

                        {/* Top Row */}
                        <View style={styles.topRow}>
                            <Text style={styles.student}>Student ID: R2012567</Text>

                            <Image
                                source={require("../../assets/images/NFC_icon.png")}
                                style={styles.nfc}
                            />
                        </View>

                        {/* CHIP + EYE ROW */}
                        <View style={styles.chipContainer}>

                            {/* CHIP */}
                            <Image
                                source={require("../../assets/images/card_chip_icon.png")}
                                style={styles.chip}
                            />

                            {/* EYE + MASK */}
                            <View style={styles.eyeRow}>
                                <Feather name="eye" size={16} color="#fff" />

                                <Image
                                    source={require("../../assets/images/balance_on_card_hidden.png")}
                                    style={styles.maskImage}
                                />
                            </View>

                        </View>

                        {/* Visa */}
                        <Image
                            source={require("../../assets/images/Visa_logo.png")}
                            style={styles.visa}
                        />
                        {/* NAME */}
                        <Text style={styles.name}>Evan Yates</Text>

                        {/* TOTAL */}
                        <Text style={styles.total}>Total Due: ₹17,000</Text>

                    </LinearGradient>
                </View>

                <View style={styles.tabs}>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "overall" && styles.activeTab]}
                        onPress={() => setActiveTab("overall")}
                    >
                        <Text style={activeTab === "overall" && styles.activeText}>
                            Over All Fee
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "history" && styles.activeTab]}
                        onPress={() => setActiveTab("history")}
                    >
                        <Text style={activeTab === "history" && styles.activeText}>
                            History
                        </Text>
                    </TouchableOpacity>

                </View>


                {/* OVERALL LIST */}

                {activeTab === "overall" &&
                    overallFees.map((item, index) => (
                        <View key={index} style={styles.feeCard}>

                            <View style={styles.iconBox}>
                                <Image
                                    source={require("../../assets/images/transaction_types_icons.png")}
                                    style={{ width: 22, height: 40 }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.feeTitle}>{item.title}</Text>
                                <Text style={styles.sub}>{item.sub}</Text>
                                <Text
                                    style={[
                                        styles.sub,
                                        item.status === "Due" && styles.dueDate
                                    ]}
                                >
                                    Due Date
                                </Text>
                                <Text style={styles.sub}>Time</Text>

                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.amount}>{item.amount}</Text>

                                <View
                                    style={[
                                        styles.statusBadge,
                                        item.status === "Paid" ? styles.paidBadge : styles.dueBadge
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            item.status === "Paid" ? styles.paidText : styles.dueText
                                        ]}
                                    >
                                        {item.status}
                                    </Text>
                                </View>

                                {/* DATE */}
                                <Text
                                    style={[
                                        styles.sub,
                                        item.status === "Due" && styles.dueDate
                                    ]}
                                >
                                    {item.date}
                                </Text>
                                <Text style={styles.sub}>10:34 AM</Text>
                            </View>

                        </View>
                    ))
                }

                {/* HISTORY LIST */}

                {activeTab === "history" &&
                    historyFees.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.feeCard}
                            onPress={() => router.push("/AccountDetails/AccountdetailsExam")}
                        >

                            <View style={styles.iconBox}>
                                <Image
                                    source={require("../../assets/images/transaction_types_icons.png")}
                                    style={{ width: 22, height: 40 }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.feeTitle}>{item.title}</Text>
                                <Text style={styles.sub}>{item.sub}</Text>
                                <Text
                                    style={[
                                        styles.sub,
                                        item.status === "Due" && styles.dueDate
                                    ]}
                                >
                                    Due Date
                                </Text>

                                <Text style={styles.sub}>ID:23453453322</Text>
                            </View>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.amount}>{item.amount}</Text>

                                <View style={styles.paidBadge}>
                                    <Text style={styles.paidText}>Paid</Text>
                                </View>

                                <Text style={styles.sub}>{item.date}</Text>

                                <Text style={styles.transaction}>View Transaction</Text>
                            </View>

                        </TouchableOpacity>


                    ))
                }



            </ScrollView>

            {/* sidebar
            {/* Drawer */}

        </View >

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        padding: 16,
    },

    tabs: {
        flexDirection: "row",
        marginVertical: 15,
        backgroundColor: "#E8ECF5",
        borderRadius: 14,
        padding: 5
    },

    tab: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },

    headerCard: {
        marginTop: 2,
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 12,
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },

    headerAvatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20
    },

    statusBadge: {
        paddingHorizontal: 13,
        paddingVertical: 0,
        borderRadius: 8,
        marginTop: 4
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600"
    },

    paidBadge: {
        backgroundColor: "#CFF7E3",
        paddingHorizontal: 13,
        borderRadius: 8,
    },

    dueBadge: {
        backgroundColor: "#FFD6D6"
    },
    paidText: {
        color: "#16A34A",
        fontSize: 12,
        fontWeight: "600",
        padding: 2,


    },

    dueText: {
        color: "#DC2626"
    },

    date: {
        color: "#6B7280"
    },

    dueDate: {
        color: "#EF4444"
    },

    back: {
        color: "#4A63F5",
        marginVertical: 10,
        fontSize: 16,
    },

    cardWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    cardShadow: {
        position: "absolute",
        bottom: -20,
        width: 220,
        height: 40,
        borderRadius: 100,
        backgroundColor: "rgba(161, 179, 243, 0.35)"
    }
    ,
    card: {
        width: 280,
        height: 191,
        borderRadius: 20,
        padding: 20,
        justifyContent: "space-between",
        position: "relative"
    },

    student: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.85,
        marginBottom: 15
    },

    row: {
        flexDirection: "row",
        alignItems: "center"
    },

    chipContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: -14,
    },

    chip: {
        width: 40,
        height: 43,
        marginTop: 25,
        resizeMode: "contain"
    },

    eyeRow: {
        flexDirection: "row",
        alignItems: "center"
    },

    name: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600"
    },

    total: {
        color: "#fff",
        marginTop: -4,
        fontSize: 14
    },

    visa: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 70,
        height: 28,
        resizeMode: "contain"
    },
    s: {
        flexDirection: "row",
        marginVertical: 15
    },

    activeTab: {
        backgroundColor: "#4A63F5"
    },

    activeText: {
        color: "#fff"
    },
    maskImage: {
        width: 70,
        height: 18,
        resizeMode: "contain",
        marginLeft: 6
    },
    feeCard: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },

    iconBox: {
        width: 50,
        height: 40,
        backgroundColor: "#DDE4FF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        marginBottom: 20,
    },

    feeTitle: {
        fontWeight: "600"
    },

    sub: {
        color: "#888",
        fontSize: 12
    },

    amount: {
        fontWeight: "bold"
    },

    status: {
        marginTop: 3
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nfc: {
        width: 22,
        height: 22,
        tintColor: "#fff"
    },

    // sidebar styles
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)"
    },

    drawer: {
        position: "absolute",
        left: 10,
        top: 10,
        bottom: 40,
        width: 230,
        height: 700,
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingTop: 25,
        paddingHorizontal: 20,
        // elevation: 20
    },

    drawerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30
    },

    drawerLogo: {
        width: 35,
        height: 35,
        marginRight: 10,
        resizeMode: "contain"
    },

    drawerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4A63F5"
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8
    },

    menuText: {
        fontSize: 15,
        marginLeft: 14,
        color: "#7B8190",
        fontWeight: "500"
    },

    activeMenu: {
        backgroundColor: "#EEF1FF"
    },

    logoutBtn: {
        backgroundColor: "#4A63F5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 20
    },

    logoutText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600",
        fontSize: 14
    }
});
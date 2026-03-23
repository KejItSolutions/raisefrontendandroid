import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function PaymentSuccessScreen() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(-260)).current;
    const router = useRouter();

    const openDrawer = () => {
        setDrawerOpen(true);
        Animated.timing(drawerAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
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


    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* NAVBAR */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image
                        source={require("../../../assets/images/watermark.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <View style={styles.navRight}>
                    <Feather name="bell" size={22} color="#444" />

                    <Image
                        source={{ uri: student.avatar }}
                        style={styles.avatar}
                    />

                    <Feather name="more-vertical" size={22} color="#444" />
                </View>
            </View>

            <Text style={styles.title}>Account Details</Text>

            <TouchableOpacity onPress={() => router.push("/AccountDetails/AccountDetailsAcademic")}>
                <Text style={styles.back}>← Back to History</Text>
            </TouchableOpacity>

            <View style={styles.successIconContainer}>
                <Image
                    source={require("../../../assets/images/SuccessIcon.png")}
                    style={styles.successIcon}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.successTextContainer}>
                <Text style={styles.title}>Payment Success!</Text>

                <Text style={styles.sub}>
                    Your payment was successful.
                </Text>
            </View>

            <View style={styles.card}>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount</Text>
                    <Text style={styles.amount}>₹80,000</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Status</Text>

                    <View style={styles.successBadge}>
                        <Text style={styles.successText}>Success</Text>
                    </View>
                </View>

                <View style={styles.line} />

                <View style={styles.row}>
                    <Text style={styles.label}>Transaction ID</Text>
                    <Text style={styles.value}>QWERTYUIOPASD</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sender</Text>
                    <Text style={styles.value}>Faith Adeyemi</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Receiver</Text>
                    <Text style={styles.value}>Joy Amadi</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Text style={styles.value}>Bank Transfer</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Payment Time</Text>
                    <Text style={styles.value}>May 27, 2025, 15:26:10</Text>
                </View>

            </View>

            <TouchableOpacity style={styles.share}>
                <Text style={{ color: "#4A63F5" }}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.download}>
                <Text style={{ color: "#fff" }}>Download Receipt</Text>
            </TouchableOpacity>

        </ScrollView>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#eaeff9",
        padding: 20,
        // alignItems: "center",
        // justifyContent: "center",
    },

    navbar: {
        width: 295,
        height: 75,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: -2,

        shadowColor: "#C4CBD6",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6
    },

    logo: {
        width: 36,
        height: 36
    },
    amount: {
        fontWeight: "600",
        fontSize: 18,
    },

    successTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center"
    },

    sub: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 6,
        textAlign: "center"
    },

    back: {
        color: "#4A63F5",
        marginVertical: 10,
        fontSize: 16,
    },


    navRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 20
    },


    successIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },

    successIcon: {
        width: 80,
        height: 80
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },

    label: {
        color: "#6B7280",
        fontSize: 12
    },

    successBadge: {
        backgroundColor: "#CFF7E3",
        paddingHorizontal: 9,
        paddingVertical: 2,
        borderRadius: 14
    },

    successText: {
        color: "#16A34A",
        fontWeight: "400"
    },

    sub: {
        color: "#777",
        marginBottom: 20
    },

    card: {
        backgroundColor: "#fff",
        width: 285,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20
    },

    value: {
        fontSize: 12,
        fontWeight: "400"
    },

    line: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 10
    },

    share: {
        borderWidth: 1,
        borderColor: "#4A63F5",
        width: "100%",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10
    },

    download: {
        backgroundColor: "#4A63F5",
        width: "100%",
        padding: 14,
        borderRadius: 12,
        alignItems: "center"
    }

})
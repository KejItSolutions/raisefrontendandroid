import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

const { width } = Dimensions.get("window");

export default function StudentProfile() {
  const router = useRouter();
  const [showCard, setShowCard] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, { toValue: -260, duration: 250, useNativeDriver: true })
      .start(() => setDrawerOpen(false));
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header openDrawer={openDrawer} />
        
        <Text style={styles.welcome}>Welcome back, {student.name}!</Text>
        <Text style={styles.title}>Student profile</Text>

        {/* Student Card */}
        <View style={styles.card}>
          <Image source={require("../../assets/images/watermark.png")} style={styles.watermark} />
          <View style={styles.profileTop}>
            <Image source={{ uri: student.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.email}>{student.email}</Text>
            </View>
            <Feather name="more-vertical" size={20} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View><Text style={styles.label}>Birthday</Text><Text style={styles.value}>{student.birthday}</Text></View>
            <View><Text style={styles.label}>Register No</Text><Text style={styles.value}>{student.registerNo}</Text></View>
          </View>
          <View style={styles.row}>
            <View><Text style={styles.label}>Stream</Text><Text style={styles.value}>{student.stream}</Text></View>
            <View><Text style={styles.label}>Mobile No</Text><Text style={styles.value}>{student.mobile}</Text></View>
          </View>
        </View>

        {/* Parent Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View><Text style={styles.label}>Parent (Father)</Text><Text style={styles.value}>{student.father}</Text></View>
            <View><Text style={styles.label}>Mobile No</Text><Text style={styles.value}>{student.fatherMobile}</Text></View>
          </View>
          <TouchableOpacity onPress={() => setShowCard(true)}>
            <LinearGradient colors={["#4A63F3", "#5B6CF5"]} style={styles.button}>
              <Feather name="credit-card" size={18} color="#fff" />
              <Text style={styles.buttonText}>View Digital Card</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showCard} transparent animationType="fade">
        <TouchableOpacity activeOpacity={1} style={styles.modalOverlay} onPress={() => setShowCard(false)}>
          <View style={styles.digitalCard}>
             <View style={styles.digitalTop}>
               <Image source={require("../../assets/images/watermark.png")} style={styles.digitalWatermark} />
               <Image source={{ uri: student.avatar }} style={styles.digitalAvatar} />
               <Text style={styles.digitalName}>{student.name}</Text>
               <Text style={styles.digitalCourse}>{student.stream}</Text>
               <Text style={styles.digitalReg}>{student.registerNo}</Text>
             </View>
             <Text style={styles.validText}>Valid till Sept 2026</Text>
             <View style={styles.barcodeBox}><View style={styles.barcode} /></View>
          </View>
        </TouchableOpacity>
      </Modal>

      <DrawerMenu drawerOpen={drawerOpen} closeDrawer={closeDrawer} drawerAnim={drawerAnim} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#EEF1F7", },
  container: { paddingHorizontal: 20, paddingBottom: 30 },
  welcome: { fontSize: 14, color: "#7A7F9A", marginTop: 10 },
  title: { fontSize: 28, fontWeight: "700", color: "#0B132A", marginBottom: 10 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, marginTop: 15, elevation: 4 },
  profileTop: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 55, height: 55, borderRadius: 27, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "700" },
  email: { fontSize: 13, color: "#8A8FA3" },
  divider: { height: 1, backgroundColor: "#ECEEF6", marginVertical: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  label: { fontSize: 14, color: "#9AA0B4" },
  value: { fontSize: 15, fontWeight: "600", marginTop: 2 },
  button: { borderRadius: 12, paddingVertical: 14, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
  watermark: { position: "absolute", alignSelf: "center", top: '30%', width: 200, height: 100, opacity: 0.05 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  digitalCard: { width: width * 0.85, backgroundColor: "#fff", borderRadius: 25, overflow: "hidden" },
  digitalTop: { backgroundColor: "#E9EBF7", alignItems: "center", paddingVertical: 25 },
  digitalWatermark: { position: "absolute", width: 200, height: 100, opacity: 0.1, top: 40 },
  digitalAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: "#4A63F3" },
  digitalName: { marginTop: 10, fontSize: 18, fontWeight: "700" },
  digitalCourse: { fontSize: 14, color: "#666" },
  digitalReg: { fontSize: 14, color: "#777" },
  validText: { marginTop: 20, textAlign: "center", color: "#555" },
  barcodeBox: { marginVertical: 25, alignSelf: "center", backgroundColor: "#D9DCF5", padding: 8, borderRadius: 8 },
  barcode: { width: 180, height: 35, backgroundColor: "#4259FA" },
});
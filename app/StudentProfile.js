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
} from "react-native";
import DrawerMenu from "./components/DrawerMenu";
import Header from "./components/Header";
const { width } = Dimensions.get("window");

export default function StudentProfile() {
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#EEF1F7", "#DCE1F1"]} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Header openDrawer={openDrawer}/>
          <Text style={styles.welcome}>Welcome back, {student.name}!</Text>
          <Text style={styles.title}>Student profile</Text>

          {/* Student Card */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/watermark.png")}
              style={styles.watermark}
            />
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
              <View>
                <Text style={styles.label}>Birthday</Text>
                <Text style={styles.value}>{student.birthday}</Text>
              </View>
              <View>
                <Text style={styles.label}>Register No</Text>
                <Text style={styles.value}>{student.registerNo}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Stream</Text>
                <Text style={styles.value}>{student.stream}</Text>
              </View>
              <View>
                <Text style={styles.label}>Mobile No</Text>
                <Text style={styles.value}>{student.mobile}</Text>
              </View>
            </View>
          </View>

          {/* Parent Card */}
          <View style={styles.card1}>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Parent (Father)</Text>
                <Text style={styles.value}>{student.father}</Text>
              </View>
              <View>
                <Text style={styles.label}>Mobile No</Text>
                <Text style={styles.value}>{student.fatherMobile}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => setShowCard(true)}>
              <LinearGradient
                colors={["#4A63F3", "#5B6CF5"]}
                style={styles.button}
              >
                <Feather name="credit-card" size={18} color="#fff" />
                <Text style={styles.buttonText}>View Digital Card</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Digital Card Modal */}
      <Modal visible={showCard} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setShowCard(false)}
        >
          <View style={styles.digitalCard}>
            <View style={styles.digitalTop}>
              <Image
                source={require("../assets/images/watermark.png")}
                style={styles.digitalWatermark}
              />
              <Image source={{ uri: student.avatar }} style={styles.digitalAvatar} />
              <Text style={styles.digitalName}>{student.name}</Text>
              <Text style={styles.digitalCourse}>{student.stream}</Text>
              <Text style={styles.digitalReg}>{student.registerNo}</Text>
            </View>

            <Text style={styles.validText}>Valid till Sept 2026</Text>

            <View style={styles.barcodeBox}>
              <View style={styles.barcode}></View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Drawer Menu */}
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        
        router={router}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: width * 0.05 },
  
  welcome: { marginTop: 20, fontSize: width * 0.039, color: "#7A7F9A", paddingLeft: 13 },
  title: { fontSize: width * 0.09, fontWeight: "700", marginTop: 5, color: "#0B132A", paddingLeft: 13 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, marginTop: 20, elevation: 5 },
  card1: { backgroundColor: "#fff", borderRadius: 20, padding: 20, marginTop: 25, elevation: 5 },
  profileTop: { flexDirection: "row", alignItems: "center" },
  avatar: { width: width * 0.12, height: width * 0.14, borderRadius: 30, marginRight: 10 },
  name: { fontSize: width * 0.04, fontWeight: "700", paddingLeft: 3, marginTop: 18 },
  email: { fontSize: width * 0.032, color: "#8A8FA3", paddingBottom: 7, paddingLeft: 3 },
  divider: { height: 1, backgroundColor: "#ECEEF6", marginVertical: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 10 },
  label: { fontSize: width * 0.04, color: "#9AA0B4" },
  value: { fontSize: width * 0.04, fontWeight: "600", marginTop: 2 },
  button: { borderRadius: 12, paddingVertical: 14, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "600", marginLeft: 6, fontSize: width * 0.035 },
  watermark: { position: "absolute", alignSelf: "center", top: 81, width: width * 0.6, height: width * 0.35, opacity: 0.15 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.15)" },
  digitalCard: { width: width * 0.85, backgroundColor: "#fff", borderRadius: 25, overflow: "hidden", elevation: 15 },
  digitalTop: { backgroundColor: "#E9EBF7", width: "100%", alignItems: "center", padding: 10, borderRadius: 10, paddingVertical: 25, position: "relative" },
  digitalWatermark: { position: "absolute", marginTop: 40, width: width * 0.58, height: width * 0.35, opacity: 0.15, top: 40 },
  digitalAvatar: { width: 70, height: 70, borderRadius: 40, borderWidth: 3, borderColor: "#4A63F3" },
  digitalName: { marginTop: 10, fontSize: 18, fontWeight: "700" },
  digitalCourse: { fontSize: 14, color: "#666" },
  digitalReg: { fontSize: 14, color: "#777" },
  validText: { marginTop: 20, textAlign: "center", color: "#555" },
  barcodeBox: { marginTop: 15, marginBottom: 25, alignSelf: "center", backgroundColor: "#D9DCF5", borderRadius: 8, padding: 8 },
  barcode: { width: 180, height: 35, backgroundColor: "#4259FA" },
});

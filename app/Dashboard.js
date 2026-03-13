import { useRef, useState } from "react";
import {
Animated,
Dimensions,
Image,
SafeAreaView,
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
View,
Platform,
StatusBar,
} from "react-native";

import DrawerMenu from "./components/DrawerMenu";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "./components/Header";

const { width } = Dimensions.get("window");

export default function Dashboard() {
const router = useRouter();

// Drawer Menu State
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

return ( 
<SafeAreaView style={styles.container}> 
  <ScrollView showsVerticalScrollIndicator={false}>

    {/* Header */}
    <Header openDrawer={openDrawer} />

    {/* Title */}
    <Text style={styles.title}>Dashboard</Text>

    {/* Top Cards */}
    <View style={styles.cardsContainer}>

      {/* Left Column */}
      <View style={styles.leftColumn}>

        <TouchableOpacity
          style={styles.smallCard}
          onPress={() => router.push("/ScholarshipDetails")}
        >
          <Image
            source={require("../assets/images/scholarship.png")}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>Scholarships</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallCard}
          onPress={() => router.push("/Document")}
        >
          <Image
            source={require("../assets/images/Folders.png")}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>My Documents</Text>
        </TouchableOpacity>

      </View>

      {/* Certificates Card */}
      <TouchableOpacity
        style={styles.largeCard}
        onPress={() => router.push("/Certificates")}
      >
        <Text style={styles.cardText}>Certificates</Text>
        <Text style={styles.cardSubText}>Courses</Text>

        <Image
          source={require("../assets/images/Certification.png")}
          style={styles.largeIcon}
        />
      </TouchableOpacity>

    </View>

    {/* Leave Request */}
    <TouchableOpacity style={styles.leaveCard}>
      <Image
        source={require("../assets/images/Leavechat.png")}
        style={{ width: 22, height: 22 }}
      />
      <Text style={styles.leaveText}>Leave Request</Text>
    </TouchableOpacity>

    {/* Student Progress */}
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>Student Progress</Text>

      <View style={styles.divider} />

      <View style={styles.progressRow}>
        <View style={styles.progressCircle} />

        <View style={styles.progressStats}>
          <Text style={styles.statBlue}>
            <Text style={{ fontSize: 20 }}>●</Text> 88% Attendance
          </Text>

          <Text style={styles.statPurple}>
            <Text style={{ fontSize: 20 }}>●</Text> 73% 4th Semester
          </Text>

          <Text style={styles.statBlack}>
            <Text style={{ fontSize: 20 }}>●</Text> 60.8 C.G.P.A
          </Text>
        </View>
      </View>
    </View>

    {/* Account Details */}
    <TouchableOpacity style={styles.accountCard}>
      <Ionicons name="person-outline" size={20} color="red" />
      <Text style={styles.accountText}>Account Details</Text>
    </TouchableOpacity>

  </ScrollView>

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

container: {
flex: 1,
backgroundColor: "#EEF1F7",
paddingHorizontal: 20,

},

title: {
fontSize: 26,
fontWeight: "700",
marginTop: 10,
marginBottom: 15,
},

cardsContainer: {
flexDirection: "row",
justifyContent: "space-between",
marginBottom: 10,
},

leftColumn: {
width: "50%",
},

smallCard: {
backgroundColor: "#fff",
borderRadius: 15,
padding: 15,
marginBottom: 15,
elevation: 3,
flexDirection: "row",
alignItems: "center",
height: 70,
},

cardIcon: {
width: 30,
height: 30,
marginRight: 10,
},

largeCard: {
width: "46%",
backgroundColor: "#fff",
borderRadius: 15,
padding: 18,
alignItems: "center",
justifyContent: "center",
elevation: 3,
height: 155,
},

largeIcon: {
width: 60,
height: 60,
marginTop: 10,
},

cardText: {
fontSize: 14,
textAlign: "center",
},

cardSubText: {
fontSize: 14,
},

leaveCard: {
backgroundColor: "#fff",
borderRadius: 15,
padding: 18,
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
marginBottom: 20,
elevation: 3,
},

leaveText: {
marginLeft: 10,
fontSize: 15,
},

progressCard: {
backgroundColor: "#fff",
borderRadius: 15,
padding: 18,
marginBottom: 20,
elevation: 3,
},

progressTitle: {
fontWeight: "600",
marginBottom: 10,
},

divider: {
height: 1,
backgroundColor: "#ECEEF6",
marginVertical: 15,
},

progressRow: {
flexDirection: "row",
alignItems: "center",
},

progressCircle: {
width: 90,
height: 90,
borderRadius: 45,
borderWidth: 7,
borderColor: "#4A63F3",
marginRight: 20,
},

progressStats: {
flex: 1,
},

statBlue: {
color: "#2563eb",
marginBottom: 5,
},

statPurple: {
color: "#343D7E",
marginBottom: 5,
},

statBlack: {
color: "#000",
},

accountCard: {
backgroundColor: "#fff",
borderRadius: 15,
padding: 18,
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
elevation: 3,
},

accountText: {
marginLeft: 10,
},

});

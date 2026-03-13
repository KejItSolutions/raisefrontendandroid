import { useRef, useState } from "react";
import {
<<<<<<< HEAD
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
=======
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
>>>>>>> origin/develop

const { width } = Dimensions.get("window");

export default function Dashboard() {
<<<<<<< HEAD
  const router = useRouter();

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

  const menuItems = [
    { name: "Dashboard", icon: "grid" },
    { name: "Academics", icon: "book-open" },
    { name: "Maps", icon: "map-pin" },
    { name: "Careers", icon: "target" },
    { name: "Events", icon: "award" },
    { name: "Sports & Athletics", icon: "activity" },
    { name: "Feedback", icon: "message-square" },
  ];

  // Student data (temporary)
  const student = {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={require("../assets/images/watermark.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <Feather name="bell" size={28} color="#444" />

            <Image
              source={{ uri: student.avatar }}
              style={styles.headerAvatar}
            />

            <Feather name="more-vertical" size={28} color="#444" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Dashboard</Text>

        {/* Top Cards */}
        <View style={styles.cardsContainer}>
          {/* LEFT SIDE */}
          <View style={styles.leftColumn}>
            <View style={styles.smallCard}>
              <Image
                source={require("../assets/images/scholarship.png")}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  marginTop: 10,
                  marginLeft: 0,
                }}
              />
              <Text style={styles.cardText}>Scholarships</Text>
            </View>

            <View style={styles.smallCard}>
              <Image
                source={require("../assets/images/Folders.png")}
                style={{ width: 35, height: 35 }}
              />
              <Text style={styles.cardText}>My Documents</Text>
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.largeCard}>
            <Text style={styles.cardText}>Certificates</Text>
            <Text style={styles.cardText1}>Courses</Text>
            <Image
              source={require("../assets/images/Certification.png")}
              style={{ width: 60, height: 60, marginTop: 1, marginLeft: 60 }}
            />
          </View>
        </View>

        {/* Leave Request */}
        <View style={styles.leaveCard}>
          <Image
            source={require("../assets/images/Leavechat.png")}
            style={{ width: 22, height: 22 }}
          />
          <Text style={styles.leaveText}>Leave Request</Text>
        </View>

        {/* Student Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Student Progress</Text>
          <View style={styles.divider} />
          <View style={styles.progressRow}>
            <View style={styles.progressCircle}></View>

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
        <View style={styles.accountCard}>
          <Ionicons name="person-outline" size={20} color="red" />
          <Text style={styles.accountText}>Account Details</Text>
        </View>
      </ScrollView>

      {/* Drawer */}
      {drawerOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={closeDrawer}
        >
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
          >
            <View style={styles.drawerHeader}>
              <Image
                source={require("../assets/images/watermark.png")}
                style={styles.drawerLogo}
              />
              <Text style={styles.drawerTitle}>Classroom</Text>
            </View>

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, index === 0 && styles.activeMenu]}
                onPress={() => {
                  if (item.name === "Dashboard") {
                    router.push("/Dashboard");
                  }
                  closeDrawer();
                }}
              >
                <Feather
                  name={item.icon}
                  size={20}
                  color={index === 0 ? "#4A63F3" : "#7B8190"}
                />

                <Text
                  style={[styles.menuText, index === 0 && { color: "#4A63F3" }]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.logoutBtn}>
              <Feather name="log-out" size={18} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF1F7",
    paddingHorizontal: 20,
  },

  headerCard: {
    marginTop: 65,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    paddingLeft: 23,
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
    width: 32,
    height: 32,
    borderRadius: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ECEEF6",
    marginVertical: 15,
  },

  topRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardText1: {
    paddingRight: 50,
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

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  drawer: {
    width: 250,
    margin: 10,
    marginTop: 30,
    borderRadius: 20,
    height: 700,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 20,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  drawerLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },

  drawerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5266d6",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  activeMenu: {
    backgroundColor: "#EEF1FF",
  },

  menuText: {
    marginLeft: 15,
    fontSize: 15,
    color: "#6F7685",
  },

  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#4A63F3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },

  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },

  leftColumn: {
    width: "50%",
    justifyContent: "space-between",
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
    width: 22,
    height: 22,
    marginRight: 8,
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

  cardText: {
    paddingRight: 30,
    paddingLeft: 0,
    marginTop: 2,
    fontSize: 14,
    textAlign: "center",
  },
=======
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

>>>>>>> origin/develop
});

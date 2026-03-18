import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function DrawerMenu({ drawerOpen, closeDrawer, drawerAnim }) {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: "grid", route: "/Dashboard" },

    { name: "Academics", icon: "book-open", route: "/Academics" },
    { name: "Maps", icon: "map-pin", route: "/Maps" },
    { name: "Careers", icon: "target", route: "/carrer/Career" },
    { name: "Events", icon: "award", route: "/Events" },
    { name: "Sports&Athletics", icon: "activity", route: "/SportsAthletics" },
    { name: "Feedback", icon: "message-square", route: "/Feedback" },
  ];

  if (!drawerOpen) return null;

  return (
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
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Classroom</Text>
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              router.replace(item.route);
              closeDrawer();
            }}
          >
            <Feather name={item.icon} size={20} color="#7B8190" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.push("/LoginScreen")}
        >
          <Feather name="log-out" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    elevation: 999,
    zIndex: 999,
  },

  drawer: {
    width: wp("60%"),
    height: hp("100%"),
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    position: "absolute", // important
    left: 0,
    top: 0,
    zIndex: 1000,
    elevation: 1000,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    height: hp("6%"),
    width: wp("10%"),
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5266d6",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
});

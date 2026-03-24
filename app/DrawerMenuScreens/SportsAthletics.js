import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Dimensions,
  Platform,
  StatusBar
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

export default function SportsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Inter-College", "University", "District", "State"];
  const { width } = Dimensions.get("window");
  const scale = width / 375;

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab, index) => {
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: index * 100,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const upcomingMatches = [
    {
      id: 1,
      title: "Basketball Championship",
      time: "Tomorrow, 2:00 PM",
      location: "Sports Complex, Main Campus",
      type: "Inter-College",
      icon: "basketball",
      iconBg: "#fde7d2",
      color: "#f97316",
    },
    {
      id: 2,
      title: "Football League",
      time: "Dec 15, 4:00 PM",
      location: "University Stadium",
      type: "Inter-College",
      icon: "soccer",
      iconBg: "#d9f3e4",
      color: "#16a34a",
    },
    {
      id: 3,
      title: "Volleyball",
      subtitle: "Annual League Match",
      time: "March 12, 2024 • 3:00 PM",
      location: "Indoor Sports Hall",
      status: "Completed",
      action: "View Results",
      type: "Inter-College",
      icon: "volleyball",
      iconBg: "#dbeafe",
      color: "#2563eb",
    },
    {
      id: 4,
      title: "Table Tennis",
      subtitle: "Singles Championship",
      time: "March 20, 2024 • 10:00 AM",
      location: "Recreation Center",
      status: "Upcoming",
      action: "Register Now",
      type: "University",
      icon: "table-tennis",
      iconBg: "#fde2e2",
      color: "#ef4444",
    },
    {
      id: 5,
      title: "Athletics",
      subtitle: "Track & Field Championship",
      time: "March 25, 2024 • 7:00 AM",
      location: "University Stadium",
      status: "Upcoming",
      action: "View Schedule",
      type: "District",
      icon: "dumbbell",
      iconBg: "#ede9fe",
      color: "#7c3aed",
    },
    {
      id: 6,
      title: "Cricket",
      subtitle: "T20 Tournament Final",
      time: "March 22, 2024 • 2:00 PM",
      location: "University Cricket Ground",
      status: "Upcoming",
      action: "Book Tickets",
      type: "State",
      icon: "cricket",
      iconBg: "#fef3c7",
      color: "#ca8a04",
    },
  ];

  const filteredMatches =
    activeTab === "All"
      ? upcomingMatches
      : activeTab === "University"
      ? upcomingMatches.filter(
          (match) =>
            match.title === "Basketball Championship" ||
            match.title === "Football League" ||
            match.title === "Table Tennis"
        )
      : activeTab === "District"
      ? upcomingMatches.filter(
          (match) =>
            match.title === "Basketball Championship" ||
            match.title === "Football League" ||
            match.title === "Athletics"
        )
      : activeTab === "State"
      ? upcomingMatches.filter(
          (match) =>
            match.title === "Basketball Championship" ||
            match.title === "Football League" ||
            match.title === "Cricket"
        )
      : upcomingMatches.filter((match) => match.type === activeTab);

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
    <SafeAreaView
      style={styles.safeArea}
    >
        <Header openDrawer={openDrawer} />
        <View >
            <Text style={styles.title}>Sports & Athletics</Text>

          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Icon name="arrow-left" size={18} color="#4c63ff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabs}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab} // ✅ key added here
                onPress={() => handleTabPress(tab, index)}
                style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
              >
                <Text
                  style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
      
      <ScrollView  showsVerticalScrollIndicator={false}>
      

        

        {/* Matches */}
        {filteredMatches.map((match, index) => (
          <View key={match.id}>
            <View style={styles.card}>
              <View style={styles.topRightBadge}>
                <Text style={styles.badgeText}>
                  {activeTab === "University"
                    ? "University"
                    : activeTab === "District"
                    ? "District"
                    : activeTab === "State"
                    ? "State"
                    : match.type}
                </Text>
              </View>

              <View style={styles.cardRow}>
                <View style={[styles.iconBox, { backgroundColor: match.iconBg }]}>
                  <MaterialIcon name={match.icon} size={22} color={match.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.matchTitle}>{match.title}</Text>
                  {match.subtitle && <Text style={styles.subtitle}>{match.subtitle}</Text>}

                  <View style={styles.locationRow}>
                    <MaterialIcon name="calendar" size={16} color="#6b7280" />
                    <Text style={styles.locationText}>{match.time}</Text>
                  </View>

                  <View style={styles.locationRow}>
                    <Icon name="map-pin" size={14} color="#6b7280" />
                    <Text style={styles.locationText}>{match.location}</Text>
                  </View>
                </View>
              </View>

              {match.status && (
                <View style={styles.bottomRow}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{match.status}</Text>
                  </View>
                  <Text style={styles.actionText}>{match.action}</Text>
                </View>
              )}
            </View>

            {/* Example special section */}
            {index === 1 && activeTab === "All" && (
              <View key={`special-${match.id}`}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 12,
                  }}
                >
                  Today's Sports Schedule
                </Text>

                <View
                  style={{
                    backgroundColor: "#cfd6ff",
                    padding: 16,
                    borderRadius: 18,
                    marginBottom: 15,
                  }}
                >
                  <View style={styles.cardRow}>
                    <View
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 12,
                        backgroundColor: "#bcd0ff",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 12,
                      }}
                    >
                      <MaterialIcon name="volleyball" size={22} color="#2563eb" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.matchTitle}>Volleyball Practice</Text>
                      <Text style={styles.locationText}>6:00 AM - 8:00 AM</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#bbf7d0",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 12,
                      }}
                    >
                      <Text style={{ color: "#166534" }}>Ongoing</Text>
                    </View>
                    <Text style={{ color: "#6b7280" }}>Court A</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

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
  safeArea: { 
    flex: 1, 
    backgroundColor: "#EEF1F7", 
   padding: wp("5%"),
  },
 
  title: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 10,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backText: {
    color: "#4c63ff",
    marginLeft: 8,
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 0.1,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#4c63ff",
    borderColor: "#4c63ff",
  },
  tabText: {
    color: "#4c63ff",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20, 
    borderRadius: 20, 
    elevation: 4,
    marginBottom: 20
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },
  locationText: {
    marginLeft: 6,
    color: "#6b7280",
  },
  topRightBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  badgeText: {
    color: "#3b82f6",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },
  statusBadge: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#065f46",
    fontWeight: "500",
  },
  actionText: {
    color: "#3b82f6",
    fontWeight: "500",
  },
});
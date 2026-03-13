import {
  ArrowLeft,
  ArrowUp,
  Building2,
  CheckCircle,
  Users
} from "lucide-react-native";

import { useState, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";

import { useRouter } from "expo-router";

import Header from "./components/Header";
import DrawerMenu from "./components/DrawerMenu";

const COLORS = {
  primary: "#4259FA",
  secondary: "#F97D24",
  background: "#F3F6FF",
  white: "#FFFFFF",
  textGray: "#888",
  success: "#0AC947",
};

export default function ScholarshipScreen() {

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("status");

  // Drawer
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

  const eligibleData = [
    { id: 1, title: "Merit Based \nScholarships 2026", lastDate: "2025-12-23" },
    { id: 2, title: "Alumni Scholarships from \n batch 2023 to 2025", lastDate: "2025-12-14" },
    { id: 3, title: "Need Based \nScholarships 2026", lastDate: "2025-12-13" }
  ];

  const statusData = [
    {
      id: 4,
      title: "Merit Based \nScholarships 2026",
      amount: "25000/year",
      status: "Approved"
    },
    {
      id: 5,
      title: "Alumni Scholarships \nfrom batch 2023 to 2025",
      lastDate: "14 Dec 2025",
      status: "Pending"
    }
  ];

  const renderCard = ({ item }) => {

    const isEligible = activeTab === "eligible";
    const isAlumni = item.title.toLowerCase().includes("alumni");

    return (
      <View style={styles.card}>

        <View style={styles.cardHeader}>

          <View style={styles.iconBox}>
            {isAlumni
              ? <Users color={COLORS.secondary} size={28} />
              : <Building2 color={COLORS.primary} size={28} />}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            {isEligible ? (

              <View style={styles.eligibleRow}>

                <Text style={styles.dateText}>
                  Last date {item.lastDate}
                </Text>

                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply now</Text>
                </TouchableOpacity>

              </View>

            ) : (

              <View style={styles.statusRow}>

                <Text style={styles.subText}>
                  {item.amount
                    ? `Rs ${item.amount}`
                    : `Last date ${item.lastDate}`}
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>

              </View>

            )}

          </View>

          <View style={styles.statusIconWrapper}>

            {isEligible
              ? <ArrowUp color={COLORS.secondary} size={24} />
              : <CheckCircle color={COLORS.success} size={24} />}

          </View>

        </View>

      </View>
    );
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Header openDrawer={openDrawer} />

      <Text style={styles.title}>Scholarships</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/Dashboard")}
      >
        <ArrowLeft color={COLORS.primary} size={20} />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>

        <TouchableOpacity
          style={[styles.tab, activeTab === "eligible" && styles.activeTab]}
          onPress={() => setActiveTab("eligible")}
        >
          <Text style={[styles.tabLabel, activeTab === "eligible" && styles.activeLabel]}>
            Eligible to apply
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "status" && styles.activeTab]}
          onPress={() => setActiveTab("status")}
        >
          <Text style={[styles.tabLabel, activeTab === "status" && styles.activeLabel]}>
            Applied
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={activeTab === "eligible" ? eligibleData : statusData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
    backgroundColor: COLORS.background,
    paddingHorizontal: 20
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },

  backText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: 16
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 25
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12
  },

  activeTab: {
    backgroundColor: COLORS.primary
  },

  tabLabel: {
    color: COLORS.primary,
    fontWeight: "600"
  },

  activeLabel: {
    color: "#FFF"
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 15,
    marginBottom: 15
  },

  cardHeader: {
    flexDirection: "row"
  },

  iconBox: {
    marginRight: 15
  },

  infoContainer: {
    flex: 1
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  subText: {
    color: COLORS.textGray
  },

  badge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "bold"
  },

  eligibleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  dateText: {
    color: COLORS.textGray
  },

  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10
  },

  applyBtnText: {
    color: "#FFF",
    fontWeight: "bold"
  },

  statusIconWrapper: {
    position: "absolute",
    right: 0,
    top: 5
  }

});
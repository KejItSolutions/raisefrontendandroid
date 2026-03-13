import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ADDED: Import the router
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- DYNAMIC DATA STRUCTURES ---
// You can easily replace these with data from Fetch or Axios calls
const initialDigiLockerDocs = [
  { id: "1", title: "Aadhaar Card", status: "Available" },
  { id: "2", title: "PAN Card", status: "Available" },
  { id: "3", title: "10th Marks Card", status: "Available" },
  { id: "4", title: "12th Marks Card", status: "Available" },
];

const initialCertifications = [
  { id: "1", title: "UG Semester 01 Marks card" },
  { id: "2", title: "UG Semester 02 Marks card" },
  { id: "3", title: "UG Semester 03 Marks card" },
  { id: "4", title: "UG Semester 04 Marks card" },
  { id: "5", title: "UG Semester 05 Marks card" },
];

export default function DocumentUploads() {
  const [digiDocs, setDigiDocs] = useState(initialDigiLockerDocs);
  const [certDocs, setCertDocs] = useState(initialCertifications);

  const router = useRouter(); // ADDED: Initialize the router

  // Reusable component for DigiLocker items
  const renderDigiLockerItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.itemLeft}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#00C853" />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="eye" size={20} color="#5C6BC0" />
      </TouchableOpacity>
    </View>
  );

  // Reusable component for Certification items
  const renderCertItem = (item) => (
    <View key={item.id} style={styles.listItem}>
      <View style={styles.itemLeft}>
        <Ionicons name="document-text-outline" size={24} color="#5C6BC0" />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Feather name="download" size={20} color="#4259FA" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      {/* TOP HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#333"
            style={styles.headerIcon}
          />
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Documents</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()} // ADDED: Navigate back when clicked
          >
            <Ionicons name="arrow-back" size={16} color="#5C6BC0" />
            <Text style={styles.backText}>Back to My documents</Text>
          </TouchableOpacity>
        </View>

        {/* DIGILOCKER INTEGRATION BANNER */}
        <View style={styles.integrationCard}>
          <Text style={styles.integrationTitle}>
            Integrated with Digi locker
          </Text>
          <Text style={styles.integrationSubtitle}>
            Access your official documents securely
          </Text>
          <TouchableOpacity style={styles.fetchButton} activeOpacity={0.8}>
            <Ionicons
              name="document-text"
              size={18}
              color="#FFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.fetchButtonText}>Fetch from Digi locker</Text>
          </TouchableOpacity>
        </View>

        {/* DIGILOCKER LIST SECTION */}
        <Text style={styles.sectionHeading}>From Digi locker</Text>
        {digiDocs.map(renderDigiLockerItem)}

        {/* RESULTS & CERTIFICATIONS SECTION */}
        <Text style={styles.sectionHeading}>Results and certification</Text>
        {certDocs.map(renderCertItem)}
      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 10,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerLogo:{
    height:50,
    width:50,
    
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#4259FA",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  integrationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  integrationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A1629",
    marginBottom: 4,
  },
  integrationSubtitle: {
    fontSize: 14,
    color: "#91929E",
    marginBottom: 16,
  },
  fetchButton: {
    flexDirection: "row",
    backgroundColor: "#4259FA",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    elevation: 4,
    shadowColor: '#448AFF', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8,
  },
  fetchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 12,
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTextContainer: {
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#91929E",
    marginTop: 2,
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#448AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#448AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

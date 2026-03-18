import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// 1. Import Shared Components
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import SettingAccordion from "./components/SettingAccordion";

// 2. Import Data
import { AccountItems } from "./Account/AccountItems";
import { CollegeInfoItems } from "./CollegeInfo/CollegeInfoItems";
import { HelpAndSupportItems } from "./HelpAndSupport/HelpAndSupportItems";
import { LocationItems } from "./Location/LocationItems";
import { NotificationItems } from "./Notifications/NotificationItems";
import { PreferenceItems } from "./Preferences/PreferenceItems";
import { PrivacyItems } from "./Privacy/PrivacyItems";
export default function SettingsAccordion() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-wp('60%'))).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, { 
      toValue: -wp('60%'), 
      duration: 250, 
      useNativeDriver: true 
    }).start(() => setDrawerOpen(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={["#F0F3FF", "#E8ECFB"]} style={styles.container}>
        <Header openDrawer={openDrawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.pageTitle}>Settings</Text>
          
          <View style={styles.whiteCard}>
            {/* using the imported component for everything */}
            <SettingAccordion title="Account" icon="account-outline" items={AccountItems} />
            <SettingAccordion title="Notifications" icon="bell-outline" items={NotificationItems} />
            <SettingAccordion title="Location & Tracking" icon="map-marker-outline" items={LocationItems} type="location" />           
            <SettingAccordion title="Privacy & Permissions" icon="lock-outline" items={PrivacyItems} />
            <SettingAccordion title="App Preferences" icon="apps" items={PreferenceItems} />       
            <SettingAccordion title="College Info" icon="office-building-outline" items={CollegeInfoItems} />            
            <SettingAccordion title="Help & Support" icon="help-circle-outline" items={HelpAndSupportItems} />
          </View>
        </ScrollView>
      </LinearGradient>

      <DrawerMenu 
        drawerOpen={drawerOpen} 
        closeDrawer={closeDrawer} 
        drawerAnim={drawerAnim} 
        router={router} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: wp('5%') },
  scrollContent: { paddingBottom: hp('5%') },
  pageTitle: { fontSize: wp('7%'), fontWeight: "700", color: "#1A1A1A", marginVertical: hp('2%') },
  whiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});
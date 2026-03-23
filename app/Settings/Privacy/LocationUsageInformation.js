import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function LocationUsageInformation() {
  const router = useRouter();
  
  // --- Drawer Logic ---
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
        
        {/* Shared Global Header */}
        <Header openDrawer={openDrawer} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.pageTitle}>Location Usage Information</Text>

          {/* Back Navigation Row */}
          <TouchableOpacity 
            style={styles.backRow} 
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color="#4A6FFF" />
            <Text style={styles.backText}>Back to Settings</Text>
          </TouchableOpacity>

          {/* Main Content Card */}
          <View style={styles.whiteCard}>
            
            {/* Section 1: When Tracking Starts */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>When Tracking Starts</Text>
              <Text style={styles.infoSubText}>
                Location tracking starts automatically when the student logs in and grants permission.
              </Text>
              <Text style={styles.infoSubText}>
                Tracking is active during college-defined hours and when the app is running in the background.
              </Text>
            </View>

            {/* Section 2: Data Collection */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>What Data Is Collected</Text>
              <Text style={styles.infoSubText}>The app collects the following information:</Text>
              <View style={styles.bulletContainer}>
                <Text style={styles.bullet}>• Current location (latitude & longitude)</Text>
                <Text style={styles.bullet}>• Campus zone or building (when inside campus)</Text>
                <Text style={styles.bullet}>• Entry and exit time from campus</Text>
                <Text style={styles.bullet}>• Last known location (if live tracking is unavailable)</Text>
              </View>
              <Text style={[styles.infoSubText, { marginTop: 10, fontWeight: '600' }]}>
                No audio, camera, or personal files are accessed.
              </Text>
            </View>

            {/* Section 3: Data Access */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Who Can See This Data</Text>
              <Text style={styles.infoSubText}>Location data is visible only to:</Text>
              <View style={styles.bulletContainer}>
                <Text style={styles.bullet}>• The linked parent</Text>
                <Text style={styles.bullet}>• Authorized college administrators (for safety)</Text>
              </View>
              <Text style={[styles.infoSubText, { marginTop: 10 , fontWeight: '600'  }]}>
                Location data is not shared with other students or third parties.
              </Text>
            </View>

            {/* Footer Note */}
            <Text style={styles.infoSubText}>
              Location tracking is used only for safety and campus monitoring purposes and follows the college’s privacy guidelines.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Shared Global Drawer */}
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
  pageTitle: { 
    fontSize: wp('7%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%') 
  },
  backRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp('2.5%') 
  },
  backText: { 
    color: '#4A6FFF', 
    marginLeft: 8, 
    fontSize: wp('4%'), 
    fontWeight: '600' 
  },
  whiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  infoBox: {
    backgroundColor: '#F0F4FF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    width: '100%'
  },
  infoTitle: { 
    fontSize: wp('4.2%'), 
    fontWeight: '700', 
    color: '#1A1A1A',
    marginBottom: 8
  },
  infoSubText: { 
    fontSize: wp('3.6%'), 
    color: '#4B5563', 
    lineHeight: 22,
  },
  bulletContainer: {
    marginTop: 8,
    paddingLeft: 5
  },
  bullet: {
    fontSize: wp('3.4%'),
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 20
  },
  footerNote: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: wp('3.2%'),
    marginTop: 10,
    lineHeight: 18,
    paddingHorizontal: 10
  }
});
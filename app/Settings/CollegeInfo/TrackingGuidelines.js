import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function TrackingGuidelines() {
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
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Shared Global Header */}
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Tracking Guidelines</Text>

        {/* Back Navigation Row */}
        <TouchableOpacity 
          style={styles.backRow} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        {/* Main Outer White Card */}
        <View style={styles.outerWhiteCard}>
          
          {/* Section 1: How it Works */}
          <View style={styles.innerBlueCard}>
            <Text style={styles.infoTitle}>How Tracking Works</Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>• Detects campus presence using geofencing</Text>
                <Text style={styles.listItem}>• Uses GPS for off-campus detection</Text>
                <Text style={styles.listItem}>• Indoor location uses campus Wi-Fi</Text>
            </View>
          </View>

          {/* Section 2: Important Notes */}
          <View style={styles.innerBlueCard}>
            <Text style={styles.infoTitle}>Important Notes</Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>• Location tracking works only when permissions are enabled</Text>
                <Text style={styles.listItem}>• Turning off location will limit tracking visibility</Text>
                <Text style={styles.listItem}>• Parents will be notified if tracking is disabled</Text>
            </View>
          </View>

          <Text style={styles.boldFooter}>
            This system is designed for awareness, not surveillance.
          </Text>
        </View>
      </ScrollView>

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
  scrollContent: { paddingHorizontal: wp('5%'), paddingBottom: hp('5%') },
  pageTitle: { 
    fontSize: wp('7.2%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%') 
  },
  backRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp('2%') 
  },
  backText: { 
    color: '#4A6FFF', 
    marginLeft: 10, 
    fontSize: wp('4.2%'), 
    fontWeight: '500' 
  },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 35,
    padding: wp('4%'),
    marginTop: hp('1%'),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  innerBlueCard: {
    backgroundColor: '#EEF2FF', 
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
  },
  infoTitle: { 
    fontSize: wp('4.5%'), 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: 8
  },
  listContainer: {
    paddingLeft: 5
  },
  listItem: {
    fontSize: wp('3.6%'),
    color: '#94A3B8', 
    lineHeight: 22,
    marginBottom: 6
  },
  boldFooter: {
    textAlign: 'Left',
    color: '#1E293B',
    fontSize: wp('3.4%'),
    fontWeight: '600',
    marginTop: 5,
    paddingHorizontal: 15,
    lineHeight: 18
  }
});
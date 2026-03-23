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
        <Text style={styles.pageTitle}>Announcements</Text>

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
            <Text style={styles.infoTitle}>Latest Announcements</Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>• Semester exams schedule updated</Text>
                <Text style={styles.listItem}>• Campus will remain closed on Friday</Text>
                <Text style={styles.listItem}>• New safety guidelines issued</Text>
                <Text style={styles.boldFooter}>
            Announcements are published by the college administration.
          </Text>
            </View>
          </View>

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
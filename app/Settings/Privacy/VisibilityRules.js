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

export default function VisibilityRulesScreen() {
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

  const rules = {
    title: "Location Visibility",
    description: "Parents can view student location only during active tracking hours.",
    trackingHours: [
      "Monday to Friday: 8:30 AM – 6:00 PM",
      "Saturday: Limited tracking",
      "Sunday: Disabled",
    ],
    exceptions: "Location may be visible outside hours during emergency situations.",
    footer: "These rules are set by the college and cannot be modified by users.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Shared Global Header */}
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Visibility Rules</Text>

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
          
          {/* Light Blue Inner Content Card */}
          <View style={styles.innerBlueCard}>
            <Text style={styles.infoTitle}>{rules.title}</Text>
            <Text style={styles.infoSubText}>{rules.description}</Text>
            
            <Text style={styles.sectionLabel}>Tracking Hours</Text>
            <View style={styles.listContainer}>
              {rules.trackingHours.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Exceptions</Text>
            <Text style={styles.infoSubText}>{rules.exceptions}</Text>

            <Text style={styles.boldFooter}>{rules.footer}</Text>
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
    fontSize: wp('7.5%'), 
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
    fontSize: wp('4.5%'), 
    fontWeight: '500' 
  },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 35,
    padding: wp('5%'),
    marginTop: hp('1%'),
    // Optional shadow for depth
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  innerBlueCard: {
    backgroundColor: '#EEF2FF', // The light lavender/blue from your image
    borderRadius: 25,
    padding: 25,
  },
  infoTitle: { 
    fontSize: wp('5%'), 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: 12
  },
  infoSubText: { 
    fontSize: wp('3.8%'), 
    color: '#94A3B8', // Muted greyish-blue
    lineHeight: 22,
    marginBottom: 10
  },
  sectionLabel: {
    fontSize: wp('3.8%'),
    color: '#94A3B8',
    marginTop: 5
  },
  listContainer: {
    marginVertical: 5,
    paddingLeft: 5
  },
  listItem: {
    fontSize: wp('3.8%'),
    color: '#94A3B8',
    lineHeight: 24,
  },
  boldFooter: {
    fontSize: wp('3.8%'),
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 15,
    lineHeight: 22
  }
});
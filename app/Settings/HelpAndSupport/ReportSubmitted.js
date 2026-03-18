import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Image,
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

export default function SubmissionSuccessScreen() {
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
        <Text style={styles.pageTitle}>Report a Problem Submitted</Text>

        {/* Back Navigation Row */}
        <TouchableOpacity 
          style={styles.backRow} 
          onPress={() => router.replace("/Settings")} // replace so they can't go "back" to the form
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        {/* Main Outer White Card */}
        <View style={styles.outerWhiteCard}>
          
          {/* SUCCESS IMAGE PLACEHOLDER */}
          <View style={styles.imageWrapper}>
             <Image 
                source={require('../../../assets/images/Illustration.png')}
                style={styles.successImage}
                resizeMode="contain"
             />
          </View>

          <Text style={styles.successText}>Request Submitted Successfully!</Text>

          {/* Large Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.replace("/Settings")}
            activeOpacity={0.8}
          >
             
             <MaterialCommunityIcons name="arrow-left" size={22} color="#FFF" />
             <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
    fontSize: wp('6.5%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%'),
    lineHeight: 34
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
    padding: wp('8%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
    minHeight: hp('55%'),
    justifyContent: 'center'
  },
  imageWrapper: {
    width: wp('70%'),
    height: hp('30%'),
    marginBottom: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  successImage: {
    width: '100%',
    height: '100%',
  },
  successText: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: hp('4%'),
  },
  backButton: {
    backgroundColor: '#4A6FFF',
    flexDirection: 'row-reverse', 
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginLeft: 10, 
     marginRight: 15,
  }
});
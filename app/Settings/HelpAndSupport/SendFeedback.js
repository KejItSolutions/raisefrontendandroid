import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function SendFeedback() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  
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

  const handleSubmit = () => {
    // Navigate to Success screen after submission
    router.replace("/Settings/SubmissionSuccessScreen");
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Shared Global Header */}
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Send Feedback</Text>

        {/* Back Navigation Row (Matches Arrow in image_2.png) */}
        <TouchableOpacity 
          style={styles.backRow} 
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        {/* Main Outer White Card */}
        <View style={styles.outerWhiteCard}>
          
          <Text style={styles.inputLabel}>Feedback Subject</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="App running slow"
              placeholderTextColor="#94A3B8"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <Text style={styles.inputLabel}>Description</Text>
          {/* Apply Uniform textAreaWrapper style below */}
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <TextInput
              style={styles.textInput}
              placeholder="Eg: Apps runs really slow when i try to track..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={6} // Increased for description
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>

          {/* Large Primary Button with "Glow" shadow */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Submit Feedback</Text>
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
  // Global Layout Spacing
  scrollContent: { paddingHorizontal: wp('5%'), paddingBottom: hp('5%') },
  pageTitle: { 
    fontSize: wp('7.5%'), 
    fontWeight: "700", 
    color: "#1A1A1A", 
    marginTop: hp('2%') 
  },
  // Uniform Back Row
  backRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp('2.5%') 
  },
  backText: { 
    color: '#4A6FFF', 
    marginLeft: 10, 
    fontSize: wp('4.5%'), 
    fontWeight: '500' 
  },
  // Outer Card Styling
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 35,
    padding: wp('6%'),
    marginTop: hp('1%'),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  // Muted Label (Matches image_5.png)
  inputLabel: {
    fontSize: wp('4%'),
    color: '#94A3B8',
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: '500'
  },
  
  inputWrapper: {
    backgroundColor: '#FFF', // The light lavender-blue tint
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
      borderColor: '#E2E8F0',      
    borderWidth: 1,              
    borderRadius: 20,  
  },

  textAreaWrapper: {
    minHeight: hp('18%'),        
    alignItems: 'flex-start',    
    backgroundColor: '#FFF',    
    borderColor: '#E2E8F0',      
    borderWidth: 1,              
    borderRadius: 20,           
    padding: 15,
    marginBottom: 25,
  },

  textInput: {
    fontSize: wp('3.8%'),
    color: '#1E293B',            
    width: '100%',
    lineHeight: 22,
  },
  // Primary Button with "Glow"
  submitButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    // Shadows for glow effect
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  submitText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '700'
  }
});
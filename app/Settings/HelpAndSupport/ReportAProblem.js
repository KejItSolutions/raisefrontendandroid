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

export default function ReportProblemScreen() {
  const router = useRouter();
  const [issue, setIssue] = useState("");
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

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Report a Problem</Text>

        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        <View style={styles.outerWhiteCard}>
          
          {/* Issue Type Input */}
          <Text style={styles.inputLabel}>Issue type</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Unable to add documents."
              placeholderTextColor="#94A3B8"
              value={issue}
              onChangeText={setIssue}
            />
          </View>

          {/* Description Input */}
          <Text style={styles.inputLabel}>Description</Text>
          <View style={[styles.textInputWrapper, styles.textAreaWrapper]}>
            <TextInput
              style={styles.textInput}
              placeholder="Eg: Documents uploaded are not stored in the files."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={6}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>

          {/* Screenshot Upload Box (Lavender Tint) */}
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
            <View style={styles.uploadLeft}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="paperclip" size={22} color="#4A6FFF" />
              </View>
              <View style={styles.uploadTextContainer}>
                <Text style={styles.uploadTitle}>Screenshot Upload</Text>
                <Text style={styles.uploadSubText}>Upto 10 MB PNG</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#1E293B" />
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={() => router.replace("/Settings/HelpAndSupport/ReportSubmitted")}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  pageTitle: { fontSize: wp('7.5%'), fontWeight: "700", color: "#1A1A1A", marginTop: hp('2%') },
  backRow: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('2.5%') },
  backText: { color: '#4A6FFF', marginLeft: 10, fontSize: wp('4.5%'), fontWeight: '500' },
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 35,
    padding: wp('6%'),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  inputLabel: { fontSize: wp('4%'), color: '#94A3B8', marginBottom: 10, fontWeight: '500' },
  textInputWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  textAreaWrapper: { minHeight: hp('18%') },
  textInput: { fontSize: wp('3.8%'), color: '#1E293B' },
  
  // Upload Box Styles
  uploadBox: {
    backgroundColor: '#FFF', // Lavender Tint
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 30,
  },
  uploadLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    backgroundColor: '#FFF',
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadTitle: { fontSize: wp('4%'), fontWeight: '700', color: '#1E293B' },
  uploadSubText: { fontSize: wp('3.2%'), color: '#94A3B8', marginTop: 2 },

  submitButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  submitText: { color: '#FFF', fontSize: wp('4.5%'), fontWeight: '700' }
});
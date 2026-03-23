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

export default function LinkedAccountScreen() {
  const router = useRouter();
  
  // State for inputs
  const [studentName, setStudentName] = useState("Evan Yates");
  const [studentPhone, setStudentPhone] = useState("8957486924");
  const [parentPhone, setParentPhone] = useState("7845967482");

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
        <Text style={styles.pageTitle}>Linked Account</Text>

        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        <View style={styles.outerWhiteCard}>
          <Text style={styles.cardTitle}>Linked Account</Text>

          {/* Student Name */}
          <Text style={styles.inputLabel}>Student Name</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={studentName}
              editable={false} // Name is usually locked in college apps
              color="#1E293B"
            />
          </View>

          {/* Student Phone */}
          <Text style={styles.inputLabel}>Student Phone</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={studentPhone}
              onChangeText={setStudentPhone}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.editLink}>
            <Text style={styles.editText}>Edit Number?</Text>
          </TouchableOpacity>

          {/* Parent's Phone */}
          <Text style={styles.inputLabel}>Parent's Phone</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={parentPhone}
              onChangeText={setParentPhone}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.editLink}>
            <Text style={styles.editText}>Edit Number?</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.saveText}>Save</Text>
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
    marginBottom: 20
  },
  cardTitle: { fontSize: wp('5.5%'), fontWeight: '700', color: '#1E293B', marginBottom: 25 },
  inputLabel: { fontSize: wp('4%'), color: '#94A3B8', marginBottom: 10, fontWeight: '500' },
  textInputWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textInput: { fontSize: wp('4.2%'), color: '#1E293B' },
  editLink: { alignSelf: 'flex-end', marginTop: 5, marginBottom: 15 },
  editText: { color: '#94A3B8', fontSize: wp('3.2%'), textDecorationLine: 'underline' },
  saveButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    width: wp('70%'), // Wider button like the image
    alignSelf: 'center'
  },
  saveText: { color: '#FFF', fontSize: wp('5%'), fontWeight: '700' }
});
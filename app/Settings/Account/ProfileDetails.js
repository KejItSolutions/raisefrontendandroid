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
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Shared Global Components
import DrawerMenu from "../../components/DrawerMenu";
import Header from "../../components/Header";

export default function ProfileDetailsScreen() {
  const router = useRouter();
  
  // Form State
  const [studentID, setStudentID] = useState("R2012567");
  const [name, setName] = useState("Evan Yates");
  const [email, setEmail] = useState("evanyates@gmail.com");
  const [birthday, setBirthday] = useState("May 19, 1996");

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
        
        {/* Back Navigation Row */}
        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        <View style={styles.outerWhiteCard}>
          <Text style={styles.cardTitle}>Profile details</Text>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.imageBorder}>
               <Image 
                source={{ uri: 'https://i.pravatar.cc/300?img=12' }} // Random Profile Pic
                style={styles.profilePic}
               />
            </View>
          </View>

          {/* Picture Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.btnText}>Delete Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.btnText}>Edit Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>Student ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={studentID} onChangeText={setStudentID} />
            </View>

            <Text style={styles.inputLabel}>Student Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={name} onChangeText={setName} />
            </View>

            <Text style={styles.inputLabel}>Email ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.textInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
            </View>

            <Text style={styles.inputLabel}>Birthday Date</Text>
            <View style={[styles.inputWrapper, styles.dateWrapper]}>
              <TextInput style={styles.textInput} value={birthday} onChangeText={setBirthday} />
              <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#64748B" />
            </View>
          </View>
        </View>

        {/* Big Update Button */}
        <TouchableOpacity style={styles.updateButton} activeOpacity={0.8}>
            <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
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
  backRow: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('2%'), marginTop: hp('1%') },
  backText: { color: '#4A6FFF', marginLeft: 10, fontSize: wp('4.2%'), fontWeight: '500' },
  
  outerWhiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 35,
    padding: wp('6%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  cardTitle: { fontSize: wp('5.5%'), fontWeight: '700', color: '#1E293B', marginBottom: 20 },
  
  // Avatar Styles
  avatarContainer: { marginBottom: 20 },
  imageBorder: {
    padding: 3,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4A6FFF', // Blue Ring
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  // Picture Action Row
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  deleteBtn: { backgroundColor: '#4A6FFF', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10 },
  editBtn: { backgroundColor: '#4A6FFF', paddingVertical: 8, paddingHorizontal: 25, borderRadius: 10 },
  btnText: { color: '#FFF', fontSize: wp('3.2%'), fontWeight: '600' },

  // Form Styles
  formSection: { width: '100%' },
  inputLabel: { fontSize: wp('3.8%'), color: '#94A3B8', marginBottom: 8, fontWeight: '600' },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    width: '100%',
  },
  dateWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textInput: { fontSize: wp('4%'), color: '#1E293B', flex: 1 },

  // Bottom Update Button
  updateButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: "#4A6FFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    width: wp('40%'),
    alignSelf: 'center'
  },
  updateText: { color: '#FFF', fontSize: wp('4.8%'), fontWeight: '700' }
});
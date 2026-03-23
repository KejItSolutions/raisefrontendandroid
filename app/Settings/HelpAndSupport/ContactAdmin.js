import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Linking,
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

export default function ContactAdminScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  
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

  const handleCall = () => Linking.openURL('tel:+919XXXXXXXXX');
  const handleEmail = () => Linking.openURL('mailto:abc@gmail.com');

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F5FF' }}>
      <StatusBar barStyle="dark-content" />
      
      <Header openDrawer={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Contact Admin</Text>

        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4A6FFF" />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        <View style={styles.outerWhiteCard}>
          
          {/* Call Box */}
          <TouchableOpacity style={styles.innerBlueCard} onPress={handleCall}>
            <Text style={styles.infoTitle}>Call</Text>
            <Text style={styles.infoSubText}>+91 9XXXXXXXXX</Text>
          </TouchableOpacity>

          {/* Email Box */}
          <TouchableOpacity style={styles.innerBlueCard} onPress={handleEmail}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.infoSubText}>abc@gmail.com</Text>
          </TouchableOpacity>

          {/* Message Input Section */}
          <Text style={styles.inputLabel}>Message</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Eg: Can i know when will i be able to pay my second semester due?!"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
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
  innerBlueCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },
  infoTitle: { fontSize: wp('4.2%'), fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  infoSubText: { fontSize: wp('3.8%'), color: '#94A3B8' },
  inputLabel: { fontSize: wp('4%'), color: '#94A3B8', marginTop: 10, marginBottom: 8, fontWeight: '500' },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 15,
    minHeight: hp('18%'),
    marginBottom: 25,
  },
  textInput: { fontSize: wp('3.8%'), color: '#1E293B', lineHeight: 22 },
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
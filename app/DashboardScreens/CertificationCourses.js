import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, MoreVertical } from 'lucide-react-native';
import { useState,useRef } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DrawerMenu from '../components/DrawerMenu';
import Header from '../components/Header';
const COLORS = {
  primary: '#4259FA',
  background: '#F3F6FF',
  white: '#FFFFFF',
  cardBg: '#EDF2FF',
  textDark: '#111',
};

const DATA = [
  { 
    id: '1', 
    title: 'Technical Courses', 
    imageIcon: require('../../assets/images/mingcute_code-line.png') 
  },
  { 
    id: '2', 
    title: 'Design Courses', 
    imageIcon: require('../../assets/images/fluent-color_design-ideas-24.png') 
  },
  { 
    id: '3', 
    title: 'Finance & Accounting', 
    imageIcon: require('../../assets/images/mdi_finance.png') 
  },
  { 
    id: '4', 
    title: 'Soft Skills', 
    imageIcon: require('../../assets/images/carbon_ibm-software-watsonx-data-unstructured-enrichment.png') 
  },
];

export default function CertificationScreen() {
  const router = useRouter();
  // Drawer Menu State
      const [drawerOpen, setDrawerOpen] = useState(false);
      const drawerAnim = useRef(new Animated.Value(-260)).current;
  
      const openDrawer = () => {
      setDrawerOpen(true);
      Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      }).start();
      };
  
      const closeDrawer = () => {
      Animated.timing(drawerAnim, {
      toValue: -260,
      duration: 250,
      useNativeDriver: true,
      }).start(() => setDrawerOpen(false));
      };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.card}
      onPress={() => {
        if (item.title === 'Technical Courses') {
          router.push('DashboardScreens/TechnicalCourses');
        }
        else if (item.title === 'Design Courses') {
          router.push('DashboardScreens/DesignCourses'); 
        }
      }}
    >
      <View style={styles.iconWrapper}>
        <Image 
          source={item.imageIcon} 
          style={styles.customIcon} 
          resizeMode="contain" 
        />
      </View>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      
      <SafeAreaView  edges={['top', 'left', 'right']}>
        {/* <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} /> */}
        
        {/* Drawer Menu */}
        <DrawerMenu
          drawerOpen={drawerOpen}
          closeDrawer={closeDrawer}
          drawerAnim={drawerAnim}
          router={router}
        />
        {/* Header */}
        <Header openDrawer={openDrawer} />

        <Text style={styles.mainTitle}>Certification Courses</Text>
        
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color={COLORS.primary} size={wp('5%')} />
          <Text style={styles.backBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>

        {/* Courses Container - Responsive Dimensions Applied */}
        <View style={styles.whiteSheet}>
          <Text style={styles.sheetTitle}>Select Course</Text>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp('2%') }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
   padding: wp("5%"),
  },

  mainTitle: { 
    fontSize: wp('5.5%'), 
    fontWeight: 'bold', 
    color: COLORS.textDark, 
    marginTop: hp('1%') 
  },
  backBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp('2%'),
    marginBottom: hp('3%')
  },
  backBtnText: { 
    color: COLORS.primary, 
    marginLeft: wp('2%'), 
    fontSize: wp('4%'), 
    fontWeight: '600' 
  },
  whiteSheet: { 
    backgroundColor: '#FFF', 
    borderRadius: wp('8%'), 
    padding: wp('6%'), 
    height: hp('70%'), 
    width: wp('90%'), 
    alignSelf: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  sheetTitle: { 
    fontSize: wp('5%'), 
    fontWeight: 'bold', 
    marginBottom: hp('3%'), 
    color: '#111' 
  },
  card: { 
    backgroundColor: COLORS.cardBg, 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: wp('4.5%'), 
    borderRadius: wp('5%'), 
    marginBottom: hp('2.5%')
  },
  iconWrapper: { 
    marginRight: wp('4%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  customIcon: {
    width: wp('7.5%'),
    height: wp('7.5%'),
  },
  cardText: { 
    fontSize: wp('4.2%'), 
    fontWeight: '600', 
    color: '#333' 
  }
});
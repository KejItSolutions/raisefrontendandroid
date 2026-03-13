import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, MoreVertical } from 'lucide-react-native';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
    imageIcon: require('../assets/images/mingcute_code-line.png') 
  },
  { 
    id: '2', 
    title: 'Design Courses', 
    imageIcon: require('../assets/images/fluent-color_design-ideas-24.png') 
  },
  { 
    id: '3', 
    title: 'Finance & Accounting', 
    imageIcon: require('../assets/images/mdi_finance.png') 
  },
  { 
    id: '4', 
    title: 'Soft Skills', 
    imageIcon: require('../assets/images/carbon_ibm-software-watsonx-data-unstructured-enrichment.png') 
  },
];

export default function CertificationScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.card}
      onPress={() => {
        if (item.title === 'Technical Courses') {
          router.push('/TechnicalCourses');
        }
        else if (item.title === 'Design Courses') {
          router.push('/DesignCourses'); 
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        {/* Header Bar */}
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Image 
              source={require('../assets/images/Logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <View style={styles.headerRight}>
              <Bell color="#000" size={wp('6%')} style={{ marginRight: wp('3%') }} />
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?u=student123' }} 
                style={styles.avatar} 
              />
              <MoreVertical color="#000" size={wp('6%')} />
            </View>
          </View>
        </View>

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
    paddingHorizontal: wp('5%') 
  },
  header: { 
    marginTop: hp('1.5%'), 
    marginBottom: hp('1%') 
  },
  headerBox: { 
    backgroundColor: '#FFF', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: wp('4%'), 
    borderRadius: wp('5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  headerRight: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logo: { 
    width: wp('10%'), 
    height: wp('10%') 
  },
  avatar: { 
    width: wp('9%'), 
    height: wp('9%'), 
    borderRadius: wp('4.5%'), 
    marginHorizontal: wp('3%'),
    backgroundColor: '#eee' 
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
import {
  ArrowLeft,
  ArrowUp,
  Bell,
  Building2,
  CheckCircle,
  Clock,
  MoreVertical,
  Users
} from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#4259FA',
  secondary: '#F97D24',
  background: '#F3F6FF',
  white: '#FFFFFF',
  textGray: '#888',
  success: '#0AC947',
  warning: '#F97D24',
};

export default function ScholarshipScreen() {
  const [activeTab, setActiveTab] = useState('status');

  // Data for "Eligible to apply"
  const eligibleData = [
    { id: 1, title: "Merit Based \nScholarships 2026", "last date": "2025-12-23" },
    { id: 2, title: "Alumni Scholarships from \n batch 2023 to 2025", "last date": "2025-12-14" },
    { id: 3, title: "Need Based \nScholarships 2026", "last date": "2025-12-13" }
  ];

  // Data for "Application status" (Matches your screenshot)
  const statusData = [
    { 
      id: 4, 
      title: "Merit Based \nScholarships 2026", 
      amount: "25000/year", 
      status: "Approved" 
    },
    { 
      id: 5, 
      title: "Alumni Scholarships \nfrom batch 2023 to 2025", 
      "last date": "14 Dec 2025", 
      status: "Pending" 
    }
  ];
const renderCard = ({ item }) => {
    const isEligible = activeTab === 'eligible';
    const isAlumni = item.title.toLowerCase().includes('alumni');

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {/* Left Icon */}
          <View style={styles.iconBox}>
            {isAlumni 
              ? <Users color={COLORS.secondary} size={28} /> 
              : <Building2 color={COLORS.primary} size={28} />}
          </View>

          {/* Center Content */}
          <View style={styles.infoContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            
            {isEligible ? (
              /* WRAPPER FOR HORIZONTAL ALIGNMENT */
              <View style={styles.eligibleRow}>
                <Text style={styles.dateText}>Last date {item["last date"]}</Text>
                
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply now</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.statusRow}>
                <Text style={styles.subText}>
                  {item.amount ? `Rs ${item.amount}` : `Last date ${item["last date"]}`}
                </Text>
                
                <View style={[
                  styles.badge, 
                  { backgroundColor: item.status === 'Approved' ? COLORS.success : COLORS.warning }
                ]}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Right Icon - Only for Status Tab */}
          <View style={styles.statusIconWrapper}>
            {isEligible ? (
              <ArrowUp color={COLORS.secondary} size={24} />
            ) : (
              item.status === 'Approved' ? (
                <CheckCircle color={COLORS.success} size={24} fill="#E8F5E9" />
              ) : (
                <Clock color={COLORS.warning} size={24} />
              )
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerWhiteBox}>
          <Image 
            source={require('../assets/images/Logo.png')} 
            style={styles.headerLogo} 
            resizeMode="contain"
          />
          <View style={styles.headerRight}>
            <Bell color="#000" size={24} style={{marginRight: 15}} />
            
            {/* Replacing the gray circle with a real auto-generated image */}
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=student123' }} 
              style={styles.avatarImage} 
            />

            <MoreVertical color="#000" size={24} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Scholarships</Text>
      
      <TouchableOpacity style={styles.backButton}>
        <ArrowLeft color={COLORS.primary} size={20} />
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'eligible' && styles.activeTab]}
          onPress={() => setActiveTab('eligible')}
        >
          <Text style={[styles.tabLabel, activeTab === 'eligible' && styles.activeLabel]}>Eligible to apply</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'status' && styles.activeTab]}
          onPress={() => setActiveTab('status')}
        >
          <Text style={[styles.tabLabel, activeTab === 'status' && styles.activeLabel]}>Application status</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'eligible' ? eligibleData : statusData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { marginTop: 15, marginBottom: 10 },
  headerWhiteBox: { 
    backgroundColor: '#FFF', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 20,
    elevation: 2
  },
  headerLogo: { width: 40, height: 40 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#E0E0E0', marginRight: 10 },
  
  title: { fontSize: 32, fontWeight: 'bold', color: '#111', marginTop: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  backText: { color: COLORS.primary, marginLeft: 8, fontSize: 16, fontWeight: '500' },

  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 10, 
    marginBottom: 25,
    elevation: 2 
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: COLORS.primary },
  tabLabel: { color: COLORS.primary, fontWeight: '600' },
  activeLabel: { color: '#FFF' },

  card: { backgroundColor: '#FFF', borderRadius: 25, padding: 10,paddingTop:15, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', position: 'relative' },
  iconBox: { marginRight: 15 },
  infoContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', lineHeight: 24, paddingRight: 35 },
  dateText: { color: COLORS.textGray, marginTop: 12, fontSize: 14 },
  
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  subText: { fontSize: 15, color: COLORS.textGray, fontWeight: '500' },
  badge: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  badgeText: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },

  statusIconWrapper: { position: 'absolute', right: 0, top: 5 },

  applyBtnText: { color: '#FFF', fontWeight: 'bold' },
  avatarImage: { 
  width: 35, 
  height: 35, 
  borderRadius: 17.5, // Half of width/height for a perfect circle
  marginRight: 10,
  backgroundColor: '#E0E0E0' // Fallback color while loading
},
// New style to handle the horizontal row for Eligible tab
  eligibleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  
  // Adjusted date text to remove unnecessary top margin since it's now in a row
  dateText: { 
    color: COLORS.textGray, 
    fontSize: 14,
    flex: 1, // Allows text to take available space
  },

  // Refined Apply button style for the row layout
  applyBtn: { 
    backgroundColor: COLORS.primary, 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 10, 
    marginLeft: 10, // Space between text and button
  },
});
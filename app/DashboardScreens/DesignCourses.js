import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    CheckCircle2,
    MoreVertical
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    Animated,
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
    textDark: '#111',
    textLight: '#666',
    advanced: '#FF4D4D',
    intermediate: '#0AC947',
    beginner: '#F97D24',
    enrolled: '#0AC947',
};

const DESIGN_DATA = [
    {
        id: '1',
        title: 'UI/UX Design',
        desc: 'Teaches user-centric design, wireframing, prototyping, usability principles, and creating intuitive digital interfaces.',
        level: 'Advanced',
        levelColor: COLORS.advanced,
        duration: 'Duration 8 weeks',
        icon: require('../../assets/images/active.png'),
    },
    {
        id: '2',
        title: 'Graphic Design',
        desc: 'Focuses on visual communication through color theory, typography, branding, and design tools like Photoshop and Illustrator.',
        level: 'Intermediate',
        levelColor: COLORS.intermediate,
        duration: 'Duration 6 weeks',
        icon: require('../../assets/images/active.png'),
    },
    {
        id: '3',
        title: 'Animation & Multimedia',
        desc: 'Covers storytelling, 2D/3D animation, video editing, and motion graphics to create engaging digital media content.',
        level: 'Beginner',
        levelColor: COLORS.beginner,
        duration: 'Duration 12 weeks',
        icon: require('../../assets/images/active.png'),
    },
];

const CourseCard = ({ item, onEnroll }) => {
    const [enrolled, setEnrolled] = useState(false);

    const handleEnroll = () => {
        setEnrolled(true);
        onEnroll();
    };

    return (
        <View style={styles.courseCard}>
            <View style={styles.cardTop}>
                <Image source={item.icon} style={styles.courseIcon} resizeMode="contain" />
                <View style={styles.titleArea}>
                    <Text style={styles.courseTitle}>{item.title}</Text>
                    <Text style={styles.courseDesc} numberOfLines={3}>
                        {item.desc}
                    </Text>
                </View>
            </View>

            <View style={styles.cardBottom}>
                <View style={styles.labelContainer}>
                    <Text style={[styles.levelText, { color: item.levelColor }]}>
                        {item.level}
                    </Text>
                    <Text style={styles.durationText}>{item.duration}</Text>
                </View>

                <TouchableOpacity 
                    style={[
                        styles.enrollBtn, 
                        enrolled && { backgroundColor: COLORS.enrolled } 
                    ]} 
                    onPress={handleEnroll}
                    disabled={enrolled}
                >
                    <Text style={styles.enrollText}>
                        {enrolled ? 'Enrolled' : 'Enroll Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function DesignCourses() {
    const router = useRouter();
    const [showToast, setShowToast] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const triggerToast = () => {
        setShowToast(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start(() => setShowToast(false));
        }, 3000);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
                
                {/* Unified Responsive Header */}
                <View style={styles.headerBox}>
                    <Image source={require('../../assets/images/Logo.png')} style={styles.logo} resizeMode="contain" />
                    <View style={styles.headerRight}>
                        <Bell color="#000" size={wp('6%')} style={{ marginRight: wp('3%') }} />
                        <Image source={{ uri: 'https://i.pravatar.cc/150?u=2' }} style={styles.avatar} />
                        <MoreVertical color="#000" size={wp('6%')} />
                    </View>
                </View>

                <Text style={styles.mainTitle}>Design Courses</Text>

                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft color={COLORS.primary} size={wp('5%')} />
                    <Text style={styles.backBtnText}>Back to Certifications</Text>
                </TouchableOpacity>

                <FlatList
                    data={DESIGN_DATA}
                    renderItem={({ item }) => <CourseCard item={item} onEnroll={triggerToast} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                {showToast && (
                    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
                        <CheckCircle2 color="#0AC947" size={wp('5%')} />
                        <Text style={styles.toastText}>Mail Sent</Text>
                    </Animated.View>
                )}
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
    headerBox: { 
        backgroundColor: '#FFF', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: wp('4%'), 
        borderRadius: wp('5%'),
        elevation: 3, 
        marginTop: hp('1.5%'), 
        marginBottom: hp('1%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    headerRight: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    logo: { width: wp('10%'), height: wp('10%') },
    avatar: { width: wp('9%'), height: wp('9%'), borderRadius: wp('4.5%'), backgroundColor: '#eee' },
    mainTitle: { fontSize: wp('6%'), fontWeight: 'bold', color: '#111', marginTop: hp('2%') },
    backBtn: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('2%') },
    backBtnText: { color: COLORS.primary, marginLeft: wp('2%'), fontSize: wp('4%'), fontWeight: '600' },
    listContent: { paddingBottom: hp('12%') },
    courseCard: { backgroundColor: '#FFF', borderRadius: wp('6%'), padding: wp('5.5%'), marginBottom: hp('2%'), elevation: 2 },
    cardTop: { flexDirection: 'row', marginBottom: hp('1%') },
    courseIcon: { width: wp('7%'), height: wp('7%'), marginRight: wp('3%'), marginTop: hp('0.5%') },
    titleArea: { flex: 1 },
    courseTitle: { fontSize: wp('4.5%'), fontWeight: 'bold', color: '#111', marginBottom: hp('0.5%') },
    courseDesc: { fontSize: wp('2.8%'), color: '#777', lineHeight: wp('4%'), width: wp('55%') },
    cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: hp('0.5%') },
    labelContainer: { flex: 1 },
    levelText: { fontSize: wp('3.5%'), fontWeight: 'bold', marginBottom: hp('0.2%') },
    durationText: { fontSize: wp('3%'), color: '#999' },
    enrollBtn: { backgroundColor: COLORS.primary, paddingVertical: hp('1.2%'), paddingHorizontal: wp('5%'), borderRadius: wp('3%'), minWidth: wp('28%'), alignItems: 'center' },
    enrollText: { color: '#FFF', fontWeight: 'bold', fontSize: wp('3.5%') },
    toastContainer: { position: 'absolute', bottom: hp('5%'), alignSelf: 'center', backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingVertical: hp('1.2%'), paddingHorizontal: wp('6%'), borderRadius: wp('8%'), elevation: 8, borderWidth: 1, borderColor: '#eee' },
    toastText: { marginLeft: wp('2%'), color: '#4259FA', fontWeight: 'bold', fontSize: wp('3.8%') }
});

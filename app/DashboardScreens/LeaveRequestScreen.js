import { useState, useRef } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { Calendar } from "react-native-calendars";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Feather";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import { useRouter } from "expo-router";

export default function LeaveRequestScreen() {

  const router = useRouter();

  /* Drawer State */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-260)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -260,
      duration: 250,
      useNativeDriver: true
    }).start(() => setDrawerOpen(false));
  };

  /* Leave Form State */
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const leaveTypes = ["Casual", "Sick Leave", "Academic"];

  const [successVisible, setSuccessVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState("");
  const [activeInput, setActiveInput] = useState("start");

  const [file, setFile] = useState(null);

  const leaveHistory = [
    {
      type: "Sick Leave",
      reason: "Viral Fever and cold.",
      date: "Feb 25, 2025"
    },
    {
      type: "Academic Leave",
      reason: "Attend Inter college Fest.",
      date: "Mar 15, 2025"
    },
    {
      type: "Casual Leave",
      reason: "Attend Sister’s Wedding.",
      date: "Apr 10, 2025"
    }
  ];

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true
    });

    if (result.assets) {
      setFile(result.assets[0].name);
    }
  };

  return (

    <View style={styles.container}>

      {/* Drawer */}
      <DrawerMenu
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer}
        drawerAnim={drawerAnim}
        router={router}
      />

      {/* Fixed Header */}
      <Header openDrawer={openDrawer} />

      {/* Fixed Title */}
      <View style={styles.titleContainer}>

        <Text style={styles.title}>Leave Request</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back to Dashboard</Text>
        </TouchableOpacity>

      </View>

      {/* Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >

        {/* APPLY CARD */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>Apply for leave</Text>
          <Text style={styles.cardSubtitle}>Give your details</Text>

          {/* Leave Type */}
          <Text style={styles.label}>Leave Type</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <Text>{leaveType}</Text>
            <Icon name="chevron-down" size={22} />
          </TouchableOpacity>

          {/* Dates */}
          <Text style={styles.label}>Leave period</Text>

          <View style={styles.dateRow}>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                setActiveInput("start");
                setCalendarVisible(true);
              }}
            >
              <Text>{startDate.toDateString()}</Text>
              <Icon name="calendar" size={18} />
            </TouchableOpacity>

            <Text style={{ marginHorizontal: 10 }}>To</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                setActiveInput("end");
                setCalendarVisible(true);
              }}
            >
              <Text>{endDate.toDateString()}</Text>
              <Icon name="calendar" size={18} />
            </TouchableOpacity>

          </View>

          {/* Reason */}
          <Text style={styles.label}>Reason for Leave</Text>

          <TextInput
            placeholder="Eg: Viral Fever"
            style={styles.input}
            value={reason}
            onChangeText={setReason}
          />

          {/* File Upload */}
          <Text style={styles.label}>
            Upload additional document (optional)
          </Text>

          <TouchableOpacity
            style={styles.fileBox}
            onPress={pickFile}
          >
            <Icon name="paperclip" size={20} />

            <Text style={{ marginLeft: 10 }}>
              {file ? file : "Choose File"}
            </Text>

          </TouchableOpacity>

        </View>

        {/* Send Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSuccessVisible(true)}
        >
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

        {/* HISTORY */}
        <Text style={styles.historyTitle}>Leave History</Text>

        {leaveHistory.map((item, index) => (

          <View key={index} style={styles.historyCard}>

            <View style={{ flex: 1 }}>

              <Text style={styles.historyType}>
                {item.type}
              </Text>

              <Text style={styles.historyReason}>
                {item.reason}
              </Text>

              <Text style={styles.historyDate}>
                Requested on {item.date}
              </Text>

            </View>

          </View>

        ))}

      </ScrollView>

      {/* Leave Type Modal */}
      <Modal visible={modalVisible} transparent>

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Select Leave Type</Text>

            {leaveTypes.map((type, index) => (

              <TouchableOpacity
                key={index}
                style={styles.radioRow}
                onPress={() => {
                  setLeaveType(type);
                  setModalVisible(false);
                }}
              >
                <Text>{type}</Text>
              </TouchableOpacity>

            ))}

          </View>
        </View>

      </Modal>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent>

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {

                const date = new Date(selectedDate);

                if (activeInput === "start") {
                  setStartDate(date);
                } else {
                  setEndDate(date);
                }

                setCalendarVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ECEFF7",
  },

  titleContainer: {
    paddingHorizontal: wp("4%"),
    marginBottom: hp("1%")
  },

  title: {
    fontSize: wp("6%"),
    fontWeight: "700"
  },

  back: {
    color: "#05057d",
    marginTop: hp("0.5%")
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: wp("4%"),
    borderRadius: 20,
    padding: hp("2.5%"),
    marginTop: hp("1%")
  },

  cardTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    textAlign: "center"
  },

  cardSubtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: hp("2%")
  },

  label: {
    marginTop: hp("2%"),
    marginBottom: hp("0.8%"),
    fontWeight: "600"
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: hp("1.5%"),
    flexDirection: "row",
    justifyContent: "space-between"
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  dateInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: hp("1.5%"),
    justifyContent: "space-between",
    flex: 1
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: hp("1.5%")
  },

  fileBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: hp("1.5%"),
    alignItems: "center"
  },

  button: {
    width: wp("60%"),
    height: hp("7%"),
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: hp("2%")
  },

  buttonText: {
    color: "white",
    fontWeight: "700"
  },

  historyTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    marginLeft: wp("4%"),
    marginTop: hp("2%")
  },

  historyCard: {
    backgroundColor: "white",
    marginHorizontal: wp("4%"),
    padding: hp("2%"),
    borderRadius: 15,
    marginTop: hp("1%")
  },

  historyType: {
    fontWeight: "700"
  },

  historyReason: {
    color: "#374151"
  },

  historyDate: {
    color: "#9CA3AF",
    fontSize: wp("3%")
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%"
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15
  },

  radioRow: {
    paddingVertical: 10
  }

});
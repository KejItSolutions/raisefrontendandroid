import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateClubForm({ onsubmit }) {
  return (
    <View style={styles.formCard}>
      <Text style={styles.inputLabel}>Club Name</Text>
      <TextInput 
        style={styles.textInput} 
        placeholder="Enter club name" 
        placeholderTextColor="#A0A0A0" 
      />

      <Text style={[styles.inputLabel, { marginTop: 20 }]}>Description</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="Enter description"
        placeholderTextColor="#A0A0A0"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.submitBtn} onPress={onsubmit}>
        <Text style={styles.submitBtnText}>Create Club</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 25,
    marginTop: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E9F2",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  textArea: {
    height: 180,
    paddingTop: 15,
  },
  submitBtn: {
    backgroundColor: "#4A63F3",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    // Blue glow shadow
    shadowColor: "#4A63F3",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  submitBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
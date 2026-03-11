import { View } from "react-native";
import ScholarshipScreen from "./ScholarshipDetails";
import StudentProfile from "./StudentProfile";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StudentProfile />
      <ScholarshipScreen />
    </View>
  );
}
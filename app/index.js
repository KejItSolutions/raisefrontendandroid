import { View } from "react-native";

import LoginScreen from "./LoginScreen";
import ScholarshipScreen from "./ScholarshipDetails";
import StudentProfile from "./StudentProfile";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen />
      <StudentProfile />
      <ScholarshipScreen />
    </View>
  );
}


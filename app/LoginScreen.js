import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [country, setCountry] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [timer, setTimer] = useState(30);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const arr = [...otp];
    arr[index] = value;
    setOtp(arr);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const verifyOtp = () => {
    const data = {
      mobile: mobile,
      country: country,
      otp: otp.join(""),
    };

    console.log("LOGIN DATA:", data);
  };

  const resendOtp = () => {
    setTimer(30);
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />

        <Text style={styles.logoText}>Classroom</Text>
      </View>

      {/* CARD */}

      <View style={styles.card}>
        <Text style={styles.title}>Log In</Text>

        <Text style={styles.label}>Register Phone Number</Text>

        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Picker
              selectedValue={country}
              onValueChange={(v) => setCountry(v)}
            >
              <Picker.Item label="+91" value="+91" />
              <Picker.Item label="+1" value="+1" />
            </Picker>
          </View>

          <TextInput
            style={styles.phoneInput}
            placeholder="345 56 72356"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* OTP */}

        <View style={styles.otpHeader}>
          <Text style={styles.label}>Code from SMS</Text>

          <Text style={styles.resend} onPress={resendOtp}>
            {timer > 0 ? `00:${timer} Resend OTP` : "Resend OTP"}
          </Text>
        </View>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(v) => handleOtpChange(v, index)}
            />
          ))}
        </View>

        {/* LOGIN BUTTON */}

        <TouchableOpacity style={styles.loginButton} onPress={verifyOtp}>
          <Text style={styles.loginText}>Log In →</Text>
        </TouchableOpacity>

        {/* REGISTER */}

        <Text style={styles.footer}>
          New Student?
          <Text
            style={styles.create}
            onPress={() => router.push("/RegisterScreen")}
          >
            Create Account
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7e9f5",
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 10,
  },

  logoText: {
    fontSize: 22,
    color: "#4c63ff",
    fontWeight: "600",
  },

  card: {
    width: "90%",
    backgroundColor: "#f7f7fb",
    padding: 25,
    borderRadius: 25,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },

  label: {
    color: "#6b6b6b",
    marginBottom: 8,
  },

  phoneRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  countryBox: {
    width: 90,
    borderWidth: 1,
    borderColor: "#4c63ff",
    borderRadius: 12,
    marginRight: 10,
    overflow: "hidden",
  },

  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4c63ff",
    borderRadius: 12,
    paddingHorizontal: 15,
  },

  otpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  resend: {
    color: "green",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
  },

  loginButton: {
    backgroundColor: "#4c63ff",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    marginTop: 15,
    color: "#555",
  },

  create: {
    color: "#4c63ff",
  },
});

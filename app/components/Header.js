import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = ({ openDrawer }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#333"
          style={styles.headerIcon}
        />

        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <Ionicons name="ellipsis-vertical" size={24} color="#333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#FFF",
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 30,
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
  marginBottom: 24,
},
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
  },
  headerLogo: {
    height: hp('6%') ,
    width: wp('10%'),
  },
  avatar: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    marginRight: 15,
  },
});

export default Header;
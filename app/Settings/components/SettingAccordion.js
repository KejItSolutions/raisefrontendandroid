import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingAccordion = ({ title, icon, items, type }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  
  // State to track toggle values locally
  const [toggleValues, setToggleValues] = useState({});

  const handleToggle = (itemTitle) => {
    setToggleValues(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  return (
    <View style={styles.container}>
      {/* Main Accordion Header */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={expanded ? "#4A6FFF" : "#7D7D7D"} 
          />
          <Text style={[styles.title, expanded && styles.activeTitle]}>{title}</Text>
        </View>
        <MaterialCommunityIcons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color={expanded ? "#4A6FFF" : "#7D7D7D"} 
        />
      </TouchableOpacity>

      {/* Sub-menu Items */}
      {expanded && (
        <View style={styles.subItemsWrapper}>
          {items.map((item, index) => {
       
          const cardBg = (type === "location") 
      ? (index < 2 ? "#EEF2FF" : "#E9E9E9") 
      : "#F0F4FF";

            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.subItemCard, { backgroundColor: cardBg }]}
                activeOpacity={item.route ? 0.7 : 1} 
                onPress={() => {
                if (item.route) {
                    if (typeof document !== 'undefined') {
                      document.activeElement?.blur();
                    }
                    router.push(item.route);
                  }
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.subItemTitle, 
                    item.isDestructive && { color: 'red' }
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.subItemSubText}>{item.subText}</Text>
                </View>

                {/* 1. Status Badge (Enabled/Disabled) */}
                {item.status && (
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                )}

                {/* 2. Toggle Switch */}
             {item.hasSwitch && (
                  <Switch
                    trackColor={{ false: "#CBD5E1", true: "#4259FA" }} 
                    thumbColor={(toggleValues[item.title] ?? item.defaultVal) ? "#FFFFFF" : "#FFFFFF"}
                    onValueChange={() => handleToggle(item.title)}
                    value={toggleValues[item.title] ?? item.defaultVal}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} 
                  />
                )}

                {/* 3. Navigation Chevron */}
                {item.route && !item.hasSwitch && (
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#94A3B8" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 18, marginLeft: 15, color: '#7D7D7D', fontWeight: '500' },
  activeTitle: { color: '#4A6FFF', fontWeight: 'bold' },
  
  subItemsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
subItemCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', 
  padding: 18,
  borderRadius: 20,
  marginBottom: 12,
},
  textContainer: {
    flex: 1, 
    marginRight: 15,
  },
  subItemTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#1E293B' // Deep Navy
  },
  subItemSubText: { 
    fontSize: 13, 
    color: '#94A3B8', // Slate Grey
    marginTop: 4, 
    lineHeight: 18 
  },
  statusBadge: {
    backgroundColor: '#CBD5E1', 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});

export default SettingAccordion;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DOT_COLORS = ['#F59E0B', '#78580A', '#4A3608'];

function getDotColor(dotIndex: number, activeDot: number): string {
  const offset = (dotIndex - activeDot + 3) % 3;
  return DOT_COLORS[offset];
}

export default function Splash() {
  const router = useRouter();
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const nav = setTimeout(() => router.replace('/(tabs)'), 2500);
    const dot = setInterval(() => setActiveDot((d) => (d + 1) % 3), 420);
    return () => {
      clearTimeout(nav);
      clearInterval(dot);
    };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      {/* Logo */}
      <View style={styles.logoWrap}>
        <MaterialCommunityIcons
          name="dumbbell"
          size={62}
          color="#0C0C0D"
          style={{ transform: [{ rotate: '-45deg' }] }}
        />
      </View>

      {/* Text group */}
      <View style={styles.textGroup}>
        <Text style={styles.appName}>FITGUIDE</Text>
        <Text style={styles.tagline}>SEMUA AHLI PERNAH JADI PEMULA</Text>
      </View>

      {/* Loading dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[styles.dot, { backgroundColor: getDotColor(i, activeDot) }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  logoWrap: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    alignItems: 'center',
    gap: 10,
  },
  appName: {
    fontFamily: 'Oswald_700Bold',
    fontSize: 48,
    color: '#F5F0DC',
    letterSpacing: 8,
  },
  tagline: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: '#6B7280',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

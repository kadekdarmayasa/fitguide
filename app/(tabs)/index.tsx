import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AMBER = '#EFA500';
const CARD = '#171719';
const ICON_BG = 'rgba(239,165,0,0.13)';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_MUTED = '#555555';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(
    'https://res.cloudinary.com/djjwxxftg/video/upload/v1776863431/teknologi-multimedia-leg-day_cBMmO10g_1_f87imy.mp4',
    (p) => {
      p.loop = true;
    }
  );
  const router = useRouter();

  const tips = [
    {
      id: 1,
      text: "Pastikan teknik gerakan benar sebelum menambah beban. Cedera akibat teknik salah lebih berbahaya dari beban berat.",
      author: "FitGuide"
    },
    {
      id: 2,
      text: "Jangan lupa pemanasan sebelum latihan untuk menghindari cedera.",
      author: "FitGuide"
    },
    {
      id: 3,
      text: "Istirahat yang cukup sama pentingnya dengan latihan.",
      author: "FitGuide"
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 25000); // 60.000 ms = 1 menit

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.logoIconWrap}>
          <MaterialCommunityIcons name="dumbbell" size={28} color="#121213" style={{
            transform: [
              { rotate: '-45deg' }
            ]
          }} />
        </View>
        <Text style={styles.logoText}>FITGUIDE</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Featured Video Card ── */}
        <View style={styles.videoCard}>
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            fullscreenOptions={{
              enable: true,
              orientation: 'landscape'
            }}
          />

          {/* Thumbnail */}
          {!isPlaying && (
            <TouchableOpacity
              style={styles.thumbnailOverlay}
              onPress={() => {
                player.play();
                setIsPlaying(true);
              }}
            >
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/djjwxxftg/video/upload/so_1/v1776863431/teknologi-multimedia-leg-day_cBMmO10g_1_f87imy.jpg'
                }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <View style={styles.playButton}>
                <Ionicons name="play" size={28} color="#FFF" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { marginRight: 10 }]}>
            <View style={styles.statIconWrap}>
              <Ionicons name="barbell-outline" size={20} color={AMBER} />
            </View>
            <Text style={styles.statLabel}>Total Gerakan</Text>
            <Text style={styles.statValue}>80</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconWrap}>
              <MaterialCommunityIcons name="calendar-month-outline" size={20} color={AMBER} />
            </View>
            <Text style={styles.statLabel}>Program</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>MULAI DARI SINI</Text>

        <TouchableOpacity style={styles.menuCard} activeOpacity={0.7} onPress={() => router.push('/guide')}>
          <View style={styles.menuIconWrap}>
            <MaterialCommunityIcons name="dumbbell" size={24} color={AMBER} style={{ transform: [{ rotate: '-45deg' }] }} />
          </View>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Panduan Latihan Beban</Text>
            <Text style={styles.menuSub}>Teknik & gerakan per kelompok otot</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} activeOpacity={0.7} onPress={() => router.push('/program')}>
          <View style={styles.menuIconWrap}>
            <MaterialCommunityIcons name="calendar-month-outline" size={24} color={AMBER} />
          </View>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Program Latihan</Text>
            <Text style={styles.menuSub}>Program terstruktur & terjadwal</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
        </TouchableOpacity>

        {/* ── Tip Hari Ini ── */}
        <View style={styles.tipCard}>
          <Text style={styles.tipHeader}>TIP HARI INI</Text>
          <Text style={styles.tipBody}>
            {tips[currentIndex].text}
          </Text>
          <Text style={styles.tipAuthor}>
            - {tips[currentIndex].author}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0C0C0D',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  logoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#F0ECC7',
    fontFamily: 'Oswald_500Medium',
    letterSpacing: 1.5,
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },

  /* Video Card */
  videoCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#2E2E2E',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: '#282829',
  },
  statIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Rubik_400Regular',
  },
  statValue: {
    color: TEXT_PRIMARY,
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
    fontFamily: 'Oswald_500Medium'
  },

  /* Section Label */
  sectionLabel: {
    color: TEXT_MUTED,
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginTop: 4,
  },

  /* Menu Cards */
  menuCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#282829',
  },
  menuIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    gap: 4,
  },
  menuTitle: {
    color: TEXT_PRIMARY,
    fontFamily: 'Oswald_500Medium',
    fontSize: 15,
    fontWeight: '500',
  },
  menuSub: {
    color: '#777777',
    fontFamily: 'Rubik_400Regular',
    fontWeight: '400',
    fontSize: 12,
  },

  /* Tip Card */
  tipCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#282829',
    marginTop: 4,
  },
  tipHeader: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 11,
    fontWeight: '500',
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  tipBody: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: 'Rubik_400Regular',
  },
  tipAuthor: {
    color: AMBER,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Rubik_500Medium'
  },
});
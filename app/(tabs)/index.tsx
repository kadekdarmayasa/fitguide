import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AMBER = '#EFA500';
const BG = '#1A1A1A';
const CARD = '#171719';
const CARD_DARK = '#1E1E1E';
const ICON_BG = 'rgba(239,165,0,0.13)';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_MUTED = '#9A9A9A';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.logoIconWrap}>
          <MaterialCommunityIcons name="dumbbell" size={28} color="#121213" />
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
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/80?img=12' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.videoLabel}>VIDEO THUMBNAIL (FEATURED CONTENT)</Text>
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

        {/* ── Section: Mulai dari Sini ── */}
        <Text style={styles.sectionLabel}>MULAI DARI SINI</Text>

        <TouchableOpacity style={styles.menuCard} activeOpacity={0.7}>
          <View style={styles.menuIconWrap}>
            <MaterialCommunityIcons name="dumbbell" size={24} color={AMBER} />
          </View>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Panduan Latihan Beban</Text>
            <Text style={styles.menuSub}>Teknik & gerakan per kelompok otot</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} activeOpacity={0.7}>
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
            Pastikan teknik gerakan benar sebelum menambah beban. Cedera akibat teknik salah lebih berbahaya dari beban berat.
          </Text>
          <Text style={styles.tipAuthor}>- Ade Rai</Text>
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
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: AMBER,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  videoLabel: {
    color: TEXT_MUTED,
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: '500',
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
    fontSize: 11,
    fontWeight: '700',
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
    borderColor: '#2E2E2E',
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
    fontSize: 15,
    fontWeight: '700',
  },
  menuSub: {
    color: TEXT_MUTED,
    fontSize: 12,
  },

  /* Tip Card */
  tipCard: {
    backgroundColor: CARD_DARK,
    borderRadius: 14,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginTop: 4,
  },
  tipHeader: {
    color: AMBER,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  tipBody: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  tipAuthor: {
    color: AMBER,
    fontSize: 13,
    fontWeight: '600',
  },
});
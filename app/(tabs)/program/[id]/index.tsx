import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AMBER      = '#EFA500';
const CARD       = '#171719';
const CARD_BORDER = '#282829';
const TEXT_CREAM  = '#F0ECC7';
const TEXT_MUTED  = '#555555';
const TEXT_DARK   = '#777777';

type ProgramLevel = 'PEMULA' | 'MENENGAH' | 'LANJUTAN';

type Week = { id: string; label: string; subtitle: string };

type ProgramDetail = {
  level: ProgramLevel;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  split: string;
  muscles: string[];
  weeks: Week[];
  infoNote: string;
};

const LEVEL_BADGE: Record<ProgramLevel, { bg: string; text: string }> = {
  PEMULA:   { bg: 'rgba(180,83,9,0.25)',  text: '#F59E0B' },
  MENENGAH: { bg: 'rgba(29,78,216,0.25)', text: '#60A5FA' },
  LANJUTAN: { bg: 'rgba(190,24,93,0.25)', text: '#F472B6' },
};

const PROGRAMS: Record<string, ProgramDetail> = {
  'starter-strength': {
    level: 'PEMULA',
    title: 'Starter Strength',
    description:
      'Program 4 minggu untuk membangun fondasi kekuatan dasar. Cocok untuk pemula yang baru memulai latihan beban dengan panduan gerakan sederhana.',
    duration: '4 Minggu',
    frequency: '3x/Minggu',
    split: 'Full Body',
    muscles: ['Dada', 'Punggung', 'Bahu', 'Kaki', 'Lengan'],
    weeks: [
      { id: 'w1', label: 'Minggu 1', subtitle: 'Full Body A + B + A' },
      { id: 'w2', label: 'Minggu 2', subtitle: 'Full Body B + A + B' },
      { id: 'w3-4', label: 'Minggu 3-4', subtitle: 'Beban & intensitas meningkat' },
    ],
    infoNote:
      'Setelah 4 minggu, kamu dapat meningkatkan ke program menengah atau menambah variasi gerakan. Eksplorasi katalog panduan latihan untuk teknik yang lebih beragam.',
  },
  'push-pull-legs': {
    level: 'MENENGAH',
    title: 'Push Pull Legs',
    description:
      'Split 6 hari dengan fokus otot spesifik per sesi. Cocok untuk level menengah yang ingin menambah massa otot.',
    duration: '8 Minggu',
    frequency: '6x/Minggu',
    split: 'Split',
    muscles: ['Dada', 'Punggung', 'Bahu', 'Kaki', 'Lengan'],
    weeks: [
      { id: 'w1', label: 'Minggu 1', subtitle: 'Push • Pull • Legs x 2' },
      { id: 'w2', label: 'Minggu 2', subtitle: 'Push • Pull • Legs x 2' },
      { id: 'w3-8', label: 'Minggu 3-8', subtitle: 'Volume & beban meningkat' },
    ],
    infoNote:
      'Setelah 8 minggu, kamu dapat menyesuaikan detail gerakan pada sesi yang sudah ada untuk fokus otot tertentu, atau menjelajahi katalog program lain yang tersedia di FitGuide.',
  },
  'hypertrophy-pro': {
    level: 'LANJUTAN',
    title: 'Hypertrophy Pro',
    description:
      'Program 12 minggu intensif untuk hipertrofi maksimal. Dirancang untuk lifter berpengalaman yang ingin mendorong batas pertumbuhan otot.',
    duration: '12 Minggu',
    frequency: '5x/Minggu',
    split: 'Upper/Lower',
    muscles: ['Dada', 'Punggung', 'Bahu', 'Kaki', 'Lengan', 'Core'],
    weeks: [
      { id: 'w1-4', label: 'Minggu 1-4', subtitle: 'Upper/Lower Split • Volume Dasar' },
      { id: 'w5-8', label: 'Minggu 5-8', subtitle: 'Intensitas & volume meningkat' },
      { id: 'w9-12', label: 'Minggu 9-12', subtitle: 'Peak phase & deload' },
    ],
    infoNote:
      'Setelah 12 minggu, disarankan untuk mengambil deload week sebelum memulai siklus baru atau beralih ke program lain untuk stimulasi otot yang lebih beragam.',
  },
};

export default function ProgramDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const program = PROGRAMS[id as string];
  if (!program) return null;

  const badge = LEVEL_BADGE[program.level];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Fixed nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.navTitleWrap}>
          <Text style={styles.navSub}>Program Latihan</Text>
          <Text style={styles.navTitle}>{program.title.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Program Info ── */}
        <View style={styles.infoSection}>
          <View style={[styles.levelBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.levelBadgeText, { color: badge.text }]}>{program.level}</Text>
          </View>

          <Text style={styles.programTitle}>{program.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="calendar-month-outline" size={14} color={TEXT_DARK} />
              <Text style={styles.metaText}>{program.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={TEXT_DARK} />
              <Text style={styles.metaText}>{program.frequency}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="swap-horizontal" size={14} color={TEXT_DARK} />
              <Text style={styles.metaText}>{program.split}</Text>
            </View>
          </View>

          <Text style={styles.description}>{program.description}</Text>

          <View style={styles.muscleTagRow}>
            {program.muscles.map((muscle) => (
              <View key={muscle} style={styles.muscleTag}>
                <Text style={styles.muscleTagText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Jadwal Latihan ── */}
        <Text style={styles.sectionLabel}>JADWAL LATIHAN</Text>

        {program.weeks.map((week) => (
          <TouchableOpacity
            key={week.id}
            style={styles.weekCard}
            activeOpacity={0.7}
            onPress={() => router.push(`/program/${id}/${week.id}`)}
          >
            <View style={styles.weekContent}>
              <Text style={styles.weekLabel}>{week.label}</Text>
              <Text style={styles.weekSubtitle}>{week.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
          </TouchableOpacity>
        ))}

        {/* ── Info Banner ── */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color={AMBER} style={styles.infoIcon} />
          <Text style={styles.infoText}>{program.infoNote}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0C0C0D' },

  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 5,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitleWrap: { gap: 2 },
  navSub: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  navTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 18,
    color: TEXT_CREAM,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },

  infoSection: { gap: 12, paddingBottom: 4 },
  levelBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelBadgeText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  programTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 32,
    color: TEXT_CREAM,
    lineHeight: 36,
  },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
  },
  description: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 13,
    color: TEXT_DARK,
    lineHeight: 20,
  },
  muscleTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  muscleTag: {
    backgroundColor: 'rgba(239,165,0,0.13)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  muscleTagText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 11,
    color: AMBER,
  },

  sectionLabel: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },

  weekCard: {
    backgroundColor: CARD,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekContent: { gap: 4 },
  weekLabel: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 15,
    color: TEXT_CREAM,
  },
  weekSubtitle: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
  },

  infoBanner: {
    backgroundColor: 'rgba(239,165,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,165,0,0.3)',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIcon: { flexShrink: 0, marginTop: 1 },
  infoText: {
    flex: 1,
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: AMBER,
    lineHeight: 18,
  },
});

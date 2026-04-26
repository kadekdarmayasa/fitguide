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

type Day = {
  id: string;
  day: string;
  type: string;
  muscles: string;
  exerciseCount: number | null;
  isRest: boolean;
};

type WeekSchedule = {
  weekTitle: string;
  summary: string;
  days: Day[];
};

const PROGRAM_NAMES: Record<string, string> = {
  'starter-strength': 'Starter Strength',
  'push-pull-legs':   'Push Pull Legs',
  'hypertrophy-pro':  'Hypertrophy Pro',
};

const PPL_STANDARD_DAYS: Day[] = [
  { id: 'senin',   day: 'Senin',   type: 'Push',      muscles: 'Dada, Bahu, Trisep',    exerciseCount: 8, isRest: false },
  { id: 'selasa',  day: 'Selasa',  type: 'Pull',      muscles: 'Punggung, Bisep',        exerciseCount: 7, isRest: false },
  { id: 'rabu',    day: 'Rabu',    type: 'Legs',      muscles: 'Paha, Betis, Gluteus',   exerciseCount: 7, isRest: false },
  { id: 'kamis',   day: 'Kamis',   type: 'Istirahat', muscles: 'Recovery & Stretching',  exerciseCount: null, isRest: true },
  { id: 'jumat',   day: 'Jumat',   type: 'Push',      muscles: 'Dada, Bahu, Trisep',    exerciseCount: 8, isRest: false },
  { id: 'sabtu',   day: 'Sabtu',   type: 'Pull',      muscles: 'Punggung, Bisep',        exerciseCount: 7, isRest: false },
  { id: 'minggu',  day: 'Minggu',  type: 'Istirahat', muscles: 'Recovery Penuh',         exerciseCount: null, isRest: true },
];

const WEEK_SCHEDULES: Record<string, Record<string, WeekSchedule>> = {
  'starter-strength': {
    'w1': {
      weekTitle: 'MINGGU 1',
      summary: '3 Sesi • Estimasi 45-60 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Full Body A', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Istirahat',   muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'rabu',   day: 'Rabu',    type: 'Full Body B', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'kamis',  day: 'Kamis',   type: 'Istirahat',   muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'jumat',  day: 'Jumat',   type: 'Full Body A', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Istirahat',   muscles: 'Rest & Pemulihan',     exerciseCount: null, isRest: true  },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat',   muscles: 'Rest Penuh',           exerciseCount: null, isRest: true  },
      ],
    },
    'w2': {
      weekTitle: 'MINGGU 2',
      summary: '3 Sesi • Estimasi 45-60 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Full Body B', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Istirahat',   muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'rabu',   day: 'Rabu',    type: 'Full Body A', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'kamis',  day: 'Kamis',   type: 'Istirahat',   muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'jumat',  day: 'Jumat',   type: 'Full Body B', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Istirahat',   muscles: 'Rest & Pemulihan',     exerciseCount: null, isRest: true  },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat',   muscles: 'Rest Penuh',           exerciseCount: null, isRest: true  },
      ],
    },
    'w3-4': {
      weekTitle: 'MINGGU 3-4',
      summary: '3 Sesi • Estimasi 50-65 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Full Body A+', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Istirahat',    muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'rabu',   day: 'Rabu',    type: 'Full Body B+', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'kamis',  day: 'Kamis',   type: 'Istirahat',    muscles: 'Rest Aktif',           exerciseCount: null, isRest: true  },
        { id: 'jumat',  day: 'Jumat',   type: 'Full Body A+', muscles: 'Semua Kelompok Otot', exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Istirahat',    muscles: 'Rest & Pemulihan',     exerciseCount: null, isRest: true  },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat',    muscles: 'Rest Penuh',           exerciseCount: null, isRest: true  },
      ],
    },
  },

  'push-pull-legs': {
    'w1': {
      weekTitle: 'MINGGU 1',
      summary: '6 Sesi • Estimasi 60-75 menit/sesi',
      days: PPL_STANDARD_DAYS,
    },
    'w2': {
      weekTitle: 'MINGGU 2',
      summary: '6 Sesi • Estimasi 60-75 menit/sesi',
      days: PPL_STANDARD_DAYS,
    },
    'w3-8': {
      weekTitle: 'MINGGU 3-8',
      summary: '6 Sesi • Estimasi 65-80 menit/sesi',
      days: PPL_STANDARD_DAYS,
    },
  },

  'hypertrophy-pro': {
    'w1-4': {
      weekTitle: 'MINGGU 1-4',
      summary: '4 Sesi • Estimasi 60-70 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Upper A',   muscles: 'Dada, Bahu, Punggung, Lengan', exerciseCount: 10,   isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Lower A',   muscles: 'Paha, Gluteus, Betis',          exerciseCount: 9,    isRest: false },
        { id: 'rabu',   day: 'Rabu',    type: 'Istirahat', muscles: 'Rest Aktif',                    exerciseCount: null, isRest: true  },
        { id: 'kamis',  day: 'Kamis',   type: 'Upper B',   muscles: 'Dada, Bahu, Punggung, Lengan', exerciseCount: 10,   isRest: false },
        { id: 'jumat',  day: 'Jumat',   type: 'Lower B',   muscles: 'Paha, Gluteus, Betis',          exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Istirahat', muscles: 'Cardio Ringan',                 exerciseCount: null, isRest: true  },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat', muscles: 'Rest Penuh',                    exerciseCount: null, isRest: true  },
      ],
    },
    'w5-8': {
      weekTitle: 'MINGGU 5-8',
      summary: '4 Sesi • Estimasi 65-75 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Upper A+',  muscles: 'Dada, Bahu, Punggung, Lengan', exerciseCount: 10,   isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Lower A+',  muscles: 'Paha, Gluteus, Betis',          exerciseCount: 9,    isRest: false },
        { id: 'rabu',   day: 'Rabu',    type: 'Istirahat', muscles: 'Rest Aktif',                    exerciseCount: null, isRest: true  },
        { id: 'kamis',  day: 'Kamis',   type: 'Upper B+',  muscles: 'Dada, Bahu, Punggung, Lengan', exerciseCount: 10,   isRest: false },
        { id: 'jumat',  day: 'Jumat',   type: 'Lower B+',  muscles: 'Paha, Gluteus, Betis',          exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Istirahat', muscles: 'Cardio Ringan',                 exerciseCount: null, isRest: true  },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat', muscles: 'Rest Penuh',                    exerciseCount: null, isRest: true  },
      ],
    },
    'w9-12': {
      weekTitle: 'MINGGU 9-12',
      summary: '5 Sesi • Estimasi 70-80 menit/sesi',
      days: [
        { id: 'senin',  day: 'Senin',   type: 'Upper Peak', muscles: 'Dada, Bahu, Punggung, Lengan', exerciseCount: 10,   isRest: false },
        { id: 'selasa', day: 'Selasa',  type: 'Lower Peak', muscles: 'Paha, Gluteus, Betis',          exerciseCount: 9,    isRest: false },
        { id: 'rabu',   day: 'Rabu',    type: 'Push Peak',  muscles: 'Dada, Bahu, Trisep',            exerciseCount: 9,    isRest: false },
        { id: 'kamis',  day: 'Kamis',   type: 'Istirahat',  muscles: 'Rest Aktif',                    exerciseCount: null, isRest: true  },
        { id: 'jumat',  day: 'Jumat',   type: 'Pull Peak',  muscles: 'Punggung, Bisep',               exerciseCount: 9,    isRest: false },
        { id: 'sabtu',  day: 'Sabtu',   type: 'Deload',     muscles: 'Full Body (ringan)',             exerciseCount: 6,    isRest: false },
        { id: 'minggu', day: 'Minggu',  type: 'Istirahat',  muscles: 'Rest Penuh',                    exerciseCount: null, isRest: true  },
      ],
    },
  },
};

export default function WeekDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, weekId } = useLocalSearchParams<{ id: string; weekId: string }>();

  const programName = PROGRAM_NAMES[id as string] ?? '';
  const schedule = WEEK_SCHEDULES[id as string]?.[weekId as string];
  if (!schedule) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Fixed nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.navTitleWrap}>
          <Text style={styles.navSub}>{programName}</Text>
          <Text style={styles.navTitle}>{schedule.weekTitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Week Info ── */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTag}>Jadwal</Text>
          <Text style={styles.weekTitle}>{schedule.weekTitle}</Text>
          <Text style={styles.summary}>{schedule.summary}</Text>
        </View>

        {/* ── Hari Latihan ── */}
        <Text style={styles.sectionLabel}>HARI LATIHAN</Text>

        {schedule.days.map((day) =>
          day.isRest ? (
            <View key={day.id} style={[styles.dayCard, styles.dayCardRest]}>
              <View style={styles.dayContent}>
                <Text style={styles.dayLabelRest}>{day.day} • {day.type}</Text>
                <Text style={styles.dayMusclesRest}>{day.muscles}</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              key={day.id}
              style={styles.dayCard}
              activeOpacity={0.7}
              onPress={() => router.push(`/program/${id}/${weekId}/${day.id}`)}
            >
              <View style={styles.dayContent}>
                <Text style={styles.dayLabel}>{day.day} • {day.type}</Text>
                <Text style={styles.dayMuscles}>{day.muscles}</Text>
              </View>
              <View style={styles.dayRight}>
                <Text style={styles.exerciseCount}>{day.exerciseCount} gerakan</Text>
                <Ionicons name="chevron-forward" size={16} color={AMBER} />
              </View>
            </TouchableOpacity>
          )
        )}
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

  /* Week Info */
  infoSection: { gap: 6, paddingBottom: 4 },
  infoTag: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  weekTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 34,
    color: AMBER,
    lineHeight: 40,
  },
  summary: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 13,
    color: TEXT_DARK,
  },

  /* Section label */
  sectionLabel: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },

  /* Day cards */
  dayCard: {
    backgroundColor: CARD,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCardRest: {
    opacity: 0.5,
  },
  dayContent: { flex: 1, gap: 4 },
  dayLabel: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 15,
    color: TEXT_CREAM,
  },
  dayLabelRest: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 15,
    color: TEXT_MUTED,
  },
  dayMuscles: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
  },
  dayMusclesRest: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: '#3A3A3A',
  },
  dayRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  exerciseCount: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 12,
    color: AMBER,
  },
});

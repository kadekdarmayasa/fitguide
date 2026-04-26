import ArnoldPressIcon from '@/assets/images/muscle-groups/shoulder-exercises/arnold_press.svg';
import LateralRaiseIcon from '@/assets/images/muscle-groups/shoulder-exercises/lateral_raise.svg';
import OverheadPressIcon from '@/assets/images/muscle-groups/shoulder-exercises/overhead_press.svg';
import { Badge, ExerciseCard } from '@/components/exercise-card';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

const AMBER      = '#EFA500';
const CARD       = '#171719';
const CARD_BORDER = '#282829';
const TEXT_CREAM  = '#F0ECC7';
const TEXT_MUTED  = '#555555';
const TEXT_DARK   = '#777777';

const B_COMPOUND:  Badge = { label: 'Compound',  bg: 'rgba(239,165,0,0.13)',    text: '#EFA500' };
const B_ISOLATION: Badge = { label: 'Isolation',  bg: 'rgba(93,133,180,0.13)',  text: '#5CA8FF' };
const B_ISO_WARM:  Badge = { label: 'Isolation',  bg: 'rgba(239,165,0,0.13)',   text: '#EFA500' };
const B_PUSH:      Badge = { label: 'Push',        bg: 'rgba(255,116,116,0.13)', text: '#FF8585' };
const B_PULL:      Badge = { label: 'Pull',        bg: 'rgba(93,133,180,0.13)', text: '#5CA8FF' };

type SessionExercise = {
  id: string;
  name: string;
  targets: string;
  Icon: React.FC<SvgProps> | null;
  badges: Badge[];
  guideId: string;
};

type SessionInfo = {
  amberTitle: string;
  muscles: string;
  exercises: SessionExercise[];
};

const MUSCLE_GROUP_LABELS: Record<string, string> = {
  chest:    'Dada',
  back:     'Punggung',
  shoulder: 'Bahu',
  arms:     'Lengan',
  legs:     'Kaki',
  core:     'Core',
};

const WEEK_LABELS: Record<string, string> = {
  'w1':   'Minggu 1',
  'w2':   'Minggu 2',
  'w3-4': 'Minggu 3-4',
  'w3-8': 'Minggu 3-8',
  'w1-4': 'Minggu 1-4',
  'w5-8': 'Minggu 5-8',
  'w9-12':'Minggu 9-12',
};

/* ── Shared exercise pools ── */

const PUSH_EXERCISES: SessionExercise[] = [
  { id: 'overhead-press', name: 'Overhead Press', targets: 'Anterior . Medial',             Icon: OverheadPressIcon, badges: [B_COMPOUND,  B_PUSH], guideId: 'shoulder' },
  { id: 'lateral-raise',  name: 'Lateral Raise',  targets: 'Medial',                        Icon: LateralRaiseIcon,  badges: [B_ISOLATION, B_PUSH], guideId: 'shoulder' },
  { id: 'arnold-press',   name: 'Arnold Press',   targets: 'Anterior . Medial . Posterior', Icon: ArnoldPressIcon,   badges: [B_ISO_WARM,  B_PUSH], guideId: 'shoulder' },
];

const PULL_EXERCISES: SessionExercise[] = [
  { id: 'pull-up',      name: 'Pull-Up',          targets: 'Upper . Lat',    Icon: null, badges: [B_COMPOUND,  B_PULL], guideId: 'back' },
  { id: 'bent-row',     name: 'Bent Over Row',    targets: 'Middle . Lower', Icon: null, badges: [B_COMPOUND,  B_PULL], guideId: 'back' },
  { id: 'lat-pulldown', name: 'Lat Pulldown',     targets: 'Lat',            Icon: null, badges: [B_COMPOUND,  B_PULL], guideId: 'back' },
  { id: 'cable-row',    name: 'Seated Cable Row', targets: 'Middle',         Icon: null, badges: [B_ISOLATION, B_PULL], guideId: 'back' },
];

const LEGS_EXERCISES: SessionExercise[] = [
  { id: 'squat',     name: 'Squat',             targets: 'Quad . Glute',      Icon: null, badges: [B_COMPOUND,  B_PUSH], guideId: 'legs' },
  { id: 'leg-press', name: 'Leg Press',         targets: 'Quad . Glute',      Icon: null, badges: [B_COMPOUND,  B_PUSH], guideId: 'legs' },
  { id: 'rdl',       name: 'Romanian Deadlift', targets: 'Hamstring . Glute', Icon: null, badges: [B_COMPOUND,  B_PULL], guideId: 'legs' },
];

const FULLBODY_EXERCISES: SessionExercise[] = [
  { id: 'squat',       name: 'Squat',          targets: 'Quad . Glute',      Icon: null, badges: [B_COMPOUND, B_PUSH], guideId: 'legs'    },
  { id: 'bench-press', name: 'Bench Press',    targets: 'Upper . Lower',     Icon: null, badges: [B_COMPOUND, B_PUSH], guideId: 'chest'   },
  { id: 'bent-row',    name: 'Bent Over Row',  targets: 'Middle . Lower',    Icon: null, badges: [B_COMPOUND, B_PULL], guideId: 'back'    },
  { id: 'overhead-press', name: 'Overhead Press', targets: 'Anterior . Medial', Icon: OverheadPressIcon, badges: [B_COMPOUND, B_PUSH], guideId: 'shoulder' },
];

const UPPER_EXERCISES: SessionExercise[] = [
  { id: 'bench-press',    name: 'Bench Press',    targets: 'Upper . Lower',             Icon: null,              badges: [B_COMPOUND,  B_PUSH], guideId: 'chest'   },
  { id: 'overhead-press', name: 'Overhead Press', targets: 'Anterior . Medial',         Icon: OverheadPressIcon, badges: [B_COMPOUND,  B_PUSH], guideId: 'shoulder'},
  { id: 'pull-up',        name: 'Pull-Up',         targets: 'Upper . Lat',              Icon: null,              badges: [B_COMPOUND,  B_PULL], guideId: 'back'    },
  { id: 'barbell-curl',   name: 'Barbell Curl',    targets: 'Bicep',                    Icon: null,              badges: [B_ISOLATION, B_PULL], guideId: 'arms'    },
];

const LOWER_EXERCISES: SessionExercise[] = [
  { id: 'squat',         name: 'Squat',             targets: 'Quad . Glute',      Icon: null, badges: [B_COMPOUND,  B_PUSH], guideId: 'legs' },
  { id: 'rdl',           name: 'Romanian Deadlift', targets: 'Hamstring . Glute', Icon: null, badges: [B_COMPOUND,  B_PULL], guideId: 'legs' },
  { id: 'leg-curl',      name: 'Leg Curl',          targets: 'Hamstring',         Icon: null, badges: [B_ISOLATION, B_PULL], guideId: 'legs' },
];

/* ── Session data keyed by programId → sessionId (dayId) ── */

const SESSION_DATA: Record<string, Record<string, SessionInfo>> = {
  'push-pull-legs': {
    senin:  { amberTitle: 'SENIN • PUSH',   muscles: 'Dada • Bahu • Trisep',  exercises: PUSH_EXERCISES  },
    selasa: { amberTitle: 'SELASA • PULL',  muscles: 'Punggung • Bisep',       exercises: PULL_EXERCISES  },
    rabu:   { amberTitle: 'RABU • LEGS',    muscles: 'Paha • Betis • Gluteus', exercises: LEGS_EXERCISES  },
    jumat:  { amberTitle: 'JUMAT • PUSH',   muscles: 'Dada • Bahu • Trisep',  exercises: PUSH_EXERCISES  },
    sabtu:  { amberTitle: 'SABTU • PULL',   muscles: 'Punggung • Bisep',       exercises: PULL_EXERCISES  },
  },
  'starter-strength': {
    senin:  { amberTitle: 'SENIN • FULL BODY A',  muscles: 'Semua Kelompok Otot', exercises: FULLBODY_EXERCISES },
    rabu:   { amberTitle: 'RABU • FULL BODY B',   muscles: 'Semua Kelompok Otot', exercises: FULLBODY_EXERCISES },
    jumat:  { amberTitle: 'JUMAT • FULL BODY A',  muscles: 'Semua Kelompok Otot', exercises: FULLBODY_EXERCISES },
  },
  'hypertrophy-pro': {
    senin:  { amberTitle: 'SENIN • UPPER A',  muscles: 'Dada • Bahu • Punggung • Lengan', exercises: UPPER_EXERCISES },
    selasa: { amberTitle: 'SELASA • LOWER A', muscles: 'Paha • Gluteus • Betis',           exercises: LOWER_EXERCISES },
    kamis:  { amberTitle: 'KAMIS • UPPER B',  muscles: 'Dada • Bahu • Punggung • Lengan', exercises: UPPER_EXERCISES },
    jumat:  { amberTitle: 'JUMAT • LOWER B',  muscles: 'Paha • Gluteus • Betis',           exercises: LOWER_EXERCISES },
  },
};

export default function SessionDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, weekId, sessionId } = useLocalSearchParams<{
    id: string;
    weekId: string;
    sessionId: string;
  }>();

  const weekLabel = WEEK_LABELS[weekId as string] ?? weekId;
  const session   = SESSION_DATA[id as string]?.[sessionId as string];
  if (!session) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Fixed nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.navTitleWrap}>
          <Text style={styles.navSub}>{weekLabel}</Text>
          <Text style={styles.navTitle}>{session.amberTitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Session Info ── */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTag}>Sesi Latihan</Text>
          <Text style={styles.sessionTitle}>{session.amberTitle}</Text>
          <Text style={styles.muscles}>{session.muscles}</Text>
        </View>

        {/* ── Pemanasan ── */}
        <Text style={styles.sectionLabel}>PEMANASAN</Text>

        <View style={styles.warmupCard}>
          <Text style={styles.warmupName}>Dynamic Stretching</Text>
          <Text style={styles.warmupSub}>5 menit sebelum mulai</Text>
        </View>

        {/* ── Latihan Utama ── */}
        <Text style={styles.sectionLabel}>LATIHAN UTAMA</Text>

        {session.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            name={ex.name}
            targets={ex.targets}
            Icon={ex.Icon}
            badges={ex.badges}
            onPress={() => router.push({
              pathname: '/exercise-detail',
              params: {
                groupLabel: MUSCLE_GROUP_LABELS[ex.guideId] ?? ex.guideId,
                exerciseName: ex.name.toUpperCase(),
              },
            })}
          />
        ))}
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
    fontSize: 15,
    color: TEXT_CREAM,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },

  /* Session Info */
  infoSection: { gap: 6, paddingBottom: 4 },
  infoTag: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  sessionTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 30,
    color: AMBER,
    lineHeight: 36,
  },
  muscles: {
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

  /* Warmup card */
  warmupCard: {
    backgroundColor: CARD,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    gap: 4,
  },
  warmupName: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 15,
    color: TEXT_CREAM,
  },
  warmupSub: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
  },
});

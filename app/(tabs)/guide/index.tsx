import ArmsIcon from '@/assets/images/muscle-groups/arms.svg';
import BackIcon from '@/assets/images/muscle-groups/back.svg';
import ChestIcon from '@/assets/images/muscle-groups/chest.svg';
import CoreIcon from '@/assets/images/muscle-groups/core.svg';
import LegsIcon from '@/assets/images/muscle-groups/legs.svg';
import ShoulderIcon from '@/assets/images/muscle-groups/shoulder.svg';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

const AMBER = '#EFA500';
const CARD = '#171719';
const ICON_BG = 'rgba(239,165,0,0.13)';
const TEXT_CREAM = '#F0ECC7';
const TEXT_NAME = '#E8E4DF';
const TEXT_MUTED = '#555555';
const TEXT_DARK = '#777777';

type MuscleGroup = {
  id: string;
  name: string;
  count: number;
  Icon: React.FC<SvgProps>;
};

const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: 'chest', name: 'Dada', count: 12, Icon: ChestIcon },
  { id: 'back', name: 'Punggung', count: 15, Icon: BackIcon },
  { id: 'shoulder', name: 'Bahu', count: 10, Icon: ShoulderIcon },
  { id: 'arms', name: 'Lengan', count: 18, Icon: ArmsIcon },
  { id: 'legs', name: 'Kaki', count: 14, Icon: LegsIcon },
  { id: 'core', name: 'Core / Inti', count: 11, Icon: CoreIcon },
];

const EXERCISE_TYPES = [
  {
    id: 'compound',
    badge: 'Compound',
    title: 'Gerakan Majemuk',
    description:
      'Melibatkan lebih dari 1 sendi dan beberapa otot secara bersamaan. Lebih efisien untuk membangun kekuatan keseluruhan dan massa otot. Direkomendasikan sebagai gerakan utama dalam setiap sesi latihan.',
    badgeTextColor: '#EFA500',
    badgeBgColor: 'rgba(239,165,0,0.13)',
  },
  {
    id: 'isolation',
    badge: 'Isolation',
    title: 'Gerakan Isolasi',
    description:
      'Fokus pada satu otot atau satu sendi saja. Digunakan untuk membentuk, memperkuat, atau menyeimbangkan otot tertentu. Biasanya dilakukan setelah gerakan compound sebagai "finishing" latihan.',
    badgeTextColor: '#5CA8FF',
    badgeBgColor: 'rgba(92,168,255,0.13)',
  },
  {
    id: 'push',
    badge: 'Push',
    title: 'Gerakan Dorong',
    description:
      'Gerakan mendorong beban menjauhi tubuh. Otot yang aktif meliputi dada (Pectoralis), Bahu Depan (Anterior Deltoid), dan Trisep. Merupakan salah satu dari tiga pola gerak dasar dalam sistem Push-Pull-Legs.',
    badgeTextColor: '#FF8585',
    badgeBgColor: 'rgba(255,133,133,0.13)',
  },
  {
    id: 'pull',
    badge: 'Pull',
    title: 'Gerakan Tarik',
    description:
      'Gerakan menarik beban mendekati tubuh. Otot yang aktif meliputi Punggung (Latissimus Dorsi), Bisep, dan Bahu Belakang (Posterior Deltoid). Merupakan pasangan gerakan Push untuk menjaga keseimbangan otot.',
    badgeTextColor: '#85FFCE',
    badgeBgColor: 'rgba(133,255,206,0.13)',
  },
];

export default function GuideScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>Eksplorasi</Text>
          <Text style={styles.headerTitle}>PANDUAN LATIHAN BEBAN</Text>
        </View>

        {/* ── Muscle Groups ── */}
        <Text style={styles.sectionLabel}>KELOMPOK OTOT</Text>

        <View style={styles.muscleGrid}>
          {[0, 2, 4].map((start) => (
            <View key={start} style={styles.muscleRow}>
              {MUSCLE_GROUPS.slice(start, start + 2).map((group, j) => (
                <TouchableOpacity
                  key={group.id}
                  style={[styles.muscleCard, j === 0 && { marginRight: 14 }]}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/guide/${group.id}`)}
                >
                  <View style={styles.muscleIconWrap}>
                    <group.Icon width={34} height={34} />
                  </View>
                  <View style={styles.muscleInfo}>
                    <Text style={styles.muscleName}>{group.name}</Text>
                    <Text style={styles.muscleCount}>{group.count} Gerakan</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* ── Exercise Types ── */}
        <Text style={styles.sectionLabel}>JENIS LATIHAN</Text>

        {EXERCISE_TYPES.map((type) => (
          <TouchableOpacity key={type.id} style={styles.exerciseCard} activeOpacity={0.7}>
            <View style={[styles.badge, { backgroundColor: type.badgeBgColor }]}>
              <Text style={[styles.badgeText, { color: type.badgeTextColor }]}>{type.badge}</Text>
            </View>
            <Text style={styles.exerciseTitle}>{type.title}</Text>
            <Text style={styles.exerciseDesc}>{type.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0C0C0D' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 14,
  },

  /* Page header */
  header: { gap: 2, marginBottom: 12 },
  headerSub: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 24,
    color: TEXT_CREAM,
  },

  /* Section labels */
  sectionLabel: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },

  /* Muscle group 2-col grid */
  muscleGrid: { gap: 14 },
  muscleRow: { flexDirection: 'row' },
  muscleCard: {
    flex: 1,
    height: 144,
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#282829',
    padding: 15,
    justifyContent: 'space-between',
  },
  muscleIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: ICON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muscleInfo: { gap: 3 },
  muscleName: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 16,
    color: TEXT_NAME,
  },
  muscleCount: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
  },

  /* Exercise type cards */
  exerciseCard: {
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#282829',
    padding: 16,
    gap: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 10,
  },
  exerciseTitle: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 16,
    color: TEXT_CREAM,
  },
  exerciseDesc: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
    lineHeight: 18,
  },
});

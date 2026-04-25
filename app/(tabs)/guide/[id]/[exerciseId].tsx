import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG = '#0C0C0D';
const CARD = '#171719';
const CARD_BORDER = '#282829';
const AMBER = '#EFA500';
const TEXT_CREAM = '#F0ECC7';
const TEXT_NAME = '#E8E4DF';
const TEXT_MUTED = '#555555';
const TEXT_DARK = '#777777';

const MUSCLE_GROUP_LABELS: Record<string, string> = {
  chest: 'DADA',
  back: 'PUNGGUNG',
  shoulder: 'BAHU',
  arms: 'LENGAN',
  legs: 'KAKI',
  core: 'CORE',
};

const STEPS = [
  'Berdiri tegak dengan kaki dibuka selebar bahu. Busungkan dada dan tarik bahu ke bawah agar tidak membungkuk.',
  'Pegang dumbell di kedua samping paha dengan telapak tangan menghadap ke dalam (neutral grip).',
  'Berikan sedikit tekukan pada siku (sekitar 10-15 derajat) dan kunci posisi ini.',
  'Angkat dumbell ke arah samping tubuh secara perlahan. Buang napas saat beban bergerak naik.',
  'Berhenti saat lengan sejajar dengan bahu untuk mencegah pengalihan beban ke otot trapezius.',
  'Jaga agar kelingking sedikit lebih tinggi daripada ibu jari untuk memaksimalkan kontraksi bahu samping.',
  'Turunkan dumbbell ke posisi semula dengan gerakan yang terkontrol dan lambat. Ambil napas saat beban bergerak turun.',
];

export default function ExerciseDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string; exerciseId: string }>();

  const groupLabel = MUSCLE_GROUP_LABELS[id] ?? id?.toUpperCase();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Fixed nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.navTitleWrap}>
          <Text style={styles.navSub}>{groupLabel}</Text>
          <Text style={styles.navTitle}>LATERAL RAISE</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video card */}
        <View style={styles.videoCard}>
          <View style={styles.playCircle}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <Text style={styles.videoLabel}>VIDEO DEMONSTRASI</Text>
        </View>

        {/* Badge row */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: 'rgba(92,168,255,0.13)' }]}>
            <Text style={[styles.badgeText, { color: '#5CA8FF' }]}>Isolation</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: 'rgba(255,116,116,0.13)' }]}>
            <Text style={[styles.badgeText, { color: '#FF8585' }]}>Push</Text>
          </View>
        </View>

        {/* Tentang gerakan */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>TENTANG GERAKAN INI</Text>
          <Text style={styles.cardBody}>
            Dumbbell Lateral Raise adalah latihan isolasi fundamental yang bertujuan untuk memperlebar
            dan mempertegas definisi otot bahu samping (Medial Deltoid). Gerakan ini bekerja dengan
            mekanisme abduksi sendi bahu tunggal untuk menciptakan efek visual bahu yang lebih lebar
            dan bulat (capped shoulders).
          </Text>
        </View>

        {/* Otot yang bekerja */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>OTOT YANG BEKERJA</Text>

          <View style={styles.anatomyWrap}>
            <Image
              source={require('@/assets/images/muscle-groups/shoulder-exercises/lateral-raise-anatomi.png')}
              style={styles.anatomyImage}
              contentFit="cover"
            />
            <View style={styles.anatomyOverlay} />
          </View>

          <View style={styles.muscleSection}>
            <Text style={styles.muscleSectionLabel}>Otot Utama (Primary)</Text>
            <View style={styles.muscleTag}>
              <View style={[styles.dot, { backgroundColor: AMBER }]} />
              <Text style={styles.muscleTagText}>Medial Deltoid</Text>
            </View>
          </View>

          <View style={styles.muscleSection}>
            <Text style={styles.muscleSectionLabel}>Otot Pendukung (Secondary)</Text>
            {['Anterior Deltoid', 'Supraspinatus', 'Trapezius'].map((muscle) => (
              <View key={muscle} style={styles.muscleTag}>
                <View style={[styles.dot, { backgroundColor: TEXT_MUTED }]} />
                <Text style={styles.muscleTagText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Peralatan */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PERALATAN</Text>
          <View style={styles.equipmentRow}>
            <View style={styles.equipmentChip}>
              <Text style={styles.equipmentText}>Dumbell</Text>
            </View>
          </View>
        </View>

        {/* Langkah-langkah */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>LANGKAH-LANGKAH</Text>
          <View style={styles.stepsList}>
            {STEPS.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Volume Latihan */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>VOLUME LATIHAN (REKOMENDASI)</Text>
          <View style={styles.statRow}>
            {[
              { value: '4', label: 'Set' },
              { value: '8-12', label: 'Repetisi' },
              { value: '90″', label: 'Istirahat' },
            ].map((stat, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.noteText}>
            <Text style={styles.noteItalic}>Progressive Overload.{'  '}</Text>
            Tambahkan beban 2.5-5 kg setiap kali mampu menyelesaikan 12 repetisi dengan bersih.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  /* Nav header */
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

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },

  /* Video card */
  videoCard: {
    height: 177,
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  playCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#000',
    fontSize: 20,
    marginLeft: 3,
  },
  videoLabel: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },

  /* Badge row */
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 10,
  },

  /* Generic card */
  card: {
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    gap: 12,
  },
  cardLabel: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  cardBody: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
    lineHeight: 20,
  },

  /* Anatomy */
  anatomyWrap: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  anatomyImage: {
    width: '100%',
    height: 169,
    opacity: 0.8,
  },
  anatomyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
  },

  /* Muscle tags */
  muscleSection: { gap: 8 },
  muscleSectionLabel: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
  },
  muscleTag: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  muscleTagText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_NAME,
  },

  /* Equipment */
  equipmentRow: { flexDirection: 'row' },
  equipmentChip: {
    backgroundColor: 'rgba(12,12,13,0.5)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  equipmentText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_NAME,
  },

  /* Volume Latihan */
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: BG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 26,
    color: AMBER,
  },
  statLabel: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
  },
  noteText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
    lineHeight: 20,
  },
  noteItalic: {
    fontFamily: 'Rubik_500Medium',
    fontStyle: 'italic',
    color: TEXT_NAME,
  },

  /* Steps */
  stepsList: { gap: 14 },
  stepRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumber: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 12,
    color: '#000',
  },
  stepText: {
    flex: 1,
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_NAME,
    lineHeight: 20,
  },
});

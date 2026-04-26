import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AMBER    = '#EFA500';
const CARD     = '#171719';
const TEXT_CREAM = '#F0ECC7';
const TEXT_MUTED = '#555555';
const TEXT_DARK  = '#777777';

type ProgramLevel = 'PEMULA' | 'MENENGAH' | 'LANJUTAN';

type Program = {
  id: string;
  level: ProgramLevel;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  split: string;
};

const LEVEL_BADGE: Record<ProgramLevel, { bg: string; text: string }> = {
  PEMULA:   { bg: 'rgba(180,83,9,0.25)',   text: '#F59E0B' },
  MENENGAH: { bg: 'rgba(29,78,216,0.25)',  text: '#60A5FA' },
  LANJUTAN: { bg: 'rgba(190,24,93,0.25)', text:  '#F472B6' },
};

const PROGRAMS: Program[] = [
  {
    id: 'starter-strength',
    level: 'PEMULA',
    title: 'Starter Strength',
    description: 'Program 4 minggu untuk membangun fondasi kekuatan dasar.',
    duration: '4 Minggu',
    frequency: '3x/Minggu',
    split: 'Full Body',
  },
  {
    id: 'push-pull-legs',
    level: 'MENENGAH',
    title: 'Push Pull Legs',
    description: 'Split 6 hari dengan fokus otot spesifik per sesi latihan.',
    duration: '8 Minggu',
    frequency: '6x/Minggu',
    split: 'Split',
  },
  {
    id: 'hypertrophy-pro',
    level: 'LANJUTAN',
    title: 'Hypertrophy Pro',
    description: 'Program 12 minggu intensif untuk hipertrofi maksimal.',
    duration: '12 Minggu',
    frequency: '5x/Minggu',
    split: 'Upper/Lower',
  },
];

export default function ProgramScreen() {
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
          <Text style={styles.headerSub}>Pilih Program</Text>
          <Text style={styles.headerTitle}>PROGRAM LATIHAN</Text>
        </View>

        {/* Section label */}
        <Text style={styles.sectionLabel}>PROGRAM TERSEDIA</Text>

        {/* Program cards */}
        {PROGRAMS.map((program) => {
          const badge = LEVEL_BADGE[program.level];
          return (
            <TouchableOpacity
              key={program.id}
              style={styles.programCard}
              activeOpacity={0.7}
              onPress={() => router.push(`/program/${program.id}` as any)}
            >
              {/* Badge + chevron */}
              <View style={styles.cardTopRow}>
                <View style={[styles.levelBadge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.levelBadgeText, { color: badge.text }]}>
                    {program.level}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
              </View>

              {/* Title */}
              <Text style={styles.programTitle}>{program.title}</Text>

              {/* Description */}
              <Text style={styles.programDesc}>{program.description}</Text>

              {/* Metadata row */}
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
            </TouchableOpacity>
          );
        })}
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

  sectionLabel: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },

  programCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#282829',
    padding: 18,
    gap: 10,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelBadge: {
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
    fontSize: 22,
    color: TEXT_CREAM,
  },
  programDesc: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 13,
    color: TEXT_DARK,
    lineHeight: 19,
  },

  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_DARK,
  },
});

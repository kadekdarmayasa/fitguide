import ArmsIcon from '@/assets/images/muscle-groups/arms.svg';
import BackIcon from '@/assets/images/muscle-groups/back.svg';
import ChestIcon from '@/assets/images/muscle-groups/chest.svg';
import CoreIcon from '@/assets/images/muscle-groups/core.svg';
import LegsIcon from '@/assets/images/muscle-groups/legs.svg';
import ShoulderIcon from '@/assets/images/muscle-groups/shoulder.svg';
import ArnoldPressIcon from '@/assets/images/muscle-groups/shoulder-exercises/arnold_press.svg';
import LateralRaiseIcon from '@/assets/images/muscle-groups/shoulder-exercises/lateral_raise.svg';
import OverheadPressIcon from '@/assets/images/muscle-groups/shoulder-exercises/overhead_press.svg';
import { Badge, ExerciseCard } from '@/components/exercise-card';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

const AMBER    = '#EFA500';
const CARD     = '#171719';
const TEXT_CREAM = '#F0ECC7';
const TEXT_MUTED = '#555555';
const THUMB_BG   = 'rgba(12,12,13,0.5)';

const B_COMPOUND:  Badge = { label: 'Compound',  bg: 'rgba(239,165,0,0.13)',   text: '#EFA500' };
const B_ISOLATION: Badge = { label: 'Isolation',  bg: 'rgba(93,133,180,0.13)', text: '#5CA8FF' };
const B_ISO_WARM:  Badge = { label: 'Isolation',  bg: 'rgba(239,165,0,0.13)',  text: '#EFA500' };
const B_PUSH:      Badge = { label: 'Push',        bg: 'rgba(255,116,116,0.13)', text: '#FF8585' };
const B_PULL:      Badge = { label: 'Pull',        bg: 'rgba(93,133,180,0.13)', text: '#5CA8FF' };

type Exercise = {
  id: string;
  name: string;
  targets: string;
  type: 'compound' | 'isolation';
  movement: 'push' | 'pull' | 'hinge';
  Icon: React.FC<SvgProps> | null;
  badges: Badge[];
};

type GroupData = {
  title: string;
  description: string;
  Icon: React.FC<SvgProps>;
  exercises: Exercise[];
};

const GROUPS: Record<string, GroupData> = {
  chest: {
    title: 'DADA',
    description: 'Pectoralis Major (atas & bawah) — otot utama penggerak gerakan mendorong ke depan dan menyilangkan lengan.',
    Icon: ChestIcon,
    exercises: [
      { id: 'bench-press',     name: 'Bench Press',     targets: 'Upper . Lower', type: 'compound',  movement: 'push', Icon: null, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'incline-press',   name: 'Incline Press',   targets: 'Upper',         type: 'compound',  movement: 'push', Icon: null, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'chest-fly',       name: 'Chest Fly',       targets: 'Inner . Outer', type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
      { id: 'cable-crossover', name: 'Cable Crossover', targets: 'Inner',         type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
    ],
  },
  back: {
    title: 'PUNGGUNG',
    description: 'Latissimus Dorsi, Trapezius, dan Rhomboid — otot-otot yang menstabilkan dan menggerakkan skapula dan tulang belakang.',
    Icon: BackIcon,
    exercises: [
      { id: 'pull-up',      name: 'Pull-Up',          targets: 'Upper . Lat',    type: 'compound',  movement: 'pull', Icon: null, badges: [B_COMPOUND,  B_PULL] },
      { id: 'bent-row',     name: 'Bent Over Row',    targets: 'Middle . Lower', type: 'compound',  movement: 'pull', Icon: null, badges: [B_COMPOUND,  B_PULL] },
      { id: 'lat-pulldown', name: 'Lat Pulldown',     targets: 'Lat',            type: 'compound',  movement: 'pull', Icon: null, badges: [B_COMPOUND,  B_PULL] },
      { id: 'cable-row',    name: 'Seated Cable Row', targets: 'Middle',         type: 'isolation', movement: 'pull', Icon: null, badges: [B_ISOLATION, B_PULL] },
    ],
  },
  shoulder: {
    title: 'BAHU',
    description: 'Deltoid Anterior (depan), Medial (samping) & Posterior (belakang) — tiga kepala yang membentuk bahu.',
    Icon: ShoulderIcon,
    exercises: [
      { id: 'overhead-press', name: 'Overhead Press', targets: 'Anterior . Medial',             type: 'compound',  movement: 'push', Icon: OverheadPressIcon, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'lateral-raise',  name: 'Lateral Raise',  targets: 'Medial',                        type: 'isolation', movement: 'push', Icon: LateralRaiseIcon,  badges: [B_ISOLATION, B_PUSH] },
      { id: 'arnold-press',   name: 'Arnold Press',   targets: 'Anterior . Medial . Posterior', type: 'isolation', movement: 'push', Icon: ArnoldPressIcon,   badges: [B_ISO_WARM,  B_PUSH] },
    ],
  },
  arms: {
    title: 'LENGAN',
    description: 'Bicep Brachii, Tricep Brachii, dan Brachialis — otot-otot yang menggerakkan siku dan mengatur rotasi lengan bawah.',
    Icon: ArmsIcon,
    exercises: [
      { id: 'barbell-curl',    name: 'Barbell Curl',     targets: 'Bicep',              type: 'isolation', movement: 'pull', Icon: null, badges: [B_ISOLATION, B_PULL] },
      { id: 'tricep-pushdown', name: 'Tricep Pushdown',  targets: 'Tricep',             type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
      { id: 'hammer-curl',     name: 'Hammer Curl',      targets: 'Bicep . Brachialis', type: 'isolation', movement: 'pull', Icon: null, badges: [B_ISOLATION, B_PULL] },
      { id: 'skull-crusher',   name: 'Skull Crusher',    targets: 'Tricep',             type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
      { id: 'close-grip',      name: 'Close Grip Press', targets: 'Tricep . Chest',     type: 'compound',  movement: 'push', Icon: null, badges: [B_COMPOUND,  B_PUSH] },
    ],
  },
  legs: {
    title: 'KAKI',
    description: 'Quadricep, Hamstring, Glutes, dan Calves — kelompok otot terbesar yang menopang gerakan kaki dan pinggul.',
    Icon: LegsIcon,
    exercises: [
      { id: 'squat',         name: 'Squat',             targets: 'Quad . Glute',      type: 'compound',  movement: 'push',  Icon: null, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'leg-press',     name: 'Leg Press',         targets: 'Quad . Glute',      type: 'compound',  movement: 'push',  Icon: null, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'rdl',           name: 'Romanian Deadlift', targets: 'Hamstring . Glute', type: 'compound',  movement: 'hinge', Icon: null, badges: [B_COMPOUND,  B_PULL] },
      { id: 'leg-curl',      name: 'Leg Curl',          targets: 'Hamstring',         type: 'isolation', movement: 'pull',  Icon: null, badges: [B_ISOLATION, B_PULL] },
      { id: 'leg-extension', name: 'Leg Extension',     targets: 'Quad',              type: 'isolation', movement: 'push',  Icon: null, badges: [B_ISOLATION, B_PUSH] },
    ],
  },
  core: {
    title: 'CORE / INTI',
    description: 'Rectus Abdominis, Obliques, dan Transversus Abdominis — otot-otot pusat tubuh yang menstabilkan tulang belakang.',
    Icon: CoreIcon,
    exercises: [
      { id: 'plank',        name: 'Plank',             targets: 'Deep Core',      type: 'compound',  movement: 'push', Icon: null, badges: [B_COMPOUND,  B_PUSH] },
      { id: 'crunch',       name: 'Crunch',            targets: 'Rectus',         type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
      { id: 'leg-raise',    name: 'Hanging Leg Raise', targets: 'Lower . Rectus', type: 'isolation', movement: 'pull', Icon: null, badges: [B_ISOLATION, B_PULL] },
      { id: 'cable-crunch', name: 'Cable Crunch',      targets: 'Rectus',         type: 'isolation', movement: 'push', Icon: null, badges: [B_ISOLATION, B_PUSH] },
    ],
  },
};

const FILTERS = [
  { id: 'semua',     label: 'Semua'     },
  { id: 'compound',  label: 'Compound'  },
  { id: 'isolation', label: 'Isolation' },
  { id: 'push',      label: 'Push'      },
];

export default function MuscleGroupDetail() {
  const { id }    = useLocalSearchParams<{ id: string }>();
  const router    = useRouter();
  const insets    = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('semua');

  const group = GROUPS[id as keyof typeof GROUPS];
  if (!group) return null;

  const { title, description, Icon, exercises } = group;

  const filtered = exercises.filter((ex) => {
    if (activeFilter === 'semua')     return true;
    if (activeFilter === 'compound')  return ex.type === 'compound';
    if (activeFilter === 'isolation') return ex.type === 'isolation';
    if (activeFilter === 'push')      return ex.movement === 'push';
    return true;
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Fixed nav header ── */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.navTitles}>
          <Text style={styles.navSub}>Kelompok Otot</Text>
          <Text style={styles.navTitle}>{title}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Muscle info card ── */}
        <View style={styles.infoCard}>
          <View style={styles.infoThumb}>
            <Icon width={56} height={56} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>OTOT UTAMA</Text>
            <Text style={styles.infoDesc}>{description}</Text>
          </View>
        </View>

        {/* ── Filter tabs ── */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setActiveFilter(f.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Exercise list ── */}
        {filtered.map((ex) => (
          <ExerciseCard
            key={ex.id}
            name={ex.name}
            targets={ex.targets}
            Icon={ex.Icon}
            badges={ex.badges}
            onPress={() => router.push(`/guide/${id}/${ex.id}`)}
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
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 5,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#282829',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitles: { gap: 1 },
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

  infoCard: {
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#282829',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 134,
  },
  infoThumb: {
    width: 99,
    height: 99,
    borderRadius: 6,
    backgroundColor: THUMB_BG,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoContent: { flex: 1, gap: 6 },
  infoLabel: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 1.2,
  },
  infoDesc: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: '#E8E4DF',
    lineHeight: 16,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterPill: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#282829',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  filterPillActive: {
    backgroundColor: AMBER,
    borderColor: AMBER,
  },
  filterText: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  filterTextActive: {
    fontFamily: 'Rubik_500Medium',
    color: '#0C0C0D',
  },
});

import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

const CARD       = '#171719';
const CARD_BORDER = '#282829';
const TEXT_NAME  = '#E8E4DF';
const TEXT_MUTED = '#555555';
const THUMB_BG   = 'rgba(12,12,13,0.5)';

export type Badge = { label: string; bg: string; text: string };

type Props = {
  name: string;
  targets: string;
  Icon: React.FC<SvgProps> | null;
  badges: Badge[];
  onPress: () => void;
};

export function ExerciseCard({ name, targets, Icon, badges, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.thumb}>
        {Icon && <Icon width={34} height={34} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.targets}>{targets}</Text>
        <View style={styles.badgeRow}>
          {badges.map((b, i) => (
            <View key={i} style={[styles.badge, { backgroundColor: b.bg }]}>
              <Text style={[styles.badgeText, { color: b.text }]}>{b.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 4,
    backgroundColor: THUMB_BG,
    overflow: 'hidden',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: 4 },
  name: {
    fontFamily: 'Oswald_500Medium',
    fontSize: 14,
    color: TEXT_NAME,
  },
  targets: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 10,
  },
});

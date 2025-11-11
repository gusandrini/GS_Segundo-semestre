import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 5, alignItems: 'center', textAlign: 'justify' },
  subtitle: { fontSize: 15, fontWeight: '500', marginBottom: 20, alignItems: 'center', textAlign: 'justify' },

  carouselContainer: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  carouselImage: {
    width: width * 0.9,
    height: 220,
    borderRadius: 16,
    marginHorizontal: (width * 0.05) / 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  
  section: { marginTop: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },

  actionsRow: { flexDirection: 'row', gap: 12 },
  actionCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  actionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  actionDesc: { fontSize: 12 },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  cardDesc: { fontSize: 13 },

  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  badgeTextLight: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  badgeTextDark: { color: '#0B1220', fontSize: 11, fontWeight: '800' },

  grid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  gridItem: {
    width: (width - 16 * 2 - 12) / 2, // padding 16 + gap 12
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  gridLabel: { fontSize: 11, marginBottom: 6 },
  gridValue: { fontSize: 18, fontWeight: '800' },

  cta: {
    marginTop: 16,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
});

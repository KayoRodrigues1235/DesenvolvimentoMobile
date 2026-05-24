import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { router } from 'expo-router';

// Tipos para os dados
interface DashboardData {
  totalPedidos: number;
  pedidosPendentes: number;
  pedidosEntregues: number;
  visitasHoje: number;
  metasMes: number;
  progressoMeta: number;
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');

  // Dados simulados (depois virão da API)
  const [dashboardData] = useState<DashboardData>({
    totalPedidos: 156,
    pedidosPendentes: 23,
    pedidosEntregues: 133,
    visitasHoje: 8,
    metasMes: 50000,
    progressoMeta: 65,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Aqui vai buscar dados da API
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Card de métrica
  const MetricCard = ({ title, value, icon, color }: any) => (
    <TouchableOpacity 
      style={[styles.metricCard, { backgroundColor: surfaceColor }]}
      activeOpacity={0.7}
    >
      <View style={styles.metricHeader}>
        <ThemedText style={[styles.metricIcon, { color }]}>{icon}</ThemedText>
        <ThemedText style={[styles.metricValue, { color }]}>{value}</ThemedText>
      </View>
      <ThemedText style={[styles.metricTitle, { color: textLightColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedView style={styles.content}>
        {/* Cabeçalho com saudação */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Olá,</ThemedText>
            <ThemedText type="title" style={[styles.userName, { color: primaryColor }]}>
              João Silva
            </ThemedText>
            <ThemedText style={[styles.role, { color: textLightColor }]}>
              Vendedor | Filial Fortaleza
            </ThemedText>
          </View>
          <TouchableOpacity 
            style={[styles.avatar, { backgroundColor: primaryColor + '20' }]}
            onPress={() => router.push('/src/tabs/perfil')}
          >
            <ThemedText style={[styles.avatarText, { color: primaryColor }]}>
              JS
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Métricas principais */}
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Pedidos"
            value={dashboardData.totalPedidos}
            icon="📦"
            color={primaryColor}
          />
          <MetricCard
            title="Pendentes"
            value={dashboardData.pedidosPendentes}
            icon="⏳"
            color="#FFB81C"
          />
          <MetricCard
            title="Entregues"
            value={dashboardData.pedidosEntregues}
            icon="✅"
            color="#28A745"
          />
          <MetricCard
            title="Visitas Hoje"
            value={dashboardData.visitasHoje}
            icon="🏪"
            color="#17A2B8"
          />
        </View>

        {/* Progresso da Meta */}
        <View style={[styles.goalCard, { backgroundColor: surfaceColor }]}>
          <View style={styles.goalHeader}>
            <ThemedText style={styles.goalTitle}>Meta do Mês</ThemedText>
            <ThemedText type="subtitle" style={[styles.goalValue, { color: primaryColor }]}>
              {formatCurrency(dashboardData.metasMes)}
            </ThemedText>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${dashboardData.progressoMeta}%`, backgroundColor: primaryColor }
              ]} 
            />
          </View>
          <View style={styles.progressLabels}>
            <ThemedText style={[styles.progressText, { color: textLightColor }]}>
              Progresso: {dashboardData.progressoMeta}%
            </ThemedText>
            <ThemedText style={[styles.progressText, { color: textLightColor }]}>
              Faltam {formatCurrency(dashboardData.metasMes * (1 - dashboardData.progressoMeta / 100))}
            </ThemedText>
          </View>
        </View>

        {/* Ações rápidas */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Ações Rápidas
        </ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => router.push('/src/tabs/pedidos')}
          >
            <ThemedText style={[styles.actionIcon, { color: primaryColor }]}>
              📝
            </ThemedText>
            <ThemedText style={styles.actionText}>Novo Pedido</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => {}}
          >
            <ThemedText style={[styles.actionIcon, { color: primaryColor }]}>
              📊
            </ThemedText>
            <ThemedText style={styles.actionText}>Relatórios</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => {}}
          >
            <ThemedText style={[styles.actionIcon, { color: primaryColor }]}>
              🎯
            </ThemedText>
            <ThemedText style={styles.actionText}>Metas</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => router.push('/src/tabs/notificacoes')}
          >
            <ThemedText style={[styles.actionIcon, { color: primaryColor }]}>
              🔔
            </ThemedText>
            <ThemedText style={styles.actionText}>Comunicados</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  role: {
    fontSize: Typography.fontSize.sm,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  metricCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  metricIcon: {
    fontSize: Typography.fontSize.xxl,
  },
  metricValue: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },
  metricTitle: {
    fontSize: Typography.fontSize.sm,
  },
  goalCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalTitle: {
    fontSize: Typography.fontSize.md,
  },
  goalValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#124192',
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: Typography.fontSize.xs,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  actionIcon: {
    fontSize: Typography.fontSize.xxxl,
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
});
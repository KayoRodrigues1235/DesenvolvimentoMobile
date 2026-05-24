import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Componente do Gráfico de Pizza
const DonutChart = ({ percentage, size = 100, strokeWidth = 12 }: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Cores profissionais para o gráfico
  const chartColors = {
    progress: '#4ade80',      // Verde vibrante para progresso
    background: '#1e3a5f',    // Azul escuro para fundo
    text: '#dce5e7',          // Branco para o texto
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={size / 2} originY={size / 2}>
          {/* Fundo do gráfico */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={chartColors.background}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progresso do gráfico */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={chartColors.progress}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
        {/* Texto central */}
        <SvgText
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dy=".3em"
          fill={chartColors.text}
          fontSize={size * 0.2}
          fontWeight="bold"
        >
          {`${percentage}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const borderColor = useThemeColor({}, 'border');

  // Dados simulados
  const [dashboardData] = useState({
    totalVendido: 32500,
    porcentagemMeta: 65,
    entregues: 133,
    pendentes: 23,
    totalPedidos: 156,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ThemedView style={styles.content}>
        
        {/* Header com Perfil e Notificações */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/src/tabs/perfil')}
          >
            <View style={[styles.avatar, { backgroundColor: textColor + '20' }]}>
              <ThemedText style={[styles.avatarText, { color: textColor }]}>
                JS
              </ThemedText>
            </View>
            <View style={styles.headerInfo}>
              <ThemedText style={styles.userName}>João Silva</ThemedText>
              <ThemedText style={[styles.userRole, { color: textLightColor }]}>
                Vendedor Pleno
              </ThemedText>
              <ThemedText style={[styles.userLocation, { color: textLightColor }]}>
                Filial Fortaleza - CE
              </ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.notificationButton, { backgroundColor: surfaceColor }]}
            onPress={() => router.push('/src/tabs/notificacoes')}
          >
            <Ionicons name="notifications-outline" size={24} color={textColor} />
            <View style={[styles.notificationBadge, { backgroundColor: '#ef4444' }]}>
              <ThemedText style={styles.badgeText}>2</ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Total Vendido */}
        <View style={[styles.totalCard, { backgroundColor: surfaceColor }]}>
          <ThemedText style={[styles.totalLabel, { color: textLightColor }]}>
            Total Vendido
          </ThemedText>
          <ThemedText style={[styles.totalValue, { color: textColor }]}>
            {formatCurrency(dashboardData.totalVendido)}
          </ThemedText>
        </View>

        {/* Cards lado a lado */}
        <View style={styles.statsRow}>
          {/* Card Meta com Gráfico Donut */}
          <View style={[styles.statCard, { backgroundColor: surfaceColor }]}>
            <ThemedText style={[styles.statTitle, { color: textLightColor }]}>
              Meta do Mês
            </ThemedText>
            <DonutChart percentage={dashboardData.porcentagemMeta} size={100} />
            <ThemedText style={[styles.statSubtext, { color: textLightColor }]}>
              {dashboardData.porcentagemMeta}% atingido
            </ThemedText>
          </View>

          {/* Card Entregas */}
          <View style={[styles.statCard, { backgroundColor: surfaceColor }]}>
            <ThemedText style={[styles.statTitle, { color: textLightColor }]}>
              Entregas
            </ThemedText>
            
            <View style={styles.deliveryStats}>
              <View style={styles.deliveryItem}>
                <View style={[styles.deliveryDot, { backgroundColor: '#4ade80' }]} />
                <View>
                  <ThemedText style={[styles.deliveryNumber, { color: textColor }]}>
                    {dashboardData.entregues}
                  </ThemedText>
                  <ThemedText style={[styles.deliveryLabel, { color: textLightColor }]}>
                    Entregues
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.deliveryDivider} />
              
              <View style={styles.deliveryItem}>
                <View style={[styles.deliveryDot, { backgroundColor: '#f97316' }]} />
                <View>
                  <ThemedText style={[styles.deliveryNumber, { color: textColor }]}>
                    {dashboardData.pendentes}
                  </ThemedText>
                  <ThemedText style={[styles.deliveryLabel, { color: textLightColor }]}>
                    Pendentes
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.totalPedidos}>
              <ThemedText style={[styles.totalPedidosLabel, { color: textLightColor }]}>
                Total de Pedidos
              </ThemedText>
              <ThemedText style={[styles.totalPedidosValue, { color: textColor }]}>
                {dashboardData.totalPedidos}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Ações Rápidas
          </ThemedText>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => router.push('/src/tabs/pedidos')}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: textColor + '15' }]}>
                <Ionicons name="add-circle-outline" size={24} color={textColor} />
              </View>
              <View>
                <ThemedText style={styles.actionTitle}>Novo Pedido</ThemedText>
                <ThemedText style={[styles.actionSubtitle, { color: textLightColor }]}>
                  Registrar nova venda
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textLightColor} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => {}}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: textColor + '15' }]}>
                <Ionicons name="bar-chart-outline" size={24} color={textColor} />
              </View>
              <View>
                <ThemedText style={styles.actionTitle}>Relatórios</ThemedText>
                <ThemedText style={[styles.actionSubtitle, { color: textLightColor }]}>
                  Acompanhar resultados
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textLightColor} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => {}}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: textColor + '15' }]}>
                <Ionicons name="flag-outline" size={24} color={textColor} />
              </View>
              <View>
                <ThemedText style={styles.actionTitle}>Minhas Metas</ThemedText>
                <ThemedText style={[styles.actionSubtitle, { color: textLightColor }]}>
                  Ver metas do período
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textLightColor} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: surfaceColor }]}
            onPress={() => router.push('/src/tabs/notificacoes')}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: textColor + '15' }]}>
                <Ionicons name="megaphone-outline" size={24} color={textColor} />
              </View>
              <View>
                <ThemedText style={styles.actionTitle}>Comunicados</ThemedText>
                <ThemedText style={[styles.actionSubtitle, { color: textLightColor }]}>
                  Avisos importantes
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textLightColor} />
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  userRole: {
    fontSize: Typography.fontSize.xs,
    marginBottom: 2,
  },
  userLocation: {
    fontSize: Typography.fontSize.xs,
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  totalCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
  },
  totalValue: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: Typography.fontSize.xs,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  statSubtext: {
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  deliveryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Spacing.md,
  },
  deliveryItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  deliveryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: Spacing.xs,
  },
  deliveryNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  deliveryLabel: {
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
  },
  deliveryDivider: {
    width: 1,
    backgroundColor: '#124192',
  },
  totalPedidos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#124192',
    marginTop: Spacing.sm,
  },
  totalPedidosLabel: {
    fontSize: Typography.fontSize.sm,
  },
  totalPedidosValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },

  actionsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    fontSize: Typography.fontSize.lg,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: Typography.fontSize.xs,
  },
});
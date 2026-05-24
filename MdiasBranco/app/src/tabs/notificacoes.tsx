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
import { Ionicons } from '@expo/vector-icons';

// Tipo para as notificações
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  type: 'pedido' | 'meta' | 'comunicado' | 'sistema' | 'entrega';
}

export default function NotificacoesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Novo Pedido #1234',
      message: 'Pedido confirmado no valor de R$ 2.500,00 para o cliente Mercado Central',
      date: 'Hoje',
      time: '09:30',
      read: false,
      type: 'pedido',
    },
    {
      id: '2',
      title: 'Meta do Mês',
      message: 'Você atingiu 65% da sua meta mensal. Continue assim! 🎯',
      date: 'Hoje',
      time: '08:15',
      read: false,
      type: 'meta',
    },
    {
      id: '3',
      title: 'Entrega Realizada',
      message: 'Pedido #1230 foi entregue com sucesso no cliente Supermercado Bom Preço',
      date: 'Ontem',
      time: '17:45',
      read: true,
      type: 'entrega',
    },
    {
      id: '4',
      title: 'Comunicado Interno',
      message: 'Reunião de vendas amanhã às 10h no auditório central. Presença obrigatória!',
      date: 'Ontem',
      time: '14:20',
      read: true,
      type: 'comunicado',
    },
    {
      id: '5',
      title: 'Sistema Atualizado',
      message: 'Novas funcionalidades disponíveis no app. Confira as novidades!',
      date: '25/05',
      time: '11:00',
      read: true,
      type: 'sistema',
    },
    {
      id: '6',
      title: 'Pedido Pendente',
      message: 'Pedido #1235 aguardando aprovação do gerente',
      date: '25/05',
      time: '09:15',
      read: true,
      type: 'pedido',
    },
  ]);

  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const borderColor = useThemeColor({}, 'border');

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'pedido':
        return 'cart-outline';
      case 'meta':
        return 'flag-outline';
      case 'comunicado':
        return 'megaphone-outline';
      case 'sistema':
        return 'hardware-chip-outline';
      case 'entrega':
        return 'checkmark-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'pedido':
        return '#4ade80'; // Verde
      case 'meta':
        return '#f59e0b'; // Laranja
      case 'comunicado':
        return '#8b5cf6'; // Roxo
      case 'sistema':
        return '#06b6d4'; // Ciano
      case 'entrega':
        return '#10b981'; // Esmeralda
      default:
        return textColor;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        {
          backgroundColor: surfaceColor,
          borderLeftColor: notification.read ? borderColor : getNotificationColor(notification.type),
          opacity: notification.read ? 0.8 : 1,
        },
      ]}
      onPress={() => markAsRead(notification.id)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationIconContainer}>
        <View
          style={[
            styles.notificationIconBg,
            { backgroundColor: getNotificationColor(notification.type) + '20' },
          ]}
        >
          <Ionicons
            name={getNotificationIcon(notification.type)}
            size={24}
            color={getNotificationColor(notification.type)}
          />
        </View>
        {!notification.read && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <ThemedText
            style={[
              styles.notificationTitle,
              !notification.read && styles.notificationTitleUnread,
            ]}
          >
            {notification.title}
          </ThemedText>
          <ThemedText style={[styles.notificationTime, { color: textLightColor }]}>
            {notification.time}
          </ThemedText>
        </View>

        <ThemedText
          style={[styles.notificationMessage, { color: textLightColor }]}
          numberOfLines={2}
        >
          {notification.message}
        </ThemedText>

        <View style={styles.notificationFooter}>
          <ThemedText style={[styles.notificationDate, { color: textLightColor }]}>
            {notification.date}
          </ThemedText>
          
          <TouchableOpacity
            onPress={() => deleteNotification(notification.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={18} color={textLightColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ThemedView style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.headerTitle}>
              Notificações
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: textLightColor }]}>
              {unreadCount} não lidas
            </ThemedText>
          </View>
          
          {unreadCount > 0 && (
            <TouchableOpacity
              style={[styles.markAllButton, { backgroundColor: surfaceColor }]}
              onPress={markAllAsRead}
            >
              <Ionicons name="checkmark-done-outline" size={20} color={textColor} />
              <ThemedText style={styles.markAllText}>Marcar todas</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de Notificações */}
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconBg, { backgroundColor: surfaceColor }]}>
              <Ionicons name="notifications-off-outline" size={48} color={textLightColor} />
            </View>
            <ThemedText type="title" style={styles.emptyTitle}>
              Nenhuma notificação
            </ThemedText>
            <ThemedText style={[styles.emptyText, { color: textLightColor }]}>
              Você está em dia! Volte mais tarde para ver novidades.
            </ThemedText>
          </View>
        )}

        {/* Footer com info */}
        {notifications.length > 0 && (
          <ThemedText style={[styles.footerText, { color: textLightColor }]}>
            Você pode deslizar para deletar ou tocar para marcar como lida
          </ThemedText>
        )}

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
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  markAllText: {
    fontSize: Typography.fontSize.sm,
  },

  // Notification Card
  notificationCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  notificationIconContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  notificationIconBg: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f87171',
    borderWidth: 2,
    borderColor: '#03246b',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  notificationTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    flex: 1,
    marginRight: Spacing.sm,
  },
  notificationTitleUnread: {
    fontWeight: Typography.fontWeight.bold,
  },
  notificationTime: {
    fontSize: Typography.fontSize.xs,
  },
  notificationMessage: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationDate: {
    fontSize: Typography.fontSize.xs,
  },
  deleteButton: {
    padding: Spacing.xs,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyIconBg: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },

  // Footer
  footerText: {
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
});
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface UserData {
  nome: string;
  email: string;
  cargo: string;
  filial: string;
  matricula: string;
  telefone: string;
  dataAdmissao: string;
  metaMensal: number;
  vendasRealizadas: number;
}

export default function PerfilScreen() {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const borderColor = useThemeColor({}, 'border');

  const [userData] = useState<UserData>({
    nome: 'João Silva Santos',
    email: 'joao.silva@mdiasbranco.com.br',
    cargo: 'Vendedor Pleno',
    filial: 'Filial Fortaleza - CE',
    matricula: 'MB-2024-0123',
    telefone: '(85) 98888-7777',
    dataAdmissao: '10/03/2022',
    metaMensal: 50000,
    vendasRealizadas: 32500,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair do App',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            // Voltar para tela de login
            router.replace('/');
          }
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress, danger = false }: any) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: borderColor }]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons 
          name={icon} 
          size={24} 
          color={danger ? '#f87171' : textLightColor} 
        />
        <ThemedText style={[styles.menuItemText, danger && styles.dangerText]}>
          {title}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={textLightColor} />
    </TouchableOpacity>
  );

  const SettingItem = ({ icon, title, value, onValueChange }: any) => (
    <View style={[styles.settingItem, { borderBottomColor: borderColor }]}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={24} color={textLightColor} />
        <ThemedText style={styles.menuItemText}>{title}</ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: borderColor, true: textColor }}
        thumbColor={value ? '#dce5e7' : '#7a919f'}
      />
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.content}>
        
        {/* Cabeçalho do Perfil */}
        <View style={[styles.header, { backgroundColor: surfaceColor }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: textColor + '20' }]}>
              <ThemedText style={[styles.avatarText, { color: textColor }]}>
                {userData.nome.split(' ').map(n => n[0]).join('')}
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={textColor} />
            </TouchableOpacity>
          </View>
          
          <ThemedText type="title" style={styles.userName}>
            {userData.nome}
          </ThemedText>
          <ThemedText style={[styles.userRole, { color: textLightColor }]}>
            {userData.cargo}
          </ThemedText>
          <ThemedText style={[styles.userLocation, { color: textLightColor }]}>
            {userData.filial}
          </ThemedText>
        </View>

        {/* Métricas do Usuário */}
        <View style={styles.metricsContainer}>
          <View style={[styles.metricCard, { backgroundColor: surfaceColor }]}>
            <ThemedText style={styles.metricLabel}>Meta do Mês</ThemedText>
            <ThemedText type="title" style={styles.metricValue}>
              {formatCurrency(userData.metaMensal)}
            </ThemedText>
          </View>
          
          <View style={[styles.metricCard, { backgroundColor: surfaceColor }]}>
            <ThemedText style={styles.metricLabel}>Vendas Realizadas</ThemedText>
            <ThemedText type="title" style={styles.metricValue}>
              {formatCurrency(userData.vendasRealizadas)}
            </ThemedText>
          </View>
          
          <View style={[styles.metricCard, { backgroundColor: surfaceColor }]}>
            <ThemedText style={styles.metricLabel}>Progresso da Meta</ThemedText>
            <ThemedText type="title" style={styles.metricValue}>
              {Math.round((userData.vendasRealizadas / userData.metaMensal) * 100)}%
            </ThemedText>
            <View style={styles.miniProgressBar}>
              <View 
                style={[
                  styles.miniProgressFill, 
                  { 
                    width: `${(userData.vendasRealizadas / userData.metaMensal) * 100}%`,
                    backgroundColor: textColor
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Informações Pessoais */}
        <View style={[styles.section, { backgroundColor: surfaceColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Informações Pessoais
          </ThemedText>
          
          <View style={[styles.infoRow, { borderBottomColor: borderColor }]}>
            <ThemedText style={styles.infoLabel}>Matrícula</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.matricula}</ThemedText>
          </View>
          
          <View style={[styles.infoRow, { borderBottomColor: borderColor }]}>
            <ThemedText style={styles.infoLabel}>Email</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.email}</ThemedText>
          </View>
          
          <View style={[styles.infoRow, { borderBottomColor: borderColor }]}>
            <ThemedText style={styles.infoLabel}>Telefone</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.telefone}</ThemedText>
          </View>
          
          <View style={[styles.infoRow, { borderBottomColor: borderColor }]}>
            <ThemedText style={styles.infoLabel}>Data de Admissão</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.dataAdmissao}</ThemedText>
          </View>
        </View>

        {/* Configurações */}
        <View style={[styles.section, { backgroundColor: surfaceColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Configurações
          </ThemedText>
          
          <SettingItem
            icon="notifications-outline"
            title="Notificações Push"
            value={notificacoesAtivas}
            onValueChange={setNotificacoesAtivas}
          />
          
          <SettingItem
            icon="moon-outline"
            title="Modo Escuro"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        {/* Menu de Ações */}
        <View style={[styles.section, { backgroundColor: surfaceColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Mais Opções
          </ThemedText>
          
          <MenuItem
            icon="document-text-outline"
            title="Meus Documentos"
            onPress={() => Alert.alert('Em breve', 'Documentos disponíveis em breve')}
          />
          
          <MenuItem
            icon="trending-up-outline"
            title="Minhas Metas"
            onPress={() => Alert.alert('Em breve', 'Metas disponíveis em breve')}
          />
          
          <MenuItem
            icon="help-circle-outline"
            title="Suporte"
            onPress={() => Alert.alert('Suporte', 'Entre em contato: suporte@mdiasbranco.com.br')}
          />
          
          <MenuItem
            icon="information-circle-outline"
            title="Sobre o App"
            onPress={() => Alert.alert(
              'M. Dias Branco App',
              'Versão 1.0.0\n\nPortal do Funcionário\n\n© 2024 M. Dias Branco S.A.'
            )}
          />
          
          <MenuItem
            icon="log-out-outline"
            title="Sair"
            danger={true}
            onPress={handleLogout}
          />
        </View>

        {/* Versão do App */}
        <ThemedText style={[styles.versionText, { color: textLightColor }]}>
          Versão 1.0.0
        </ThemedText>
        
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
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Typography.fontSize.display,
    fontWeight: Typography.fontWeight.bold,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#03246b',
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  userName: {
    fontSize: Typography.fontSize.xl,
    marginBottom: Spacing.xs,
  },
  userRole: {
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing.xs,
  },
  userLocation: {
    fontSize: Typography.fontSize.sm,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  metricCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  metricLabel: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.xs,
  },
  metricValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  miniProgressBar: {
    height: 4,
    backgroundColor: '#124192',
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    marginTop: Spacing.sm,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  section: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    fontSize: Typography.fontSize.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: Typography.fontSize.sm,
  },
  infoValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuItemText: {
    fontSize: Typography.fontSize.md,
  },
  dangerText: {
    color: '#f87171',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  versionText: {
    textAlign: 'center',
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
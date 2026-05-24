import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import InputField from '@/components/InputField';
import { router } from 'expo-router';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Usando as cores do seu theme
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');

  const validateEmail = (emailInput: string): string => {
    const emailRegex = /^[^\s@]+@mdiasbranco\.com\.br$/;
    if (!emailInput) return 'Email é obrigatório';
    if (!emailRegex.test(emailInput)) {
      return 'Use seu email corporativo (@mdiasbranco.com.br)';
    }
    return '';
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = !password ? 'Senha é obrigatória' : '';
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    if (emailError || passwordError) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/src/tabs/home')
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <ThemedView style={styles.content}>
        {/* Header com Banner */}
        <View style={styles.header}>
          <View style={styles.bannerContainer}>
            <Image
              source={require('../assets/images/banner.png')}
              style={styles.banner}
              resizeMode="contain"
            />
          </View>
          <ThemedText type="title" style={[styles.title, { color: primaryColor }]}>
            M. Dias Branco
          </ThemedText>
          <ThemedText type="subtitle" style={[styles.subtitle, { color: textLightColor }]}>
            Portal do Funcionário
          </ThemedText>
        </View>
        
        {/* Formulário */}
        <View style={styles.form}>
          <InputField
            label="Email Corporativo"
            icon="mail-outline"
            placeholder="seu.nome@mdiasbranco.com.br"
            value={email}
            onChangeText={(text) => {
              setEmail(text.toLowerCase());
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />
          
          <InputField
            label="Senha"
            icon="lock-closed-outline"
            placeholder="Sua senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            secureTextEntry
            error={errors.password}
          />
          
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: primaryColor }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.forgotButton}>
            <ThemedText type="link" style={[styles.forgotText, { color: textLightColor }]}>
              Esqueci minha senha
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: textLightColor }]}>
            Ambiente seguro para colaboradores
          </ThemedText>
          <ThemedText style={[styles.footerSubtext, { color: textLightColor }]}>
            M. Dias Branco S.A.
          </ThemedText>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  bannerContainer: {
    width: 150,
    height: 150,
    marginBottom: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  form: {
    marginVertical: Spacing.xl,
  },
  loginButton: {
    height: 52,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
     backgroundColor: '#0a2d7a',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  forgotText: {
    fontSize: Typography.fontSize.sm,
  },
  footer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    opacity: 0.7,
  },
});
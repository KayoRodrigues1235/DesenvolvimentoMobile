import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
}

export default function InputField({ 
  label, 
  icon, 
  error, 
  secureTextEntry,
  ...rest 
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;
  
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');
  const errorColor = useThemeColor({}, 'error');
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <View style={[
        styles.inputContainer, 
        { 
          borderColor: error ? errorColor : borderColor,
          backgroundColor: surfaceColor 
        }
      ]}>
        {icon && (
          <Ionicons name={icon} size={20} color={textLightColor} style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholderTextColor={textLightColor}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={textLightColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    marginBottom: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    paddingVertical: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
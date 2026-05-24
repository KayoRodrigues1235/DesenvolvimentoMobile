import { Tabs } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarIcon({ focused, color, name }: { focused: boolean; color: string; name: any }) {
  return (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      size={24}
      color={color}
    />
  );
}

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: textLightColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: textLightColor + '20',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 70 + insets.bottom : 120,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} name="cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} name="notifications" />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color} name="person" />
          ),
        }}
      />
    </Tabs>
  );
}
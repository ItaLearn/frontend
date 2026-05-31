import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF5A2C',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 10,
        }
      }}
    >
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {focused && <View style={{ position: 'absolute', top: -8, height: 3, width: 35, backgroundColor: '#FF5A2C', borderRadius: 2 }} />}
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="minicursos"
        options={{
          title: 'Minicursos',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {focused && <View style={{ position: 'absolute', top: -8, height: 3, width: 35, backgroundColor: '#FF5A2C', borderRadius: 2 }} />}
              <Ionicons name={focused ? "school" : "school-outline"} size={26} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="meuAprendizado"
        options={{
          title: 'Meu Aprendizado',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {focused && <View style={{ position: 'absolute', top: -8, height: 3, width: 35, backgroundColor: '#FF5A2C', borderRadius: 2 }} />}
              <Ionicons name={focused ? "document-text" : "document-text-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {focused && <View style={{ position: 'absolute', top: -8, height: 3, width: 35, backgroundColor: '#FF5A2C', borderRadius: 2 }} />}
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="criarMinicurso"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="dadosUsuario"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
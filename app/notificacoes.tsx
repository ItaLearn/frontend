import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificacoesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnVoltar}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.tituloHeader}>Notificações</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.containerIlustracao}>
          <View style={styles.circuloFundo}>
            <Ionicons name="notifications" size={80} color="#FF5A2C" />
          </View>
          <View style={[styles.circuloDecorativo, { bottom: 20, left: -10, width: 20, height: 20 }]} />
          <View style={[styles.circuloDecorativo, { top: 40, right: -15, width: 15, height: 15 }]} />
        </View>

        <Text style={styles.textoDestaque}>Você ainda não tem notificações</Text>
        <Text style={styles.subtexto}>Assim que algo acontecer, você verá por aqui</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botaoLaranja} 
          onPress={() => router.replace('/(tabs)/explorar')}
        >
          <Text style={styles.textoBotao}>Explorar cursos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btnVoltar: {
    padding: 5,
  },
  tituloHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  containerIlustracao: {
    position: 'relative',
    marginBottom: 40,
  },
  circuloFundo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF5F0', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloDecorativo: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#FFE8E0',
  },
  textoDestaque: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5A2C',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtexto: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 30,
    paddingBottom: 50,
  },
  botaoLaranja: {
    backgroundColor: '#FF5A2C',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
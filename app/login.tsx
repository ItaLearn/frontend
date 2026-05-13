import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha para entrar.");
      return;
    }

    const credenciais = {
      email: email,
      senha: senha
    };

    // ATENÇÃO: Troque "SEU_IP_AQUI" pelo IP do seu computador na rede Wi-Fi!
    fetch('http://10.0.2.2:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciais)
    })
      .then(response => response.json())
      .then(data => {
        if (data.detail) {
          Alert.alert("Erro de Acesso", data.detail);
        } else {
          router.replace('/home');
        }
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique o IP.");
      });
  };

  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.titulo}>Entrar</Text>

      {/* Subtítulo transformado em Link! */}
      <Text style={styles.subtitulo}>
        Não possui conta?{' '}
        <Text style={styles.link} onPress={() => router.replace('/')}>
          Cadastre-se
        </Text>
      </Text>

      {/* Usuário */}
      <Text style={styles.label}>E-mail *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: usuario@email.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address" // Adicionei para o teclado abrir com o "@"
      />

      {/* Senha */}
      <Text style={styles.label}>Senha *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão */}
      <TouchableOpacity style={styles.botaoPrimario} onPress={fazerLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      {/* Esqueci senha */}
      <Text style={styles.esqueci}>Esqueceu sua senha?</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5A2C',
    textAlign: 'center',
    marginBottom: 10
  },

  subtitulo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30
  },

  link: {
    color: '#FF5A2C',
    fontWeight: 'bold'
  },

  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5
  },

  input: {
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 15
  },

  botaoPrimario: {
    backgroundColor: '#FF5A2C',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  esqueci: {
    textAlign: 'center',
    color: '#FF5A2C',
    marginTop: 20,
    textDecorationLine: 'underline'
  }
});
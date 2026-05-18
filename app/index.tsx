import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { API_URL } from '../constants/api';

export default function CadastroScreen() {
  const [etapa, setEtapa] = useState(1);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [profissao, setProfissao] = useState('');

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const avancarParaEtapa2 = () => {
    if (nome.length < 3 || !email) {
      Alert.alert("Atenção", "Preencha o nome e o e-mail para avançar.");
      return;
    }
    setEtapa(2);
  };

  const voltarParaEtapa1 = () => {
    setEtapa(1);
  };

  const fazerCadastro = () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const dadosUsuario = {
      nome: nome,
      nome_usuario: nomeUsuario,
      email: email,
      senha: senha,
      profissao: profissao
    };

    fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosUsuario)
    })
    .then(res => res.json())
    .then(data => {
      if (data.detail) {
        Alert.alert("Atenção", data.detail);
      } else {
        Alert.alert("Sucesso!", data.mensagem);
        router.replace('/(tabs)/home');
      }
    })
    .catch((erro) => {
      console.error("ERRO NO FETCH DE CADASTRO:", erro);
      Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique o IP.");
    });
  };

  return (
    <View style={styles.container}>

      {etapa === 1 && (
        <View style={styles.blocoFormulario}>
          
          <View style={styles.containerLink}>
            <Text style={styles.textoComum}>Já possui conta?</Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.textoLink}>Faça login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: João Silva"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: exemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Profissão *</Text>
          <TextInput
            style={styles.input}
            placeholder="Professora, artesão, agricultor"
            value={profissao}
            onChangeText={setProfissao}
          />

          <TouchableOpacity style={styles.botaoPrimario} onPress={avancarParaEtapa2}>
            <Text style={styles.textoBotaoPrimario}>Avançar</Text>
          </TouchableOpacity>

        </View>
      )}

      {etapa === 2 && (
        <View style={styles.blocoFormulario}>

          <Text style={styles.titulo}>Credenciais</Text>
          <Text style={styles.subtitulo}>Digite suas credenciais</Text>

          <Text style={styles.label}>Usuário *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: João Silva"
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha *</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmação de senha *</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.botaoPrimario} onPress={fazerCadastro}>
            <Text style={styles.textoBotaoPrimario}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoSecundarioFull} onPress={voltarParaEtapa1}>
            <Text style={styles.textoBotaoSecundario}>Voltar</Text>
          </TouchableOpacity>

        </View>
      )}

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

  blocoFormulario: {
    width: '100%'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5A2C',
    textAlign: 'center',
    marginBottom: 8
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

  textoBotaoPrimario: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  botaoSecundarioFull: {
    backgroundColor: '#DDD',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10
  },

  textoBotaoSecundario: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
    marginRight: 10
  },

  checkboxTexto: {
    flex: 1,
    fontSize: 13,
    color: '#444'
  },
  
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  
  textoComum: {
    fontSize: 16,
    color: '#666',
  },
  
  textoLink: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
    marginLeft: 5,
  }
});
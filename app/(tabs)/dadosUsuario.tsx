import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { API_URL } from '../../constants/api';
import { useAuth } from '../../contexts/AuthContext';

export default function PerfilScreen() {
  const { user, logout, updateUser } = useAuth();

  const [nome, setNome] = useState('');
  const [profissao, setProfissao] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setProfissao(user.profissao || '');
    }
  }, [user]);

  const salvarAlteracoes = () => {
    if (!user) return;

    const dadosAtualizados = {
      nome: nome,
      profissao: profissao,
      senha: senha ? senha : null
    };

    fetch(`${API_URL}/usuarios/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensagem) {
          Alert.alert('Sucesso!', 'Seu perfil foi atualizado.');

          updateUser({
            ...user,
            nome: nome,
            profissao: profissao
          });

          setSenha('');
        } else {
          Alert.alert('Erro', 'Não foi possível atualizar.');
        }
      })
      .catch(() => {
        Alert.alert(
          'Erro',
          'Falha de conexão com o servidor.'
        );
      });
  };

  const sairDoApp = () => {
    logout().then(() => {
      router.replace('/');
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#222"
          />
        </TouchableOpacity>

        <Text style={styles.tituloTela}>
          Editar perfil
        </Text>

        <TouchableOpacity onPress={salvarAlteracoes}>
          <Text style={styles.salvarTexto}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.formContainer}>
        <Text style={styles.secaoTitulo}>
          Informações pessoais
        </Text>

        <Text style={styles.label}>
          Nome completo
        </Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
        />

        <Text style={styles.label}>
          Profissão
        </Text>

        <TextInput
          style={styles.input}
          value={profissao}
          onChangeText={setProfissao}
          placeholder="Sua profissão"
        />

        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={styles.inputDescricao}
          multiline
          numberOfLines={5}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="funcionalidade em teste"
        />

        <Text style={styles.label}>
          Nova senha
        </Text>

        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite uma nova senha (opcional)"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botaoSair}
          onPress={sairDoApp}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#FF5A2C"
          />

          <Text style={styles.textoBotaoSair}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  topBar: {
    marginTop: 55,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  tituloTela: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222'
  },

  salvarTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF5A2C'
  },

  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 40
  },

  secaoTitulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 30
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#777',
    marginBottom: 8,
    marginTop: 12
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFB08D',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12
  },

  inputDescricao: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 12
  },

  botaoSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35
  },

  textoBotaoSair: {
    color: '#FF5A2C',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});
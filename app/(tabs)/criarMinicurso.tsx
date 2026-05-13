import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CriarCursoScreen() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autorEmail, setAutorEmail] = useState('');

  const salvarMinicurso = () => {
    if (!titulo || !descricao || !autorEmail) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos do minicurso.");
      return;
    }

    const dadosCurso = {
      titulo: titulo,
      descricao: descricao,
      autor_email: autorEmail
    };

    fetch('http://10.0.2.2:8000/minicursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCurso)
    })
    .then(response => response.json())
    .then(data => {
      if (data.detail) {
        Alert.alert("Erro", data.detail);
      } else {
        Alert.alert("Sucesso!", data.mensagem);
        
        setTitulo('');
        setDescricao('');
        setAutorEmail('');
        
        router.replace('/home');
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloSecao}>Novo Minicurso</Text>
      <Text style={styles.subtitulo}>Compartilhe seu conhecimento com a plataforma.</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do Minicurso (ex: Python para Iniciantes)"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu E-mail (Autor)"
        value={autorEmail}
        onChangeText={setAutorEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o que os alunos vão aprender neste curso..."
        value={descricao}
        onChangeText={setDescricao}
        multiline={true}
        numberOfLines={5} 
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarMinicurso}>
        <Text style={styles.textoBotao}>Publicar Minicurso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tituloSecao: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120, 
  },
  botao: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
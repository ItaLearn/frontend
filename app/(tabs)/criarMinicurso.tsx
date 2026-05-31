import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../constants/api';
import { useAuth } from '../../contexts/AuthContext';

export default function CriarCursoScreen() {
  const { user } = useAuth();
  const [etapa, setEtapa] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [minicursoId, setMinicursoId] = useState<number | null>(null);

  const [aulasSalvas, setAulasSalvas] = useState<any[]>([]);
  const [novaAulaTitulo, setNovaAulaTitulo] = useState('');
  const [novaAulaLink, setNovaAulaLink] = useState('');

  const salvarMinicurso = async () => {
    if (!titulo || !descricao) {
      Alert.alert("Atenção", "Preencha título e descrição.");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch(`${API_URL}/minicursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          autor_email: user?.email
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMinicursoId(data.id_minicurso);
        setEtapa(2); 
      } else {
        Alert.alert("Erro", data.detail || "Erro ao criar minicurso");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const adicionarAula = async () => {
    if (!novaAulaTitulo || !novaAulaLink) {
      Alert.alert("Atenção", "Preencha o título e o link.");
      return;
    }

    setCarregando(true);
    
    const formData = new FormData();
    formData.append('titulo', novaAulaTitulo);
    formData.append('link', novaAulaLink);

    try {
      const response = await fetch(`${API_URL}/minicurso/${minicursoId}/aula`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAulasSalvas(prev => [...prev, data]);
        setNovaAulaTitulo('');
        setNovaAulaLink('');
      } else {
        Alert.alert("Erro", data.detail || "Erro ao salvar aula.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha de conexão ao salvar a aula.");
    } finally {
      setCarregando(false);
    }
  };

  const finalizarCriacao = () => {
    Alert.alert("Sucesso!", "Curso publicado!");
    setTitulo(''); setDescricao(''); setMinicursoId(null); setAulasSalvas([]); setEtapa(1);
    router.replace('/(tabs)/explorar');
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.titulo}>Novo Minicurso</Text>
      </View>

      {etapa === 1 && (
        <View style={styles.caixa}>
          <Text style={styles.label}>Título do Curso</Text>
          <TextInput 
            style={styles.input} 
            value={titulo} 
            onChangeText={setTitulo} 
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput 
            style={[styles.input, { height: 80 }]} 
            value={descricao} 
            onChangeText={setDescricao} 
            multiline 
          />

          <TouchableOpacity style={styles.botaoLaranja} onPress={salvarMinicurso} disabled={carregando}>
            {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>Salvar e ir para Aulas</Text>}
          </TouchableOpacity>
        </View>
      )}

      {etapa === 2 && (
        <View style={styles.caixa}>
          <Text style={styles.tituloCaixa}>Aulas Adicionadas:</Text>
          
          {aulasSalvas.length === 0 && <Text style={styles.textoVazio}>Nenhuma aula ainda.</Text>}
          
          {aulasSalvas.map((aula, index) => (
            <View key={aula.id} style={styles.caixaAulaSalva}>
              <Text style={styles.textoAulaSalva}>Aula {aula.ordem}: {aula.titulo}</Text>
            </View>
          ))}

          <View style={styles.divisor} />

          <Text style={styles.label}>Título da Nova Aula</Text>
          <TextInput 
            style={styles.input} 
            value={novaAulaTitulo} 
            onChangeText={setNovaAulaTitulo} 
          />
          
          <Text style={styles.label}>Link do Vídeo</Text>
          <TextInput 
            style={styles.input} 
            value={novaAulaLink} 
            onChangeText={setNovaAulaLink} 
          />

          <TouchableOpacity style={styles.botaoAzul} onPress={adicionarAula} disabled={carregando}>
            {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>+ Adicionar Aula</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLaranja} onPress={finalizarCriacao}>
            <Text style={styles.textoBotao}>Publicar Minicurso</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F0F0', 
    padding: 20, 
    paddingTop: 50 
  },
  header: { 
    marginBottom: 20 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  caixa: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderWidth: 2, 
    borderColor: '#CCC' 
  },
  tituloCaixa: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#333',
    marginTop: 10
  },
  input: { 
    backgroundColor: '#FAFAFA', 
    borderWidth: 1, 
    borderColor: '#999', 
    padding: 10, 
    marginBottom: 10 
  },
  botaoLaranja: { 
    backgroundColor: '#FF5A2C', 
    padding: 15, 
    alignItems: 'center', 
    marginTop: 20 
  },
  botaoAzul: { 
    backgroundColor: '#041824', 
    padding: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },
  textoBotao: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  textoVazio: { 
    color: '#666', 
    fontStyle: 'italic',
    marginBottom: 10
  },
  caixaAulaSalva: { 
    backgroundColor: '#E8E8E8', 
    padding: 10, 
    marginBottom: 5, 
    borderLeftWidth: 4, 
    borderLeftColor: '#FF5A2C' 
  },
  textoAulaSalva: { 
    fontWeight: 'bold', 
    color: '#333' 
  },
  divisor: {
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 20
  }
});
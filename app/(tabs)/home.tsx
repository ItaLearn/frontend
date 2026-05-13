import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [minicursos, setMinicursos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarCursos = () => {
    setCarregando(true);
    fetch('http://10.0.2.2:8000/minicursos')
      .then(response => response.json())
      .then(data => {
        setMinicursos(data.minicursos_disponiveis);
        setCarregando(false);
      })
      .catch(error => {
        console.error(error);
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarCursos();
  }, []);

  const confirmarExclusao = (id, titulo) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente apagar o minicurso "${titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          style: "destructive", 
          onPress: () => executarExclusao(id) 
        }
      ]
    );
  };

  const executarExclusao = (id) => {
    fetch(`http://10.0.2.2:8000/minicursos/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert("Sucesso", data.mensagem);
      carregarCursos();
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erro", "Não foi possível apagar o minicurso.");
    });
  };

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Explorar Minicursos</Text>
      
      <FlatList
        data={minicursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.tituloCurso}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>

            {/* Botão de Deletar */}
            <TouchableOpacity 
              style={styles.botaoDeletar} 
              onPress={() => confirmarExclusao(item.id, item.titulo)}
            >
              <Text style={styles.textoBotaoDeletar}>Apagar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum minicurso encontrado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  centralizado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tituloPrincipal: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { 
    backgroundColor: '#f9f9f9', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5, 
    borderLeftColor: '#2196F3' 
  },
  infoContainer: { flex: 1, marginRight: 10 },
  tituloCurso: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  descricao: { fontSize: 14, color: '#666', marginTop: 5 },
  botaoDeletar: {
    backgroundColor: '#FF5252',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoDeletar: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 50, color: '#999' }
});
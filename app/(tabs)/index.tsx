import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [minicursos, setMinicursos] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8000/minicursos')
      .then(response => response.json())
      .then(data => {
        setMinicursos(data.minicursos_disponiveis);
      })
      .catch(error => console.error("Erro ao buscar dados do servidor:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Minicursos</Text>
      
      <FlatList
        data={minicursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.autor}>Por: {item.autor_email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5', 
    paddingTop: 60 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#333'
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15,
    elevation: 3, 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2196F3' 
  },
  descricao: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 5 
  },
  autor: { 
    fontSize: 12, 
    color: '#aaa', 
    marginTop: 10, 
    fontStyle: 'italic' 
  }
});
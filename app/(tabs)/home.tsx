import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { API_URL } from '../../constants/api';

export default function HomeScreen() {
  const [minicursos, setMinicursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState('');

  const carregarCursos = () => {
    setCarregando(true);
    fetch(`${API_URL}/minicursos`)
      .then(response => response.json())
      .then(data => {
        const cursosEnriquecidos = (data.minicursos_disponiveis || []).map((curso: any, index: number) => ({
          ...curso,
          progresso: index === 0 ? 65 : 40,
          aulasConcluidas: index === 0 ? 8 : 4,
          totalAulas: 10,
          capaUrl: index === 0 
            ? 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=500&auto=format&fit=crop&q=60' 
            : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'
        }));
        setMinicursos(cursosEnriquecidos);
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro ao carregar cursos da API, usando lista Mock de segurança:", error);
        setMinicursos([
          {
            id: 1,
            titulo: 'Ideias de renda extra',
            descricao: 'Como começar em UX Design?',
            progresso: 65,
            aulasConcluidas: 8,
            totalAulas: 10,
            capaUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=500&auto=format&fit=crop&q=60'
          },
          {
            id: 2,
            titulo: 'Desenvolvimento Mobile',
            descricao: 'Construindo Apps com React Native',
            progresso: 40,
            aulasConcluidas: 4,
            totalAulas: 10,
            capaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'
          }
        ]);
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarCursos();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#FF5A2C" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.headerPerfil}>
        <View style={styles.blocoUsuario}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.textosBoasVindas}>
            <Text style={styles.textoOla}>Olá, Yngrid!</Text>
            <Text style={styles.textoSubSaudacao}>Que tal continuar aprendendo?</Text>
          </View>
        </View>
        <View style={styles.botoesHeader}>
          <TouchableOpacity style={styles.iconeHeader}>
            <Ionicons name="notifications-outline" size={24} color="#FF5A2C" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconeHeader}>
            <Ionicons name="menu-outline" size={26} color="#FF5A2C" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerPesquisa}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.iconePesquisa} />
        <TextInput 
          style={styles.inputPesquisa}
          placeholder="Pesquise..."
          placeholderTextColor="#999"
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>

      <View style={styles.bannerLaranja}>
        <Text style={styles.textoBanner}>
          Aprenda sobre qualquer coisa, qualquer assunto, tudo em um só lugar!
        </Text>
        <View style={styles.containerBotoesBanner}>
          <TouchableOpacity style={styles.botaoBanner}>
            <Text style={styles.textoBotaoBanner}>Explore Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoBanner}>
            <Text style={styles.textoBotaoBanner}>Start learning</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secaoTituloInline}>
        <Text style={styles.tituloSecao}>Continue estudando</Text>
        <TouchableOpacity>
          <Text style={styles.textoVerTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={minicursos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaHorizontalPadding}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardCursoHorizontal}
            onPress={() => router.push(`/curso/${item.id}`)}
          >
            <View style={styles.containerCapa}>
              <Image source={{ uri: item.capaUrl }} style={styles.imagemCapa} />
              <View style={styles.tagEmAndamento}>
                <Text style={styles.textoTag}>Em andamento</Text>
              </View>
            </View>

            <View style={styles.containerProgresso}>
              <View style={styles.barraFundoProgresso}>
                <View style={[styles.barraPreenchidaProgresso, { width: `${item.progresso}%` }]} />
              </View>
              <Text style={styles.textoPorcentagem}>{item.progresso}%</Text>
            </View>

            <Text style={styles.cardTituloCurso} numberOfLines={1}>{item.titulo}</Text>
            <Text style={styles.cardDescricaoCurso} numberOfLines={1}>{item.descricao}</Text>
            <Text style={styles.cardFooterAulas}>{item.aulasConcluidas}/{item.totalAulas} aulas</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.secaoDestaqueContainer}>
        <Text style={styles.tituloDestaque}>Escolha por um</Text>
        <Text style={styles.tituloDestaqueNegrito}>Minicurso em destaque</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  headerPerfil: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  blocoUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  textosBoasVindas: {
    justifyContent: 'center',
  },
  textoOla: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  textoSubSaudacao: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  botoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeHeader: {
    marginLeft: 15,
    padding: 4,
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconePesquisa: {
    marginRight: 10,
  },
  inputPesquisa: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  bannerLaranja: {
    backgroundColor: '#FF5A2C',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  textoBanner: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 20,
  },
  containerBotoesBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoBanner: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoBanner: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  secaoTituloInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  textoVerTodos: {
    fontSize: 14,
    color: '#555',
  },
  listaHorizontalPadding: {
    paddingRight: 20,
    paddingBottom: 10,
  },
  cardCursoHorizontal: {
    backgroundColor: '#FFF',
    width: 250,
    borderRadius: 16,
    padding: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  containerCapa: {
    position: 'relative',
    width: '100%',
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imagemCapa: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagEmAndamento: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5A2C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  textoTag: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  containerProgresso: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  barraFundoProgresso: {
    flex: 1,
    height: 6,
    backgroundColor: '#EBEBEB',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  barraPreenchidaProgresso: {
    height: '100%',
    backgroundColor: '#FF5A2C',
    borderRadius: 3,
  },
  textoPorcentagem: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  cardTituloCurso: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  cardDescricaoCurso: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  cardFooterAulas: {
    fontSize: 11,
    color: '#A0A0A0',
    marginTop: 6,
  },
  secaoDestaqueContainer: {
    marginTop: 25,
    marginBottom: 40,
  },
  tituloDestaque: {
    fontSize: 16,
    color: '#444',
  },
  tituloDestaqueNegrito: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 2,
  }
});
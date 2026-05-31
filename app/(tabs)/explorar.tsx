import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
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

  const [cursoSelecionado, setCursoSelecionado] = useState<any | null>(null);
  const [aulasDoCurso, setAulasDoCurso] = useState<any[]>([]);
  const [carregandoAulas, setCarregandoAulas] = useState(false);

  const carregarCursos = () => {
    setCarregando(true);
    fetch(`${API_URL}/minicursos`)
      .then(async response => {
        if (!response.ok) {
          throw new Error('Falha na resposta da API');
        }
        return response.json();
      })
      .then(data => {
        setMinicursos(data.minicursos_disponiveis || []);
        setCarregando(false);
      })
      .catch(error => {
        console.error("ERRO DE REDE: ", error.message); 
        setMinicursos([
          { id: 1, titulo: 'Ideias de renda extra', descricao: 'Como começar em UX Design?' },
          { id: 2, titulo: 'Desenvolvimento Mobile', descricao: 'Construindo Apps com React Native' }
        ] as any);
        setCarregando(false);
      });
  };

  const selecionarMinicurso = (curso: any) => {
    setCursoSelecionado(curso);
    setCarregandoAulas(true);

    fetch(`${API_URL}/minicurso/${curso.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar aulas");
        return res.json();
      })
      .then(data => {
        setAulasDoCurso(Array.isArray(data) ? data : []);
        setCarregandoAulas(false);
      })
      .catch(() => {
        setAulasDoCurso([
          { id: 1, titulo: 'Introdução ao tema', ordem: 1 },
          { id: 2, titulo: 'Conceitos e Aplicações', ordem: 2 }
        ]);
        setCarregandoAulas(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      carregarCursos();
    }, [])
  );

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
            <Text style={styles.textoOla}>Olá, teste!</Text>
            <Text style={styles.textoSubSaudacao}>Que tal continuar aprendendo?</Text>
          </View>
        </View>
        <View style={styles.botoesHeader}>
          <TouchableOpacity 
            style={styles.iconeHeader}
            onPress={() => router.push('/notificacoes')}
          >
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
          placeholder="Pesquise por um minicurso"
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
          <TouchableOpacity 
            style={styles.botaoBanner} 
            onPress={() => router.push('/criarMinicurso')} 
          >
            <Text style={styles.textoBotaoBanner}>Criar minicurso</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.botaoBannerSecundario}
            onPress={() => router.push('/meuAprendizado')} 
          >
            <Text style={styles.textoBotaoBannerSecundario}>Meu aprendizado</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secaoTituloInline}>
        <Text style={styles.tituloSecao}>Continue estudando</Text>
      </View>
      <View style={styles.caixaTeste}>
        <Text style={styles.textoTeste}>teste</Text>
      </View>

      <View style={styles.secaoDestaqueContainer}>
        <Text style={styles.tituloDestaque}>Escolha por um</Text>
        <Text style={styles.tituloDestaqueNegrito}>Minicurso em destaque</Text>
      </View>
      <View style={styles.caixaTeste}>
        <Text style={styles.textoTeste}>teste</Text>
      </View>

      <View style={styles.secaoTituloInline}>
        <Text style={styles.tituloSecao}>Todos os minicursos</Text>
      </View>

      {minicursos.map((item: any) => (
        <TouchableOpacity 
          key={`vertical-${item.id}`} 
          style={[
            styles.cardVertical,
            cursoSelecionado?.id === item.id && styles.cardVerticalAtivo
          ]}
          onPress={() => selecionarMinicurso(item)}
        >
          <View style={styles.infoVertical}>
            <Text 
              style={[
                styles.tituloVertical,
                cursoSelecionado?.id === item.id && styles.tituloVerticalAtivo
              ]}
            >
              {item.titulo}
            </Text>
            <Text style={styles.descricaoVertical}>{item.descricao}</Text>
          </View>
          <Ionicons 
            name={cursoSelecionado?.id === item.id ? "chevron-down" : "chevron-forward"} 
            size={20} 
            color={cursoSelecionado?.id === item.id ? "#FF5A2C" : "#CCC"} 
          />
        </TouchableOpacity>
      ))}

      {cursoSelecionado && (
        <View style={styles.containerAulasExibidas}>
          <View style={styles.headerAulasInline}>
            <Text style={styles.tituloAulasCurso}>Aulas de: {cursoSelecionado.titulo}</Text>
            <TouchableOpacity onPress={() => setCursoSelecionado(null)}>
              <Ionicons name="close-circle-outline" size={22} color="#999" />
            </TouchableOpacity>
          </View>
          
          {carregandoAulas ? (
            <ActivityIndicator size="small" color="#FF5A2C" style={{ marginVertical: 15 }} />
          ) : (
            aulasDoCurso.map((aula) => (
              <View key={`aula-home-${aula.id}`} style={styles.linhaAulaHome}>
                <View style={styles.circuloPlayAula}>
                  <Ionicons name="play" size={12} color="#FF5A2C" />
                </View>
                <Text style={styles.textoTituloAulaHome} numberOfLines={1}>
                  Aula {aula.ordem}: {aula.titulo}
                </Text>
              </View>
            ))
          )}
        </View>
      )}

      <TouchableOpacity style={styles.botaoExploreFinal}>
        <Text style={styles.textoBotaoExploreFinal}>Explore um pouco mais</Text>
      </TouchableOpacity>

      <View style={{height: 100}} />
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
  botaoBannerSecundario: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoBannerSecundario: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  secaoTituloInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  caixaTeste: {
    marginBottom: 15,
  },
  textoTeste: {
    fontSize: 14,
    color: '#888',
  },
  secaoDestaqueContainer: {
    marginTop: 10,
    marginBottom: 5,
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
  },
  cardVertical: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardVerticalAtivo: {
    borderColor: '#FF5A2C',
    backgroundColor: '#FFF5F0',
  },
  infoVertical: {
    flex: 1,
    marginRight: 10,
  },
  tituloVertical: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  tituloVerticalAtivo: {
    color: '#FF5A2C',
  },
  descricaoVertical: {
    fontSize: 13,
    color: '#777',
  },
  containerAulasExibidas: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  headerAulasInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 8,
  },
  tituloAulasCurso: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#041824',
    flex: 0.9,
  },
  linhaAulaHome: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  circuloPlayAula: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textoTituloAulaHome: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  botaoExploreFinal: {
    backgroundColor: '#FF5A2C',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotaoExploreFinal: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
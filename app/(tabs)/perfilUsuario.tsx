import { router } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function PerfilScreen() {

  const sairDaConta = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>

      <View style={styles.topo}>

        <Image
          source={{
            uri: 'https://pt.quizur.com/_image?href=https%3A%2F%2Fdev-beta.quizur.com%2Fstorage%2Fv1%2Fobject%2Fpublic%2F%2Fimagens%2F%2F20364387%2Fb8c1a7c3-91fc-403b-9898-91d5820b40b4.png&w=600&h=600&f=webp'
          }}
          style={styles.foto}
        />

        <Text style={styles.nome}>User444</Text>

        <TouchableOpacity>
          <Text style={styles.meuPerfil}>
            Meu perfil {'>'}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.menu}>

        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.icone}>⌂</Text>

          <View>
            <Text style={styles.tituloMenu}>Explorar</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.icone}>♡</Text>

          <View>
            <Text style={styles.tituloMenu}>Favoritos</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.icone}>↗</Text>

          <View>
            <Text style={styles.tituloMenu}>Compartilhar</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.icone}>⚙</Text>

          <View>
            <Text style={styles.tituloMenu}>Configurações</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <Text style={styles.icone}>ⓘ</Text>

          <View>
            <Text style={styles.tituloMenu}>Sobre</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={sairDaConta}
        >
          <Text style={styles.icone}>⇦</Text>

          <View>
            <Text style={styles.tituloMenu}>Sair</Text>
            <Text style={styles.subtituloMenu}>teste</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  topo: {
    backgroundColor: '#FF5A2C',
    height: 250,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15
  },

  nome: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },

  meuPerfil: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 16
  },

  menu: {
    paddingHorizontal: 30,
    paddingTop: 30
  },

  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35
  },

  icone: {
    fontSize: 24,
    color: '#FF5A2C',
    width: 40
  },

  tituloMenu: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5A2C'
  },

  subtituloMenu: {
    color: '#666',
    marginTop: 2
  }
});
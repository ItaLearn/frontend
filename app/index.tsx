import { router } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          SEU APRENDIZADO{'\n'}
          COMEÇA AQUI
        </Text>

        <Text style={styles.description}>
          Uma aplicação que vai além do aprendizado, além dos estudos... O app ideal
          para você compartilhar saberes e adquirir conhecimentos diversos, engaje, aprenda,
          se surpreenda! ItaLearn
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginText}>
            Possui acesso? Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F33',
    paddingHorizontal: 30,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 90,
  },

  logo: {
    width: 150,
    height: 150,
  },

  contentContainer: {
    marginTop: 80,
  },

  title: {
    color: '#FF7A00',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: 20,
  },

  description: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 25,
    width: '95%',
    fontWeight: '400',
  },

  bottomContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },

  loginText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 28,
  },

  button: {
    backgroundColor: '#FF7A00',
    width: '100%',
    height: 52,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
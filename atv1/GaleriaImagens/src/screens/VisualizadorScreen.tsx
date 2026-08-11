/**
 * VisualizadorScreen.tsx
 *
 * Tela de visualização em tela cheia de uma imagem selecionada na galeria.
 * Recebe a URL e o título da imagem através dos parâmetros de rota (route.params)
 * passados pela GaleriaScreen ao chamar navigation.navigate().
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Obtém as dimensões completas da tela para calcular o tamanho da imagem
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * NativeStackScreenProps combina as props de navegação (navigation) e de rota
 * (route) em um único tipo, já com os parâmetros tipados para esta tela.
 */
type Props = NativeStackScreenProps<RootStackParamList, 'Visualizador'>;

/**
 * VisualizadorScreen
 *
 * Exibe a imagem selecionada ocupando toda a largura da tela e a maior
 * parte da altura disponível. Enquanto a imagem carrega, um indicador de
 * atividade (spinner) é mostrado no centro.
 * O botão "Voltar" retorna à GaleriaScreen usando navigation.goBack().
 */
export default function VisualizadorScreen({ route, navigation }: Props) {
  /*
   * Extrai os parâmetros passados pela GaleriaScreen.
   * route.params contém { imageUrl, titulo } conforme definido em RootStackParamList.
   */
  const { imageUrl, titulo } = route.params;

  /*
   * Estado de carregamento: controla a exibição do spinner enquanto a
   * imagem ainda não terminou de ser baixada da internet.
   */
  const [carregando, setCarregando] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0e17" />

      {/*
       * Área principal da imagem: ocupa todo o espaço disponível (flex: 1)
       * e centraliza a imagem vertical e horizontalmente.
       */}
      <View style={styles.imageContainer}>
        {/*
         * Image: exibe a imagem em alta resolução.
         * resizeMode="contain" garante que toda a imagem fique visível,
         * sem corte, adaptando-se à proporção da tela.
         *
         * A largura ocupa 100% da tela e a altura é definida para manter
         * a proporção original (4:3) das imagens da galeria.
         *
         * onLoadEnd: callback chamado quando a imagem termina de carregar
         * (com sucesso ou erro); remove o spinner da tela.
         */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
          onLoadEnd={() => setCarregando(false)}
        />

        {/*
         * Exibe o spinner centralizado enquanto a imagem está carregando.
         * Usa renderização condicional: se carregando=true, mostra o spinner;
         * caso contrário, não renderiza nada (null).
         */}
        {carregando && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#e8d5b7" />
            <Text style={styles.loadingText}>Carregando imagem...</Text>
          </View>
        )}
      </View>

      {/* Painel inferior com título e botão de voltar */}
      <View style={styles.footer}>
        <Text style={styles.titulo}>{titulo}</Text>

        {/*
         * Botão Voltar: chama navigation.goBack() que remove a tela atual
         * da pilha do Stack Navigator, retornando à GaleriaScreen.
         * O cabeçalho nativo já inclui um botão Voltar, mas este botão
         * explícito melhora a acessibilidade e a experiência do usuário.
         */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoVoltarTexto}>← Voltar à Galeria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * StyleSheet.create() agrupa todos os estilos do componente.
 * Usar StyleSheet em vez de objetos inline melhora o desempenho,
 * pois os estilos são validados e otimizados pelo React Native.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e17',
  },
  // Área da imagem ocupa todo o espaço restante e centraliza o conteúdo
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
   * A imagem ocupa toda a largura da tela.
   * A altura usa flex: 1 para preencher o espaço disponível, e
   * resizeMode="contain" garante que ela caiba sem distorção.
   */
  image: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  // Sobreposição que cobre a imagem enquanto está carregando
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0e17',
  },
  loadingText: {
    color: '#a0a0b0',
    fontSize: 14,
    marginTop: 12,
  },
  footer: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a4e',
  },
  titulo: {
    color: '#e8d5b7',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  botaoVoltar: {
    backgroundColor: '#e8d5b7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoVoltarTexto: {
    color: '#0f0e17',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});

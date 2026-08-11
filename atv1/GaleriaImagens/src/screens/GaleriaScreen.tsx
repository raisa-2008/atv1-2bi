/**
 * GaleriaScreen.tsx
 *
 * Tela principal do aplicativo: exibe miniaturas de fotos em uma grade
 * rolável de duas colunas. Ao tocar em uma miniatura, o usuário é
 * navegado para a VisualizadorScreen com a URL da imagem selecionada.
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Obtém a largura da tela para calcular o tamanho das miniaturas dinamicamente
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Espaçamento entre os cards e nas laterais
const PADDING = 12;
const GAP = 10;

// Largura de cada miniatura: metade da tela menos padding lateral (2x) e gap central
const THUMBNAIL_WIDTH = (SCREEN_WIDTH - PADDING * 2 - GAP) / 2;

// Altura da miniatura com proporção 4:3 para um visual equilibrado
const THUMBNAIL_HEIGHT = THUMBNAIL_WIDTH * 0.75;

/**
 * Tipo de prop de navegação específico para esta tela.
 * Permite autocompletar os nomes de rotas e os parâmetros ao chamar navigate().
 */
type GaleriaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Galeria'
>;

type Props = {
  navigation: GaleriaScreenNavigationProp;
};

/**
 * Estrutura de dado que representa cada imagem da galeria.
 * - id: identificador único
 * - url: endereço da imagem (usando picsum.photos para imagens de alta qualidade)
 * - titulo: texto descritivo exibido abaixo da miniatura
 */
type Imagem = {
  id: number;
  url: string;
  titulo: string;
};

/**
 * Array de imagens da galeria.
 * As URLs usam o serviço picsum.photos que fornece fotos aleatórias
 * de alta resolução de forma gratuita e estável.
 * Formato: https://picsum.photos/id/<ID>/<largura>/<altura>
 */
const IMAGENS: Imagem[] = [
  {
    id: 1,
    url: 'https://picsum.photos/id/10/800/600',
    titulo: 'Floresta Verde',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/15/800/600',
    titulo: 'Riacho na Floresta',
  },
  {
    id: 3,
    url: 'https://picsum.photos/id/24/800/600',
    titulo: 'Livro Antigo',
  },
  {
    id: 4,
    url: 'https://picsum.photos/id/48/800/600',
    titulo: 'Notebook na Mesa',
  },
  {
    id: 5,
    url: 'https://picsum.photos/id/67/800/600',
    titulo: 'Paisagem em P&B',
  },
  {
    id: 6,
    url: 'https://picsum.photos/id/82/800/600',
    titulo: 'Flores de Cerejeira',
  },
  {
    id: 7,
    url: 'https://picsum.photos/id/100/800/600',
    titulo: 'Praia Ensolarada',
  },
  {
    id: 8,
    url: 'https://picsum.photos/id/119/800/600',
    titulo: 'Mesa com Gadgets',
  },
  {
    id: 9,
    url: 'https://picsum.photos/id/129/800/600',
    titulo: 'Casal no Parque',
  },
  {
    id: 10,
    url: 'https://picsum.photos/id/152/800/600',
    titulo: 'Flores Roxas',
  },
  {
    id: 11,
    url: 'https://picsum.photos/id/164/800/600',
    titulo: 'Píer de Madeira',
  },
  {
    id: 12,
    url: 'https://picsum.photos/id/180/800/600',
    titulo: 'Café e Notebook',
  },
];

/**
 * GaleriaScreen
 *
 * Renderiza a lista de imagens em dois cartões por linha dentro de um
 * ScrollView. Cada cartão é um TouchableOpacity que, ao ser pressionado,
 * navega para o VisualizadorScreen passando a URL e o título como parâmetros.
 */
export default function GaleriaScreen({ navigation }: Props) {
  /**
   * Manipulador de toque em uma miniatura.
   * Chama navigation.navigate() passando o objeto de parâmetros tipado.
   */
  const handleImagePress = (imagem: Imagem) => {
    navigation.navigate('Visualizador', {
      imageUrl: imagem.url,
      titulo: imagem.titulo,
    });
  };

  return (
    <View style={styles.container}>
      {/* Configura a barra de status para o tema escuro do app */}
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Cabeçalho informativo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {IMAGENS.length} fotos • Toque para ampliar
        </Text>
      </View>

      {/*
       * ScrollView permite rolar verticalmente quando o conteúdo ultrapassa
       * a altura da tela. showsVerticalScrollIndicator=false oculta a barra
       * de rolagem lateral para uma aparência mais limpa.
       */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Grade de duas colunas criada com flexDirection: 'row' e flexWrap: 'wrap' */}
        <View style={styles.grid}>
          {/*
           * Percorre o array IMAGENS e renderiza um cartão para cada item.
           * O .map() retorna um componente para cada elemento do array.
           */}
          {IMAGENS.map((imagem) => (
            /*
             * TouchableOpacity: torna o elemento clicável e aplica um efeito
             * de opacidade ao toque, fornecendo feedback visual ao usuário.
             * activeOpacity define o quão transparente fica ao pressionar.
             */
            <TouchableOpacity
              key={imagem.id}
              style={styles.card}
              onPress={() => handleImagePress(imagem)}
              activeOpacity={0.8}
            >
              {/*
               * Image: componente do React Native para exibir imagens.
               * source={{ uri }} carrega imagens a partir de URLs remotas.
               * resizeMode="cover" preenche todo o espaço do cartão mantendo
               * a proporção e cortando o excesso.
               */}
              <Image
                source={{ uri: imagem.url }}
                style={styles.thumbnail}
                resizeMode="cover"
              />

              {/* Sobreposição com o título da imagem */}
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {imagem.titulo}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1a1a2e',
  },
  headerText: {
    color: '#a0a0b0',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: PADDING,
    paddingTop: PADDING,
    paddingBottom: 24,
  },
  // flexDirection: 'row' + flexWrap: 'wrap' cria a grade de múltiplas colunas
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: THUMBNAIL_WIDTH,
    borderRadius: 12,
    overflow: 'hidden', // Garante que a imagem respeite o borderRadius
    backgroundColor: '#1a1a2e',
    marginBottom: GAP, // Espaçamento vertical entre linhas (substitui gap para compatibilidade com web)
    // Sombra no Android
    elevation: 5,
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: THUMBNAIL_HEIGHT, // Proporção 4:3 para miniaturas compactas
  },
  cardOverlay: {
    padding: 8,
    backgroundColor: '#1a1a2e',
  },
  cardTitle: {
    color: '#e8d5b7',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

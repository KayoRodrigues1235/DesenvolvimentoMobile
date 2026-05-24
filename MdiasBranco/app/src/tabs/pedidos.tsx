import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

// Tipo para os produtos
interface Produto {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

// Tipo para os pedidos
interface PedidoItem extends Produto {
  pedidoQuantidade: number;
}

// Marcas disponíveis
const MARCAS = [
  'Todas',
  'Adria',
  'Vitarela',
  'Piraquê',
  'Fortaleza',
  'Richester',
];

// Produtos disponíveis
const PRODUTOS: Produto[] = [
  { id: '1', nome: 'Biscoito Cream Cracker', marca: 'Adria', preco: 4.50, quantidade: 100, imagem: '🍪' },
  { id: '2', nome: 'Biscoito Maizena', marca: 'Adria', preco: 4.20, quantidade: 85, imagem: '🍪' },
  { id: '3', nome: 'Biscoito Recheado Chocolate', marca: 'Vitarela', preco: 3.90, quantidade: 120, imagem: '🍪' },
  { id: '4', nome: 'Biscoito Recheado Morango', marca: 'Vitarela', preco: 3.90, quantidade: 95, imagem: '🍪' },
  { id: '5', nome: 'Biscoito Água e Sal', marca: 'Piraquê', preco: 3.50, quantidade: 150, imagem: '🍪' },
  { id: '6', nome: 'Biscoito Polvilho', marca: 'Piraquê', preco: 5.90, quantidade: 60, imagem: '🥨' },
  { id: '7', nome: 'Macarrão Espaguete', marca: 'Fortaleza', preco: 6.90, quantidade: 45, imagem: '🍝' },
  { id: '8', nome: 'Macarrão Parafuso', marca: 'Fortaleza', preco: 6.90, quantidade: 40, imagem: '🍝' },
  { id: '9', nome: 'Farinha de Trigo', marca: 'Richester', preco: 8.90, quantidade: 30, imagem: '🌾' },
  { id: '10', nome: 'Farinha de Milho', marca: 'Richester', preco: 7.90, quantidade: 35, imagem: '🌽' },
];

export default function PedidosScreen() {
  const [selectedMarca, setSelectedMarca] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [pedidos, setPedidos] = useState<PedidoItem[]>([]);
  
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const textLightColor = useThemeColor({}, 'textLight');
  const borderColor = useThemeColor({}, 'border');

  // Filtrar produtos por marca e busca
  const filteredProdutos = PRODUTOS.filter(produto => {
    const matchMarca = selectedMarca === 'Todas' || produto.marca === selectedMarca;
    const matchSearch = produto.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMarca && matchSearch;
  });

  // Adicionar ao pedido
  const addToPedido = (produto: Produto) => {
    setPedidos(prevPedidos => {
      const existing = prevPedidos.find(p => p.id === produto.id);
      if (existing) {
        return prevPedidos.map(p =>
          p.id === produto.id
            ? { ...p, pedidoQuantidade: p.pedidoQuantidade + 1 }
            : p
        );
      }
      return [...prevPedidos, { ...produto, pedidoQuantidade: 1 }];
    });
  };

  // Remover do pedido
  const removeFromPedido = (produtoId: string) => {
    setPedidos(prevPedidos => {
      const existing = prevPedidos.find(p => p.id === produtoId);
      if (existing && existing.pedidoQuantidade === 1) {
        return prevPedidos.filter(p => p.id !== produtoId);
      }
      return prevPedidos.map(p =>
        p.id === produtoId
          ? { ...p, pedidoQuantidade: p.pedidoQuantidade - 1 }
          : p
      );
    });
  };

  // Remover item completamente (com swipe)
  const deleteFromPedido = (produtoId: string) => {
    Alert.alert(
      'Remover Item',
      'Deseja remover este item do pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: () => setPedidos(prev => prev.filter(p => p.id !== produtoId))
        },
      ]
    );
  };

  // Calcular total do pedido
  const totalPedido = pedidos.reduce((sum, item) => sum + (item.preco * item.pedidoQuantidade), 0);

  // Finalizar pedido
  const finalizarPedido = () => {
    if (pedidos.length === 0) {
      Alert.alert('Pedido Vazio', 'Adicione itens ao pedido antes de finalizar.');
      return;
    }
    
    Alert.alert(
      'Confirmar Pedido',
      `Total: R$ ${totalPedido.toFixed(2)}\n\nDeseja finalizar este pedido?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('Sucesso!', 'Pedido realizado com sucesso!');
            setPedidos([]);
          }
        },
      ]
    );
  };

  // Componente de ação direita (swipe)
  const renderRightActions = (produtoId: string) => {
    return (
      <TouchableOpacity
        style={styles.swipeDelete}
        onPress={() => deleteFromPedido(produtoId)}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <ThemedText style={styles.swipeText}>Remover</ThemedText>
      </TouchableOpacity>
    );
  };

  // Card do produto
  const ProdutoCard = ({ produto }: { produto: Produto }) => {
    const pedidoItem = pedidos.find(p => p.id === produto.id);
    const quantidade = pedidoItem?.pedidoQuantidade || 0;

    return (
      <View style={[styles.produtoCard, { backgroundColor: surfaceColor }]}>
        <View style={styles.produtoInfo}>
          <View style={styles.produtoIcon}>
            <ThemedText style={styles.produtoIconText}>{produto.imagem}</ThemedText>
          </View>
          <View style={styles.produtoDetails}>
            <ThemedText style={styles.produtoNome}>{produto.nome}</ThemedText>
            <View style={styles.produtoMeta}>
              <ThemedText style={[styles.produtoMarca, { color: textLightColor }]}>
                {produto.marca}
              </ThemedText>
              <ThemedText style={[styles.produtoPreco, { color: textColor }]}>
                R$ {produto.preco.toFixed(2)}
              </ThemedText>
            </View>
            <ThemedText style={[styles.produtoEstoque, { color: textLightColor }]}>
              Estoque: {produto.quantidade} unidades
            </ThemedText>
          </View>
        </View>

        <View style={styles.quantidadeControl}>
          <TouchableOpacity
            style={[styles.quantidadeButton, { backgroundColor: borderColor }]}
            onPress={() => removeFromPedido(produto.id)}
          >
            <Ionicons name="remove" size={20} color={textColor} />
          </TouchableOpacity>
          
          <ThemedText style={styles.quantidadeText}>
            {quantidade}
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.quantidadeButton, { backgroundColor: textColor }]}
            onPress={() => addToPedido(produto)}
          >
            <Ionicons name="add" size={20} color={backgroundColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Item do pedido (com swipe)
  const PedidoItemCard = ({ item }: { item: PedidoItem }) => {
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id)}
        overshootRight={false}
      >
        <View style={[styles.pedidoCard, { backgroundColor: surfaceColor }]}>
          <View style={styles.pedidoCardContent}>
            <View>
              <ThemedText style={styles.pedidoItemNome}>{item.nome}</ThemedText>
              <ThemedText style={[styles.pedidoItemMarca, { color: textLightColor }]}>
                {item.marca}
              </ThemedText>
            </View>
            <View style={styles.pedidoCardRight}>
              <ThemedText style={styles.pedidoItemPreco}>
                R$ {(item.preco * item.pedidoQuantidade).toFixed(2)}
              </ThemedText>
              <View style={styles.pedidoQuantidadeControl}>
                <TouchableOpacity
                  style={[styles.pedidoQuantidadeButton, { backgroundColor: borderColor }]}
                  onPress={() => removeFromPedido(item.id)}
                >
                  <Ionicons name="remove" size={16} color={textColor} />
                </TouchableOpacity>
                <ThemedText style={styles.pedidoQuantidadeText}>
                  {item.pedidoQuantidade}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.pedidoQuantidadeButton, { backgroundColor: textColor }]}
                  onPress={() => addToPedido(item)}
                >
                  <Ionicons name="add" size={16} color={backgroundColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>
          
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.headerTitle}>
              Pedidos
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: textLightColor }]}>
              Selecione os produtos
            </ThemedText>
          </View>

          {/* Barra de Busca */}
          <View style={[styles.searchBar, { backgroundColor: surfaceColor }]}>
            <Ionicons name="search-outline" size={20} color={textLightColor} />
            <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder="Buscar produtos..."
              placeholderTextColor={textLightColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={textLightColor} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filtro por Marcas */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.marcasContainer}
            contentContainerStyle={styles.marcasContent}
          >
            {MARCAS.map(marca => (
              <TouchableOpacity
                key={marca}
                style={[
                  styles.marcaButton,
                  {
                    backgroundColor: selectedMarca === marca ? textColor : surfaceColor,
                    borderColor: borderColor,
                  },
                ]}
                onPress={() => setSelectedMarca(marca)}
              >
                <ThemedText
                  style={[
                    styles.marcaButtonText,
                    { color: selectedMarca === marca ? backgroundColor : textColor },
                  ]}
                >
                  {marca}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Lista de Produtos */}
          <View style={styles.produtosSection}>
            <ThemedText style={styles.sectionTitle}>Produtos</ThemedText>
            {filteredProdutos.map(produto => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
            {filteredProdutos.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color={textLightColor} />
                <ThemedText style={[styles.emptyText, { color: textLightColor }]}>
                  Nenhum produto encontrado
                </ThemedText>
              </View>
            )}
          </View>

          {/* Resumo do Pedido */}
          {pedidos.length > 0 && (
            <View style={styles.resumoSection}>
              <View style={[styles.resumoCard, { backgroundColor: surfaceColor }]}>
                <ThemedText style={styles.resumoTitle}>Resumo do Pedido</ThemedText>
                
                <ScrollView style={styles.resumoItens} nestedScrollEnabled>
                  {pedidos.map(item => (
                    <PedidoItemCard key={item.id} item={item} />
                  ))}
                </ScrollView>

                <View style={styles.resumoTotal}>
                  <ThemedText style={styles.resumoTotalLabel}>Total</ThemedText>
                  <ThemedText style={[styles.resumoTotalValue, { color: textColor }]}>
                    R$ {totalPedido.toFixed(2)}
                  </ThemedText>
                </View>

                <TouchableOpacity
                  style={[styles.finalizarButton, { backgroundColor: textColor }]}
                  onPress={finalizarPedido}
                >
                  <ThemedText style={[styles.finalizarButtonText, { color: backgroundColor }]}>
                    Finalizar Pedido
                  </ThemedText>
                  <Ionicons name="checkmark-circle" size={20} color={backgroundColor} />
                </TouchableOpacity>
              </View>
            </View>
          )}

        </ThemedView>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  
  // Header
  header: {
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },

  // Marcas Filter
  marcasContainer: {
    marginBottom: Spacing.lg,
  },
  marcasContent: {
    gap: Spacing.sm,
  },
  marcaButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  marcaButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Produtos Section
  produtosSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.md,
  },

  // Produto Card
  produtoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  produtoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  produtoIcon: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  produtoIconText: {
    fontSize: 24,
  },
  produtoDetails: {
    flex: 1,
  },
  produtoNome: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 4,
  },
  produtoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  produtoMarca: {
    fontSize: Typography.fontSize.xs,
  },
  produtoPreco: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  produtoEstoque: {
    fontSize: Typography.fontSize.xs,
  },
  quantidadeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quantidadeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantidadeText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    minWidth: 24,
    textAlign: 'center',
  },

  // Resumo Pedido
  resumoSection: {
    marginBottom: Spacing.xl,
  },
  resumoCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  resumoTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
  resumoItens: {
    maxHeight: 300,
    marginBottom: Spacing.md,
  },
  pedidoCard: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  pedidoCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  pedidoItemNome: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  pedidoItemMarca: {
    fontSize: Typography.fontSize.xs,
  },
  pedidoCardRight: {
    alignItems: 'flex-end',
  },
  pedidoItemPreco: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  pedidoQuantidadeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pedidoQuantidadeButton: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pedidoQuantidadeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    minWidth: 20,
    textAlign: 'center',
  },
  resumoTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    marginTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#124192',
  },
  resumoTotalLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  resumoTotalValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  finalizarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },
  finalizarButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },

  // Swipe Delete
  swipeDelete: {
    backgroundColor: '#f87171',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  swipeText: {
    color: '#fff',
    fontSize: Typography.fontSize.xs,
    marginTop: 4,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
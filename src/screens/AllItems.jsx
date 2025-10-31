import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'

const AllItems = ({ data }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF' },
            ]}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.stock}</Text>
          </View>
        )}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
      />
    </SafeAreaView>
  )
}

export default AllItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontWeight: '400',
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
})

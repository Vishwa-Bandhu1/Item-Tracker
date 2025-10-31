import { FlatList, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

const CreateScreen = ({ data, setData }) => {
  const [itemName, setitemName] = useState('')
  const [stockAmt, setstockAmt] = useState('')
  const [isEdit, setisEdit] = useState(false)
  const [editItemId, seteditItemId] = useState(null)

  const addItemHandler = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
    }

    setData([...data, newItem])
    setitemName('')
    setstockAmt('')
    setisEdit(false)
  }

  const deleteItemHandler = (id) => setData(data.filter((item) => item.id !== id))
  const editItemHandler = (item) => {
    setisEdit(true)
    setitemName(item.name)
    setstockAmt(item.stock.toString())
    seteditItemId(item.id)
  }
  const updateItemHandler = () => {
    setData(
      data.map((item) =>
        item.id === editItemId ? { ...item, name: itemName, stock: stockAmt } : item
      )
    )
    setisEdit(false)
    setitemName('')
    setstockAmt('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter an item name..."
        placeholderTextColor="#999"
        style={styles.input}
        value={itemName}
        onChangeText={(item) => setitemName(item)}
      />

      <TextInput
        placeholder="Enter stock amount..."
        placeholderTextColor="#999"
        style={styles.input}
        value={stockAmt}
        keyboardType="numeric"
        onChangeText={(item) => {
          const numericValue = item.replace(/[^0-9]/g, '')
          setstockAmt(numericValue)
        }}
      />

      <Pressable
        style={styles.addbutton}
        onPress={() => (isEdit ? updateItemHandler() : addItemHandler())}
      >
        <Text style={styles.btnTxt}>
          {isEdit ? 'EDIT ITEM IN STOCK' : 'ADD ITEM IN STOCK'}
        </Text>
      </Pressable>

      <Text style={styles.headingText}>All Items in the stock</Text>

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
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Text style={styles.itemText}>{item.stock}</Text>
              <Pressable onPress={() => editItemHandler(item)}>
                <Text style={styles.itemText}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => deleteItemHandler(item.id)}>
                <Text style={styles.itemText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        contentContainerStyle={{ gap: 10, paddingBottom: 150 }}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '4%',
    gap: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#07F6BFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  addbutton: {
    backgroundColor: '#CABFEEFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 15,
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
})

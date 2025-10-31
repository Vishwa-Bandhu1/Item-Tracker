import { Pressable, StyleSheet, Text, View, Animated, Dimensions, ScrollView, } from 'react-native'
import { useState, useRef } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import CreateScreen from './CreateScreen'
import AllItems from './AllItems'

const { width } = Dimensions.get('window')

const HomeScreen = () => {
  const [view, setView] = useState(0)
  const [data, setData] = useState([
    { id: 1, name: 'Wheat', stock: 5, unit: 'Kg' },
    { id: 2, name: 'Rice', stock: 15, unit: 'Kg' },
    { id: 3, name: 'Basmati Rice', stock: 25, unit: 'Kg' },
    { id: 4, name: 'Pulse', stock: 50, unit: 'Kg' },
    { id: 5, name: 'Corn', stock: 19, unit: 'Kg' },
  ])

  const translateX = useRef(new Animated.Value(0)).current

  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent
    if (translationX < -50 && view < 2) {
      setView((prev) => prev + 1)
    } else if (translationX > 50 && view > 0) {
      setView((prev) => prev - 1)
    }
  }

  // Animate between screens
  Animated.spring(translateX, {
    toValue: -view * width,
    useNativeDriver: true,
  }).start()

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Top Buttons (aligned left + spacing) */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, view === 0 && styles.activeButton]}
            onPress={() => setView(0)}
          >
            <Text style={[styles.btnText, view === 0 && styles.activeBtnText]}>
              All Items
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, view === 1 && styles.activeButton]}
            onPress={() => setView(1)}
          >
            <Text style={[styles.btnText, view === 1 && styles.activeBtnText]}>
              Low Stock
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, view === 2 && styles.activeButton]}
            onPress={() => setView(2)}
          >
            <Text style={[styles.btnText, view === 2 && styles.activeBtnText]}>
              Create
            </Text>
          </Pressable>
        </View>

        {/* Swipeable Pages */}
        <PanGestureHandler onEnded={handleSwipe}>
          <View style={styles.swipeWrapper}>
            <Animated.View
              style={[
                styles.swipeContainer,
                { transform: [{ translateX }] },
              ]}
            >
              {/* Screen 1: All Items */}
              <View style={styles.screen}>
                <AllItems data={data} />
              </View>

              {/* Screen 2: Low Stock */}
              <View style={styles.screen}>
                <AllItems data={data.filter((item) => item.stock < 20)} />
              </View>

              {/* Screen 3: Create Screen (Scroll enabled) */}
              <View style={styles.screen}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
                >
                  <CreateScreen data={data} setData={setData} />
                </ScrollView>
              </View>
            </Animated.View>
          </View>
        </PanGestureHandler>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                view === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // centers inner container
  },
  innerContainer: {
    width: '92%', // equal padding both sides
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginVertical: 12, // ✅ added better spacing under buttons
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#72C37AFF',
  },
  btnText: {
    color: '#72C37AFF',
    fontSize: 13,
  },
  activeButton: {
    backgroundColor: '#72C37AFF',
  },
  activeBtnText: {
    color: 'white',
  },
  swipeWrapper: {
    flex: 1,
    overflow: 'visible',
  },
  swipeContainer: {
    flexDirection: 'row',
    width: width * 3,
    flex: 1,
  },
  screen: {
    width: width,
    flex: 1,
    paddingHorizontal: 8, // ensures content never touches edges
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#72C37AFF',
    width: 10,
    height: 10,
  },
})

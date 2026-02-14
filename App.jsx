import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ItemProvider } from './src/context/ItemContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <ItemProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ItemProvider>
  );
};

export default App;
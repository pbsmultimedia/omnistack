import React from 'react';
import { Text, View } from 'react-native';

import 'intl';
import 'intl/locale-data/jsonp/en';

import Routes from './src/routes';

export default function App() {
  return (    
    <Routes />    
  );
}

{/* here be styles 
  * - all elements are display: flex
  * - hifen becames camelCase 
  * - no inheritance exists
*/}
{/*
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/}
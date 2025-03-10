if (__DEV__) {
  require('./ReactotronConfig');
}
import React from 'react';
import RootApp from './src/navigation/RootApp.tsx';

const App = () => {
  return <RootApp />;
};

export default App;

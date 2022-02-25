import React, {FC} from 'react';
import AppRouter from './components/AppRouter'
import ResponsiveAppBar from './components/Navbar'

const App:FC = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <AppRouter/>
    </div>
  );
}

export default App;

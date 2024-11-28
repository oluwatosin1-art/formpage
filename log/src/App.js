import Log from './components/Log'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<Log />} />
        </Routes>
   
    </div>
  );
};
export default App;
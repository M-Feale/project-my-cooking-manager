import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";

const App = () => {

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/recipes" element={<h1>Welcome to the Recipe Collection!</h1>} />
        <Route path="/catalogue" element={<h1>Welcome the Cataloguing Page !</h1>} />
        <Route path="/recipes/:recipeId" element={<h1>Welcome to a specific recipe Page!</h1>} />
        <Route path="*" element={<h1>Welcome to the ERROR page</h1>} />
      </Routes>
    </Router>
      
  )
}

export default App

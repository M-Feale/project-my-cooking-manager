import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";

const App = () => {

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to Home Page!</h1>} />
        <Route path="/signin" element={<h1>Welcome to Login!</h1>} />
        <Route path="/catalog" element={<h1>Welcome the Cataloging Page !</h1>} />
        <Route path="/recipes/:recipeId" element={<h1>Welcome to a specific recipe Page!</h1>} />
        <Route path="*" element={<h1>Welcome to the ERROR page</h1>} />
      </Routes>
    </Router>
      
  )
}

export default App

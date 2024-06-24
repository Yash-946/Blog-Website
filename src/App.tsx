import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Stories from "./pages/Stories";
import UpdateBlog from "./pages/UpdateBlog";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish/" element={<Publish id={0} content="" title=""/>} />
          <Route path="/me/stories" element={<Stories />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

import {RecoilRoot} from "recoil";
import View from "./View"
import Main from "./pages/Main";
import './css/default.css';

function App() {
  return (
        <RecoilRoot>
          <View />
          <Main />
        </RecoilRoot>
  );
}

export default App;

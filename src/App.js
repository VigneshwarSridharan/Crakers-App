import TopNavigation from "./layout/TopNavigation";
import { css } from '@emotion/css'

const appCSS = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const appContentCSS = css`
height: 100%;
overflow: auto;
`


function App({ children }) {
  return (
    <div className={appCSS}>
      <TopNavigation />
      <div className={appContentCSS}>
        {children}
      </div>
    </div>
  );
}

export default App;

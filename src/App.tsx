import React, {useCallback, useState} from 'react';
import './App.css';
import {MyForm} from "./Components/MyForm/MyForm";
import {Mode} from "./Components/Mode/Mode";
import {ModeType} from "./Utils/types";


function App() {

    const [responseMode, setResponseMode] = useState<ModeType>('RESOLVE')

    const changeMode = useCallback((mode: ModeType) => {
        setResponseMode(mode)
    }, [])

    return (
        <div>
            <h1>Форма обратной связи</h1>
            <div className="App">
                <MyForm mode={responseMode}/>
                <Mode changeModeCallback={changeMode}/>
            </div>
        </div>
    );
}

export default App;

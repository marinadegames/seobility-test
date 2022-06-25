import s from './Mode.module.css'
import {ModeType} from "../../App";

type PropsType = {
    changeModeCallback: (mode: ModeType) => void
}

export const Mode = ({changeModeCallback}: PropsType) => {

    const callback = (value: ModeType) => {
        changeModeCallback(value)
    }

    return (
        <div className={s.mode}>

            <h4>Переключение режима:</h4>
            <div className={s.inputItem}>
                <input type={"radio"}
                       name={'mode'}
                       onChange={() => callback("RESOLVE")}/>
                <small>УСПЕШНО (через 2 секунды)</small>
            </div>
            <div className={s.inputItem}>
                <input type={"radio"}
                       name={'mode'}
                       onChange={() => callback("REJECT")}/>
                <small>ОШИБКА</small>
            </div>

        </div>
    )
}
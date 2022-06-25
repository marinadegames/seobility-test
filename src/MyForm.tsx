import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const MyForm = () => {

    const regexPassword = /[A-Za-z0-9]{8,}/
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [number, setNumber] = useState<number | null>()
    const [birthday, setBirthday] = useState(new Date());
    const [message, setMessage] = useState<Date>()

    const changeName = (e: string) => {
        setName(e)
    }
    const nameValidation = () => {
        const arr = name.replace(/\s+/g, ' ').trim().split(' ')
        if (arr.length === 2) {
            let firstName = arr[0]
            let lastName = arr[1]
            if (firstName.length > 2 && firstName.length < 31 && lastName.length > 2 && lastName.length < 31) {
                console.log(name.replace(/\s+/g, ' ').trim().toUpperCase())
                setName(name.replace(/\s+/g, ' ').trim().toUpperCase())
            } else {
                console.error('Ошибка: блина имени и фамилии должно быь от 3 до 30 символов!')
            }
        } else {
            console.error('Ошибка: Нужно ввести только имя и фамилию')
        }
    }

    const emailValidation = () => {
        if (regexEmail.test(email)) {
            console.log(email)
        } else {
            console.error('EMAIL WRONG!')
        }
    }

    const changeEmail = (e: string) => {
        setEmail(e)
    }

    const changeNumber = (e: number) => {
        setNumber(e)
    }

    const changeBirthday = (e: any) => {
        setBirthday(e)
        console.log(e)
    }

    const sendMessage = () => {

    }

    return (
        <div>
            <form onClick={e => e.preventDefault()}>
                <div>
                    Имя и фамилия:
                    <input onBlur={nameValidation}
                           onChange={e => changeName(e.currentTarget.value)}/>
                </div>
                <div>
                    Email:
                    <input onBlur={emailValidation}
                           onChange={e => changeEmail(e.currentTarget.value)}/>
                </div>
                <div>
                    Телефон:
                    <input type={'number'}
                           onChange={e => changeNumber(e.currentTarget.valueAsNumber)}/>
                </div>
                <div>
                    Дата рождения:
                    <DatePicker selected={birthday}
                                onChange={(date) => changeBirthday(date)}/>

                </div>
                <div>
                    Текст сообщения:
                    <textarea/>
                </div>
                <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}
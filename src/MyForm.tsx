import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const MyForm = () => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [birthday, setBirthday] = useState(new Date());
    const [message, setMessage] = useState<string>('')

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
    const telValidate = () => {
        const regexpNumber = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (regexpNumber.test(tel)) {
            console.log(tel)
        } else {
            console.error('ERROR: неверный формат номера!')
        }
    }
    const messageValidation = () => {
        if (message.length <= 300 && message.length > 9) {
            console.log(message)
        } else {
            console.error('ERROR: текст сообщения должен быть мин 10 символов и макс 300 символов.')
        }
    }

    const changeName = (e: string) => {
        setName(e)
    }
    const changeEmail = (e: string) => {
        setEmail(e)
    }
    const changeNumber = (e: string) => {
        setTel(e)
    }
    const changeBirthday = (e: any) => {
        setBirthday(e)
        console.log(e)
    }
    const changeMessage = (e: string) => {
        setMessage(e)
    }

    const send = () => {

    }

    return (
        <div>
            <form onClick={e => e.preventDefault()}>
                <div>
                    Имя и фамилия:
                    <input onBlur={nameValidation}
                           value={name}
                           onChange={e => changeName(e.currentTarget.value)}/>
                </div>
                <div>
                    Email:
                    <input onBlur={emailValidation}
                           value={email}
                           onChange={e => changeEmail(e.currentTarget.value)}/>
                </div>
                <div>
                    Телефон:
                    <input type="tel"
                           value={tel}
                           name="tel"
                           onBlur={telValidate}
                           onChange={e => changeNumber(e.currentTarget.value)}/>

                </div>
                <div>
                    Дата рождения:
                    <DatePicker selected={birthday}
                                onChange={(date) => changeBirthday(date)}/>

                </div>
                <div>
                    Текст сообщения:
                    <textarea value={message}
                              onChange={e => changeMessage(e.currentTarget.value)}
                              onBlur={messageValidation}
                              maxLength={300}
                              minLength={10}/>
                </div>
                <button onClick={send}>Send</button>
            </form>
        </div>
    )
}
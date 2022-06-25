import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

type errorNameType = {
    mode: boolean
    errorMessage: string | null
}

export const MyForm = () => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [birthday, setBirthday] = useState(new Date());
    const [message, setMessage] = useState<string>('')

    const [errorName, setErrorName] = useState<errorNameType>({
        mode: false,
        errorMessage: null
    })
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorTel, setErrorTel] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<boolean>(false)

    const nameValidation = () => {
        const arr = name.replace(/\s+/g, ' ').trim().split(' ')
        if (arr.length === 2) {
            let firstName = arr[0]
            let lastName = arr[1]
            if (firstName.length > 2 && firstName.length < 31 && lastName.length > 2 && lastName.length < 31) {
                console.log(name.replace(/\s+/g, ' ').trim().toUpperCase())
                setName(name.replace(/\s+/g, ' ').trim().toUpperCase())
            } else {
                setErrorName({
                    mode: true,
                    errorMessage: 'Ошибка: длина имени и фамилии должны быть от 3 до 30 символов!'
                })
            }
        } else {
            setErrorName({
                mode: true,
                errorMessage: 'Ошибка: Нужно ввести имя и фамилию'
            })
        }
    }
    const emailValidation = () => {
        if (regexEmail.test(email)) {
            console.log(email)
        } else {
            setErrorEmail(true)
        }
    }
    const telValidate = () => {
        const regexpNumber = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (regexpNumber.test(tel)) {
            console.log(tel)
        } else {
            setErrorTel(true)
        }
    }
    const messageValidation = () => {
        if (message.length <= 300 && message.length > 9) {
            console.log(message)
        } else {
            setErrorMessage(true)

        }
    }

    const changeName = (e: string) => {
        setErrorName({mode: false, errorMessage: null})
        setName(e)
    }
    const changeEmail = (e: string) => {
        setErrorEmail(false)
        setEmail(e)
    }
    const changeTel = (e: string) => {
        setErrorTel(false)
        setTel(e)
    }
    const changeBirthday = (e: any) => {
        setBirthday(e)
        console.log(e)
    }
    const changeMessage = (e: string) => {
        setErrorMessage(false)
        setMessage(e)
    }

    const send = () => {
        let url = 'example.com'
        const data = {
            name,
            email,
            tel,
            birthday,
            message
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res.json())
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div>
            <form onClick={e => e.preventDefault()}>
                <div>
                    Имя и фамилия:
                    <input onBlur={nameValidation}
                           value={name}
                           onChange={e => changeName(e.currentTarget.value)}/>
                    {errorName.mode && <small style={{color: 'red'}}>{errorName.errorMessage}</small>}
                </div>
                <div>
                    Email:
                    <input onBlur={emailValidation}
                           value={email}
                           onChange={e => changeEmail(e.currentTarget.value)}/>
                    {errorEmail && <small style={{color: 'red'}}>EMAIL WRONG!</small>}
                </div>
                <div>
                    Телефон:
                    <input type="tel"
                           value={tel}
                           name="tel"
                           onBlur={telValidate}
                           onChange={e => changeTel(e.currentTarget.value)}/>
                    {errorTel && <small style={{color: 'red'}}>TEL WRONG!!</small>}
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
                    {errorMessage && <small style={{color: 'red'}}>ERROR: текст сообщения должен быть мин 10 символов и макс 300 символов.</small>}
                </div>
                <button onClick={send}>Send</button>
            </form>
        </div>
    )
}
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from './MyForm.module.css'
import {ModeType} from "../../App";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

type errorNameType = {
    mode: boolean
    errorMessage: string | null
}
type DataType = {
    name: string
    email: string
    tel: string
    birthday: Date | undefined
    message: string
}
type PropsType = {
    mode: ModeType
}
type ModeMessageType = 'ERROR' | 'SUCCESSFUL' | "OFF"
type MessageStateType = {
    mode: ModeMessageType,
    message: string
}

export const MyForm = ({mode}: PropsType) => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [birthday, setBirthday] = useState();
    const [message, setMessage] = useState<string>('')

    const [errorName, setErrorName] = useState<errorNameType>({
        mode: false,
        errorMessage: null
    })
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorTel, setErrorTel] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<boolean>(false)

    const [responseMessage, setResponseMessage] = useState<MessageStateType>({
        mode: 'ERROR',
        message: ''
    })
    const [validationCheck, setValidationCheck] = useState({
        name: false,
        email: false,
        tel: false,
        birthday: true,
        message: false
    })

    const nameValidation = () => {
        const arr = name.replace(/\s+/g, ' ').trim().split(' ')
        if (arr.length === 2) {
            let firstName = arr[0]
            let lastName = arr[1]
            if (firstName.length > 2 && firstName.length < 31 && lastName.length > 2 && lastName.length < 31) {
                console.log(name.replace(/\s+/g, ' ').trim().toUpperCase())
                setName(name.replace(/\s+/g, ' ').trim().toUpperCase())
                setValidationCheck({...validationCheck, name: true})
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
            setValidationCheck({...validationCheck, email: true})
        } else {
            setErrorEmail(true)
        }
    }
    const telValidate = () => {
        const regexpNumber = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (regexpNumber.test(tel)) {
            console.log(tel)
            setValidationCheck({...validationCheck, tel: true})
        } else {
            setErrorTel(true)
        }
    }
    const messageValidation = () => {
        if (message.length <= 300 && message.length > 9) {
            console.log(message)
            setValidationCheck({...validationCheck, message: true})
        } else {
            setErrorMessage(true)

        }
    }

    const changeName = (e: string) => {
        setErrorName({mode: false, errorMessage: null})
        setName(e.replace(/[^A-Za-z]/ig, ' '))
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

    const send = async () => {
        const data: DataType = {
            name,
            email,
            tel,
            birthday,
            message
        }

        // Если будет API
        // await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(data)
        // })

        // имитация ответа с сервера (промисификация)
        await new Promise((res, rej) => {
            setTimeout(() => {
                if (mode === 'RESOLVE') {
                    res({
                        message: 'Отправка успешна!'
                    })
                }
                if (mode === 'REJECT') {
                    rej({
                        message: 'Произошла ошибка!'
                    })
                }

            }, 2000)
        }).then(res => {
            console.log(res)
            setResponseMessage({mode: 'SUCCESSFUL', message: 'Форма успешно отправлена!'})
            setEmail('')
            setTel('')
            setName('')
            setMessage('')
            setValidationCheck({
                name: false,
                tel: false,
                message: false,
                email: false,
                birthday: true
            })
        }).catch(error => {
            console.error(error)
            setResponseMessage({mode: 'ERROR', message: 'Произошла ошибка'})
        }).finally(() => {
            setTimeout(() => {
                setResponseMessage({mode: 'OFF', message: ''})
            }, 5000)
        })
    }

    return (
        <div className={s.main}>
            <form className={s.form} onClick={e => e.preventDefault()}>
                <div className={s.item}>
                    Имя и фамилия:
                    <input onBlur={nameValidation}
                           pattern={"[A-Za-z]"}
                           value={name}
                           onChange={e => changeName(e.currentTarget.value)}/>
                    {errorName.mode && <small style={{color: 'red'}}>{errorName.errorMessage}</small>}
                </div>
                <div className={s.item}>
                    Email:
                    <input onBlur={emailValidation}
                           value={email}
                           onChange={e => changeEmail(e.currentTarget.value)}/>
                    {errorEmail && <small style={{color: 'red'}}>EMAIL WRONG!</small>}
                </div>
                <div className={s.item}>
                    Телефон:
                    <input type="tel"
                           value={tel}
                           name="tel"
                           onBlur={telValidate}
                           onChange={e => changeTel(e.currentTarget.value)}/>
                    {errorTel && <small style={{color: 'red'}}>TEL WRONG!!</small>}
                </div>
                <div className={s.item}>
                    Дата рождения:
                    <div>
                        <DatePicker selected={birthday}
                                    onChange={(date) => changeBirthday(date)}/>
                    </div>

                </div>
                <div className={s.item}>
                    Текст сообщения:
                    <textarea value={message}
                              onChange={e => changeMessage(e.currentTarget.value)}
                              onBlur={messageValidation}
                              maxLength={300}
                              style={{height: 80}}
                              minLength={10}/>
                    {errorMessage && <small style={{color: 'red'}}>ERROR: текст сообщения должен быть мин 10 символов и макс 300 символов.</small>}
                </div>
                <button disabled={Object.values(validationCheck).includes(false)} onClick={send}>Send</button>
            </form>

            {responseMessage.mode === 'ERROR' && <span style={{color: 'red'}}>{responseMessage.message}</span>}
            {responseMessage.mode === 'SUCCESSFUL' && <span style={{color: 'green'}}>{responseMessage.message}</span>}

        </div>
    )
}
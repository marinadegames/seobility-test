import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from './MyForm.module.css'
import {DataType, errorNameType, MessageStateType, ModeType} from "../../Utils/types";
import {regexEmail, regexpNumber} from "../../Utils/regexps";
import {Spinner} from "../Spinner/Spinner";

type PropsType = {
    mode: ModeType
}

export const MyForm = ({mode}: PropsType) => {

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
    const [buttonRespMode, setButtonRespMode] = useState<boolean>(false)

    const changeBtnRespMode = (bool: boolean) => setButtonRespMode(bool)

    const nameValidation = () => {
        const arr = name.replace(/\s+/g, ' ').trim().split(' ')
        if (arr.length === 2) {
            let firstName = arr[0]
            let lastName = arr[1]
            if (firstName.length > 2 && firstName.length < 31 && lastName.length > 2 && lastName.length < 31) {
                setName(name.replace(/\s+/g, ' ').trim().toUpperCase())
                setValidationCheck({...validationCheck, name: true})
            } else {
                setErrorName({
                    mode: true,
                    errorMessage: 'Длина имени и фамилии должны быть от 3 до 30 символов!'
                })
            }

        } else {
            setErrorName({
                mode: true,
                errorMessage: 'Нужно ввести имя и фамилию'
            })
        }
    }
    const emailValidation = () => {
        if (regexEmail.test(email)) {
            setValidationCheck({...validationCheck, email: true})
        } else {
            setErrorEmail(true)
        }
    }
    const telValidate = () => {

        if (regexpNumber.test(tel)) {
            setValidationCheck({...validationCheck, tel: true})
        } else {
            setErrorTel(true)
        }
    }
    const messageValidation = () => {
        if (message.length <= 300 && message.length > 9) {
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
    }
    const changeMessage = (e: string) => {
        setErrorMessage(false)
        setMessage(e)
    }

    const send = async () => {
        changeBtnRespMode(true)

        // данные, которые мы будет отправлять:
        // const data: DataType = {
        //     name,
        //     email,
        //     tel,
        //     birthday,
        //     message
        // }

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
        }).then(() => {
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
            changeBtnRespMode(false)
        })
    }

    return (
        <div className={s.main}>
            <form className={s.form} onClick={e => e.preventDefault()}>
                <div className={s.item}>
                    <b>Имя и фамилия:</b>
                    <input onBlur={nameValidation}
                           className={s.inputStyles}
                           pattern={"[A-Za-z]"}
                           value={name}
                           placeholder={'Имя и фамилия (латиницей)'}
                           onChange={e => changeName(e.currentTarget.value)}/>
                    {errorName.mode && <small className={s.respMessage}>{errorName.errorMessage}</small>}
                </div>
                <div className={s.item}>
                    <b>Email:</b>
                    <input onBlur={emailValidation}
                           value={email}
                           className={s.inputStyles}
                           placeholder={'email'}
                           onChange={e => changeEmail(e.currentTarget.value)}/>
                    {errorEmail && <small className={s.respMessage}>Неправильный формат email</small>}
                </div>
                <div className={s.item}>
                    <b>Телефон:</b><small>(в формате +7(xxx)xxx-xx-xx)</small>
                    <input type="tel"
                           value={tel}
                           className={s.inputStyles}
                           placeholder={'Номер телефона (Россия)'}
                           name="tel"
                           onBlur={telValidate}
                           onChange={e => changeTel(e.currentTarget.value)}/>
                    {errorTel && <small className={s.respMessage}>Неправильный номер</small>}
                </div>
                <div className={s.item}>
                    <b>Дата рождения:</b>
                    <div>
                        <DatePicker selected={birthday}
                                    className={s.inputStyles}
                                    onChange={(date) => changeBirthday(date)}/>
                    </div>
                </div>
                <div className={s.item}>
                    <b>Текст сообщения:</b>
                    <textarea value={message}
                              onChange={e => changeMessage(e.currentTarget.value)}
                              onBlur={messageValidation}
                              className={s.inputStyles}
                              placeholder={'Ваше сообщение'}
                              maxLength={300}
                              style={{height: 80}}
                              minLength={10}/>
                    {errorMessage && <small className={s.respMessage}>Текст сообщения должен быть мин 10 символов и макс 300 символов.</small>}
                </div>
                {buttonRespMode ? <Spinner size={'50px'}/> : <button disabled={Object.values(validationCheck).includes(false)}
                                                                     style={{height: 40}}
                                                                     onClick={send}>Send</button>}

            </form>
            {responseMessage.mode === 'ERROR' && <span style={{color: 'red'}}>{responseMessage.message}</span>}
            {responseMessage.mode === 'SUCCESSFUL' && <span style={{color: 'green'}}>{responseMessage.message}</span>}
        </div>
    )
}
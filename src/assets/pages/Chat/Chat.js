import React, {useState, useEffect} from 'react';
import './Chat.css';
import DogItem from './DogItem/DogItem';
import UserItem from './UserItem/UserItem';
import InputChat from './InputChat/InputChat';
import Select from './Select/Select';

const Chat = () => {

    let idCounter = 0;

    const [msg, setMsg] = useState({});

    const [chat, setChat] = useState([
        {
            id: 0,
            emmiter: 'Dog',
            msg: ['Hola! ', 'Cual es tu nombre?']
        }
    ]);
    

    
    function firstResponse(name) {
        let newChat = {
            id: idCounter + 2,
            emmitter: 'Dog',
            msg: [
                'Mucho gusto, ' + name + '!',
                'Mi nombre es Galo, soy un DogBot en desarrollo ',
                'Eso quiere decirque aun no estoypreparado para responder tu preguntas',
                'Pero podemos charlar, si eliges alguna pregunta de la lista',

            ]
        }
        if (newChat) {
            setChat([...chat, newChat])
        }
    };


    useEffect(() => {
        //espera una funcion anonima y un efecto
        if (chat.length === 2) {
            setTimeout(() => firstResponse(msg.msg), 500);
            setMsg({ ...msg, msg: '' });
            //  setTimeout(() => setOpenSelect(true), 600)

        }
    }, [chat]);


    // contador de mensaje
    function getMeMessage(value) {
        idCounter = idCounter + 1;
        setMsg({
            id: idCounter,
            emmiter: 'User',
            msg: value
        })
    };


    function sendMessage(e) {
        e.preventDefault();
        // hace un push y conservalos objetos anterires
        setChat([
            ...chat, msg ])
    }

    // console.log('chat:', chat)
    // console.log('msg:', msg)

    return (
        <div className='chatbot-chat-container'>
            <div className='chatbot-chat-content'>
                <div className='chatbot-chat'>
                    <div className='chatbot-chat-container-body'>
                        {/* iteramos el array en el cuperpo delcomponente */}

                        {chat.map((message, index) => message.emmiter === 'Dog' ?(
                            <DogItem
                                key={index}
                                text={message.msg} />)
                            :(
                            <UserItem
                            key={index}
                            text={message.msg}/>)
                        )}
                        <Select>
                            
                       </Select> 
                        
                    </div>
                    {/* chat de inputchat */}
                    <div className='chatbot-chat-container-input'>
                    <InputChat
                        msg={msg}
                        getMeMessage={getMeMessage}
                        sendMessage={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat; 
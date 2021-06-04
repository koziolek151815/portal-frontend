import React from 'react';
import SockJsClient from 'react-stomp';
import './Chat.css'

const ChatStateEnum = Object.freeze({"ready":1, "searching":2, "chatting":3});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            chatState: ChatStateEnum.ready,
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    searchForChat = () => {
        this.clientRef.sendMessage('/app/chat.search');
        this.setState({chatState: ChatStateEnum.searching})
    }

    disconnectFromChat = () => {
        this.clientRef.sendMessage('/app/chat.leave');
        this.setState({chatState: ChatStateEnum.ready})
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/chat.send',
            JSON.stringify({content: msg}));

        this.setState({messages: [...this.state.messages, {your:true, content:msg}]})
    }

    onMessage = (msg) =>
    {
        if(typeof msg.content !== 'undefined')//It's a message
        {
            this.setState({messages: [...this.state.messages, {your:false, content:msg.content}]})
        }
        else if (typeof msg.type !== 'undefined') //It's an event
        {
            switch (msg.type)
            {
                case "DISCONNECTED":
                    this.setState({messages: [...this.state.messages, {your:false, content:"Other user has disconnected!"}]})
                    this.setState({chatState: ChatStateEnum.ready})
                    break;
                case "FOUND":
                    this.setState({messages: [{your:false, content:"Found another user!"}]})
                    this.setState({chatState: ChatStateEnum.chatting})
                    break;
                default:
                    console.log(msg);
            }
        }
        else
        {
            console.log("Weird message from the server!");
            console.log(msg);
        }

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.sendMessage(this.state.value)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <SockJsClient url= {process.env.REACT_APP_BACKEND_URL +'/chat'} topics={['/user/topic/chat']}
                              onMessage={this.onMessage}
                              ref={ (client) => { this.clientRef = client }} />

                {
                    this.state.messages.map(
                        (msg, key)=> <div key={key} className={msg.your?'yourMessage':'otherMessage'}>{msg.content}</div>
                    )
                }

                {
                    this.state.chatState === ChatStateEnum.searching?
                        "Looking for a different user!":null
                }

                {
                    this.state.chatState === ChatStateEnum.ready?
                        <button onClick={this.searchForChat}>Search for chat</button>:null
                }



                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chat;
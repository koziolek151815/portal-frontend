import React from 'react';
import SockJsClient from 'react-stomp';
import './Chat.css'

const ChatStateEnum = Object.freeze({"connecting":0, "ready":1, "searching":2, "chatting":3});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatState: ChatStateEnum.connecting,
            messages: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.messageContainerRef = React.createRef();
        this.textAreaRef = React.createRef();
        this.formRef = React.createRef();
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
        if(msg) {
            this.clientRef.sendMessage('/app/chat.send',
                JSON.stringify({content: msg}));

            this.setState({messages: [...this.state.messages, {type: "yourMessage", content: msg}]})
        }
    }

    onMessage = (msg) =>
    {
        if(typeof msg.content !== 'undefined')//It's a message
        {
            this.setState({messages: [...this.state.messages, {type:"otherMessage", content:msg.content}]})
        }
        else if (typeof msg.type !== 'undefined') //It's an event
        {
            switch (msg.type)
            {
                case "DISCONNECTED":
                    this.setState({messages: [...this.state.messages, {type:"infoMessage", content:"Other user has disconnected!"}]})
                    this.setState({chatState: ChatStateEnum.ready})
                    break;
                case "FOUND":
                    this.setState({messages: [{type:"infoMessage",  content:"Found another user!"}]})
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

    onConnect = ()=>{
        this.setState({messages: [{type:"infoMessage",  content:"Connected to the server!"}]})
        this.setState({chatState: ChatStateEnum.ready})
    }

    onDisconnect = () =>{
        this.setState({messages: [...this.state.messages, {type:"infoMessage",  content:"Lost connection with the server!"}]})
        this.setState({chatState: ChatStateEnum.connecting})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const tmp = this.messageContainerRef.current;

        tmp.scrollTop = tmp.scrollHeight;
    }


    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.handleSubmit()
        }
    }

    handleSubmit(event) {
        if(typeof event!=="undefined")
            event.preventDefault();

        this.sendMessage(this.textAreaRef.current.value);
        this.textAreaRef.current.value = "";
        this.textAreaRef.current.focus()
    }

    getStateString()
    {
        switch (this.state.chatState)
        {
            case ChatStateEnum.ready:
                return <button onClick={this.searchForChat}>Search for chat</button>
            case ChatStateEnum.connecting:
                return "Connecting to the server!";
            case ChatStateEnum.searching:
                return "Looking for a different user!";
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="chatContainer">
                <SockJsClient url= {process.env.REACT_APP_BACKEND_URL +'/chat'} topics={['/user/topic/chat']}
                              onConnect={this.onConnect}
                              onDisconnect={this.onDisconnect}
                              onMessage={this.onMessage}
                              ref={ (client) => { this.clientRef = client }} />

                <div className="messageContainer" ref={this.messageContainerRef}>
                    {
                        this.state.messages.map(
                            (msg, key)=> <div key={key} className="messageHolder"><div  className={"message " + msg.type}>{msg.content}</div><div style={{clear:"both"}}></div> </div>
                        )
                    }
                    {this.getStateString()}
                </div>



                <form className="textInputHolder" onSubmit={this.handleSubmit} ref={this.formRef}>
                    <textarea style={{display:"inline-block", verticalAlign:"middle", height:"100%", width:"calc(100% - 150px)", resize:"none"}}
                              type="text" value={this.state.value} disabled={this.state.chatState!==ChatStateEnum.chatting} ref={this.textAreaRef} onKeyDown={this.onEnterPress}/>
                    <input style={{display:"inline-block", verticalAlign:"middle",height:"100%", width:"150px"}}
                           type="submit" value="Send" disabled={this.state.chatState!==ChatStateEnum.chatting}/>
                </form>
            </div>
        );
    }
}

export default Chat;
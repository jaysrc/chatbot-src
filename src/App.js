import React, { Component } from 'react';
import Pusher from 'pusher-js';
import { Window } from '@progress/kendo-react-dialogs';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
      windowStage: "MINIMIZED"
    };
  }
 
setMinimize=()=>{
  this.setState({
    windowStage: "MINIMIZED"
  })
}

  componentDidMount() {
    const pusher = new Pusher('xxx', {
      cluster: 'xxx',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      }); console.log(msg)
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: 'human',
    }; console.log(msg)

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('http://', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    });
    this.setState({ userMessage: '' });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <div className="chat_box" >{/** remove **/}
          <div className="chat_header">
            <h1>React Chatbot</h1>
            <div>
              <Window title={"status"} stage ={this.state.windowStage}>
              <button className="min_chat btn" onClick={this.setMinimize}>-</button>&nbsp;
              <button className="close_chat btn">+</button>
              </Window>
            </div>
          </div>
          <div className="chat-bord">{/** minimize **/}

            <div className="conversation-view">
              <div className='chat_text1'>
                <h3 className='chat_text'>available to chat? </h3>
                <h3>
                  <span className='chat_text2'>I have a question. Can you help?</span>
                </h3>
              </div>{chat}</div>
            <div className="message-box">
              <form onSubmit={this.handleSubmit}>
                <input
                  value={this.state.userMessage}
                  onChange={this.handleChange}
                  className="text-input"
                  type="text"
                  autoFocus
                  placeholder="Type your message and hit Enter to send"
                />
              </form>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default App;

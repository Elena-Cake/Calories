
import SingleSendForm from '../../components/common/SingleSendForm/SingleSendForm';
import s from './Chat.module.scss';

const Chat: React.FC = () => {

    const messages = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
    const messageElements = messages.map(item => <Message />)

    const sendMessage = (message: string) => { }

    return <div className={s.chat}>
        <div className={s.chat__messages}>
            {messageElements}
        </div>
        <SingleSendForm sendMessage={sendMessage} />
    </div>
}
export default Chat;

type propsType = {}

const Message: React.FC<propsType> = ({ }) => {

    const message = {
        ava: ' https://cdn-icons-png.flaticon.com/512/6386/6386976.png',
        author: 'User',
        body: 'Hi'

    }

    return (
        <div className={s.messages__item}>
            <img src={message.ava} className={s.message__ava} alt='user avatar' />
            {/* <h2>{message.author}</h2> */}
            <p className={s.message__body}>{message.body}</p>
        </div>
    )
}
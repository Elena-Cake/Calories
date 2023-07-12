import SingleSendForm from '../../components/common/SingleSendForm/SingleSendForm';
import s from './Chat.module.scss';

const Chat: React.FC = () => {


    const sendMessage = () => { }

    return <div className={s.chat}>
        <div className={s.dialogs__messages}>
            <SingleSendForm />
        </div>
    </div>
}
export default Chat;
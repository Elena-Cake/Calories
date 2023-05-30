import { sendMessageCreator } from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { AuthRedirect } from "../hoc/AuthRedirect";
import { compose } from "redux";


const mapStateToProps = (state) => {
  return ({
    dialogsPage: state.dialogsPage
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    sendMessage: (message) => {
      dispatch(sendMessageCreator(message))
    }
  })
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthRedirect
)(Dialogs);
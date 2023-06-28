import { initialStateDialogsType, sendMessageCreator } from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { AuthRedirect } from "../hoc/AuthRedirect";
import { compose } from "redux";
import { AppStateType } from '../../redux/reduxStore';

type mapStateToPropsType = {
  dialogsPage: initialStateDialogsType
}
type mapDispatchToPropsType = {
  sendMessage: (message: string) => void
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return ({
    dialogsPage: state.dialogsPage
  })
}


const mapDispatchToProps = (dispatch: any) => {
  return ({
    sendMessage: (message: string) => {
      dispatch(sendMessageCreator(message))
    }
  })
}

export default compose<propsType>(
  connect(mapStateToProps, mapDispatchToProps),
  AuthRedirect
)(Dialogs);
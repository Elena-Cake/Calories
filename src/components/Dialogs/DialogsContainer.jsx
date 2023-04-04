import React, { useState } from "react";
import { updateNewMessaeBodyCreator, sendMessaeCreator } from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { AuthRedirect } from "../hoc/AuthRedirect";


const mapStateToProps = (state) => {
  return ({
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    sendMessae: () => {
      dispatch(sendMessaeCreator())
    },
    updateNewMessaeBody: (body) => {
      dispatch(updateNewMessaeBodyCreator(body))
    }
  })
}

let withAuthRedirect = AuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect)

export default DialogsContainer;
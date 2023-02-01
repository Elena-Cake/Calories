import React, { useState } from "react";
import {updateNewMessaeBodyCreator, sendMessaeCreator} from '../../redux/dialogsReduser'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return ({
    state: state.dialogsPage
  })
  }
  
  const mapDispatchToProps = (dispatch) => {
    return ( {
    sendMessae: () => {
        dispatch(sendMessaeCreator())
    },
    updateNewMessaeBody: (body) => {
        dispatch(updateNewMessaeBodyCreator(body))
    }
  })
  }
  
  const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
  

export default DialogsContainer;
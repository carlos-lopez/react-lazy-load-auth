import React from 'react'

export const PrivateComponent = () =>
  <h1>This only shows to logged users</h1>

export const AuthStatus = () =>
  <p style={ {color: 'green'} }>It works!</p>

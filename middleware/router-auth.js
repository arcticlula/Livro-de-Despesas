import { auth } from '@/plugins/firebase.js'
import { isEmpty } from 'lodash'

export default ({ store, redirect, route }) => {
  const user = JSON.parse(localStorage.getItem(auth.sKey("User")))
  // console.log(user)
  if (isEmpty(user)) {
    if (route.name != 'index' && route.name != 'auth') {
      redirect({ name: "index" })
    }
  }
  else {
    if (route.name == 'index' || route.name == 'auth') redirect("/registos");
  }
  auth.listen(user => {
    console.log(user)
    store.commit('setUser', user)
    if (!isEmpty(user) && route.name == 'auth') redirect("/registos");
    if (isEmpty(user)) redirect("/");
  });
}

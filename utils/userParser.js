export default function (rawObject = {}) {
  const { uid, photoURL, displayName, email } = rawObject
  return { uid, photoURL, displayName, email }
}

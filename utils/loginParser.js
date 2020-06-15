export default function (rawObject = {}) {
  console.log(rawObject)
  const { isNewUser, profile } = rawObject.additionalUserInfo
  return { isNewUser, profile: { idGoogle: profile.id, name: profile.name, email: profile.email, picture: profile.picture, locale: profile.locale } }
}

import { get, set } from 'lodash'

const getReference = async documentReference => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
        data.id = documentReference.id
    }

    return data
}

export default async (document, paths = []) => Promise.all(
    paths.map(async path => {
        const documentField = get(document, path)
        if (documentField) {
            if (documentField.constructor.name === 'Array') {
                for (let i = 0; i < documentField.length; i++) {
                    const documentReference = documentField[i];
                    if (!documentReference || !documentReference.path) {
                        console.warn(
                            `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                        )
                    }
                    else {
                        const result = await getReference(documentReference)
                        documentField[i] = result;
                    }
                }
            }
            else {
                const documentReference = documentField;
                if (!documentReference.path) {
                    return console.warn(
                        `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                    )
                }

                const result = await getReference(documentReference)
                set(document, path, result)
            }
        }
    })
)

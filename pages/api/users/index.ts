import { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken, getIdTokenFromReq } from '../../../utils/firebase-admin'
import { admin } from 'firebase-admin/lib/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers.authorization)
  const idToken = getIdTokenFromReq(req)
  if (!idToken) {
    res.status(400).json({})
    return
  }

  let token: admin.auth.DecodedIdToken
  try {
    token = await verifyIdToken(idToken)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
    return
  }

  console.log(token.uid)
  // do something with db...

  try {
    res.status(200).json({ id: token.uid })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler

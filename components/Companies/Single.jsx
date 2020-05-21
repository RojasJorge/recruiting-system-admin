import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useRouter } from 'next/router'
import xhr from '../../xhr'
import { Alert } from 'antd'

const Single = _ => {

  const [missing, isMissing] = useState(false)
  const router = useRouter()
  const data = useStoreState(state => state.companies)
  const fill = useStoreActions(actions => actions.companies.fill)

  useEffect(() => {
    xhr()
      .get(`/company/${router.query.id}`)
      .then(res => {
        res.type = false /** This param (if true) loads a collection, false => single object */
        fill(res)
      })
      .catch(err => isMissing(true))
  }, [])
  return (
    <>
      {
        missing
          ? <Alert type="warning" message="No encontrado." description="La entidad solicitada no existe en la base de datos." showIcon />
          : null
      }
      <pre>{JSON.stringify(data.company, false, 2)}</pre>
    </>
  )
}

export default Single

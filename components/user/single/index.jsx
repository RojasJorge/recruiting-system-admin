import General from './general'
import Contact from './contact'
import About from './about'
import Experience from './experience'
import Academic from './academic'
import Knowledge from './knowledge'
import Economic from './economic'
import {useStoreState} from "easy-peasy"

const SingleProfile = _ => {
  
  const user = useStoreState(state => state.auth.user)

  return (
    <>
      <General data={user.profile.fields.personal} defaultData={user} />
      <Contact data={user.profile.fields.personal} defaultData={user} />
      <About data={user.profile.fields.lookingFor} defaultData={user.profile.fields.personal} />
      <Experience data={user.profile.fields.working} />
      <Academic data={user.profile.fields.academic} />
      <Knowledge data={user.profile.fields.others} />
      <Economic data={user.profile.fields.economic} />
    </>
  )
}

export default SingleProfile

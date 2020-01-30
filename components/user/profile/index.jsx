import { useStoreState, useStoreActions } from "easy-peasy";
import Personal from "./personal/";

const UserProfile = () => {
  /** Global state */
  const steps = useStoreState(state => state.profile.steps);
  const update = useStoreActions(actions => actions.profile.update);

  return (
    <>
      <h1>Mi perfil</h1>
      <Personal update={update} />
      <h4 style={{marginTop: 24}}>Global statate</h4>
      <pre style={{ marginTop: 24 }}>{JSON.stringify(steps, false, 2)}</pre>
    </>
  );
};

export default UserProfile;

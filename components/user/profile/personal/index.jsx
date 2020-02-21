import { Card } from "antd";
import { useStoreState } from "easy-peasy";
// import Phones from "./Phones";
import Form from "./Form";

const Personal = ({ update }) => {
  /** Global state */
  const personal = useStoreState(state => state.profile.steps.personal);
  const user = useStoreState(state => state.auth.user);

  return (
    <>
      <h2>Información personal:</h2>
      <Card title={null}>
        <h4>Nombre:</h4>
        <p>
          {user.name} {user.lastname}
        </p>
        <h4>Dirección:</h4>
        <p>{user.address}</p>
        <h4>Email:</h4>
        <p>{user.email}</p>
        {personal.phones.map(phone => (
          <li key={phone.id}>
            {`+${phone.area}`} {phone.number} {phone.type}
          </li>
        ))}
        <Form {...update} />
        {/* <Phones update={update} /> */}
      </Card>
    </>
  );
};

export default Personal;

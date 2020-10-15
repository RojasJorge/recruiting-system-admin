import { useEffect, useState } from 'react';
import xhr from '../../../xhr';
import Layout from '../../../views/Layout';
import { useRouter } from 'next/router';
import { PageTitle } from '../../../elements';
import Single from '../../../components/Requests/Single';
import { isEmpty } from 'lodash';

const Index = _ => {
  const router = useRouter();

  /** Local state */
  const [record, updateRecord] = useState({});

  const getRecord = async _ =>
    await xhr()
      .get(`/apply/${router.query.id}`)
      .then(resp => updateRecord(resp.data.items ? resp.data.items[0] : {}))
      .catch(err => console.log(err));

  useEffect(() => {
    getRecord()
  }, [router.query.id]);

  return (
    <Layout title={'Mi aplicación'}>
      {/*<pre>{JSON.stringify(record, false, 2)}</pre>*/}
      <>{!isEmpty(record) && <Single record={record} />}</>
    </Layout>
  );
};

export default Index;

import xhr from '../../xhr';
import { useEffect, useState } from 'react';
import { MailOutlined, CheckCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';

const GetContactNotifications = ({ record }) => {
  const [data, setData] = useState(null);

  const getInvites = _ =>
    xhr()
      .get(`/invite-a-user?companyId=${record.company.id}&jobId=${record.job.id}&profileId=${record.profile.id}`)
      .then(resp => {
        setData(resp.data);
      })
      .catch(err => {
        console.log(err);
      });

  useEffect(() => {
    getInvites();
  }, [record.company.id, record.job.id, record.profile.id]);

  return (
    <>
      {data && data.total > 0 ? (
        <Tooltip title={`${data.total} ${data.total > 1 ? ' Veces' : ' Vez'} invitado vía email.`}>
          {/* <Badge count={data.total} style={{ backgroundColor: '#52c41a' }}> */}
          <Badge count={<CheckCircleOutlined twoToneColor="#ffffff" />} style={{ backgroundColor: '#52c41a' }}>
            <MailOutlined style={{ fontSize: 20 }} />
          </Badge>
        </Tooltip>
      ) : (
        <Tooltip title={`Aún no ha sido invitado vía email`}>
          <SendOutlined style={{fontSize: 20}}/>
        </Tooltip>
      )}
    </>
  );
};

export default GetContactNotifications;

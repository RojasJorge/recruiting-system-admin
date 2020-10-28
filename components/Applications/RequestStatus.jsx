import Link from 'next/link';

const RequestStatus = ({ record }) => {
  const translateStatus = status => {
    let params = {
      string: 'default',
      color: '#019688',
    };

    switch (status) {
      case 'PENDING':
        params = { ...params, string: 'PENDIENTE', color: '#aaa' };
        break;
      case 'RECEIVED':
        params = { ...params, string: 'RECIBIDO', color: '#4269f5' };
        break;
      case 'IN_REVIEW':
        params = { ...params, string: 'En revisión', color: '#c97f10' };
        break;
      case 'CANCELLED':
        params = { ...params, string: 'Cancelado', color: '#ff0000' };
        break;
      case 'SUCCESS':
        params = { ...params, string: 'Finalizado', color: '#21ba0d' };
        break;
      default:
        params = params;
        break;
    }

    return params;
  };

  return (
    <>
      <Link href={`/admin/requests/${record.apply.id}`} passHref>
        <a>
          <span
            style={{
              color: translateStatus(record.apply.status).color,
              textTransform: 'uppercase',
            }}
          >
            {translateStatus(record.apply.status).string}
          </span>
        </a>
      </Link>
    </>
  );
};

export default RequestStatus;

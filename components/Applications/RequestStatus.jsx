import Link from "next/link";

const RequestStatus = ({record}) => {
	
	const translateStatus = status => {
		
		let params = {
			string: 'default',
			color: '#019688'
		}
		
		switch (status) {
			case 'PENDING':
				params = {...params, string: 'PENDIENTE'}
				break
			case 'APPLICATION_SENT':
				params = {...params, string: 'APPLICACIÓN ENVIADA'}
				break
			default:
				params = params
				break
		}
		
		return params
	}
	
	return (
		<>
			<Link href={`/admin/requests/${record.apply.id}`} passHref>
				<a>
					<span style={{
						color: translateStatus(record.apply.status).color
					}}>
						{translateStatus(record.apply.status).string}
					</span>
				</a>
			</Link>
		</>
	)
}

export default RequestStatus

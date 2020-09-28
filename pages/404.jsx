const NotFound = _ => {
	return (
		<>
			<div className="wrapper">
				<div className="content">
					<h3 className="title">
						404
					</h3>
					<p className="description">
						No encontrado
					</p>
				</div>
			</div>
			<style jsx>{`
				.wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100vh;
				}
				
				.content {
					display: flex;
					align-items: center;
				}
				
				.title {
					font-size: 56px;
					display: inline-block;
					margin: 0 12px 0 0;
				}
				
				.description {
					display: inline-block;
					margin: 0;
				}
			`}</style>
		</>
	)
}

export default NotFound
import {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

const TynyEditor = ({ value = {}, onChange }) => {
	
	const initVal = value ? value : ''
	
	const [values, setValues] = useState(initVal)
	
	const triggerOnChange = val => {
		if (onChange) {
			onChange(val)
		}
	}
	
	const handleChange = e => {
		setValues(e)
		triggerOnChange(e)
	}
	
	return (
		<>
			<Editor
				initialValue={values}
				apiKey="7bf3hsjh801ag456xg2jg7ealwsvqfhg2tyti6ftwe4b025j"
				init={{
					height: 300,
					menubar: false,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code'
					],
					toolbar:
						'undo redo | formatselect | bold italic backcolor | \
						alignleft aligncenter alignright alignjustify | \
						bullist numlist outdent indent | removeformat | help'
				}}
				onEditorChange={e => handleChange(e)}
			/>
		</>
	)
}

export default TynyEditor
